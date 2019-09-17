# Verification

## Setup From scratch
1. You need to install aws-cli on your local environment and properly configure it.
refer https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html and https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html for more information.
2. You can use aws-cli to create `MemberEnteredSkills` and `MemberAggregatedSkills` tables using the following commands:
```bash
# Create MemberEnteredSkills table
aws dynamodb create-table --table-name MemberEnteredSkills --attribute-definitions AttributeName=handleLower,AttributeType=S AttributeName=userId,AttributeType=N --key-schema AttributeName=userId,KeyType=HASH --global-secondary-indexes '[{"IndexName":"handleLower-index","KeySchema":[{"AttributeName":"handleLower","KeyType":"HASH"}],"Projection":{"ProjectionType":"ALL"}, "ProvisionedThroughput": {"ReadCapacityUnits": 2, "WriteCapacityUnits": 2}}]' --provisioned-throughput ReadCapacityUnits=4,WriteCapacityUnits=2
# Create MemberAggregatedSkills table
aws dynamodb create-table --table-name MemberAggregatedSkills --attribute-definitions AttributeName=handleLower,AttributeType=S AttributeName=userId,AttributeType=N --key-schema AttributeName=userId,KeyType=HASH --global-secondary-indexes '[{"IndexName":"handleLower-index","KeySchema":[{"AttributeName":"handleLower","KeyType":"HASH"}],"Projection":{"ProjectionType":"ALL"}, "ProvisionedThroughput": {"ReadCapacityUnits": 2, "WriteCapacityUnits": 2}}]' --provisioned-throughput ReadCapacityUnits=4,WriteCapacityUnits=2
```
3. Now go to AWS console DynamoDB service, you can enable the streaming on DynamoDB with View type "New and old images" after you click `Manage Stream` button. After that you could see `Latest stream ARN` like the following images.
  ![](doc/images/dynamodb_MemberEnteredSkills.png)
  ![](doc/images/dynamodb_MemberAggregatedSkills.png)
4. Commonly, You don't need to create ElasticSearch index. By default, the index is created automatically if it doesn’t exist.
5. You need to create IAM role for lambda function. the "Trusted entities" should be `AWS service: lambda`. It should contain 2 policies, one is `AWSLambdaDynamoDBExecutionRole`(AWS managed policy), another is user-created policy with ES permission (you need to create it in IAM service check the 3rd images)
  ![](doc/images/iam_role.png)
  ![](doc/images/iam_role_policies.png)
  ![](doc/images/iam_user_policy.png)
6. Following README.md to deploy the lambda function.
  ![](doc/images/cloud_watch.png)
  ![](doc/images/lambda.png)

## Verification
1. Create item in MemberEnteredSkills table
  ![](doc/images/db_create_member_entered_skills.png)
   Check CloudWatch and ElasticSearch
  ![](doc/images/log_create_member_entered_skills.png)
  ![](doc/images/es_create_member_entered_skills.png)
2. Update item in MemberEnteredSkills table
  ![](doc/images/db_update_member_entered_skills.png)
   Check CloudWatch and ElasticSearch
  ![](doc/images/log_update_member_entered_skills.png)
  ![](doc/images/es_update_member_entered_skills.png)
3. Delete item in MemberEnteredSkills table
  ![](doc/images/db_delete_member_entered_skills.png)
   Check CloudWatch and ElasticSearch
  ![](doc/images/log_delete_member_entered_skills.png)
  ![](doc/images/es_delete_member_entered_skills.png)
4. Create item in MemberAggregatedSkills table
  ![](doc/images/db_create_member_aggregated_skills.png)
   Check CloudWatch and ElasticSearch
  ![](doc/images/log_create_member_aggregated_skills.png)
  ![](doc/images/es_create_member_aggregated_skills.png)
5. Update item in MemberAggregatedSkills table
  ![](doc/images/db_update_member_aggregated_skills.png)
   Check CloudWatch and ElasticSearch
  ![](doc/images/log_update_member_aggregated_skills.png)
  ![](doc/images/es_update_member_aggregated_skills.png)
6. Delete item in MemberAggregatedSkills table
  ![](doc/images/db_delete_member_aggregated_skills.png)
   Check CloudWatch and ElasticSearch
  ![](doc/images/log_delete_member_aggregated_skills.png)
  ![](doc/images/es_delete_member_aggregated_skills.png)
