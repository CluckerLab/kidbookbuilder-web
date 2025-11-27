# Prompt to Generate AWS Resources Documentation

Use this prompt with an AI assistant to generate comprehensive AWS resources documentation for any Serverless Framework deployment.

---

## Prompt Template

```
I need you to create a comprehensive markdown documentation file that lists all AWS resources deployed by a Serverless Framework application.

Project Context:
- Project: {{PROJECT_NAME}}
- Stack Name: {{STACK_NAME}}
- Region: {{AWS_REGION}}
- Stage: {{STAGE}}
- Framework: Serverless Framework v3

Required Information to Gather:

1. Run the following commands to collect data:
   ```bash
   # Get basic deployment info
   npx serverless info --stage {{STAGE}}

   # Get all CloudFormation resources
   aws cloudformation describe-stack-resources \
     --stack-name {{STACK_NAME}} \
     --region {{AWS_REGION}} \
     --query 'StackResources[*].[ResourceType,LogicalResourceId,PhysicalResourceId,ResourceStatus]' \
     --output table

   # Get stack outputs
   aws cloudformation describe-stacks \
     --stack-name {{STACK_NAME}} \
     --region {{AWS_REGION}} \
     --query 'Stacks[0].Outputs' \
     --output table
   ```

2. Create a markdown file named `AWS_RESOURCES.md` with the following sections:

   **Header Section:**
   - Title: "AWS Resources - {{PROJECT_NAME}}"
   - Include: Stack Name, Region, Stage, Last Updated date

   **Resource Summary:**
   - Create a table showing resource counts by category
   - Categories: DynamoDB, Cognito, Lambda, API Gateway, CloudWatch, IAM, S3, etc.
   - Include total count

   **Database Resources:**
   - List all database resources (DynamoDB tables, RDS instances, etc.) with:
     - Name, Configuration details, Status, ARN

   **Authentication Resources (if applicable):**
   - Document Cognito User Pool (if exists) with:
     - Pool ID, Name, Status, ARN, Features
   - Document Cognito User Pool Client with:
     - Client ID, Name, Status, Auth Flows, OAuth settings
   - Document Cognito Hosted UI Domain with:
     - Domain name, Full URL, Status

   **Lambda Functions:**
   - For each Lambda function:
     - Function Name, Status, Runtime, Architecture
     - Handler, Memory, Timeout, Latest Version, ARN
     - Associated endpoints/triggers

   **API Gateway Resources:**
   - HTTP API or REST API details: ID, Status, Type, Endpoint, CORS
   - Authorizers (if any): Type, Configuration
   - API Routes: List all routes with Route IDs and integrations
   - API Integrations: List integration IDs
   - API Stages: Name, Status, Deployment settings

   **CloudWatch Resources:**
   - List all Log Groups with:
     - Group name, Retention, Status
   - List any CloudWatch Alarms or Dashboards

   **IAM Resources:**
   - Lambda Execution Roles with:
     - Role name, Status, Permissions, Trust Policy
   - Any custom IAM policies

   **S3 Resources:**
   - List all S3 buckets with:
     - Bucket name, Status, Purpose, Policies

   **Other Resources:**
   - Document any additional resources like:
     - SQS queues
     - SNS topics
     - EventBridge rules
     - Step Functions
     - ECS/Fargate services
     - etc.

   **Complete Resource List:**
   - Create a comprehensive table with ALL resources showing:
     - Resource Type, Logical ID, Physical ID, Status

   **Stack Outputs:**
   - Table of all CloudFormation outputs with:
     - Output Key, Value, Description

   **Useful Commands Section:**
   - Provide command examples for:
     - Viewing all resources
     - Viewing stack outputs
     - Viewing Serverless info
     - Viewing CloudWatch logs
     - Checking database items
     - Listing authentication users (if applicable)
     - Testing API endpoints

   **AWS Console Links:**
   - Direct links to AWS Console for:
     - CloudFormation Stack
     - API Gateway
     - Lambda Functions
     - Database resources
     - Authentication services
     - CloudWatch Logs
     - IAM Roles
     - S3 Buckets
     - Other relevant services

   **Cost Estimates:**
   - Free tier limits for each service
   - Estimated costs beyond free tier (for moderate usage)
   - Total monthly cost estimate
   - Cost optimization recommendations

   **Clean Up Section:**
   - Command to remove all resources
   - Warning about irreversibility
   - Reminder to backup data
   - Steps for safe removal

   **Troubleshooting Section (optional):**
   - Common issues and solutions
   - How to view logs
   - How to debug failed deployments

3. Formatting Requirements:
   - Use clear markdown headers (##, ###)
   - Include emojis for visual organization (📊, 🗄️, 🔐, ⚡, 🌐, etc.)
   - Use code blocks for commands
   - Use tables where appropriate
   - Use bullet points for lists
   - Include horizontal rules (---) between major sections
   - Make it scannable and easy to navigate

4. Information Sources:
   - All data should come from AWS CloudFormation stack resources
   - Use actual resource IDs, ARNs, and names from the deployment
   - Include real endpoints, domain names, and identifiers
   - Reference the serverless.yml configuration

5. Additional Context:
   - Project Description: {{PROJECT_DESCRIPTION}}
   - Runtime: {{RUNTIME}}
   - Architecture: {{ARCHITECTURE}}
   - Primary Services: {{PRIMARY_SERVICES}}

Output file should be comprehensive, well-organized, and useful as reference documentation for the deployed infrastructure.
```

---

## How to Use This Template

### Step 1: Fill in the Placeholders

Replace these placeholders with your project-specific values:

- `{{PROJECT_NAME}}` - Your project name (e.g., "User Management API")
- `{{STACK_NAME}}` - CloudFormation stack name (e.g., "user-api-prod")
- `{{AWS_REGION}}` - AWS region (e.g., "us-east-1")
- `{{STAGE}}` - Deployment stage (e.g., "dev", "prod")
- `{{PROJECT_DESCRIPTION}}` - Brief description of what the project does
- `{{RUNTIME}}` - Lambda runtime (e.g., "Node.js 20.x")
- `{{ARCHITECTURE}}` - Lambda architecture (e.g., "ARM64" or "x86_64")
- `{{PRIMARY_SERVICES}}` - Main AWS services used (e.g., "Lambda, API Gateway, DynamoDB")

### Step 2: Copy the Customized Prompt

After filling in the placeholders, copy the entire prompt.

### Step 3: Run with AI Assistant

Paste the prompt into your AI assistant (Claude, ChatGPT, etc.).

### Step 4: Save the Output

Save the generated documentation as `AWS_RESOURCES.md` in your project directory.

---

## Example: Filled-In Prompt

Here's an example with placeholders filled in for a user management API:

```
Project Context:
- Project: User Management API
- Stack Name: user-api-prod
- Region: us-west-2
- Stage: prod
- Framework: Serverless Framework v3

[... rest of prompt with user-api-prod replacing {{STACK_NAME}}, etc.]
```

---

## Quick Reference: Common Values

### AWS Regions
- `us-east-1` - US East (N. Virginia)
- `us-east-2` - US East (Ohio)
- `us-west-1` - US West (N. California)
- `us-west-2` - US West (Oregon)
- `eu-west-1` - Europe (Ireland)
- `eu-central-1` - Europe (Frankfurt)
- `ap-southeast-1` - Asia Pacific (Singapore)
- `ap-northeast-1` - Asia Pacific (Tokyo)

### Common Stages
- `dev` - Development
- `staging` - Staging/QA
- `prod` - Production
- `test` - Testing

### Common Runtimes
- `nodejs20.x` - Node.js 20
- `nodejs18.x` - Node.js 18
- `python3.12` - Python 3.12
- `python3.11` - Python 3.11
- `java17` - Java 17

### Architectures
- `arm64` - ARM-based (Graviton2) - 20% cost savings
- `x86_64` - x86-based (traditional)

---

## Tips for Best Results

1. **Run the Commands First**: Execute the AWS CLI commands before generating the documentation to have accurate data.

2. **Be Specific**: The more context you provide about your project, the better the documentation.

3. **Include All Services**: List all AWS services your project uses, not just the common ones.

4. **Update Regularly**: Regenerate documentation after each significant deployment.

5. **Verify Accuracy**: Always verify that resource IDs and ARNs match your actual deployment.

6. **Customize Sections**: Add or remove sections based on what resources your project actually uses.

---

## Automated Version

You can also create a script to automatically fill in values:

```bash
#!/bin/bash
# generate-docs.sh

# Configuration
PROJECT_NAME="My API"
STACK_NAME="my-api-dev"
AWS_REGION="us-east-1"
STAGE="dev"
RUNTIME="Node.js 20.x"
ARCHITECTURE="ARM64"

# Generate prompt with values
sed -e "s/{{PROJECT_NAME}}/$PROJECT_NAME/g" \
    -e "s/{{STACK_NAME}}/$STACK_NAME/g" \
    -e "s/{{AWS_REGION}}/$AWS_REGION/g" \
    -e "s/{{STAGE}}/$STAGE/g" \
    -e "s/{{RUNTIME}}/$RUNTIME/g" \
    -e "s/{{ARCHITECTURE}}/$ARCHITECTURE/g" \
    GENERATE_AWS_RESOURCES_PROMPT.md > prompt-filled.txt

echo "Prompt generated in prompt-filled.txt"
echo "Copy and paste into your AI assistant"
```

---

## File Locations

Place the generated documentation in your project root:

```
my-serverless-project/
├── serverless.yml
├── src/
├── AWS_RESOURCES.md          # Generated documentation
└── package.json
```

---

## Maintenance

### When to Regenerate

- ✅ After adding new AWS resources
- ✅ After removing resources
- ✅ After significant configuration changes
- ✅ Monthly (to keep costs and metrics current)
- ✅ Before major releases
- ✅ When onboarding new team members

### What to Update

1. Resource counts and lists
2. ARNs and IDs
3. Endpoints and URLs
4. Cost estimates
5. Last updated date

---

## Additional Resources

- [Serverless Framework Docs](https://www.serverless.com/framework/docs/)
- [AWS CloudFormation Docs](https://docs.aws.amazon.com/cloudformation/)
- [AWS CLI Reference](https://docs.aws.amazon.com/cli/)

---

**Template Version:** 1.0
**Created:** 2025-11-25
**Purpose:** Generate comprehensive AWS resource documentation for any Serverless project
