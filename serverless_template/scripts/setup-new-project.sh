#!/bin/bash

# Serverless Project Setup Script
# This script creates a new serverless project from templates

set -e

echo "🚀 Serverless Project Setup"
echo "=========================="
echo ""

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Get script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TEMPLATE_DIR="$(dirname "$SCRIPT_DIR")"

# Function to prompt for input
prompt() {
    local prompt_text=$1
    local var_name=$2
    local default_value=$3

    if [ -n "$default_value" ]; then
        read -p "$prompt_text [$default_value]: " value
        value=${value:-$default_value}
    else
        read -p "$prompt_text: " value
    fi

    eval "$var_name='$value'"
}

# Function to prompt for yes/no
prompt_yn() {
    local prompt_text=$1
    local default=$2

    if [ "$default" = "y" ]; then
        read -p "$prompt_text [Y/n]: " answer
        answer=${answer:-y}
    else
        read -p "$prompt_text [y/N]: " answer
        answer=${answer:-n}
    fi

    [[ "$answer" =~ ^[Yy]$ ]]
}

echo "Let's set up your serverless project!"
echo ""

# Step 1: Project basics
echo "📋 Step 1: Project Information"
echo "----------------------------"
prompt "Project name (e.g., my-api)" PROJECT_NAME
prompt "AWS Region" AWS_REGION "us-east-1"
prompt "Service description" SERVICE_DESC "Serverless API"
echo ""

# Step 2: Authentication
echo "🔐 Step 2: Authentication"
echo "----------------------------"
if prompt_yn "Do you need user authentication?" "n"; then
    USE_AUTH=true
    SERVERLESS_TEMPLATE="serverless-with-auth.yml"
else
    USE_AUTH=false
    SERVERLESS_TEMPLATE="serverless-base.yml"
fi
echo ""

# Step 3: Frontend
echo "🎨 Step 3: Frontend"
echo "----------------------------"
if prompt_yn "Do you need a frontend?" "y"; then
    USE_FRONTEND=true
    echo "Select frontend framework:"
    echo "1) React (Vite)"
    echo "2) React (Create React App)"
    echo "3) Vue"
    echo "4) None (will setup later)"
    read -p "Choice [1]: " FRONTEND_CHOICE
    FRONTEND_CHOICE=${FRONTEND_CHOICE:-1}
else
    USE_FRONTEND=false
fi
echo ""

# Step 4: Database
echo "🗄️  Step 4: Database"
echo "----------------------------"
echo "Select database type:"
echo "1) DynamoDB (NoSQL)"
echo "2) None (add later)"
read -p "Choice [1]: " DB_CHOICE
DB_CHOICE=${DB_CHOICE:-1}
echo ""

# Step 5: Confirm
echo "📝 Summary"
echo "----------------------------"
echo "Project Name: $PROJECT_NAME"
echo "AWS Region: $AWS_REGION"
echo "Authentication: $([ "$USE_AUTH" = true ] && echo "Yes (Cognito)" || echo "No")"
echo "Frontend: $([ "$USE_FRONTEND" = true ] && echo "Yes" || echo "No")"
echo "Database: $([ "$DB_CHOICE" = "1" ] && echo "DynamoDB" || echo "None")"
echo ""

if ! prompt_yn "Create project with these settings?" "y"; then
    echo "Setup cancelled."
    exit 0
fi
echo ""

# Create project directory
echo "📁 Creating project directory..."
mkdir -p "$PROJECT_NAME"
cd "$PROJECT_NAME"

# Create backend structure
echo "🔧 Setting up backend..."
mkdir -p src/functions src/utils

# Copy serverless.yml
cp "$TEMPLATE_DIR/backend/$SERVERLESS_TEMPLATE" serverless.yml

# Replace placeholders
sed -i.bak "s/{{SERVICE_NAME}}/$PROJECT_NAME/g" serverless.yml
sed -i.bak "s/{{REGION}}/$AWS_REGION/g" serverless.yml
sed -i.bak "s/{{SERVICE_DESC}}/$SERVICE_DESC/g" serverless.yml
rm serverless.yml.bak

# Copy function templates
cp "$TEMPLATE_DIR/backend/functions/"*.mjs src/functions/
cp "$TEMPLATE_DIR/backend/utils/"*.mjs src/utils/

# Create package.json
cat > package.json <<EOF
{
  "name": "$PROJECT_NAME",
  "version": "1.0.0",
  "description": "$SERVICE_DESC",
  "type": "module",
  "scripts": {
    "deploy": "serverless deploy",
    "deploy:dev": "serverless deploy --stage dev",
    "deploy:prod": "serverless deploy --stage prod",
    "remove": "serverless remove",
    "logs": "serverless logs -f getCoffee --tail",
    "info": "serverless info"
  },
  "dependencies": {
    "@aws-sdk/client-dynamodb": "^3.470.0",
    "@aws-sdk/lib-dynamodb": "^3.470.0"
  },
  "devDependencies": {
    "serverless": "^3.38.0"
  }
}
EOF

# Create README
cat > README.md <<EOF
# $PROJECT_NAME

$SERVICE_DESC

## Setup

1. Install dependencies:
\`\`\`bash
npm install
\`\`\`

2. Configure AWS credentials:
\`\`\`bash
aws configure
\`\`\`

3. Deploy to AWS:
\`\`\`bash
npm run deploy:dev
\`\`\`

## Generated with Serverless Template

This project was generated using the Serverless Framework template.

See the [Serverless documentation](https://www.serverless.com/framework/docs/) for more information.
EOF

# Setup frontend if needed
if [ "$USE_FRONTEND" = true ]; then
    echo "🎨 Setting up frontend..."

    if [ "$FRONTEND_CHOICE" = "1" ]; then
        # Create Vite React app
        npm create vite@latest frontend -- --template react

        # Copy frontend templates
        if [ -d "$TEMPLATE_DIR/frontend/react" ]; then
            cp -r "$TEMPLATE_DIR/frontend/react/"* frontend/src/ 2>/dev/null || true
        fi

        # Create .env.example
        cat > frontend/.env.example <<EOF
VITE_API_URL=https://your-api.execute-api.$AWS_REGION.amazonaws.com
VITE_COGNITO_USER_POOL_ID=your-user-pool-id
VITE_COGNITO_CLIENT_ID=your-client-id
VITE_COGNITO_REGION=$AWS_REGION
VITE_COGNITO_AUTHORITY=https://cognito-idp.$AWS_REGION.amazonaws.com/your-user-pool-id
VITE_COGNITO_DOMAIN=https://your-domain.auth.$AWS_REGION.amazoncognito.com
EOF
    fi
fi

# Create .gitignore
cat > .gitignore <<EOF
# Serverless
.serverless/
.build/

# Node
node_modules/
npm-debug.log
package-lock.json

# Environment
.env
.env.local

# OS
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/

# Logs
*.log

# Temporary files
*.tmp
*.temp
EOF

echo ""
echo "${GREEN}✅ Project created successfully!${NC}"
echo ""
echo "📁 Project structure:"
tree -L 2 -I 'node_modules' . || ls -la

echo ""
echo "🚀 Next steps:"
echo ""
echo "1. Navigate to project:"
echo "   ${YELLOW}cd $PROJECT_NAME${NC}"
echo ""
echo "2. Install dependencies:"
echo "   ${YELLOW}npm install${NC}"
echo ""
echo "3. Configure AWS credentials (if not done):"
echo "   ${YELLOW}aws configure${NC}"
echo ""
echo "4. Deploy to AWS:"
echo "   ${YELLOW}npm run deploy:dev${NC}"
echo ""

if [ "$USE_FRONTEND" = true ]; then
    echo "5. Setup frontend:"
    echo "   ${YELLOW}cd frontend && npm install${NC}"
    echo ""
    echo "6. After backend deployment, update frontend/.env with API endpoint"
    echo ""
fi

echo "For more information, see README.md"
echo ""
echo "${GREEN}Happy coding! 🎉${NC}"
