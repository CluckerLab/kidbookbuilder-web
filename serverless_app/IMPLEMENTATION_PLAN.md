# Serverless App - Full Stack Implementation Plan

## Overview

Create a completely standalone full-stack application in this `serverless_app` folder. This includes both a Serverless Framework backend (Lambda, DynamoDB, Cognito) and a new Next.js frontend.

**Note**: This is a self-contained application. The existing `bolt_lemonade` implementation is used only as a reference for design patterns and data models.

## Architecture

```
serverless_app/
├── IMPLEMENTATION_PLAN.md       # This file
│
├── backend/                     # Serverless Framework backend
│   ├── serverless.yml           # Main configuration
│   ├── package.json             # Backend dependencies
│   ├── functions/
│   │   ├── createSignup.mjs     # POST /signups (public)
│   │   ├── getSignups.mjs       # GET /signups (auth required)
│   │   ├── getSignup.mjs        # GET /signups/{id} (auth required)
│   │   ├── updateSignup.mjs     # PUT /signups/{id} (auth required)
│   │   └── deleteSignup.mjs     # DELETE /signups/{id} (auth required)
│   └── utils/
│       └── response.mjs         # Response formatting utility
│
└── frontend/                    # Next.js frontend (deployed to S3 + CloudFront)
    ├── serverless.yml           # Frontend deployment config (S3 + CloudFront)
    ├── package.json             # Frontend dependencies
    ├── next.config.js           # Next.js configuration (static export)
    ├── tailwind.config.ts       # Tailwind CSS configuration
    ├── tsconfig.json            # TypeScript configuration
    ├── app/
    │   ├── layout.tsx           # Root layout
    │   ├── page.tsx             # Home page (landing)
    │   └── globals.css          # Global styles
    ├── components/
    │   ├── sections/            # Page sections
    │   │   ├── Hero.tsx
    │   │   ├── Features.tsx
    │   │   ├── HowItWorks.tsx
    │   │   └── CTA.tsx          # Signup form
    │   └── ui/                  # Reusable UI components
    │       ├── Button.tsx
    │       ├── Input.tsx
    │       └── Card.tsx
    └── lib/
        └── utils.ts             # Utility functions
```

## Data Model

**Signup Table (DynamoDB)**

| Field | Type | Required |
|-------|------|----------|
| id | String (UUID) | Yes (auto-generated) |
| parentName | String | Yes |
| parentEmail | String | Yes |
| childName | String | Yes |
| childAge | Number | Yes |
| createdAt | String (ISO) | Yes (auto-generated) |
| updatedAt | String (ISO) | Yes (auto-generated) |

## API Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | /signups | Public | Create new signup (form submission) |
| GET | /signups | Cognito JWT | List all signups (admin) |
| GET | /signups/{id} | Cognito JWT | Get specific signup |
| PUT | /signups/{id} | Cognito JWT | Update signup |
| DELETE | /signups/{id} | Cognito JWT | Delete signup |

---

## Backend Implementation

### Step 1: Create backend folder structure

```
serverless_app/backend/
├── serverless.yml
├── package.json
├── functions/
│   ├── createSignup.mjs
│   ├── getSignups.mjs
│   ├── getSignup.mjs
│   ├── updateSignup.mjs
│   └── deleteSignup.mjs
└── utils/
    └── response.mjs
```

### Step 2: Create serverless.yml configuration

Based on `serverless_template/backend/serverless-with-auth.yml`:
- Service name: `kidbookbuilder-api`
- Runtime: Node.js 20.x (arm64)
- Region: us-east-1
- DynamoDB table: Signups
- Cognito User Pool with email login
- HTTP API with JWT authorizer for protected routes
- CORS enabled for frontend origin

### Step 3: Create Lambda functions

**createSignup.mjs (Public)**
- Validate required fields (parentName, parentEmail, childName, childAge)
- Validate email format
- Validate childAge is 0-18
- Generate UUID for id
- Add createdAt/updatedAt timestamps
- Store in DynamoDB
- Return 201 with created signup

**getSignups.mjs (Protected)**
- Scan DynamoDB table
- Return all signups sorted by createdAt

**getSignup.mjs (Protected)**
- Get single item by id from path parameter
- Return 404 if not found

**updateSignup.mjs (Protected)**
- Validate item exists
- Update only provided fields
- Update updatedAt timestamp
- Return updated item

**deleteSignup.mjs (Protected)**
- Delete item by id
- Return 404 if not found
- Return deleted item for confirmation

### Step 4: Create backend package.json

Dependencies:
- `@aws-sdk/client-dynamodb`
- `@aws-sdk/lib-dynamodb`
- `uuid`

Dev dependencies:
- `serverless`

---

## Frontend Implementation

### Step 5: Initialize Next.js project

Create new Next.js 14 project with:
- TypeScript
- Tailwind CSS
- App Router
- ESLint

### Step 6: Create frontend folder structure

```
serverless_app/frontend/
├── package.json
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── postcss.config.js
├── .env.local.example
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── Features.tsx
│   │   ├── HowItWorks.tsx
│   │   └── CTA.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── Input.tsx
│       └── Card.tsx
└── lib/
    └── utils.ts
```

### Step 7: Create UI components

Based on patterns from `bolt_lemonade/bolt/components/ui/`:
- Button component with variants (primary, secondary, outline)
- Input component with label and error states
- Card component for content sections

### Step 8: Create page sections

Based on design from `bolt_lemonade/bolt/components/sections/`:

**Hero.tsx**
- Main headline and subheadline
- Call-to-action button
- Responsive layout

**Features.tsx**
- Feature cards grid
- Icons and descriptions

**HowItWorks.tsx**
- Step-by-step process
- Numbered sections

**CTA.tsx (Signup Form)**
- Form fields: parentName, parentEmail, childName, childAge
- Client-side validation
- API call to POST /signups
- Success/error state handling
- Loading state during submission

### Step 9: Create main page layout

**app/layout.tsx**
- HTML structure
- Font loading (Montserrat or similar)
- Metadata configuration

**app/page.tsx**
- Compose all sections
- Hero → Features → HowItWorks → CTA

### Step 10: Configure environment variables

Create `.env.local.example`:
```
NEXT_PUBLIC_API_URL=https://your-api-gateway-url.amazonaws.com
```

---

## Files to Create

### Backend (8 files)
1. `backend/serverless.yml`
2. `backend/package.json`
3. `backend/functions/createSignup.mjs`
4. `backend/functions/getSignups.mjs`
5. `backend/functions/getSignup.mjs`
6. `backend/functions/updateSignup.mjs`
7. `backend/functions/deleteSignup.mjs`
8. `backend/utils/response.mjs`

### Frontend (18 files)
1. `frontend/serverless.yml` - S3 + CloudFront deployment
2. `frontend/package.json`
3. `frontend/next.config.js` - Static export config
4. `frontend/tailwind.config.ts`
5. `frontend/tsconfig.json`
6. `frontend/postcss.config.js`
7. `frontend/.env.local.example`
8. `frontend/app/layout.tsx`
9. `frontend/app/page.tsx`
10. `frontend/app/globals.css`
11. `frontend/components/sections/Hero.tsx`
12. `frontend/components/sections/Features.tsx`
13. `frontend/components/sections/HowItWorks.tsx`
14. `frontend/components/sections/CTA.tsx`
15. `frontend/components/ui/Button.tsx`
16. `frontend/components/ui/Input.tsx`
17. `frontend/components/ui/Card.tsx`
18. `frontend/lib/utils.ts`

---

## Deployment Commands

### 1. Deploy Backend First
```bash
cd serverless_app/backend
npm install
npx serverless deploy --stage dev
```

Note the API Gateway URL from the output (e.g., `https://xxx.execute-api.us-east-1.amazonaws.com`)

### 2. Configure Frontend Environment
```bash
cd serverless_app/frontend
cp .env.local.example .env.local
# Edit .env.local and set NEXT_PUBLIC_API_URL to the API Gateway URL from step 1
```

### 3. Deploy Frontend (to S3 + CloudFront)
```bash
cd serverless_app/frontend
npm install
npm run deploy        # Builds and deploys to dev stage
# Or for production:
npm run deploy:prod   # Builds and deploys to prod stage
```

### Local Development
```bash
cd serverless_app/frontend
npm install
npm run dev           # Runs on http://localhost:3000
```

---

## Post-Deployment Outputs

**Backend outputs:**
- API Gateway endpoint URL
- Cognito User Pool ID
- Cognito User Pool Client ID
- Cognito Domain URL
- DynamoDB Table Name

**Frontend outputs:**
- S3 Bucket Name
- CloudFront Distribution ID
- CloudFront Domain Name (website URL)

---

## Post-Deployment Steps

1. Create admin user in AWS Cognito console for protected endpoints
2. Update backend serverless.yml CORS origins with CloudFront domain if needed
3. Optionally configure custom domain for CloudFront distribution

---

## Reference Files (Read-Only)

Backend templates:
- `serverless_template/backend/serverless-with-auth.yml`
- `serverless_template/backend/functions/*.mjs`
- `serverless_template/backend/utils/response.mjs`

Frontend reference:
- `bolt_lemonade/bolt/components/sections/*.tsx` (design patterns)
- `bolt_lemonade/bolt/components/ui/*.tsx` (component patterns)
- `bolt_lemonade/bolt/app/layout.tsx` (layout structure)
- `bolt_lemonade/bolt/tailwind.config.ts` (styling configuration)
