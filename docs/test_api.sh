#!/bin/bash

# Test script for NRGUG API
# Make sure the API is running on localhost:8080

echo "Testing NRGUG API..."

# Test creating a news article
echo "Creating a news article..."
curl -X POST http://localhost:8080/api/news \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Welcome to NRGUG",
    "story": "This is our first news article about the amazing NRGUG community.",
    "author": "Admin",
    "category": "General",
    "image": "https://example.com/news1.jpg"
  }' | jq '.'

echo -e "\n"

# Test creating an event
echo "Creating an event..."
curl -X POST http://localhost:8080/api/events \
  -H "Content-Type: application/json" \
  -d '{
    "hosts": "NRGUG Team",
    "time_from": "2024-12-01T09:00:00Z",
    "time_to": "2024-12-01T17:00:00Z",
    "image": "https://example.com/event1.jpg"
  }' | jq '.'

echo -e "\n"

# Test creating a client
echo "Creating a client..."
curl -X POST http://localhost:8080/api/clients \
  -H "Content-Type: application/json" \
  -d '{
    "name": "TechCorp Inc",
    "image": "https://example.com/techcorp-logo.jpg",
    "link": "https://techcorp.com"
  }' | jq '.'

echo -e "\n"

# Test getting all news
echo "Getting all news..."
curl -X GET http://localhost:8080/api/news | jq '.'

echo -e "\n"

# Test getting all events
echo "Getting all events..."
curl -X GET http://localhost:8080/api/events | jq '.'

echo -e "\n"

# Test getting all clients
echo "Getting all clients..."
curl -X GET http://localhost:8080/api/clients | jq '.'

echo -e "\nTest completed!"
