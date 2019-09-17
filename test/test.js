const AWS = require('aws-sdk')
const path = require('path')
const should = require('should')
const { handleSync } = require('../index')
const {
  createEnteredSkillsEvent,
  updateEnteredSkillsEvent,
  deleteEnteredSkillsEvent,
  createMemberAggregatedSkillsEvent,
  updateMemberAggregatedSkillsEvent,
  deleteMemberAggregatedSkillsEvent,
  expectedResult
} = require('./testData')

const creds = new AWS.EnvironmentCredentials('AWS')

const esDomain = {}
esDomain['enteredSkills'] = {
  endpoint: process.env.ES_ENDPOINT,
  region: process.env.ES_REGION,
  index: process.env.ES_ENTERED_SKILLS_INDEX,
  doctype: process.env.ES_ENTERED_SKILLS_DOCTYPE
}
esDomain['aggregatedSkills'] = {
  endpoint: process.env.ES_ENDPOINT,
  region: process.env.ES_REGION,
  index: process.env.ES_AGGREGATED_SKILLS_INDEX,
  doctype: process.env.ES_AGGREGATED_SKILLS_DOCTYPE
}

const endpoint = new AWS.Endpoint(process.env.ES_ENDPOINT)

const waitTime = 1000 || process.env.WAIT_TIME

// dummy context object
const context = {
  succeed: () => {},
  fail: () => {}
}

describe('Topcoder - Challenge ES Processor E2E Test', () => {
  let infoLogs = []
  let errorLogs = []
  const info = console.log
  const error = console.error

  /**
   * Sleep with time from input
   * @param time the time input
   */
  async function sleep (time) {
    await new Promise((resolve) => {
      setTimeout(resolve, time)
    })
  }

  /**
   * Wait job finished with successful log or error log is found
   */
  async function waitJob () {
    while (true) {
      if (errorLogs.length > 0) {
        break
      }
      if (infoLogs.some(x => String(x).includes('Successfully indexed the document in ElasticSearch !'))) {
        break
      }
      // use small time to wait job and will use global timeout so will not wait too long
      await sleep(waitTime)
    }
  }

  async function getDocument (esDomain, id) {
    return new Promise((resolve, reject) => {
      const req = new AWS.HttpRequest(endpoint)
      const send = new AWS.NodeHttpClient()

      // constructing AWS Http Request
      req.path = path.join('/', esDomain.index, esDomain.doctype, id)
      req.region = esDomain.region
      req.method = 'GET'
      req.headers['presigned-expires'] = false
      req.headers.Host = endpoint.host
      // Sign the request (Sigv4)
      const signer = new AWS.Signers.V4(req, 'es')
      signer.addAuthorization(creds, new Date())

      // Get document from ES
      send.handleRequest(req, null, function (httpResp) {
        let body = ''
        httpResp.on('data', chunk => {
          body += chunk
        })
        httpResp.on('end', () => {
          resolve({ status: httpResp.statusCode, body: JSON.parse(body) })
        })
      }, function (err) {
        reject(err)
      })
    })
  }

  before(async () => {
    console.log = (message) => {
      infoLogs.push(message)
      info(message)
    }
    console.error = (message) => {
      errorLogs.push(message)
      error(message)
    }
  })

  after(async () => {
    console.error = error
    console.log = info
  })

  beforeEach(() => {
    // clear logs
    infoLogs = []
    errorLogs = []
  })

  const userId = '40309246'

  it('Sync create MemberEnteredSkills to ES', async () => {
    handleSync(createEnteredSkillsEvent, context)
    await waitJob()
    should.equal(infoLogs[1], 'INSERT event listened')
    // the status code should be 201 created
    should.equal(infoLogs[2], 'Response status code: 201')

    const res = await getDocument(esDomain['enteredSkills'], userId)
    should.equal(res.status, 200)
    should.deepEqual(res.body._source, expectedResult.createdEnteredSkill)
  })

  it('Sync update MemberEnteredSkills to ES', async () => {
    handleSync(updateEnteredSkillsEvent, context)
    await waitJob()
    should.equal(infoLogs[1], 'MODIFY event listened')
    should.equal(infoLogs[2], 'Response status code: 200')

    const res = await getDocument(esDomain['enteredSkills'], userId)
    should.equal(res.status, 200)
    should.deepEqual(res.body._source, expectedResult.updatedEnteredSkill)
  })

  it('Sync delete MemberEnteredSkills to ES', async () => {
    handleSync(deleteEnteredSkillsEvent, context)
    await waitJob()
    should.equal(infoLogs[1], 'REMOVE event listened')
    should.equal(infoLogs[2], 'Response status code: 200')

    const res = await getDocument(esDomain['enteredSkills'], userId)
    should.equal(res.status, 404)
  })

  it('Sync create MemberAggregatedSkills to ES', async () => {
    handleSync(createMemberAggregatedSkillsEvent, context)
    await waitJob()
    should.equal(infoLogs[1], 'INSERT event listened')
    // the status code should be 201 created
    should.equal(infoLogs[2], 'Response status code: 201')

    const res = await getDocument(esDomain['aggregatedSkills'], userId)
    should.equal(res.status, 200)
    should.deepEqual(res.body._source, expectedResult.createdMemberAggregatedSkill)
  })

  it('Sync update MemberAggregatedSkills to ES', async () => {
    handleSync(updateMemberAggregatedSkillsEvent, context)
    await waitJob()
    should.equal(infoLogs[1], 'MODIFY event listened')
    should.equal(infoLogs[2], 'Response status code: 200')

    const res = await getDocument(esDomain['aggregatedSkills'], userId)
    should.equal(res.status, 200)
    should.deepEqual(res.body._source, expectedResult.updatedMemberAggregatedSkill)
  })

  it('Sync delete MemberAggregatedSkills to ES', async () => {
    handleSync(deleteMemberAggregatedSkillsEvent, context)
    await waitJob()
    should.equal(infoLogs[1], 'REMOVE event listened')
    should.equal(infoLogs[2], 'Response status code: 200')

    const res = await getDocument(esDomain['aggregatedSkills'], userId)
    should.equal(res.status, 404)
  })
})
