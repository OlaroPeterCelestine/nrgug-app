#!/bin/bash

# GitHub Secrets Setup Script for NRGUG Project
# This script helps you set up the required GitHub secrets

echo "🔐 GitHub Secrets Setup for NRGUG Project"
echo "=========================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if gh CLI is installed
if ! command -v gh &> /dev/null; then
    print_error "GitHub CLI (gh) is not installed."
    echo "Please install it from: https://cli.github.com/"
    echo "Or run: brew install gh (on macOS)"
    exit 1
fi

# Check if user is authenticated
if ! gh auth status &> /dev/null; then
    print_error "You are not authenticated with GitHub CLI."
    echo "Please run: gh auth login"
    exit 1
fi

print_status "Setting up GitHub secrets for NRGUG project..."

# Get repository name
REPO_NAME=$(gh repo view --json name -q .name)
print_status "Repository: $REPO_NAME"

echo ""
echo "📋 Required Secrets:"
echo "1. VERCEL_TOKEN - Your Vercel API token"
echo "2. VERCEL_ORG_ID - Your Vercel organization/team ID"
echo "3. VERCEL_PROJECT_ID - Your NRG frontend project ID"
echo "4. VERCEL_ADMIN_PROJECT_ID - Your Admin dashboard project ID"
echo "5. RAILWAY_TOKEN - Your Railway API token"
echo ""

# Function to set a secret
set_secret() {
    local secret_name=$1
    local secret_description=$2
    
    echo -e "${YELLOW}Setting up $secret_name${NC}"
    echo "Description: $secret_description"
    echo -n "Enter the value for $secret_name: "
    read -s secret_value
    echo ""
    
    if [ -z "$secret_value" ]; then
        print_warning "Skipping $secret_name (empty value)"
        return
    fi
    
    if gh secret set "$secret_name" --body "$secret_value" 2>/dev/null; then
        print_success "$secret_name set successfully"
    else
        print_error "Failed to set $secret_name"
    fi
    echo ""
}

# Set up secrets
set_secret "VERCEL_TOKEN" "Vercel API token for deployment authentication"
set_secret "VERCEL_ORG_ID" "Vercel organization/team ID"
set_secret "VERCEL_PROJECT_ID" "NRG frontend project ID in Vercel"
set_secret "VERCEL_ADMIN_PROJECT_ID" "Admin dashboard project ID in Vercel"
set_secret "RAILWAY_TOKEN" "Railway API token for API deployment"

echo ""
print_status "Verifying secrets..."

# List all secrets to verify
echo "Current secrets in repository:"
gh secret list

echo ""
print_success "GitHub secrets setup completed!"
echo ""
echo "Next steps:"
echo "1. Verify all secrets are listed above"
echo "2. Test your workflows by pushing a change"
echo "3. Check the Actions tab for successful deployments"
echo ""
echo "For detailed instructions, see: GITHUB_SECRETS_SETUP.md"
