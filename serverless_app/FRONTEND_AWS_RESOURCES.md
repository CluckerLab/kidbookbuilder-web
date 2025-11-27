# AWS Resources - KidBookBuilder Frontend

## Stack Information

| Property | Value |
|----------|-------|
| **Stack Name** | `kidbookbuilder-frontend-dev` |
| **Service** | `kidbookbuilder-frontend` |
| **Region** | `us-east-1` |
| **Stage** | `dev` |
| **Framework** | Serverless Framework v3 |
| **Last Updated** | 2024-11-27 |

---

## 📊 Resource Summary

| Category | Count |
|----------|-------|
| S3 Buckets | 2 |
| CloudFront Distribution | 1 |
| CloudFront Origin Access Control | 1 |
| S3 Bucket Policies | 2 |
| **Total Resources** | **6** |

---

## 🌐 Website URL

| Property | Value |
|----------|-------|
| **Website URL** | `https://d1igb37gzeru9j.cloudfront.net` |
| **Distribution ID** | `E2OPF8FM4PL3YX` |
| **Protocol** | HTTPS (redirect from HTTP) |

---

## 📦 S3 Resources

### Website Bucket

| Property | Value |
|----------|-------|
| **Bucket Name** | `kidbookbuilder-dev-website` |
| **Logical ID** | `WebsiteBucket` |
| **Purpose** | Static website files (Next.js export) |
| **Public Access** | Blocked (CloudFront only) |
| **Status** | CREATE_COMPLETE |
| **ARN** | `arn:aws:s3:::kidbookbuilder-dev-website` |

### Deployment Bucket

| Property | Value |
|----------|-------|
| **Bucket Name** | `kidbookbuilder-frontend-d-serverlessdeploymentbuck-lr2ukydgdsin` |
| **Logical ID** | `ServerlessDeploymentBucket` |
| **Purpose** | Serverless Framework deployment artifacts |
| **Status** | CREATE_COMPLETE |

---

## 🚀 CloudFront Resources

### Distribution

| Property | Value |
|----------|-------|
| **Distribution ID** | `E2OPF8FM4PL3YX` |
| **Domain Name** | `d1igb37gzeru9j.cloudfront.net` |
| **Status** | CREATE_COMPLETE |
| **HTTP Version** | HTTP/2 |
| **Price Class** | PriceClass_100 (US, Canada, Europe) |
| **Default Root Object** | `index.html` |

**Cache Behavior:**
- Viewer Protocol Policy: Redirect HTTP to HTTPS
- Allowed Methods: GET, HEAD, OPTIONS
- Cached Methods: GET, HEAD
- Compress: Enabled
- Cache Policy: CachingOptimized

**Custom Error Responses:**
| Error Code | Response Code | Response Page |
|------------|---------------|---------------|
| 404 | 200 | `/index.html` |
| 403 | 200 | `/index.html` |

### Origin Access Control

| Property | Value |
|----------|-------|
| **OAC ID** | `E8WHXAOCATDL4` |
| **Logical ID** | `CloudFrontOAC` |
| **Signing Behavior** | Always |
| **Signing Protocol** | SigV4 |
| **Status** | CREATE_COMPLETE |

---

## 📤 Stack Outputs

| Output Key | Value | Description |
|------------|-------|-------------|
| `WebsiteBucketName` | `kidbookbuilder-dev-website` | S3 bucket name |
| `CloudFrontDistributionId` | `E2OPF8FM4PL3YX` | CloudFront distribution ID |
| `CloudFrontDomainName` | `https://d1igb37gzeru9j.cloudfront.net` | CloudFront domain name (website URL) |

---

## 🛠️ Useful Commands

```bash
# View stack info
npm run info

# View all CloudFormation resources
aws cloudformation describe-stack-resources \
  --stack-name kidbookbuilder-frontend-dev \
  --region us-east-1 \
  --output table

# View stack outputs
aws cloudformation describe-stacks \
  --stack-name kidbookbuilder-frontend-dev \
  --region us-east-1 \
  --query 'Stacks[0].Outputs' \
  --output table

# List S3 bucket contents
aws s3 ls s3://kidbookbuilder-dev-website/ --recursive

# Sync local build to S3
aws s3 sync out/ s3://kidbookbuilder-dev-website/ --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation \
  --distribution-id E2OPF8FM4PL3YX \
  --paths "/*"

# Check CloudFront distribution status
aws cloudfront get-distribution \
  --id E2OPF8FM4PL3YX \
  --query 'Distribution.Status'
```

---

## 🔗 AWS Console Links

- [CloudFormation Stack](https://us-east-1.console.aws.amazon.com/cloudformation/home?region=us-east-1#/stacks/stackinfo?filteringText=kidbookbuilder-frontend-dev)
- [CloudFront Distribution](https://us-east-1.console.aws.amazon.com/cloudfront/v4/home#/distributions/E2OPF8FM4PL3YX)
- [S3 Website Bucket](https://s3.console.aws.amazon.com/s3/buckets/kidbookbuilder-dev-website?region=us-east-1)
- [CloudFront Invalidations](https://us-east-1.console.aws.amazon.com/cloudfront/v4/home#/distributions/E2OPF8FM4PL3YX/invalidations)

---

## 💰 Cost Estimates

### Free Tier Limits (Monthly)

| Service | Free Tier |
|---------|-----------|
| S3 | 5 GB storage, 20,000 GET, 2,000 PUT |
| CloudFront | 1 TB data transfer, 10M requests (first 12 months) |

### Estimated Costs (Beyond Free Tier)

| Service | Price |
|---------|-------|
| S3 Storage | $0.023 per GB |
| S3 Requests | $0.0004 per 1,000 GET, $0.005 per 1,000 PUT |
| CloudFront Data Transfer | $0.085 per GB (first 10 TB) |
| CloudFront Requests | $0.0100 per 10,000 HTTPS requests |

**Note:** For typical static site usage, costs will likely remain within free tier or under $1/month.

---

## 🔄 Deployment Process

1. **Build**: `npm run build` - Generates static files in `out/` directory
2. **Sync**: `serverless-s3-sync` uploads files to S3
3. **Serve**: CloudFront serves files with HTTPS and caching

```bash
# Full deployment
npm run deploy

# Manual sync only (after build)
aws s3 sync out/ s3://kidbookbuilder-dev-website/ --delete

# Invalidate cache after manual sync
aws cloudfront create-invalidation --distribution-id E2OPF8FM4PL3YX --paths "/*"
```

---

## 🗑️ Clean Up

To remove all resources:

```bash
npm run remove
```

⚠️ **Warning:** This will permanently delete:
- The S3 website bucket (and all files)
- The CloudFront distribution
- The deployment bucket

**Before removing:**
1. Ensure you have a local copy of any important files
2. Note that CloudFront distributions can take 15-20 minutes to delete

---

## 🔧 Troubleshooting

### Clear CloudFront Cache
If changes aren't appearing:
```bash
aws cloudfront create-invalidation \
  --distribution-id E2OPF8FM4PL3YX \
  --paths "/*"
```

### Check Distribution Status
```bash
aws cloudfront get-distribution --id E2OPF8FM4PL3YX --query 'Distribution.Status'
```

### Common Issues

1. **Changes not visible**: CloudFront caches content. Create an invalidation or wait for cache TTL.
2. **404 errors**: Ensure `index.html` exists in the bucket root.
3. **CORS errors**: API must include CloudFront domain in CORS allowed origins.
4. **Slow first load**: CloudFront needs time to propagate to edge locations.

### Update API URL
If the API endpoint changes, update `.env.local` and redeploy:
```bash
# Edit .env.local with new API URL
npm run deploy
```
