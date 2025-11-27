# AWS Resources - KidBookBuilder API

## Stack Information

| Property | Value |
|----------|-------|
| **Stack Name** | `kidbookbuilder-api-dev` |
| **Service** | `kidbookbuilder-api` |
| **Region** | `us-east-1` |
| **Stage** | `dev` |
| **Framework** | Serverless Framework v3 |
| **Runtime** | Node.js 20.x |
| **Architecture** | ARM64 |
| **Last Updated** | 2024-11-27 |

---

## 📊 Resource Summary

| Category | Count |
|----------|-------|
| Lambda Functions | 5 |
| API Gateway (HTTP API) | 1 |
| API Routes | 5 |
| DynamoDB Tables | 1 |
| Cognito User Pool | 1 |
| Cognito User Pool Client | 1 |
| CloudWatch Log Groups | 5 |
| IAM Roles | 1 |
| S3 Buckets | 1 |
| **Total Resources** | **40** |

---

## 🗄️ Database Resources

### DynamoDB Table

| Property | Value |
|----------|-------|
| **Table Name** | `kidbookbuilder-api-dev-signups` |
| **Logical ID** | `SignupsTable` |
| **Billing Mode** | PAY_PER_REQUEST |
| **Primary Key** | `id` (String, HASH) |
| **Status** | CREATE_COMPLETE |
| **ARN** | `arn:aws:dynamodb:us-east-1:084375555044:table/kidbookbuilder-api-dev-signups` |

**Schema:**
```
{
  id: String (UUID),
  parentName: String,
  parentEmail: String,
  childName: String,
  childAge: Number,
  createdAt: String (ISO),
  updatedAt: String (ISO)
}
```

---

## 🔐 Authentication Resources

### Cognito User Pool

| Property | Value |
|----------|-------|
| **Pool ID** | `us-east-1_q5KFH1XBI` |
| **Logical ID** | `CognitoUserPool` |
| **Pool Name** | `kidbookbuilder-api-dev-userpool` |
| **Username Attributes** | Email |
| **Auto-verified Attributes** | Email |
| **Status** | CREATE_COMPLETE |
| **ARN** | `arn:aws:cognito-idp:us-east-1:084375555044:userpool/us-east-1_q5KFH1XBI` |

**Password Policy:**
- Minimum Length: 8
- Require Uppercase: Yes
- Require Lowercase: Yes
- Require Numbers: Yes
- Require Symbols: Yes

### Cognito User Pool Client

| Property | Value |
|----------|-------|
| **Client ID** | `39lltc4ukcr4objua9929ojug7` |
| **Logical ID** | `CognitoUserPoolClient` |
| **Client Name** | `kidbookbuilder-api-dev-client` |
| **Status** | CREATE_COMPLETE |

**Auth Flows:**
- ALLOW_USER_SRP_AUTH
- ALLOW_REFRESH_TOKEN_AUTH
- ALLOW_ADMIN_USER_PASSWORD_AUTH

**Token Validity:**
- Access Token: 60 minutes
- ID Token: 60 minutes
- Refresh Token: 30 days

### Cognito Domain

| Property | Value |
|----------|-------|
| **Domain** | `kidbookbuilder-api-dev-1764252546866` |
| **Full URL** | `https://kidbookbuilder-api-dev-1764252546866.auth.us-east-1.amazoncognito.com` |
| **Status** | CREATE_COMPLETE |

---

## ⚡ Lambda Functions

| Function Name | Handler | Memory | Timeout | Status |
|--------------|---------|--------|---------|--------|
| `kidbookbuilder-api-dev-createSignup` | `functions/createSignup.handler` | 256 MB | 10s | CREATE_COMPLETE |
| `kidbookbuilder-api-dev-getSignups` | `functions/getSignups.handler` | 256 MB | 10s | CREATE_COMPLETE |
| `kidbookbuilder-api-dev-getSignup` | `functions/getSignup.handler` | 256 MB | 10s | CREATE_COMPLETE |
| `kidbookbuilder-api-dev-updateSignup` | `functions/updateSignup.handler` | 256 MB | 10s | CREATE_COMPLETE |
| `kidbookbuilder-api-dev-deleteSignup` | `functions/deleteSignup.handler` | 256 MB | 10s | CREATE_COMPLETE |

**All Functions:**
- Runtime: Node.js 20.x
- Architecture: ARM64

---

## 🌐 API Gateway Resources

### HTTP API

| Property | Value |
|----------|-------|
| **API ID** | `hu6lfscn2f` |
| **Type** | HTTP API (v2) |
| **Endpoint** | `https://hu6lfscn2f.execute-api.us-east-1.amazonaws.com` |
| **Stage** | `$default` |
| **Status** | CREATE_COMPLETE |

### API Routes

| Method | Path | Auth | Integration |
|--------|------|------|-------------|
| POST | `/signups` | None (Public) | `createSignup` |
| GET | `/signups` | Cognito JWT | `getSignups` |
| GET | `/signups/{id}` | Cognito JWT | `getSignup` |
| PUT | `/signups/{id}` | Cognito JWT | `updateSignup` |
| DELETE | `/signups/{id}` | Cognito JWT | `deleteSignup` |

### Authorizer

| Property | Value |
|----------|-------|
| **Authorizer ID** | `cto7is` |
| **Type** | JWT |
| **Identity Source** | `$request.header.Authorization` |
| **Issuer URL** | `https://cognito-idp.us-east-1.amazonaws.com/us-east-1_q5KFH1XBI` |

---

## 📋 CloudWatch Log Groups

| Log Group | Function |
|-----------|----------|
| `/aws/lambda/kidbookbuilder-api-dev-createSignup` | createSignup |
| `/aws/lambda/kidbookbuilder-api-dev-getSignups` | getSignups |
| `/aws/lambda/kidbookbuilder-api-dev-getSignup` | getSignup |
| `/aws/lambda/kidbookbuilder-api-dev-updateSignup` | updateSignup |
| `/aws/lambda/kidbookbuilder-api-dev-deleteSignup` | deleteSignup |

---

## 🔑 IAM Resources

### Lambda Execution Role

| Property | Value |
|----------|-------|
| **Role Name** | `kidbookbuilder-api-dev-us-east-1-lambdaRole` |
| **Status** | CREATE_COMPLETE |

**Permissions:**
- DynamoDB: Scan, GetItem, PutItem, UpdateItem, DeleteItem
- CloudWatch Logs: CreateLogGroup, CreateLogStream, PutLogEvents

---

## 📦 S3 Resources

### Deployment Bucket

| Property | Value |
|----------|-------|
| **Bucket Name** | `kidbookbuilder-api-dev-serverlessdeploymentbucket-9ff8qzyvzvxq` |
| **Purpose** | Serverless Framework deployment artifacts |
| **Status** | CREATE_COMPLETE |

---

## 📤 Stack Outputs

| Output Key | Value | Description |
|------------|-------|-------------|
| `ApiEndpoint` | `https://hu6lfscn2f.execute-api.us-east-1.amazonaws.com` | HTTP API Gateway endpoint URL |
| `TableName` | `kidbookbuilder-api-dev-signups` | DynamoDB table name |
| `UserPoolId` | `us-east-1_q5KFH1XBI` | Cognito User Pool ID |
| `UserPoolClientId` | `39lltc4ukcr4objua9929ojug7` | Cognito User Pool Client ID |
| `CognitoDomain` | `https://kidbookbuilder-api-dev-1764252546866.auth.us-east-1.amazoncognito.com` | Cognito Hosted UI Domain |

---

## 🛠️ Useful Commands

```bash
# View stack info
npm run info

# View all CloudFormation resources
aws cloudformation describe-stack-resources \
  --stack-name kidbookbuilder-api-dev \
  --region us-east-1 \
  --output table

# View stack outputs
aws cloudformation describe-stacks \
  --stack-name kidbookbuilder-api-dev \
  --region us-east-1 \
  --query 'Stacks[0].Outputs' \
  --output table

# View Lambda logs
npm run logs -- createSignup
npm run logs -- getSignups

# Scan DynamoDB table
aws dynamodb scan \
  --table-name kidbookbuilder-api-dev-signups \
  --region us-east-1

# List Cognito users
aws cognito-idp list-users \
  --user-pool-id us-east-1_q5KFH1XBI \
  --region us-east-1

# Test API endpoints
curl -X POST https://hu6lfscn2f.execute-api.us-east-1.amazonaws.com/signups \
  -H "Content-Type: application/json" \
  -d '{"parentName":"Test","parentEmail":"test@example.com","childName":"Child","childAge":10}'
```

---

## 🔗 AWS Console Links

- [CloudFormation Stack](https://us-east-1.console.aws.amazon.com/cloudformation/home?region=us-east-1#/stacks/stackinfo?filteringText=kidbookbuilder-api-dev)
- [API Gateway](https://us-east-1.console.aws.amazon.com/apigateway/main/apis/hu6lfscn2f/routes?region=us-east-1)
- [Lambda Functions](https://us-east-1.console.aws.amazon.com/lambda/home?region=us-east-1#/functions?f0=true&fo=and&k0=functionName&o0=%3A&v0=kidbookbuilder-api-dev)
- [DynamoDB Table](https://us-east-1.console.aws.amazon.com/dynamodbv2/home?region=us-east-1#table?name=kidbookbuilder-api-dev-signups)
- [Cognito User Pool](https://us-east-1.console.aws.amazon.com/cognito/v2/idp/user-pools/us-east-1_q5KFH1XBI/users?region=us-east-1)
- [CloudWatch Logs](https://us-east-1.console.aws.amazon.com/cloudwatch/home?region=us-east-1#logsV2:log-groups$3FlogGroupNameFilter$3D$252Faws$252Flambda$252Fkidbookbuilder-api-dev)

---

## 💰 Cost Estimates

### Free Tier Limits (Monthly)

| Service | Free Tier |
|---------|-----------|
| Lambda | 1M requests, 400,000 GB-seconds |
| API Gateway | 1M HTTP API calls |
| DynamoDB | 25 GB storage, 25 WCU, 25 RCU |
| Cognito | 50,000 MAUs |
| CloudWatch Logs | 5 GB ingestion, 5 GB storage |
| S3 | 5 GB storage, 20,000 GET, 2,000 PUT |

### Estimated Costs (Beyond Free Tier)

| Service | Price |
|---------|-------|
| Lambda | $0.20 per 1M requests + $0.0000133 per GB-second |
| API Gateway | $1.00 per 1M HTTP API calls |
| DynamoDB | $0.25 per WCU, $0.05 per RCU (on-demand) |
| Cognito | $0.0055 per MAU after 50,000 |

**Note:** For typical dev/test usage, costs will likely remain within free tier.

---

## 🗑️ Clean Up

To remove all resources:

```bash
npm run remove
```

⚠️ **Warning:** This will permanently delete:
- All Lambda functions
- The DynamoDB table (and all data)
- The Cognito User Pool (and all users)
- The API Gateway
- All CloudWatch log groups

**Before removing:**
1. Export any data from DynamoDB if needed
2. Export Cognito user list if needed
3. Ensure no other services depend on these resources

---

## 🔧 Troubleshooting

### View Lambda Logs
```bash
npm run logs -- <functionName> --tail
```

### Check Function Status
```bash
aws lambda get-function --function-name kidbookbuilder-api-dev-createSignup --region us-east-1
```

### Debug API Gateway
```bash
aws apigatewayv2 get-api --api-id hu6lfscn2f --region us-east-1
```

### Common Issues

1. **CORS errors**: Check that the frontend origin is in the CORS allowed origins
2. **401 Unauthorized**: Ensure JWT token is valid and not expired
3. **403 Forbidden**: Check IAM permissions for Lambda execution role
4. **500 Internal Server Error**: Check CloudWatch logs for the specific function
