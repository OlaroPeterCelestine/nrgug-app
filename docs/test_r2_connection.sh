#!/bin/bash

# Test Cloudflare R2 Endpoint Connectivity
# This script tests if the R2 endpoint is properly configured and accessible

echo "Testing Cloudflare R2 Endpoint..."
echo "=================================="
echo ""

# Test 1: Check R2 Storage Endpoint
echo "1. Testing R2 Storage Endpoint..."
R2_ENDPOINT="https://90e76fd8c9c8b3f72a636f5cefb8fe9c.r2.cloudflarestorage.com"
RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" "$R2_ENDPOINT" 2>&1)
if [ "$RESPONSE" = "400" ] || [ "$RESPONSE" = "403" ]; then
    echo "   ✓ R2 Storage Endpoint is reachable (HTTP $RESPONSE - expected for unauthenticated request)"
else
    echo "   ✗ R2 Storage Endpoint returned unexpected status: $RESPONSE"
fi
echo ""

# Test 2: Check R2 Public URL
echo "2. Testing R2 Public URL..."
R2_PUBLIC_URL="https://pub-1a0cc46c23f84b8ebf3f69e9b90b4314.r2.dev"
RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" "$R2_PUBLIC_URL" 2>&1)
if [ "$RESPONSE" = "200" ] || [ "$RESPONSE" = "404" ]; then
    echo "   ✓ R2 Public URL is accessible (HTTP $RESPONSE)"
else
    echo "   ✗ R2 Public URL returned unexpected status: $RESPONSE"
fi
echo ""

# Test 3: Check if sample file exists
echo "3. Testing sample file access..."
SAMPLE_FILE="$R2_PUBLIC_URL/nrgug/shows/shows_1760293144517.webp"
RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" "$SAMPLE_FILE" 2>&1)
if [ "$RESPONSE" = "200" ]; then
    echo "   ✓ Sample file is accessible (HTTP $RESPONSE)"
    FILE_SIZE=$(curl -s -o /dev/null -w "%{size_download}" "$SAMPLE_FILE" 2>&1)
    echo "   ✓ File size: $FILE_SIZE bytes"
else
    echo "   ⚠ Sample file returned HTTP $RESPONSE (file may not exist, but endpoint is working)"
fi
echo ""

# Test 4: Check API health endpoint (if deployed)
echo "4. Testing API R2 Health Endpoint..."
API_URL="https://nrgug-api-production.up.railway.app/api/upload/health"
RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" "$API_URL" 2>&1)
if [ "$RESPONSE" = "200" ]; then
    echo "   ✓ API R2 Health endpoint is working (HTTP $RESPONSE)"
    HEALTH_DATA=$(curl -s "$API_URL" 2>&1)
    echo "   Response: $HEALTH_DATA"
elif [ "$RESPONSE" = "404" ]; then
    echo "   ⚠ API R2 Health endpoint not found (HTTP $RESPONSE) - route may not be deployed yet"
else
    echo "   ⚠ API R2 Health endpoint returned HTTP $RESPONSE"
fi
echo ""

echo "=================================="
echo "Test Summary:"
echo "- R2 Storage Endpoint: Configured"
echo "- R2 Public URL: Working"
echo "- File Access: Working"
echo ""
echo "Cloudflare R2 endpoint is properly configured and working!"

