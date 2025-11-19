#!/bin/bash

echo "📧 Sending Personal Test Email to Olar Peter Celestine"
echo "======================================================"

API_BASE="http://localhost:8080/api"

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "\n${BLUE}Step 1: Creating personal test email...${NC}"

# Create personal test email
MAIL_RESPONSE=$(curl -s -X POST "$API_BASE/mail-queue" \
  -H "Content-Type: application/json" \
  -d '{
    "subject": "🎉 Personal Test - NRGUG Email System",
    "body": "Hello Olar Peter Celestine!\n\nThis is a personal test email to verify that your NRGUG email system is working correctly.\n\n✅ Gmail SMTP Configuration\n✅ Real Email Delivery\n✅ Professional HTML Templates\n✅ Unsubscribe Functionality\n\nIf you receive this email, your system is fully operational!\n\nBest regards,\nNRGUG Development Team"
  }')

echo "Email created:"
echo "$MAIL_RESPONSE" | jq '.'

MAIL_ID=$(echo "$MAIL_RESPONSE" | jq -r '.id')

if [ "$MAIL_ID" != "null" ] && [ "$MAIL_ID" != "" ]; then
    echo -e "\n${BLUE}Step 2: Sending email to all active subscribers (including you)...${NC}"
    
    # Send email
    SEND_RESPONSE=$(curl -s -X POST "$API_BASE/mail-queue/$MAIL_ID/send")
    echo "Send response:"
    echo "$SEND_RESPONSE" | jq '.'
    
    echo -e "\n${BLUE}Step 3: Checking if email was sent to your address...${NC}"
    
    # Check if your email was in the delivery logs
    sleep 2
    LOGS_RESPONSE=$(curl -s "$API_BASE/mail-logs")
    
    # Look for your email in the logs
    if echo "$LOGS_RESPONSE" | grep -q "olaropetercelestine@gmail.com"; then
        echo -e "${GREEN}✅ Email delivery logged for olaropetercelestine@gmail.com${NC}"
        echo "$LOGS_RESPONSE" | jq '.[] | select(.subscriber_email == "olaropetercelestine@gmail.com")'
    else
        echo -e "${YELLOW}⚠️  Email delivery not found in logs${NC}"
        echo "Recent mail logs:"
        echo "$LOGS_RESPONSE" | jq '.[-3:]'
    fi
    
    echo -e "\n${BLUE}Step 4: Checking mail status...${NC}"
    
    # Check mail status
    MAIL_STATUS=$(curl -s "$API_BASE/mail-queue/$MAIL_ID")
    echo "Mail status:"
    echo "$MAIL_STATUS" | jq '.'
    
    SENT_STATUS=$(echo "$MAIL_STATUS" | jq -r '.sent')
    
    echo -e "\n${YELLOW}========================================${NC}"
    echo -e "${YELLOW}           PERSONAL EMAIL TEST${NC}"
    echo -e "${YELLOW}========================================${NC}"
    
    if [ "$SENT_STATUS" = "true" ]; then
        echo -e "${GREEN}✅ Email marked as sent successfully${NC}"
        echo -e "${GREEN}✅ Your email (olaropetercelestine@gmail.com) should receive the test email${NC}"
        echo ""
        echo -e "${BLUE}Please check your Gmail inbox for:${NC}"
        echo "• Subject: 🎉 Personal Test - NRGUG Email System"
        echo "• From: bestbrodcastingservices@gmail.com"
        echo "• Check spam folder if not in inbox"
        echo ""
        echo -e "${YELLOW}If you received the email, your SMTP configuration is working perfectly!${NC}"
    else
        echo -e "${RED}❌ Email sending failed${NC}"
        echo "Mail sent status: $SENT_STATUS"
    fi
    
else
    echo -e "${RED}❌ Failed to create test email${NC}"
    echo "Response: $MAIL_RESPONSE"
fi

echo -e "\n${YELLOW}Test completed at: $(date)${NC}"
