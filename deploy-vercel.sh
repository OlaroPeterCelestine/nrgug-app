#!/bin/bash

# 🚀 NRG Radio Uganda Website - Vercel Deployment Script
# This script helps deploy the website to Vercel

set -e

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}🚀 NRG Radio Uganda Website - Vercel Deployment${NC}"
echo "=================================================="
echo

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo -e "${YELLOW}Installing Vercel CLI...${NC}"
    npm install -g vercel
    echo -e "${GREEN}✅ Vercel CLI installed${NC}"
else
    echo -e "${GREEN}✅ Vercel CLI already installed${NC}"
fi

# Check if logged in to Vercel
if ! vercel whoami &> /dev/null; then
    echo -e "${YELLOW}Please log in to Vercel:${NC}"
    vercel login
else
    echo -e "${GREEN}✅ Already logged in to Vercel${NC}"
fi

echo -e "${BLUE}Deploying to Vercel...${NC}"

# Deploy to Vercel
vercel --prod --yes

echo -e "${GREEN}🎉 Deployment completed!${NC}"
echo -e "${BLUE}Your website is now live on Vercel!${NC}"
echo
echo -e "${YELLOW}📝 Next Steps:${NC}"
echo "1. Check your Vercel dashboard for the deployment URL"
echo "2. Test all website functionality"
echo "3. Verify API connections are working"
echo "4. Set up custom domain if needed"
