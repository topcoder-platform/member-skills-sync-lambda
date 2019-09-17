const AWS = require('aws-sdk')
const path = require('path')
const creds = new AWS.EnvironmentCredentials('AWS')

const enterdSkillsStream = process.env.DB_ENTERED_SKILLS_STREAM
const aggregatedSkillsStream = process.env.DB_AGGREGATED_SKILLS_STREAM

const esDomain = {}
esDomain[enterdSkillsStream] = {
  endpoint: process.env.ES_ENDPOINT,
  region: process.env.ES_REGION,
  index: process.env.ES_ENTERED_SKILLS_INDEX,
  doctype: process.env.ES_ENTERED_SKILLS_DOCTYPE
}
esDomain[aggregatedSkillsStream] = {
  endpoint: process.env.ES_ENDPOINT,
  region: process.env.ES_REGION,
  index: process.env.ES_AGGREGATED_SKILLS_INDEX,
  doctype: process.env.ES_AGGREGATED_SKILLS_DOCTYPE
}

const endpoint = new AWS.Endpoint(process.env.ES_ENDPOINT)

const reqMethodMapping = {
  MODIFY: 'POST',
  INSERT: 'PUT',
  REMOVE: 'DELETE'
}

/**
 * Insert/Update/Delete the Elastic Search document
 * @param {String} eventName the event name
 * @param {String} id the document id
 * @param {Object} doc the document
 * @param {Object} esDomain the ES domain object
 * @param {Object} context the context object
 */
function postDocumentToES (eventName, id, doc, esDomain, context) {
  console.log(`${eventName} event listened`)

  const req = new AWS.HttpRequest(endpoint)
  const send = new AWS.NodeHttpClient()

  // constructing AWS Http Request based on eventName from the record
  req.path = path.join('/', esDomain.index, esDomain.doctype, id)
  req.region = esDomain.region
  req.method = reqMethodMapping[eventName]
  if (eventName !== 'REMOVE') {
    // send request body for modify or insert event
    req.body = JSON.stringify(doc)
  }
  req.headers['presigned-expires'] = false
  req.headers['content-type'] = 'application/json'
  req.headers.Host = endpoint.host
  // Sign the request (Sigv4)
  const signer = new AWS.Signers.V4(req, 'es')
  signer.addAuthorization(creds, new Date())

  // Post document to ES
  send.handleRequest(req, null, function (httpResp) {
    let body = ''
    httpResp.on('data', chunk => {
      body += chunk
    })
    httpResp.on('end', () => {
      console.log(`Response status code: ${httpResp.statusCode}`)
      console.log(`Response body: ${body}`)
      if (httpResp.statusCode >= 200 && httpResp.statusCode < 300) {
        console.log('Successfully indexed the document in ElasticSearch !')
      } else {
        console.error('Error occurs during indexing, check the response body above for more information')
      }
      context.succeed()
    })
  }, function (err) {
    console.error('Error occurs during indexing: ' + err)
    context.fail()
  })
}

/**
 * Sync Dynamo DB member skills to Elastic Search
 * @param {Object} event the event object
 * @param {Object} context the context object
 * @param {Func} callback the callback
 */
exports.handleSync = (event, context, callback) => {
  event.Records.forEach(record => {
    if (record.eventName === 'MODIFY' || record.eventName === 'INSERT' || record.eventName === 'REMOVE') {
      console.log(`Synchronize record: ${JSON.stringify(record)}`)

      // userId is the hash-key for both MemberEnteredSkills and MemberAggregatedSkills tables, no range-key
      const keys = AWS.DynamoDB.Converter.unmarshall(record.dynamodb.Keys)
      let id = String(keys.userId)
      let doc

      if (record.eventName !== 'REMOVE') {
        doc = AWS.DynamoDB.Converter.unmarshall(record.dynamodb.NewImage)
        if (doc.skills) {
          /*
           * MemberEnteredSkills.skills or MemberAggregatedSkills.skills is a Map
           * the key is number, the value is JSON string
           * refer these following codes:
           * https://github.com/appirio-tech/ap-member-microservice/blob/feature-member-skills-sync/service/src/main/java/com/appirio/service/member/api/MemberEnteredSkills.java#L109-L112
           * https://github.com/appirio-tech/ap-member-microservice/blob/feature-member-skills-sync/service/src/main/java/com/appirio/service/member/marshaller/MemberInputSkillsMarshaller.java
           * https://github.com/appirio-tech/ap-member-microservice/blob/feature-member-skills-sync/service/src/main/java/com/appirio/service/member/api/MemberAggregatedSkills.java#L54-L57
           * https://github.com/appirio-tech/ap-member-microservice/blob/feature-member-skills-sync/service/src/main/java/com/appirio/service/member/marshaller/MemberSkillsMarshaller.java
           */
          for (const id in doc.skills) {
            doc.skills[id] = JSON.parse(doc.skills[id])
          }
        }
        // for safeguard, initialize createdAt and updatedAt from document value so we can accept both number and date-format string
        if (doc.createdAt) {
          doc.createdAt = new Date(doc.createdAt)
        }
        if (doc.updatedAt) {
          doc.updatedAt = new Date(doc.updatedAt)
        }
      }
      postDocumentToES(record.eventName, id, doc, esDomain[record.eventSourceARN], context)
    }
  })
}
