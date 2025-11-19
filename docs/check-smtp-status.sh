#!/bin/bash

echo "📧 SMTP Configuration Status Check"
echo "=================================="

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "\n${BLUE}Checking SMTP configuration...${NC}"

# Check if environment variables are set
if [ -n "$SMTP_USERNAME" ] && [ -n "$SMTP_PASSWORD" ]; then
    echo -e "${GREEN}✅ SMTP credentials are configured${NC}"
    echo "SMTP Host: ${SMTP_HOST:-smtp.gmail.com}"
    echo "SMTP Port: ${SMTP_PORT:-587}"
    echo "SMTP Username: $SMTP_USERNAME"
    echo "SMTP Password: [HIDDEN]"
    echo "From Email: ${FROM_EMAIL:-noreply@nrgug.com}"
    echo "From Name: ${FROM_NAME:-NRGUG}"
    echo ""
    echo -e "${GREEN}✅ Emails will be sent via SMTP${NC}"
else
    echo -e "${YELLOW}⚠️  SMTP credentials NOT configured${NC}"
    echo ""
    echo "Current status:"
    echo "SMTP_USERNAME: ${SMTP_USERNAME:-[NOT SET]}"
    echo "SMTP_PASSWORD: ${SMTP_PASSWORD:-[NOT SET]}"
    echo ""
    echo -e "${YELLOW}⚠️  Emails will be logged to console only${NC}"
    echo ""
    echo -e "${BLUE}To enable real email sending:${NC}"
    echo "1. Run: ./setup-smtp.sh"
    echo "2. Or set environment variables manually:"
    echo "   export SMTP_USERNAME=your-email@gmail.com"
    echo "   export SMTP_PASSWORD=your-app-password"
    echo "   export SMTP_HOST=smtp.gmail.com"
    echo "   export SMTP_PORT=587"
    echo "   export FROM_EMAIL=noreply@nrgug.com"
    echo "   export FROM_NAME=NRGUG"
    echo "   export BASE_URL=http://localhost:3000"
    echo ""
    echo "3. Restart the API server"
fi

echo -e "\n${BLUE}Test email sending:${NC}"
echo "Run: ./test-api-quick.sh"
echo ""
echo "If SMTP is configured, you'll see: '✅ Email sent successfully'"
echo "If not configured, you'll see: 'CONSOLE MODE - SMTP NOT CONFIGURED'"
