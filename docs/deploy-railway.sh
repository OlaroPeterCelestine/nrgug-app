#!/bin/bash

# 🚀 NRGUG API - Railway Deployment Script
# This script helps deploy the API to Railway

set -e

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}🚀 NRGUG API - Railway Deployment${NC}"
echo "=================================================="
echo

# Check if Railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo -e "${YELLOW}Installing Railway CLI...${NC}"
    npm install -g @railway/cli
    echo -e "${GREEN}✅ Railway CLI installed${NC}"
else
    echo -e "${GREEN}✅ Railway CLI already installed${NC}"
fi

# Check if logged in to Railway
if ! railway whoami &> /dev/null; then
    echo -e "${YELLOW}Please log in to Railway:${NC}"
    railway login
else
    echo -e "${GREEN}✅ Already logged in to Railway${NC}"
    railway whoami
fi

# Verify build
echo -e "${BLUE}Verifying build...${NC}"
if go build -o /tmp/nrgug-api-test ./main.go 2>&1; then
    echo -e "${GREEN}✅ Build successful${NC}"
    rm -f /tmp/nrgug-api-test
else
    echo -e "${RED}❌ Build failed. Please fix errors before deploying.${NC}"
    exit 1
fi

# Check if linked to Railway project
if [ ! -f ".railway/project.json" ]; then
    echo -e "${YELLOW}Not linked to Railway project. Linking...${NC}"
    railway link
else
    echo -e "${GREEN}✅ Already linked to Railway project${NC}"
fi

# Deploy
echo -e "${BLUE}Deploying to Railway...${NC}"
railway up

echo -e "${GREEN}🎉 Deployment initiated!${NC}"
echo
echo -e "${YELLOW}📝 Next Steps:${NC}"
echo "1. Check Railway dashboard for deployment status"
echo "2. Run database migration: railway run psql < migrations/create_roles_permissions.sql"
echo "3. Verify health endpoint: curl https://nrgug-api-production.up.railway.app/health"
echo "4. Test roles endpoint: curl https://nrgug-api-production.up.railway.app/api/roles"


