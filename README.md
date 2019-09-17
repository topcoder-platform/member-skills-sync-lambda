# member-skills-sync-lambda

## Prerequisites
1. Amazon DynamoDB table for the streaming and sending member skills data to Amazon Lambda exists and the ARN is known (please enable the streaming on DynamoDB with View type "New and old images" - see screen-shot in Verification Document if required).
2. Amazon ElasticSearch domain for posting the member skills data already exists and endpoint is known.
3. AWS Lambda IAM role that has the privilege (permission policies) to read the stream from DynamodDB already exists and ARN is known.
4. Amazon ElasticSearch domain access policy has been configured so that AWS Lambda IAM role can do necessary action to post data to ElasticSearch and for unit test purpose, either using IP address or Serverless Agent IAM User below is given access to post data to ElasticSearch.
5. Serverless Framework has been installed. If not yet done, please follow this [link](https://serverless.com/framework/docs/providers/aws/guide/installation/).
6. Serverless Agent IAM User has been configured properly and its access key ID and its agent secret access key is known, please follow this [link](https://serverless.com/framework/docs/providers/aws/guide/credentials/) to setup one if not yet done.
7. All the instructions below are using Node v10.16.3.

## Environment Variables
Please follow this instruction to setup the required environment variables. We are using Linux terminal in this example.

First you need to setup environment variables for AWS credentials. For review purpose, actually you don't need to create a new user for severless agent, just use your AWS account's access key and secret access key which already have full-access to all AWS services.
```
export AWS_ACCESS_KEY_ID=<your access key id>
export AWS_SECRET_ACCESS_KEY=<your secret access key>
```
For the sake of unit testing to run, running your lambda function locally, and deploying your lambda's environment variables, please also setup 9 more environment variables below in your terminal (using export command same as above).
1. ES_ENDPOINT                    --> Endpoint of your elastic search
2. ES_REGION                      --> Region of your elastic search e.g. us-east-1
3. ES_ENTERED_SKILLS_INDEX        --> ElasticSearch Index for member entered skills documents
4. ES_ENTERED_SKILLS_DOCTYPE      --> ElasticSearch document type for member entered skills index
5. ES_AGGREGATED_SKILLS_INDEX     --> ElasticSearch Index for member aggregated skills documents
6. ES_AGGREGATED_SKILLS_DOCTYPE   --> ElasticSearch document type for member aggregated skills index
7. DB_ENTERED_SKILLS_STREAM       --> ARN of DynamoDB table MemberEnteredSkills stream
8. DB_AGGREGATED_SKILLS_STREAM    --> ARE of DynamoDB table MemberAggregatedSkills stream
9. LAMBDA_ROLE                    --> ARN of IAM Role to be used when executing Lambda

## Change the serverless.yml to fit your environment
Please open serverless.yml from the project and modify following value in case you don't want to use environment variables:
1. role (under index.handleSync)    --> ARN of your AWS Lambda IAM Role
2. arn (under stream)               --> ARN of your DynamoDB table stream
3. ES_* (under environment)         --> This is by default populated by environment variables, feel free to change if needed
4. DB_* (under environment)         --> This is by default populated by environment variables, feel free to change if needed
5. Please also modify stage and region to fit your needs

## Install Dependencies and Run Lint
1. run the following command to install the dependencies
```
npm install
```
2. To run linter if required
```
npm run lint

npm run lint:fix # To fix possible lint errors
```

## Unit Test
Make sure you have properly setup the [environment variables](#environment-variables) and [installing dependencies](#install-dependencies-and-run-lint). Run `npm run test` to run the unit test.

## Run lambda locally
1. Make sure you have properly setup the [environment variables](#environment-variables) and [installing dependencies](#install-dependencies-and-run-lint).

2. Run command `npm run test-data` to generate test data.(Important step!! The provided test data have different eventSourceARN which are different with your environment variables. The lambda function need to use eventSourceARN to distinguish ES index.)

3. Then, Run the following to invoke lambda locally.
```
serverless invoke local -f sync -p test_data/createEnteredSkillsEvent.json
serverless invoke local -f sync -p test_data/updateEnteredSkillsEvent.json
serverless invoke local -f sync -p test_data/deleteEnteredSkillsEvent.json
serverless invoke local -f sync -p test_data/createMemberAggregatedSkillsEvent.json
serverless invoke local -f sync -p test_data/updateMemberAggregatedSkillsEvent.json
serverless invoke local -f sync -p test_data/deleteMemberAggregatedSkillsEvent.json
```
Please note that even if the lambda is invoked locally using test data, the data is still being posted to ElasticSearch in AWS based on environment variables above. In order for the local invocation to work properly, the serverless agent that is used by serverless command has to have privilege to post the data to ElasticSearch or the access policy for the ElasticSearch is configured to allow any AWS principal to post the data but restricted by condition e.g. by using IpAddress.

## Deploy
When all the things mentioned above have been done, please run the following:
```
serverless deploy
```
Feel free to use flag `--verbose` after `serverless deploy` if you want to know more information about your deployment.

You can also modify the lambda code if required and the redeployment is as simple as running `serverless deploy` again.

## Verification
Please read verification document for screen shot of enabling DynamoDB table stream, unit test result, deployment results, and results of manual testing on the lambda.
