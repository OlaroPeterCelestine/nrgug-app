#!/bin/bash

# 🚀 NRGUG Complete Deployment Script
# This script deploys all components of the NRGUG platform

set -e

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}🚀 NRGUG Complete Deployment${NC}"
echo "=================================================="
echo

# Get the script directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check prerequisites
echo -e "${BLUE}Checking prerequisites...${NC}"

if ! command_exists node; then
    echo -e "${RED}❌ Node.js is not installed${NC}"
    exit 1
fi

if ! command_exists npm; then
    echo -e "${RED}❌ npm is not installed${NC}"
    exit 1
fi

if ! command_exists vercel; then
    echo -e "${YELLOW}Installing Vercel CLI...${NC}"
    npm install -g vercel
fi

echo -e "${GREEN}✅ Prerequisites check passed${NC}"
echo

# Deploy Admin Dashboard
echo -e "${BLUE}📱 Deploying Admin Dashboard...${NC}"
cd "$SCRIPT_DIR/admin"
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}Installing admin dashboard dependencies...${NC}"
    npm install
fi
chmod +x deploy-vercel.sh
./deploy-vercel.sh
echo -e "${GREEN}✅ Admin Dashboard deployed${NC}"
echo

# Deploy Public Website
echo -e "${BLUE}🌐 Deploying Public Website...${NC}"
cd "$SCRIPT_DIR/nrg"
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}Installing public website dependencies...${NC}"
    npm install
fi
chmod +x deploy-vercel.sh
./deploy-vercel.sh
echo -e "${GREEN}✅ Public Website deployed${NC}"
echo

# Summary
echo -e "${GREEN}🎉 All deployments completed!${NC}"
echo
echo -e "${BLUE}📊 Deployment Summary:${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${YELLOW}API Backend:${NC} Already deployed on Railway"
echo -e "  URL: https://nrgug-api-production.up.railway.app"
echo
echo -e "${YELLOW}Admin Dashboard:${NC} Deployed on Vercel"
echo -e "  Check Vercel dashboard for URL"
echo
echo -e "${YELLOW}Public Website:${NC} Deployed on Vercel"
echo -e "  Check Vercel dashboard for URL"
echo
echo -e "${BLUE}📝 Next Steps:${NC}"
echo "1. Check Vercel dashboard for deployment URLs"
echo "2. Test all functionality"
echo "3. Verify API connections"
echo "4. Set up custom domains if needed"
echo "5. Configure environment variables in Vercel if needed"

