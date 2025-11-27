# Prompt: Convert Existing Implementation to Serverless Framework

Use this prompt with an AI assistant to convert an existing web application to a full-stack Serverless Framework deployment on AWS.

---

## Prompt Template

```
I want to convert an existing implementation to use AWS Serverless Framework. Please help me create a clean, standalone serverless application.

## Source Implementation
- **Location**: {{SOURCE_FOLDER_PATH}}
- **Description**: {{PROJECT_DESCRIPTION}}
- **Current Backend**: {{CURRENT_BACKEND}} (e.g., AWS Amplify, Firebase, Netlify Forms, REST API, etc.)
- **Frontend Framework**: {{FRONTEND_FRAMEWORK}} (e.g., Next.js, React, Vue, etc.)

## Target Implementation
- **Output Folder**: {{OUTPUT_FOLDER_PATH}}
- **Project Name**: {{PROJECT_NAME}}
- **AWS Region**: {{AWS_REGION}} (default: us-east-1)

## Reference Templates
- **Serverless Template Location**: {{SERVERLESS_TEMPLATE_PATH}}
  - Use `serverless-with-auth.yml` for authenticated endpoints
  - Use `serverless-base.yml` for public-only endpoints
  - Reference Lambda function patterns in `functions/` folder
  - Use response utility from `utils/response.mjs`

## Requirements

### Backend Requirements
1. **Analyze the source implementation** to identify:
   - Data models and schemas
   - API endpoints needed (CRUD operations)
   - Authentication requirements
   - Validation rules

2. **Create backend with**:
   - Serverless Framework v3 configuration
   - Node.js 20.x Lambda functions (ARM64)
   - DynamoDB table(s) for data storage
   - HTTP API Gateway with CORS
   - Cognito User Pool (if authentication needed)
   - JWT authorizer for protected endpoints

3. **Endpoint Authentication**:
   - {{AUTH_REQUIREMENTS}}
   - Example: "POST endpoints public, GET/PUT/DELETE require auth"

### Frontend Requirements
1. **Create a standalone frontend** (do NOT modify source):
   - Use source only as reference for design patterns
   - Next.js 14 with App Router
   - TypeScript
   - Tailwind CSS
   - Static export for S3 deployment

2. **Deploy frontend via Serverless Framework**:
   - S3 bucket for static files
   - CloudFront distribution with HTTPS
   - Origin Access Control for security
   - SPA routing (404 → index.html)

3. **Frontend features to replicate**:
   - {{FRONTEND_FEATURES}}
   - Example: "Landing page with Hero, Features, HowItWorks, and CTA form sections"

### Package Scripts
Include these npm scripts in both backend and frontend:
- `deploy` - Deploy to dev stage
- `deploy:prod` - Deploy to prod stage
- `remove` - Remove stack
- `info` - Show stack info
- `info:prod` - Show prod stack info

### Documentation
After implementation, generate:
1. `IMPLEMENTATION_PLAN.md` - Architecture and deployment instructions
2. `BACKEND_AWS_RESOURCES.md` - Backend resource documentation
3. `FRONTEND_AWS_RESOURCES.md` - Frontend resource documentation

Use the `GENERATE_AWS_RESOURCES_PROMPT.md` template to create resource docs.

## Output Structure

```
{{OUTPUT_FOLDER_PATH}}/
├── IMPLEMENTATION_PLAN.md
├── BACKEND_AWS_RESOURCES.md
├── FRONTEND_AWS_RESOURCES.md
│
├── backend/
│   ├── serverless.yml
│   ├── package.json
│   ├── functions/
│   │   └── [lambda functions].mjs
│   └── utils/
│       └── response.mjs
│
└── frontend/
    ├── serverless.yml
    ├── package.json
    ├── next.config.js
    ├── tailwind.config.ts
    ├── tsconfig.json
    ├── .env.local.example
    ├── app/
    │   ├── layout.tsx
    │   ├── page.tsx
    │   └── globals.css
    ├── components/
    │   ├── sections/
    │   └── ui/
    └── lib/
        └── utils.ts
```

## Questions to Ask Me

Before starting, please ask me about:
1. Should authentication be included? Which endpoints need protection?
2. What data model(s) should the backend support?
3. What frontend sections/features should be included?
4. Any specific design theme or styling requirements?

## Deployment Order

After implementation:
1. Deploy backend: `cd backend && npm install && npm run deploy`
2. Note API Gateway URL from output
3. Configure frontend: `cd frontend && cp .env.local.example .env.local` (add API URL)
4. Deploy frontend: `npm install && npm run deploy`
5. Note CloudFront URL from output
6. **IMPORTANT - Update CORS**: Add CloudFront URL to backend `serverless.yml` CORS config
7. Redeploy backend: `cd backend && npm run deploy`
```

## CORS Configuration (Important!)

After deploying the frontend, you MUST update the backend CORS configuration to include the CloudFront domain, otherwise the frontend will get CORS errors when calling the API.

**In `backend/serverless.yml`, update the `allowedOrigins`:**
```yaml
httpApi:
  cors:
    allowedOrigins:
      - http://localhost:3000
      - http://localhost:5173
      - https://YOUR_CLOUDFRONT_DOMAIN.cloudfront.net  # Add this!
```

Then redeploy the backend: `cd backend && npm run deploy`

---

## How to Use This Template

### Step 1: Fill in the Placeholders

| Placeholder | Description | Example |
|-------------|-------------|---------|
| `{{SOURCE_FOLDER_PATH}}` | Path to existing implementation | `bolt_lemonade/bolt` |
| `{{PROJECT_DESCRIPTION}}` | What the project does | `Landing page with signup form for KidBookBuilder` |
| `{{CURRENT_BACKEND}}` | Current backend technology | `AWS Amplify Gen 2` |
| `{{FRONTEND_FRAMEWORK}}` | Current frontend framework | `Next.js 13` |
| `{{OUTPUT_FOLDER_PATH}}` | Where to create new implementation | `serverless_app` |
| `{{PROJECT_NAME}}` | Name for the new project | `kidbookbuilder` |
| `{{AWS_REGION}}` | AWS region to deploy to | `us-east-1` |
| `{{SERVERLESS_TEMPLATE_PATH}}` | Path to serverless templates | `serverless_template` |
| `{{AUTH_REQUIREMENTS}}` | Which endpoints need auth | `POST public, others protected` |
| `{{FRONTEND_FEATURES}}` | Features to include | `Hero, Features, CTA form` |

### Step 2: Copy and Customize the Prompt

Copy the prompt template above and fill in your specific values.

### Step 3: Run with AI Assistant

Paste into Claude Code or another AI assistant.

### Step 4: Answer Clarifying Questions

The AI will ask questions about:
- Authentication requirements
- Data models
- Frontend features
- Design preferences

### Step 5: Review and Deploy

1. Review the generated implementation plan
2. Deploy backend first
3. Configure and deploy frontend
4. Verify everything works

---

## Example: Filled-In Prompt

```
I want to convert an existing implementation to use AWS Serverless Framework.

## Source Implementation
- **Location**: bolt_ironman/bolt
- **Description**: Iron Man themed landing page with waitlist signup
- **Current Backend**: Netlify Forms
- **Frontend Framework**: Next.js 13 (static export)

## Target Implementation
- **Output Folder**: serverless_ironman
- **Project Name**: ironman-waitlist
- **AWS Region**: us-east-1

## Reference Templates
- **Serverless Template Location**: serverless_template

## Requirements

### Backend Requirements
- Data model: Waitlist signup (name, email, company, role)
- POST /waitlist - Public (form submission)
- GET /waitlist - Protected (admin view)
- DELETE /waitlist/{id} - Protected (admin delete)

### Frontend Requirements
- Hero section with animated background
- Features grid
- CTA form for waitlist signup
- Iron Man color theme (#E3000B red, #FFB300 gold, #121212 dark)

[... rest of prompt ...]
```

---

## Conversion Checklist

### Before Starting
- [ ] Identify source implementation location
- [ ] Document current backend technology
- [ ] List all data models/schemas
- [ ] List all API endpoints needed
- [ ] Identify authentication requirements
- [ ] Note frontend features to replicate

### During Implementation
- [ ] Create implementation plan
- [ ] Set up backend folder structure
- [ ] Create serverless.yml with all resources
- [ ] Implement Lambda functions
- [ ] Set up frontend folder structure
- [ ] Create Next.js pages and components
- [ ] Configure S3 + CloudFront deployment
- [ ] Add all npm scripts

### After Implementation
- [ ] Deploy backend
- [ ] Test API endpoints (via curl or Postman)
- [ ] Configure frontend environment (.env.local with API URL)
- [ ] Deploy frontend
- [ ] Note CloudFront URL from output
- [ ] **Update backend CORS with CloudFront URL**
- [ ] **Redeploy backend**
- [ ] Test full application (frontend → backend)
- [ ] Generate AWS resource documentation

---

## Common Patterns

### Data Models

**User/Signup Pattern:**
```javascript
{
  id: String (UUID),
  name: String,
  email: String,
  createdAt: String (ISO),
  updatedAt: String (ISO)
}
```

**Item/Product Pattern:**
```javascript
{
  id: String (UUID),
  name: String,
  description: String,
  price: Number,
  status: String,
  createdAt: String (ISO),
  updatedAt: String (ISO)
}
```

### Authentication Patterns

**Public Form + Protected Admin:**
- POST /items - Public
- GET /items - Protected (list all)
- GET /items/{id} - Protected
- PUT /items/{id} - Protected
- DELETE /items/{id} - Protected

**All Protected:**
- All endpoints require Cognito JWT

**All Public:**
- No authentication (use serverless-base.yml)

### Frontend Patterns

**Landing Page:**
- Hero section
- Features section
- How It Works section
- CTA/Form section
- Footer

**Dashboard:**
- Navigation
- Data table/list
- Detail views
- Forms for CRUD

---

## Tips for Best Results

1. **Be specific about data models** - Include all fields, types, and validation rules

2. **Clarify auth requirements early** - Decide which endpoints need protection before implementation

3. **Reference existing design** - Point to specific files for design patterns to replicate

4. **Keep it simple** - Start with core features, add complexity later

5. **Test incrementally** - Deploy and test backend before frontend

6. **Document everything** - Generate AWS resource docs after deployment

7. **Don't forget CORS** - Always update backend CORS after frontend deployment

---

## Troubleshooting

### CORS Errors

**Error:**
```
Access to fetch at 'https://xxx.execute-api.us-east-1.amazonaws.com/endpoint' from origin
'https://xxx.cloudfront.net' has been blocked by CORS policy: No 'Access-Control-Allow-Origin'
header is present on the requested resource.
```

**Solution:**
1. Add your CloudFront domain to `backend/serverless.yml`:
   ```yaml
   httpApi:
     cors:
       allowedOrigins:
         - http://localhost:3000
         - https://YOUR_CLOUDFRONT_DOMAIN.cloudfront.net
   ```
2. Redeploy backend: `cd backend && npm run deploy`

### 401 Unauthorized on Protected Endpoints

**Cause:** Missing or invalid JWT token in Authorization header.

**Solution:**
1. Ensure user is authenticated via Cognito
2. Include token in request: `Authorization: Bearer <token>`

### 500 Internal Server Error

**Cause:** Lambda function error.

**Solution:**
1. Check CloudWatch logs: `npm run logs -- <functionName>`
2. Common issues: missing environment variables, DynamoDB permissions

### Frontend Changes Not Appearing

**Cause:** CloudFront caching.

**Solution:**
```bash
aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
```

### Environment Variable Not Found

**Cause:** `.env.local` not configured or not included in build.

**Solution:**
1. Ensure `.env.local` exists with `NEXT_PUBLIC_API_URL`
2. Rebuild and redeploy: `npm run deploy`

### Cognito User Pool Domain Update Failed

**Error:**
```
UPDATE_FAILED: CognitoUserPoolDomain (AWS::Cognito::UserPoolDomain)
Resource handler returned message: "Invalid request provided: AWS::Cognito::UserPoolDomain"
```

**Cause:** Cognito User Pool Domains cannot be updated once created. Using `${sls:instanceId}` in the domain name generates a new ID on each deploy, causing update failures.

**Solution:**
1. Find your existing domain:
   ```bash
   aws cognito-idp describe-user-pool --user-pool-id YOUR_POOL_ID --region us-east-1 --query 'UserPool.Domain'
   ```

2. Hardcode the domain in `serverless.yml`:
   ```yaml
   # BAD - generates new ID each deploy
   CognitoUserPoolDomain:
     Type: AWS::Cognito::UserPoolDomain
     Properties:
       Domain: ${self:service}-${self:provider.stage}-${sls:instanceId}  # Don't use this!

   # GOOD - use fixed domain name
   CognitoUserPoolDomain:
     Type: AWS::Cognito::UserPoolDomain
     Properties:
       Domain: my-app-dev-1234567890  # Hardcode existing domain
   ```

3. Redeploy: `npm run deploy`

**Prevention:** When first deploying, use a fixed domain name pattern instead of `${sls:instanceId}`:
```yaml
Domain: ${self:service}-${self:provider.stage}-auth
```

---

## Related Templates

- `GENERATE_AWS_RESOURCES_PROMPT.md` - Generate AWS resource documentation
- `serverless-base.yml` - Serverless config without authentication
- `serverless-with-auth.yml` - Serverless config with Cognito authentication
- `MIGRATE_FROM_AMPLIFY.md` - Guide for migrating from AWS Amplify

---

**Template Version:** 1.0
**Created:** 2024-11-27
**Purpose:** Convert existing web applications to Serverless Framework deployments
