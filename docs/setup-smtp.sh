#!/bin/bash

echo "📧 NRGUG SMTP Configuration Setup"
echo "=================================="

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "\n${YELLOW}This script will help you configure SMTP for real email sending.${NC}"

echo -e "\n${BLUE}Step 1: Choose your SMTP provider${NC}"
echo "1) Gmail (recommended for testing)"
echo "2) Outlook/Hotmail"
echo "3) Yahoo"
echo "4) Custom SMTP server"
echo "5) Skip configuration (use console mode)"

read -p "Enter your choice (1-5): " choice

case $choice in
    1)
        echo -e "\n${BLUE}Gmail Configuration${NC}"
        echo "You'll need to:"
        echo "1. Enable 2-factor authentication on your Gmail account"
        echo "2. Generate an App Password (not your regular password)"
        echo "3. Use the App Password as SMTP_PASSWORD"
        echo ""
        read -p "Enter your Gmail address: " email
        read -p "Enter your Gmail App Password: " password
        read -p "Enter sender name (default: NRGUG): " sender_name
        
        if [ -z "$sender_name" ]; then
            sender_name="NRGUG"
        fi
        
        echo -e "\n${GREEN}Gmail SMTP Configuration:${NC}"
        echo "SMTP_HOST=smtp.gmail.com"
        echo "SMTP_PORT=587"
        echo "SMTP_USERNAME=$email"
        echo "SMTP_PASSWORD=$password"
        echo "FROM_EMAIL=$email"
        echo "FROM_NAME=$sender_name"
        echo "BASE_URL=http://localhost:3000"
        ;;
    2)
        echo -e "\n${BLUE}Outlook/Hotmail Configuration${NC}"
        read -p "Enter your Outlook email: " email
        read -p "Enter your Outlook password: " password
        read -p "Enter sender name (default: NRGUG): " sender_name
        
        if [ -z "$sender_name" ]; then
            sender_name="NRGUG"
        fi
        
        echo -e "\n${GREEN}Outlook SMTP Configuration:${NC}"
        echo "SMTP_HOST=smtp-mail.outlook.com"
        echo "SMTP_PORT=587"
        echo "SMTP_USERNAME=$email"
        echo "SMTP_PASSWORD=$password"
        echo "FROM_EMAIL=$email"
        echo "FROM_NAME=$sender_name"
        echo "BASE_URL=http://localhost:3000"
        ;;
    3)
        echo -e "\n${BLUE}Yahoo Configuration${NC}"
        read -p "Enter your Yahoo email: " email
        read -p "Enter your Yahoo App Password: " password
        read -p "Enter sender name (default: NRGUG): " sender_name
        
        if [ -z "$sender_name" ]; then
            sender_name="NRGUG"
        fi
        
        echo -e "\n${GREEN}Yahoo SMTP Configuration:${NC}"
        echo "SMTP_HOST=smtp.mail.yahoo.com"
        echo "SMTP_PORT=587"
        echo "SMTP_USERNAME=$email"
        echo "SMTP_PASSWORD=$password"
        echo "FROM_EMAIL=$email"
        echo "FROM_NAME=$sender_name"
        echo "BASE_URL=http://localhost:3000"
        ;;
    4)
        echo -e "\n${BLUE}Custom SMTP Configuration${NC}"
        read -p "Enter SMTP host: " smtp_host
        read -p "Enter SMTP port (default: 587): " smtp_port
        read -p "Enter SMTP username: " smtp_user
        read -p "Enter SMTP password: " smtp_pass
        read -p "Enter from email: " from_email
        read -p "Enter sender name (default: NRGUG): " sender_name
        
        if [ -z "$smtp_port" ]; then
            smtp_port="587"
        fi
        if [ -z "$sender_name" ]; then
            sender_name="NRGUG"
        fi
        
        echo -e "\n${GREEN}Custom SMTP Configuration:${NC}"
        echo "SMTP_HOST=$smtp_host"
        echo "SMTP_PORT=$smtp_port"
        echo "SMTP_USERNAME=$smtp_user"
        echo "SMTP_PASSWORD=$smtp_pass"
        echo "FROM_EMAIL=$from_email"
        echo "FROM_NAME=$sender_name"
        echo "BASE_URL=http://localhost:3000"
        ;;
    5)
        echo -e "\n${YELLOW}SMTP configuration skipped. Emails will be logged to console.${NC}"
        exit 0
        ;;
    *)
        echo -e "\n${RED}Invalid choice. Exiting.${NC}"
        exit 1
        ;;
esac

echo -e "\n${YELLOW}Step 2: Set environment variables${NC}"
echo "You can set these environment variables in several ways:"
echo ""
echo "Option 1: Create a .env file in the apis directory:"
echo "export SMTP_HOST=your_host"
echo "export SMTP_PORT=your_port"
echo "export SMTP_USERNAME=your_username"
echo "export SMTP_PASSWORD=your_password"
echo "export FROM_EMAIL=your_email"
echo "export FROM_NAME=your_name"
echo "export BASE_URL=http://localhost:3000"
echo ""
echo "Option 2: Set them in your shell profile (~/.bashrc, ~/.zshrc):"
echo "Add the export commands above to your shell profile"
echo ""
echo "Option 3: Set them when starting the API:"
echo "SMTP_HOST=your_host SMTP_PORT=your_port ... ./nrgug-api"

echo -e "\n${YELLOW}Step 3: Test the configuration${NC}"
echo "After setting the environment variables, restart the API and run:"
echo "cd apis/olaro && ./test-api-quick.sh"

echo -e "\n${GREEN}Setup complete!${NC}"
echo -e "\n${BLUE}Next steps:${NC}"
echo "1. Set the environment variables using one of the methods above"
echo "2. Restart the API server"
echo "3. Test email sending with the test scripts"
echo "4. Check the console output for '✅ Email sent successfully' messages"
