# KidBookBuilder Serverless App

A full-stack serverless application for KidBookBuilder signup form, deployed on AWS.

## Current Status

**Backend:** Deployed to dev ✅
**Frontend:** Deployed to dev ✅
**Production:** Not yet deployed ❌

### Live URLs (Dev)

| Resource | URL |
|----------|-----|
| **Frontend** | https://d1igb37gzeru9j.cloudfront.net |
| **API** | https://hu6lfscn2f.execute-api.us-east-1.amazonaws.com |
| **Cognito Domain** | https://kidbookbuilder-api-dev-1764252546866.auth.us-east-1.amazoncognito.com |

---

## Quick Start

### Prerequisites
- Node.js 18+
- AWS CLI configured with credentials
- Serverless Framework (`npm install -g serverless`)

### Local Development

```bash
# Frontend
cd frontend
npm install
npm run dev    # Runs on http://localhost:3000
```

### Deploy to Dev

```bash
# Backend first
cd backend
npm install
npm run deploy

# Then frontend
cd ../frontend
npm install
npm run deploy
```

### View Stack Info

```bash
cd backend && npm run info
cd frontend && npm run info
```

---

## Remaining Work

### 1. Fix Frontend Images
**Priority:** High
**Status:** Not started

Images are not loading on the frontend. Need to:
- [ ] Add placeholder images or real images to `frontend/public/images/`
- [ ] Or update Hero/Features components to not require images
- [ ] Test image loading on CloudFront

**Files to check:**
- `frontend/components/sections/Hero.tsx`
- `frontend/components/sections/Features.tsx`
- `frontend/public/images/`

---

### 2. Configure Custom Domain
**Priority:** Medium
**Status:** Not started

Point custom domain to CloudFront distribution.

**Steps:**
- [ ] Register/configure domain in Route 53 (or external DNS)
- [ ] Request SSL certificate in AWS Certificate Manager (must be in us-east-1 for CloudFront)
- [ ] Add custom domain to CloudFront distribution in `frontend/serverless.yml`
- [ ] Update backend CORS to include custom domain
- [ ] Update Cognito callback URLs to include custom domain
- [ ] Redeploy both stacks

**Files to modify:**
- `frontend/serverless.yml` - Add `Aliases` and `ViewerCertificate` to CloudFront
- `backend/serverless.yml` - Add domain to CORS `allowedOrigins`
- `backend/serverless.yml` - Add domain to Cognito `CallbackURLs` and `LogoutURLs`

**Example CloudFront config:**
```yaml
CloudFrontDistribution:
  Type: AWS::CloudFront::Distribution
  Properties:
    DistributionConfig:
      Aliases:
        - www.yourdomain.com
      ViewerCertificate:
        AcmCertificateArn: arn:aws:acm:us-east-1:xxx:certificate/xxx
        SslSupportMethod: sni-only
```

---

### 3. Production Deployment
**Priority:** Medium
**Status:** Not started

Set up production environment.

**Steps:**
- [ ] Review and update production-specific settings
- [ ] Deploy backend to prod: `cd backend && npm run deploy:prod`
- [ ] Configure frontend `.env.local` with prod API URL
- [ ] Deploy frontend to prod: `cd frontend && npm run deploy:prod`
- [ ] Update CORS with prod CloudFront domain
- [ ] Redeploy backend: `npm run deploy:prod`
- [ ] Test production deployment
- [ ] Update DNS to point to prod CloudFront (if using custom domain)

**Commands:**
```bash
# Backend
cd backend
npm run deploy:prod
npm run info:prod  # Note the API URL

# Frontend
cd frontend
# Update .env.local with prod API URL
npm run deploy:prod
npm run info:prod  # Note the CloudFront URL

# Update backend CORS with prod CloudFront URL, then:
cd backend
npm run deploy:prod
```

---

### 4. Email Notifications on CTA Submission
**Priority:** Medium
**Status:** Implemented (pending deploy)

Send email notification when someone submits the signup form.

**Implementation:** AWS SES (Option A)
- [x] Add SES permissions to Lambda IAM role
- [x] Update `createSignup` Lambda to send email after DynamoDB write
- [ ] Verify sender email in SES (one-time setup)
- [ ] Deploy backend

**To complete setup:**
1. Verify email in SES:
   ```bash
   aws ses verify-email-identity --email-address travis@russigroup.com --region us-east-1
   ```
2. Click the verification link sent to your email
3. Deploy:
   ```bash
   cd serverless_app/backend
   npx serverless deploy
   ```

**Files modified:**
- `backend/serverless.yml` - Added SES IAM permission + NOTIFICATION_EMAIL env var
- `backend/functions/createSignup.mjs` - Added SES email sending after DynamoDB write

**See also:** `serverless_app/upgrade_1_email_notifications.md` for full implementation details.

---

## Architecture

```
serverless_app/
├── README.md                      # This file
├── IMPLEMENTATION_PLAN.md         # Full implementation details
├── BACKEND_AWS_RESOURCES.md       # Backend resource documentation
├── FRONTEND_AWS_RESOURCES.md      # Frontend resource documentation
│
├── backend/
│   ├── serverless.yml             # Lambda, DynamoDB, Cognito, API Gateway
│   ├── package.json
│   ├── functions/
│   │   ├── createSignup.mjs       # POST /signups (public)
│   │   ├── getSignups.mjs         # GET /signups (protected)
│   │   ├── getSignup.mjs          # GET /signups/{id} (protected)
│   │   ├── updateSignup.mjs       # PUT /signups/{id} (protected)
│   │   └── deleteSignup.mjs       # DELETE /signups/{id} (protected)
│   └── utils/
│       └── response.mjs
│
└── frontend/
    ├── serverless.yml             # S3, CloudFront
    ├── package.json
    ├── next.config.js
    ├── app/
    │   ├── layout.tsx
    │   └── page.tsx
    └── components/
        ├── sections/              # Hero, Features, HowItWorks, CTA
        └── ui/                    # Button, Input, Card
```

---

## Useful Commands

```bash
# View logs
cd backend && npm run logs -- createSignup

# Scan DynamoDB table
aws dynamodb scan --table-name kidbookbuilder-api-dev-signups --region us-east-1

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id E2OPF8FM4PL3YX --paths "/*"

# List Cognito users
aws cognito-idp list-users --user-pool-id us-east-1_q5KFH1XBI --region us-east-1

# Test API
curl -X POST https://hu6lfscn2f.execute-api.us-east-1.amazonaws.com/signups \
  -H "Content-Type: application/json" \
  -d '{"parentName":"Test","parentEmail":"test@example.com","childName":"Child","childAge":10}'
```

---

## Related Documentation

- [IMPLEMENTATION_PLAN.md](./IMPLEMENTATION_PLAN.md) - Full architecture and implementation details
- [BACKEND_AWS_RESOURCES.md](./BACKEND_AWS_RESOURCES.md) - Backend AWS resource inventory
- [FRONTEND_AWS_RESOURCES.md](./FRONTEND_AWS_RESOURCES.md) - Frontend AWS resource inventory
- [serverless_template/CONVERT_TO_SERVERLESS_PROMPT.md](../serverless_template/CONVERT_TO_SERVERLESS_PROMPT.md) - Template for future conversions

---

## Troubleshooting

See [CONVERT_TO_SERVERLESS_PROMPT.md](../serverless_template/CONVERT_TO_SERVERLESS_PROMPT.md#troubleshooting) for common issues:
- CORS errors
- Cognito domain update failures
- CloudFront caching
- Environment variables

---

**Last Updated:** 2024-11-27
