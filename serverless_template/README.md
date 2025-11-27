# Serverless Framework Project Templates

A comprehensive toolkit for creating and migrating serverless applications using AWS Lambda, API Gateway, DynamoDB, and Cognito.

## 🚀 Quick Start

### Option 1: Automated Setup (Recommended)

Run the interactive setup script:

```bash
cd template/scripts
./setup-new-project.sh
```

The script will ask you questions and generate a complete project structure.

### Option 2: Use Custom Slash Command (Claude Code)

If using Claude Code, run:

```bash
/serverless-setup
```

This will interactively guide you through setup with intelligent defaults.

### Option 3: Manual Setup

Follow the [SETUP_GUIDE.md](./SETUP_GUIDE.md) for step-by-step instructions.

---

## 📁 Template Structure

```
template/
├── README.md                    # This file
├── SETUP_GUIDE.md              # Interactive setup guide with questions
│
├── backend/                     # Backend templates
│   ├── serverless-base.yml     # Basic serverless config (no auth)
│   ├── serverless-with-auth.yml # Config with Cognito authentication
│   ├── functions/              # Lambda function templates
│   │   ├── get.mjs            # GET endpoint template
│   │   ├── create.mjs         # POST endpoint template
│   │   ├── update.mjs         # PUT endpoint template
│   │   └── delete.mjs         # DELETE endpoint template
│   └── utils/                  # Shared utilities
│       └── response.mjs       # API response helper
│
├── frontend/                    # Frontend templates
│   ├── react/                  # React components
│   │   ├── App.jsx            # Main app with auth
│   │   ├── Home.jsx           # List view template
│   │   └── ItemDetails.jsx   # Detail view template
│   └── api-client/            # API client utilities
│       └── apis.js            # Fetch-based API client
│
├── scripts/                    # Automation scripts
│   ├── setup-new-project.sh  # Interactive project generator
│   └── migrate-amplify.sh    # Amplify migration script (coming soon)
│
└── docs/                       # Documentation
    ├── MIGRATE_FROM_AMPLIFY.md       # Amplify → Serverless migration
    ├── MIGRATE_FROM_VERCEL_NETLIFY.md # Vercel/Netlify migration
    ├── API_ONLY_SETUP.md             # Backend-only setup
    └── NEW_PROJECT_SETUP.md          # New project from scratch
```

---

## 🎯 Use Cases

### 1. New Serverless Project

**Best for:** Starting fresh with a new serverless application

```bash
cd template/scripts
./setup-new-project.sh
```

Or use the [NEW_PROJECT_SETUP.md](./docs/NEW_PROJECT_SETUP.md) guide.

**What you get:**
- Complete serverless backend with Lambda + API Gateway
- Optional Cognito authentication
- Optional React frontend
- DynamoDB database
- Ready-to-deploy configuration

### 2. Migrate from AWS Amplify

**Best for:** Existing Amplify projects that need more control

See: [MIGRATE_FROM_AMPLIFY.md](./docs/MIGRATE_FROM_AMPLIFY.md)

**Key benefits:**
- More control over infrastructure
- Better CI/CD integration
- Easier customization
- Typically 30-50% cost reduction

### 3. API Only (No Frontend)

**Best for:** Microservices, APIs, or backend-only projects

See: [API_ONLY_SETUP.md](./docs/API_ONLY_SETUP.md)

**What you get:**
- Lightweight Lambda functions
- REST API with API Gateway
- Optional authentication
- Database integration

### 4. Migrate from Vercel/Netlify

**Best for:** Moving serverless functions to AWS

See: [MIGRATE_FROM_VERCEL_NETLIFY.md](./docs/MIGRATE_FROM_VERCEL_NETLIFY.md)

---

## 🛠️ Templates Available

### Backend Templates

#### 1. Basic Serverless Config (`serverless-base.yml`)
- No authentication
- DynamoDB table
- HTTP API Gateway
- Lambda functions
- Basic IAM permissions

**Use when:** Building public APIs or simple services

#### 2. Authenticated Serverless Config (`serverless-with-auth.yml`)
- Cognito User Pool + Client
- JWT authorization
- Hosted UI for login
- OAuth 2.0 support
- DynamoDB table
- Protected API endpoints

**Use when:** Building user-facing applications with authentication

### Function Templates

All function templates include:
- AWS SDK v3 (modern, tree-shakeable)
- Error handling
- Logging
- Response formatting
- TypeScript-ready (JSDoc comments)

**Available functions:**
- `get.mjs` - GET /resource and /resource/{id}
- `create.mjs` - POST /resource
- `update.mjs` - PUT /resource/{id}
- `delete.mjs` - DELETE /resource/{id}

### Frontend Templates

#### React Components
- Authentication wrapper (react-oidc-context)
- List view with CRUD operations
- Detail/edit view
- API client with bearer token auth

**Features:**
- OAuth 2.0 integration with Cognito
- Token management
- Protected routes
- Error handling

---

## 📋 Prerequisites

### Required
- Node.js 18+ and npm
- AWS CLI configured (`aws configure`)
- AWS account with appropriate permissions

### Optional (for frontend)
- Node.js 20+ for Vite projects

### AWS Permissions Needed
- Lambda
- API Gateway
- DynamoDB
- Cognito
- CloudFormation
- IAM
- CloudWatch Logs

---

## 🔧 Configuration

### Environment Variables

#### Backend
Configure in `serverless.yml`:
```yaml
provider:
  environment:
    TABLE_NAME: !Ref YourTable
    STAGE: ${self:provider.stage}
```

#### Frontend
Create `.env` file:
```env
VITE_API_URL=https://your-api.execute-api.us-east-1.amazonaws.com
VITE_COGNITO_USER_POOL_ID=us-east-1_xxxxx
VITE_COGNITO_CLIENT_ID=xxxxxxxxxxxxx
VITE_COGNITO_REGION=us-east-1
VITE_COGNITO_AUTHORITY=https://cognito-idp.us-east-1.amazonaws.com/us-east-1_xxxxx
VITE_COGNITO_DOMAIN=https://your-domain.auth.us-east-1.amazoncognito.com
```

---

## 🚀 Deployment

### Backend

```bash
# Development
npm run deploy:dev

# Production
npm run deploy:prod

# Get info
npm run info

# View logs
npm run logs
```

### Frontend

```bash
cd frontend

# Development
npm run dev

# Production build
npm run build

# Deploy to S3 (if using S3 hosting)
aws s3 sync dist/ s3://your-bucket --delete
```

---

## 🧪 Testing

### Backend API Testing

The template includes test scripts:

```bash
# Test CRUD operations
./test-api.sh

# Test authentication
./test-auth.sh
```

### Frontend Testing

```bash
cd frontend
npm test
```

---

## 📚 Documentation

### Migration Guides
- [Migrate from AWS Amplify](./docs/MIGRATE_FROM_AMPLIFY.md)
- [Migrate from Vercel/Netlify](./docs/MIGRATE_FROM_VERCEL_NETLIFY.md)

### Setup Guides
- [New Project Setup](./docs/NEW_PROJECT_SETUP.md)
- [API Only Setup](./docs/API_ONLY_SETUP.md)

### Reference
- [Serverless Framework Docs](https://www.serverless.com/framework/docs/)
- [AWS Lambda Docs](https://docs.aws.amazon.com/lambda/)
- [AWS Cognito Docs](https://docs.aws.amazon.com/cognito/)

---

## 🎨 Customization

### Adding New Endpoints

1. Create function in `src/functions/yourfunction.mjs`
2. Add to `serverless.yml`:
   ```yaml
   functions:
     yourFunction:
       handler: src/functions/yourfunction.handler
       events:
         - httpApi:
             path: /your-path
             method: GET
   ```

### Adding Authentication to Existing Endpoint

```yaml
functions:
  yourFunction:
    events:
      - httpApi:
          path: /your-path
          method: GET
          authorizer:
            name: cognitoAuthorizer  # Add this
```

### Changing Database

Replace DynamoDB sections in `serverless.yml` with your database choice (Aurora, RDS, etc.)

---

## 💡 Best Practices

### Backend
1. **Use environment variables** for configuration
2. **Enable CloudWatch Logs** for debugging
3. **Set appropriate memory/timeout** for Lambda functions
4. **Use IAM least privilege** principle
5. **Tag resources** for cost tracking

### Frontend
1. **Store tokens securely** (sessionStorage, not localStorage)
2. **Validate tokens** before API calls
3. **Handle token expiration** gracefully
4. **Use environment variables** for configuration
5. **Implement error boundaries**

### Security
1. **Enable CORS** only for known domains
2. **Use HTTPS** everywhere
3. **Validate input** in Lambda functions
4. **Rotate credentials** regularly
5. **Enable AWS WAF** for production

### Cost Optimization
1. **Use provisioned concurrency** sparingly
2. **Set appropriate Lambda memory**
3. **Use DynamoDB on-demand** for variable workloads
4. **Enable CloudWatch Log expiration**
5. **Monitor costs** in AWS Cost Explorer

---

## 🐛 Troubleshooting

### Common Issues

#### "Access Denied" errors
- Check IAM permissions in `serverless.yml`
- Verify AWS credentials are configured

#### CORS errors
- Add your domain to `cors` config in `serverless.yml`
- Check browser console for specific error

#### Authentication fails
- Verify Cognito configuration
- Check token is being sent in Authorization header
- Validate issuerUrl matches your User Pool

#### DynamoDB not found
- Ensure table is created (check CloudFormation)
- Verify TABLE_NAME environment variable

### Getting Help

1. Check [Serverless Framework Docs](https://www.serverless.com/framework/docs/)
2. Review [AWS Documentation](https://docs.aws.amazon.com/)
3. Check CloudWatch Logs for errors
4. Review CloudFormation stack events

---

## 📦 What's Included

### ✅ Working Features
- Complete CRUD API
- Cognito authentication with OAuth 2.0
- JWT authorization
- DynamoDB integration
- React frontend with auth
- Automated deployment
- Test scripts
- Migration guides

### 🔜 Coming Soon
- TypeScript templates
- GraphQL API option
- WebSocket support
- File upload/download
- Automated testing framework
- CI/CD pipeline templates

---

## 🤝 Contributing

To improve these templates:

1. Test the templates thoroughly
2. Document any changes
3. Update relevant guides
4. Add examples if needed

---

## 📄 License

MIT

---

## 🎉 Credits

Built from the [Coffee Shop API tutorial](../README.md) - a complete serverless application with authentication, CRUD operations, and frontend integration.

**Tech Stack:**
- Serverless Framework
- AWS Lambda (Node.js 20)
- API Gateway (HTTP API)
- DynamoDB
- Cognito
- React + Vite
- react-oidc-context

---

## 📞 Support

For issues or questions:
- Review the documentation in `docs/`
- Check AWS CloudWatch Logs
- Review Serverless Framework docs
- Check CloudFormation stack events

Happy building! 🚀
