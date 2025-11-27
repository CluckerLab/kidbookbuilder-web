# Migrating from AWS Amplify to Serverless Framework

This guide helps you migrate your existing AWS Amplify project to Serverless Framework.

## Why Migrate?

### Amplify Pros
- Quick setup with CLI
- Integrated services
- Good for simple apps

### Serverless Framework Pros
- More control over infrastructure
- Better CI/CD integration
- Easier to customize
- Industry standard
- Better for complex applications
- Lower costs (more control over resources)

---

## Pre-Migration Checklist

### 1. Inventory Your Amplify Resources

Run these commands in your Amplify project:

```bash
# Check current Amplify configuration
amplify status

# Export your Amplify configuration
amplify env export --env <your-env-name>
```

Document what you have:
- [ ] Auth (Cognito)
- [ ] API (AppSync GraphQL or REST)
- [ ] Storage (S3)
- [ ] Functions (Lambda)
- [ ] Hosting
- [ ] Database (DynamoDB)

### 2. Export Existing Data

```bash
# Export DynamoDB data if you have tables
aws dynamodb scan --table-name <your-table> --output json > data-backup.json

# Export S3 files if you have storage
aws s3 sync s3://your-bucket ./s3-backup/

# Export Cognito users (requires admin permissions)
aws cognito-idp list-users --user-pool-id <your-pool-id> > users-backup.json
```

### 3. Document Frontend Dependencies

Check your frontend for Amplify-specific code:
```bash
# Find Amplify imports
grep -r "from 'aws-amplify'" src/
grep -r "from '@aws-amplify" src/
```

Common Amplify dependencies to replace:
- `aws-amplify` → Custom API client or `react-oidc-context`
- `@aws-amplify/ui-react` → Custom components or `react-oidc-context`
- `aws-amplify/auth` → `react-oidc-context` + Cognito Hosted UI
- `aws-amplify/api` → Custom fetch-based API client

---

## Migration Steps

### Step 1: Set Up New Serverless Project

```bash
# Create new directory (don't delete Amplify project yet!)
mkdir my-project-serverless
cd my-project-serverless

# Copy the serverless template
cp -r /path/to/template/backend/* ./

# Install dependencies
npm init -y
npm install serverless aws-sdk
```

### Step 2: Convert Backend Resources

#### A. API Endpoints

**Amplify (AppSync GraphQL):**
```javascript
// amplify/backend/api/myapi/schema.graphql
type Coffee @model @auth(rules: [{allow: owner}]) {
  id: ID!
  name: String!
  price: Float!
}
```

**Serverless (REST API):**
```yaml
# serverless.yml
functions:
  getCoffee:
    handler: src/functions/get.handler
    events:
      - httpApi:
          path: /coffee
          method: GET
          authorizer:
            name: cognitoAuthorizer
```

#### B. Lambda Functions

**Copy your Amplify functions:**
```bash
# Your Amplify functions are in
amplify/backend/function/*/src/

# Copy to Serverless structure
cp -r amplify/backend/function/myFunction/src/ serverless/src/functions/myFunction/
```

**Update imports** - Remove Amplify SDK dependencies:

**Before (Amplify):**
```javascript
const AWS = require('aws-sdk');
// Amplify sets up credentials automatically
const dynamoDB = new AWS.DynamoDB.DocumentClient();
```

**After (Serverless):**
```javascript
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);
```

#### C. DynamoDB Tables

**Amplify:**
```javascript
// Created automatically by @model directive
```

**Serverless (serverless.yml):**
```yaml
resources:
  Resources:
    CoffeeTable:
      Type: AWS::DynamoDB::Table
      Properties:
        TableName: ${self:service}-${self:provider.stage}-coffee
        BillingMode: PAY_PER_REQUEST
        AttributeDefinitions:
          - AttributeName: id
            AttributeType: S
        KeySchema:
          - AttributeName: id
            KeyType: HASH
```

#### D. Cognito Authentication

**Keep your existing Cognito User Pool** (don't recreate):

```yaml
# serverless.yml
provider:
  httpApi:
    authorizers:
      cognitoAuthorizer:
        type: jwt
        identitySource: $request.header.Authorization
        issuerUrl: https://cognito-idp.us-east-1.amazonaws.com/<YOUR_EXISTING_POOL_ID>
        audience:
          - <YOUR_EXISTING_CLIENT_ID>
```

Or **create new Cognito resources** (recommended for clean start):
```yaml
resources:
  Resources:
    CognitoUserPool:
      Type: AWS::Cognito::UserPool
      Properties:
        # ... (see template/backend/auth/cognito.yml)
```

### Step 3: Update Frontend Code

#### A. Remove Amplify Dependencies

```bash
npm uninstall aws-amplify @aws-amplify/ui-react
npm install react-oidc-context
```

#### B. Replace Amplify Auth

**Before (Amplify):**
```javascript
import { Amplify } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import awsExports from './aws-exports';

Amplify.configure(awsExports);

function App() {
  return <div>My App</div>;
}

export default withAuthenticator(App);
```

**After (Serverless + OIDC):**
```javascript
import { AuthProvider } from "react-oidc-context";

const cognitoAuthConfig = {
  authority: process.env.REACT_APP_COGNITO_AUTHORITY,
  client_id: process.env.REACT_APP_COGNITO_CLIENT_ID,
  redirect_uri: window.location.origin,
  response_type: "code",
  scope: "phone openid email profile",
};

function App() {
  return (
    <AuthProvider {...cognitoAuthConfig}>
      <YourApp />
    </AuthProvider>
  );
}
```

#### C. Replace API Calls

**Before (Amplify):**
```javascript
import { API } from 'aws-amplify';

// GraphQL query
const coffees = await API.graphql({
  query: listCoffees
});

// REST API
const coffee = await API.get('myapi', '/coffee/123');
```

**After (Serverless):**
```javascript
// Create API client (see template/frontend/api-client/)
const getAccessToken = () => {
  const sessionStorageKeys = Object.keys(sessionStorage);
  const oidcKey = sessionStorageKeys.find(key =>
    key.startsWith("oidc.user:")
  );
  const oidcContext = JSON.parse(sessionStorage.getItem(oidcKey) || "{}");
  return oidcContext?.access_token;
};

export const fetchCoffees = async () => {
  const response = await fetch(`${API_BASE_URL}/coffee`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });
  return response.json();
};
```

### Step 4: Environment Configuration

**Create `.env` files:**

**Frontend (.env):**
```env
VITE_API_URL=https://your-api.execute-api.us-east-1.amazonaws.com
VITE_COGNITO_USER_POOL_ID=us-east-1_xxxxx
VITE_COGNITO_CLIENT_ID=xxxxxxxxxxxxx
VITE_COGNITO_REGION=us-east-1
VITE_COGNITO_AUTHORITY=https://cognito-idp.us-east-1.amazonaws.com/us-east-1_xxxxx
VITE_COGNITO_DOMAIN=https://your-domain.auth.us-east-1.amazoncognito.com
```

**Backend (serverless.yml):**
```yaml
provider:
  environment:
    TABLE_NAME: !Ref CoffeeTable
    STAGE: ${self:provider.stage}
```

### Step 5: Deploy

```bash
# Deploy backend
npx serverless deploy --stage dev

# Get outputs
npx serverless info --stage dev

# Update frontend .env with new API URL

# Test frontend locally
cd frontend
npm run dev

# Deploy frontend to S3 + CloudFront (see hosting guide)
```

---

## Migration Checklist

- [ ] **Backup all data** from Amplify resources
- [ ] **Set up new Serverless project** structure
- [ ] **Migrate Lambda functions** (update imports)
- [ ] **Configure DynamoDB tables** in serverless.yml
- [ ] **Set up Cognito** (reuse or create new)
- [ ] **Update frontend authentication** (remove Amplify, add OIDC)
- [ ] **Replace API calls** (remove Amplify API, use fetch)
- [ ] **Test locally** (backend + frontend)
- [ ] **Deploy to new environment** (dev/staging first)
- [ ] **Migrate data** to new tables (if created new resources)
- [ ] **Test production deployment**
- [ ] **Update DNS** (if needed)
- [ ] **Delete old Amplify resources** (after confirmed working)

---

## Common Issues & Solutions

### Issue 1: CORS Errors
**Solution:** Configure CORS in serverless.yml:
```yaml
provider:
  httpApi:
    cors:
      allowedOrigins:
        - http://localhost:5173
        - https://your-domain.com
      allowedHeaders:
        - Content-Type
        - Authorization
      allowedMethods:
        - GET
        - POST
        - PUT
        - DELETE
```

### Issue 2: Auth Token Not Sent
**Solution:** Check that token is being extracted and sent:
```javascript
// Debug token
console.log('Token:', getAccessToken());

// Ensure Authorization header is set
headers: {
  Authorization: `Bearer ${getAccessToken()}`
}
```

### Issue 3: DynamoDB Access Denied
**Solution:** Add IAM permissions in serverless.yml:
```yaml
provider:
  iam:
    role:
      statements:
        - Effect: Allow
          Action:
            - dynamodb:Scan
            - dynamodb:GetItem
            - dynamodb:PutItem
            - dynamodb:UpdateItem
            - dynamodb:DeleteItem
          Resource: !GetAtt YourTable.Arn
```

---

## Data Migration Script

Use this script to migrate DynamoDB data:

```javascript
// migrate-data.js
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, PutCommand } = require("@aws-sdk/lib-dynamodb");
const fs = require('fs');

const client = new DynamoDBClient({ region: 'us-east-1' });
const docClient = DynamoDBDocumentClient.from(client);

const data = JSON.parse(fs.readFileSync('./data-backup.json', 'utf8'));

async function migrateData() {
  for (const item of data.Items) {
    await docClient.send(new PutCommand({
      TableName: 'new-table-name',
      Item: item
    }));
    console.log('Migrated:', item.id);
  }
}

migrateData().then(() => console.log('Done!'));
```

---

## Rollback Plan

If migration fails:

1. **Keep Amplify project running** during migration
2. **Test Serverless thoroughly** before switching DNS
3. **Keep backups** of all data
4. **Document old configuration** before deleting
5. **Use staging environment** first

---

## Cost Comparison

### Amplify Costs
- Amplify Hosting: ~$0.15 per GB served
- Build minutes: ~$0.01 per minute
- Less control over Lambda/DynamoDB costs

### Serverless Framework Costs
- S3 Hosting: ~$0.023 per GB (with CloudFront)
- Lambda: Pay per invocation (more control)
- DynamoDB: Pay per request (more control)
- **Typically 30-50% cheaper** with better optimization

---

## Next Steps

1. Follow this guide step-by-step
2. Test thoroughly in dev environment
3. Migrate data carefully
4. Monitor costs in AWS Cost Explorer
5. Delete Amplify resources after successful migration

Need help? Check the [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) guide.
