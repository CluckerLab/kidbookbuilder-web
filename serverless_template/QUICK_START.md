# Serverless Template - Quick Start Guide

## 🚀 Three Ways to Get Started

### 1. Automated Script (Fastest)
```bash
cd template/scripts
./setup-new-project.sh
```
Follow the prompts, get a complete project in minutes.

### 2. Claude Code Slash Command
```bash
/serverless-setup
```
Interactive AI-guided setup with intelligent defaults.

### 3. Manual Setup
See [SETUP_GUIDE.md](./SETUP_GUIDE.md) for step-by-step instructions.

---

## 📋 Common Scenarios

### Scenario 1: New API with Authentication
```bash
cd template/scripts
./setup-new-project.sh

# Answer:
# - Project name: my-api
# - Authentication: Yes
# - Frontend: No
# - Database: DynamoDB
```

**Result:** API with Cognito auth + DynamoDB

---

### Scenario 2: Full-Stack App (React + Auth + DB)
```bash
cd template/scripts
./setup-new-project.sh

# Answer:
# - Project name: my-app
# - Authentication: Yes
# - Frontend: React (Vite)
# - Database: DynamoDB
```

**Result:** Complete full-stack app ready to deploy

---

### Scenario 3: Migrate from Amplify

1. **Backup your Amplify data:**
   ```bash
   amplify env export
   aws dynamodb scan --table-name YourTable --output json > backup.json
   ```

2. **Follow migration guide:**
   [MIGRATE_FROM_AMPLIFY.md](./docs/MIGRATE_FROM_AMPLIFY.md)

3. **Key steps:**
   - Set up new serverless project
   - Copy Lambda functions (update imports)
   - Keep existing Cognito (or create new)
   - Update frontend auth (remove Amplify SDK)
   - Test thoroughly before switching

---

### Scenario 4: API Only (No Frontend)

Copy and customize:
```bash
cp template/backend/serverless-base.yml my-api/serverless.yml
cp -r template/backend/functions my-api/src/functions
cp -r template/backend/utils my-api/src/utils
```

---

## 🎯 Key Files

| File | Purpose |
|------|---------|
| `serverless-base.yml` | Basic config (no auth) |
| `serverless-with-auth.yml` | Config with Cognito |
| `functions/*.mjs` | Lambda function templates |
| `utils/response.mjs` | API response helper |

---

## 🔑 After Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure AWS
```bash
aws configure
```

### 3. Deploy Backend
```bash
npm run deploy:dev
```

### 4. Get Deployment Info
```bash
npm run info
```

### 5. Setup Frontend (if applicable)
```bash
cd frontend
npm install

# Copy API endpoint from step 4
# Update .env file with:
# - API_URL
# - Cognito User Pool ID
# - Cognito Client ID
# - Cognito Domain

npm run dev
```

---

## 🔧 Common Customizations

### Add New API Endpoint

1. Create function file: `src/functions/myfunction.mjs`
2. Add to `serverless.yml`:
   ```yaml
   functions:
     myFunction:
       handler: src/functions/myfunction.handler
       events:
         - httpApi:
             path: /my-path
             method: GET
             authorizer:
               name: cognitoAuthorizer  # if auth needed
   ```

### Change AWS Region
Edit `serverless.yml`:
```yaml
provider:
  region: us-west-2  # Change here
```

### Add CORS Domain
Edit `serverless.yml`:
```yaml
provider:
  httpApi:
    cors:
      allowedOrigins:
        - https://myapp.com  # Add your domain
```

---

## 🐛 Troubleshooting Quick Fixes

### "Access Denied"
```yaml
# Add to serverless.yml
provider:
  iam:
    role:
      statements:
        - Effect: Allow
          Action:
            - service:Action
          Resource: arn:aws:service:*
```

### CORS Errors
```yaml
# In serverless.yml
provider:
  httpApi:
    cors: true  # Enable CORS
```

### Authentication Not Working
1. Check Cognito User Pool ID in `.env`
2. Verify token is sent: `Authorization: Bearer ${token}`
3. Check CloudWatch Logs for errors

---

## 📊 Cost Estimates

### Typical Dev Environment
- **Lambda**: $0-5/month (with free tier)
- **API Gateway**: $0-3/month (with free tier)
- **DynamoDB**: $0-2/month (with free tier)
- **Cognito**: Free up to 50,000 MAU

**Total Dev Cost**: ~$0-10/month

### Production (10K requests/day)
- **Lambda**: ~$10/month
- **API Gateway**: ~$15/month
- **DynamoDB**: ~$5/month
- **Cognito**: Free (under 50K MAU)

**Total Production**: ~$30/month

---

## 📚 Next Steps

1. ✅ Generate your project
2. ✅ Deploy to AWS
3. 📖 Read [README.md](./README.md) for full documentation
4. 🔧 Customize for your needs
5. 🚀 Deploy to production

---

## 🆘 Need Help?

| Issue | Guide |
|-------|-------|
| Migrating from Amplify | [MIGRATE_FROM_AMPLIFY.md](./docs/MIGRATE_FROM_AMPLIFY.md) |
| New project setup | [NEW_PROJECT_SETUP.md](./docs/NEW_PROJECT_SETUP.md) |
| API only | [API_ONLY_SETUP.md](./docs/API_ONLY_SETUP.md) |
| Full documentation | [README.md](./README.md) |

---

## ✅ Checklist for First Deployment

- [ ] AWS credentials configured (`aws configure`)
- [ ] Node.js 18+ installed
- [ ] Dependencies installed (`npm install`)
- [ ] Service name updated in `serverless.yml`
- [ ] AWS region set (default: us-east-1)
- [ ] IAM permissions verified
- [ ] Deploy command run (`npm run deploy:dev`)
- [ ] API endpoint received
- [ ] Test endpoint works
- [ ] Frontend `.env` updated (if using frontend)
- [ ] Frontend deployed and tested

---

**Ready to build? Let's go! 🚀**

```bash
cd template/scripts && ./setup-new-project.sh
```
