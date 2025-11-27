# Upgrade 1: Email Notifications on CTA Signup

## Overview
Send an email notification to `travis@russigroup.com` when a visitor submits the CTA signup form.

## Prerequisites

### Verify Email in AWS SES (One-time Setup)
Since SES is in sandbox mode, verify the email address:
```bash
aws ses verify-email-identity --email-address travis@russigroup.com --region us-east-1
```
Then click the verification link sent to that email.

## Implementation Steps

### Step 1: Update `serverless.yml` - Add SES Permissions

**File:** `backend/serverless.yml`

Add SES permission to the existing IAM role statements:
```yaml
- Effect: Allow
  Action:
    - ses:SendEmail
  Resource: "*"
```

Add environment variable for the notification email:
```yaml
environment:
  NOTIFICATION_EMAIL: travis@russigroup.com
```

### Step 2: Update `createSignup.mjs` - Send Email After Saving

**File:** `backend/functions/createSignup.mjs`

Changes:
1. Import `SESClient` and `SendEmailCommand` from `@aws-sdk/client-ses`
2. After the DynamoDB put succeeds, send a plain text email with:
   - **To:** `travis@russigroup.com` (from env var)
   - **From:** `travis@russigroup.com` (from env var)
   - **Subject:** "New KidBookBuilder Signup: {parentName}"
   - **Body:** All form fields:
     - Parent Name
     - Parent Email
     - Child Name
     - Child Age
     - Signup ID
     - Timestamp

### Step 3: Deploy
```bash
cd serverless_app/backend
npx serverless deploy
```

## Files to Modify
1. `backend/serverless.yml` - IAM permissions + env var
2. `backend/functions/createSignup.mjs` - SES email logic

## Notes
- AWS SDK v3 is already available in the Lambda Node.js 20.x runtime (no npm install needed)
- Email is sent after DynamoDB save, so signup is preserved even if email fails
- If email fails, we log the error but still return success to the user
