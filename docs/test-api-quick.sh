#!/bin/bash

echo "🚀 Quick API Health Check"
echo "========================="

API_BASE="http://localhost:8080/api"

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "\n${YELLOW}Testing API Health...${NC}"

# Test health endpoint
health_response=$(curl -s "$API_BASE/../health")
if echo "$health_response" | grep -q "healthy"; then
    echo -e "${GREEN}✓ API is healthy${NC}"
    echo "Response: $health_response"
else
    echo -e "${RED}✗ API health check failed${NC}"
    echo "Response: $health_response"
    exit 1
fi

echo -e "\n${YELLOW}Testing Core Endpoints...${NC}"

# Test main endpoints
endpoints=("news" "shows" "clients" "users" "subscribers" "mail-queue" "mail-logs")

for endpoint in "${endpoints[@]}"; do
    status_code=$(curl -s -o /dev/null -w '%{http_code}' "$API_BASE/$endpoint")
    if [ "$status_code" = "200" ]; then
        echo -e "${GREEN}✓ $endpoint${NC}"
    else
        echo -e "${RED}✗ $endpoint (Status: $status_code)${NC}"
    fi
done

echo -e "\n${YELLOW}Testing Statistics...${NC}"

# Test stats endpoints
stats_endpoints=("subscribers/stats" "mail-queue/stats" "mail-logs/stats")

for endpoint in "${stats_endpoints[@]}"; do
    response=$(curl -s "$API_BASE/$endpoint")
    if echo "$response" | grep -q "{"; then
        echo -e "${GREEN}✓ $endpoint${NC}"
        echo "  Data: $response"
    else
        echo -e "${RED}✗ $endpoint${NC}"
    fi
done

echo -e "\n${YELLOW}API Quick Test Complete!${NC}"
echo -e "Test script location: $(pwd)/test-api-quick.sh"
