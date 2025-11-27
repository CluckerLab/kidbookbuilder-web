# Serverless Project Setup Guide

This guide will walk you through setting up a new serverless project or migrating an existing one.

## Quick Start Questions

Answer these questions to determine your setup path:

### 1. Project Type
- [ ] **New Project** - Starting from scratch
- [ ] **Existing Project** - Migrating from another platform

### 2. Frontend Framework
- [ ] React
- [ ] Vue
- [ ] Angular
- [ ] Next.js
- [ ] No frontend (API only)
- [ ] Other: _____________

### 3. Current Hosting (if migrating)
- [ ] AWS Amplify
- [ ] Vercel
- [ ] Netlify
- [ ] Heroku
- [ ] Other: _____________

### 4. Authentication Required?
- [ ] Yes - User authentication needed
- [ ] No - Public API

### 5. Authentication Provider (if yes to #4)
- [ ] AWS Cognito (recommended for AWS)
- [ ] Auth0
- [ ] Firebase Auth
- [ ] Custom JWT
- [ ] None yet

### 6. Database Type
- [ ] DynamoDB (NoSQL)
- [ ] Aurora Serverless (SQL)
- [ ] MongoDB Atlas
- [ ] Existing database
- [ ] No database yet

### 7. API Endpoints Needed
- [ ] CRUD operations (Create, Read, Update, Delete)
- [ ] File uploads/downloads
- [ ] Real-time (WebSocket)
- [ ] Webhooks
- [ ] Other: _____________

### 8. Existing Code?
- [ ] Yes - Have existing backend code
- [ ] Yes - Have existing frontend code
- [ ] No - Starting fresh

---

## Setup Paths

Based on your answers, follow the appropriate path:

### Path A: New Serverless Project (No Existing Code)
→ See: [NEW_PROJECT_SETUP.md](./docs/NEW_PROJECT_SETUP.md)

### Path B: Migrate from AWS Amplify
→ See: [MIGRATE_FROM_AMPLIFY.md](./docs/MIGRATE_FROM_AMPLIFY.md)

### Path C: Migrate from Vercel/Netlify
→ See: [MIGRATE_FROM_VERCEL_NETLIFY.md](./docs/MIGRATE_FROM_VERCEL_NETLIFY.md)

### Path D: API Only (No Frontend)
→ See: [API_ONLY_SETUP.md](./docs/API_ONLY_SETUP.md)

---

## Common Setup Components

All paths will use these reusable components:

### Backend Templates
- **CRUD Lambda Functions** (`template/backend/functions/`)
- **Serverless Config** (`template/backend/serverless-templates/`)
- **Cognito Auth** (`template/backend/auth/`)
- **API Gateway Config** (`template/backend/api/`)

### Frontend Templates
- **React Auth Components** (`template/frontend/react/`)
- **API Client** (`template/frontend/api-client/`)
- **Environment Config** (`template/frontend/env/`)

### Scripts
- **Setup Script** (`template/scripts/setup.sh`)
- **Migration Script** (`template/scripts/migrate.sh`)
- **Deploy Script** (`template/scripts/deploy.sh`)

---

## Next Steps

1. Review your answers above
2. Choose your setup path
3. Follow the detailed guide for your path
4. Use the provided templates and scripts

---

## Need Help?

If you're unsure which path to choose:
- **Have React app on Amplify?** → Path B
- **Starting completely fresh?** → Path A
- **Have existing API code?** → Contact for custom migration guide
