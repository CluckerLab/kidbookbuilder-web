# Upgrade 2: Custom Domain Setup

## Overview
Configure custom domains for the KidBookBuilder application using Route 53 and ACM.

| Environment | Frontend | API |
|-------------|----------|-----|
| **Dev** | https://dev.kidbookbuilder.com | https://api-dev.kidbookbuilder.com |
| **Prod** | https://www.kidbookbuilder.com | https://api.kidbookbuilder.com |
| **Apex** | https://kidbookbuilder.com (same as www) | — |

## Status: ✅ COMPLETED

- [x] SSL Certificate issued
- [x] Dev environment deployed
- [x] Prod environment deployed
- [x] Apex domain configured

---

## AWS Resources

| Resource | Value |
|----------|-------|
| **Certificate ARN** | `arn:aws:acm:us-east-1:084375555044:certificate/137f6ca4-1ce2-4260-a581-f5be789705dc` |
| **Route 53 Hosted Zone ID** | `Z016948933M52QCUFNOMW` |
| **CloudFront Hosted Zone ID** | `Z2FDTNDATAQYW2` (constant for all CloudFront) |

### Dev Resources

| Resource | ID/Domain |
|----------|-----------|
| CloudFront Distribution | `E2OPF8FM4PL3YX` / `d1igb37gzeru9j.cloudfront.net` |
| API Gateway | `https://hu6lfscn2f.execute-api.us-east-1.amazonaws.com` |
| Custom Frontend | https://dev.kidbookbuilder.com |
| Custom API | https://api-dev.kidbookbuilder.com |

### Prod Resources

| Resource | ID/Domain |
|----------|-----------|
| CloudFront Distribution | `E3PP1E6CZA5R0R` / `d19s6agibswsg6.cloudfront.net` |
| Custom Frontend | https://www.kidbookbuilder.com |
| Custom Frontend (Apex) | https://kidbookbuilder.com |
| Custom API | https://api.kidbookbuilder.com |

---

## Implementation Summary

### Step 1: SSL Certificate ✅ COMPLETED

Wildcard certificate issued covering `kidbookbuilder.com` and `*.kidbookbuilder.com`.

```
Certificate ARN: arn:aws:acm:us-east-1:084375555044:certificate/137f6ca4-1ce2-4260-a581-f5be789705dc
Status: ISSUED
Domains: kidbookbuilder.com, *.kidbookbuilder.com
```

Previous Amplify domain association was removed and old DNS records cleaned up.

---

### Step 2: Backend Configuration ✅ COMPLETED

**File:** `backend/serverless.yml`

Added:
- `custom` section with stage-specific API domain names
- API Gateway custom domain resource (`ApiDomainName`)
- API mapping resource (`ApiMapping`)
- Route 53 DNS record resource (`ApiDNSRecord`)
- CORS origins for all custom domains
- Cognito callback/logout URLs for all custom domains
- Stage-specific Cognito User Pool domain

Key configuration:
```yaml
custom:
  stage: ${self:provider.stage}
  certificateArn: arn:aws:acm:us-east-1:084375555044:certificate/137f6ca4-1ce2-4260-a581-f5be789705dc
  hostedZoneId: Z016948933M52QCUFNOMW
  apiDomainName:
    dev: api-dev.kidbookbuilder.com
    prod: api.kidbookbuilder.com
  frontendDomain:
    dev: dev.kidbookbuilder.com
    prod: www.kidbookbuilder.com
```

---

### Step 3: Frontend Configuration ✅ COMPLETED

**File:** `frontend/serverless.yml`

Added:
- `custom` section with stage-specific domain names
- Stage-specific aliases (prod includes apex domain)
- CloudFront custom domain with SSL certificate
- Route 53 DNS record for primary domain
- Conditional Route 53 DNS record for apex domain (prod only)

Key configuration:
```yaml
custom:
  stage: ${self:provider.stage}
  certificateArn: arn:aws:acm:us-east-1:084375555044:certificate/137f6ca4-1ce2-4260-a581-f5be789705dc
  hostedZoneId: Z016948933M52QCUFNOMW
  domainName:
    dev: dev.kidbookbuilder.com
    prod: www.kidbookbuilder.com
  aliases:
    dev:
      - dev.kidbookbuilder.com
    prod:
      - www.kidbookbuilder.com
      - kidbookbuilder.com
```

Apex domain handled via CloudFormation condition:
```yaml
Conditions:
  IsProd: !Equals ['${self:provider.stage}', 'prod']

Resources:
  ApexDNSRecord:
    Type: AWS::Route53::RecordSet
    Condition: IsProd
    Properties:
      HostedZoneId: ${self:custom.hostedZoneId}
      Name: kidbookbuilder.com
      Type: A
      AliasTarget:
        HostedZoneId: Z2FDTNDATAQYW2
        DNSName: !GetAtt CloudFrontDistribution.DomainName
```

---

### Step 4: Environment Files ✅ COMPLETED

**Dev:** `frontend/.env.local`
```
NEXT_PUBLIC_API_URL=https://api-dev.kidbookbuilder.com
```

**Prod:** `frontend/.env.production.local`
```
NEXT_PUBLIC_API_URL=https://api.kidbookbuilder.com
```

---

## Deployment Commands

### Deploy to Dev
```bash
# Backend
cd serverless_app/backend
npx serverless deploy

# Frontend
cd serverless_app/frontend
npm run build
npx serverless deploy
```

### Deploy to Prod
```bash
# Backend
cd serverless_app/backend
npx serverless deploy --stage prod

# Frontend (use .env.production.local)
cd serverless_app/frontend
npm run build
npx serverless deploy --stage prod
```

### Invalidate CloudFront Cache
```bash
# Dev
aws cloudfront create-invalidation --distribution-id E2OPF8FM4PL3YX --paths "/*"

# Prod
aws cloudfront create-invalidation --distribution-id E3PP1E6CZA5R0R --paths "/*"
```

---

## Verification

```bash
# Test dev frontend
curl -I https://dev.kidbookbuilder.com

# Test prod frontend
curl -I https://www.kidbookbuilder.com
curl -I https://kidbookbuilder.com

# Test dev API
curl -X POST https://api-dev.kidbookbuilder.com/signups \
  -H "Content-Type: application/json" \
  -d '{"parentName":"Test","parentEmail":"test@example.com","childName":"Child","childAge":10}'

# Test prod API
curl -X POST https://api.kidbookbuilder.com/signups \
  -H "Content-Type: application/json" \
  -d '{"parentName":"Test","parentEmail":"test@example.com","childName":"Child","childAge":10}'

# Check DNS
dig dev.kidbookbuilder.com
dig www.kidbookbuilder.com
dig kidbookbuilder.com
dig api-dev.kidbookbuilder.com
dig api.kidbookbuilder.com
```

---

## Notes

- SSL certificate must be in **us-east-1** for CloudFront
- CloudFront hosted zone ID `Z2FDTNDATAQYW2` is constant for all CloudFront distributions
- DNS propagation may take a few minutes after deployment
- The wildcard cert `*.kidbookbuilder.com` covers subdomains but NOT the apex - that's why both are included in the certificate
- CloudFront distribution updates take ~15-25 minutes
- Apex domain (`kidbookbuilder.com`) serves the same content as `www.kidbookbuilder.com` (not a redirect)
- Cognito User Pool domains are stage-specific: `kidbookbuilder-api-{stage}-1764252546866`
