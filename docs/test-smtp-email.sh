#!/bin/bash

echo "📧 Testing Real SMTP Email Sending"
echo "=================================="

API_BASE="http://localhost:8080/api"

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "\n${BLUE}Step 1: Creating a test email...${NC}"

# Create test email
MAIL_RESPONSE=$(curl -s -X POST "$API_BASE/mail-queue" \
  -H "Content-Type: application/json" \
  -d '{
    "subject": "🎉 SMTP Configuration Test - Real Email!",
    "body": "Congratulations! Your SMTP configuration is working perfectly.\n\nThis email was sent using:\n• Gmail SMTP Server\n• Real email delivery\n• Professional HTML templates\n• Unsubscribe functionality\n\nIf you received this email, your NRGUG email system is fully operational! 🚀"
  }')

echo "Email created:"
echo "$MAIL_RESPONSE" | jq '.'

MAIL_ID=$(echo "$MAIL_RESPONSE" | jq -r '.id')

if [ "$MAIL_ID" != "null" ] && [ "$MAIL_ID" != "" ]; then
    echo -e "\n${BLUE}Step 2: Sending email to all active subscribers...${NC}"
    
    # Send email
    SEND_RESPONSE=$(curl -s -X POST "$API_BASE/mail-queue/$MAIL_ID/send")
    echo "Send response:"
    echo "$SEND_RESPONSE" | jq '.'
    
    echo -e "\n${BLUE}Step 3: Checking delivery logs...${NC}"
    
    # Check mail logs
    LOGS_RESPONSE=$(curl -s "$API_BASE/mail-logs/mail/$MAIL_ID")
    echo "Delivery logs:"
    echo "$LOGS_RESPONSE" | jq '.'
    
    # Count successful deliveries
    DELIVERY_COUNT=$(echo "$LOGS_RESPONSE" | jq '. | length')
    
    echo -e "\n${BLUE}Step 4: Checking mail status...${NC}"
    
    # Check if mail was marked as sent
    MAIL_STATUS=$(curl -s "$API_BASE/mail-queue/$MAIL_ID")
    echo "Mail status:"
    echo "$MAIL_STATUS" | jq '.'
    
    SENT_STATUS=$(echo "$MAIL_STATUS" | jq -r '.sent')
    
    echo -e "\n${YELLOW}========================================${NC}"
    echo -e "${YELLOW}           SMTP TEST RESULTS${NC}"
    echo -e "${YELLOW}========================================${NC}"
    
    if [ "$SENT_STATUS" = "true" ] && [ "$DELIVERY_COUNT" -gt 0 ]; then
        echo -e "${GREEN}✅ SMTP CONFIGURATION SUCCESSFUL!${NC}"
        echo -e "${GREEN}✅ Email sent to $DELIVERY_COUNT subscribers${NC}"
        echo -e "${GREEN}✅ Mail marked as sent: $SENT_STATUS${NC}"
        echo ""
        echo -e "${BLUE}Your email system is now fully operational!${NC}"
        echo -e "${BLUE}Emails are being sent via Gmail SMTP server.${NC}"
        echo ""
        echo -e "${YELLOW}Check your email inbox to verify delivery!${NC}"
    else
        echo -e "${RED}❌ SMTP TEST FAILED${NC}"
        echo -e "Mail sent status: $SENT_STATUS"
        echo -e "Delivery count: $DELIVERY_COUNT"
        echo ""
        echo -e "${YELLOW}Please check:${NC}"
        echo "1. Gmail credentials are correct"
        echo "2. App password is valid"
        echo "3. 2-factor authentication is enabled"
        echo "4. API server is running with correct environment variables"
    fi
    
else
    echo -e "${RED}❌ Failed to create test email${NC}"
    echo "Response: $MAIL_RESPONSE"
fi

echo -e "\n${YELLOW}Test completed at: $(date)${NC}"
echo -e "Test script location: $(pwd)/test-smtp-email.sh"
