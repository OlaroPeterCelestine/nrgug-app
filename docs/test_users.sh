#!/bin/bash

# Test script for User API endpoints
# Make sure the API is running on localhost:8080

echo "Testing User API endpoints..."

# Test creating users
echo "Creating admin user..."
curl -X POST http://localhost:8080/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Admin",
    "phone": "+1111111111",
    "role": "admin",
    "email": "test.admin@nrgug.com"
  }' | jq '.'

echo -e "\n"

echo "Creating editor user..."
curl -X POST http://localhost:8080/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Editor",
    "phone": "+2222222222",
    "role": "editor",
    "email": "test.editor@nrgug.com"
  }' | jq '.'

echo -e "\n"

echo "Creating viewer user (no phone)..."
curl -X POST http://localhost:8080/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Viewer",
    "role": "viewer",
    "email": "test.viewer@nrgug.com"
  }' | jq '.'

echo -e "\n"

# Test getting all users
echo "Getting all users..."
curl -s http://localhost:8080/api/users | jq '.'

echo -e "\n"

# Test getting user by ID
echo "Getting user by ID (1)..."
curl -s http://localhost:8080/api/users/1 | jq '.'

echo -e "\n"

# Test getting user by email
echo "Getting user by email..."
curl -s http://localhost:8080/api/users/email/test.admin@nrgug.com | jq '.'

echo -e "\n"

# Test updating user
echo "Updating user..."
curl -X PUT http://localhost:8080/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Test Admin",
    "phone": "+1111111111",
    "role": "super_admin",
    "email": "updated.admin@nrgug.com"
  }' | jq '.'

echo -e "\n"

# Test error handling
echo "Testing 404 error for non-existent user..."
curl -s http://localhost:8080/api/users/999

echo -e "\n"

echo "Testing 404 error for non-existent email..."
curl -s http://localhost:8080/api/users/email/nonexistent@example.com

echo -e "\n"

# Test final state
echo "Final users list..."
curl -s http://localhost:8080/api/users | jq '.'

echo -e "\nUser API test completed!"
