#!/bin/bash

# Test script for Password functionality
# Make sure the API is running on localhost:8080

echo "Testing Password functionality..."

# Test creating user with password
echo "Creating user with password..."
curl -X POST http://localhost:8080/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Password User",
    "phone": "+9999999999",
    "role": "editor",
    "email": "password.user@nrgug.com",
    "password": "mypassword123"
  }' | jq '.'

echo -e "\n"

# Test login with correct credentials
echo "Testing login with correct credentials..."
curl -X POST http://localhost:8080/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "password.user@nrgug.com",
    "password": "mypassword123"
  }' | jq '.'

echo -e "\n"

# Test login with incorrect password
echo "Testing login with incorrect password..."
curl -X POST http://localhost:8080/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "password.user@nrgug.com",
    "password": "wrongpassword"
  }'

echo -e "\n"

# Test login with non-existent email
echo "Testing login with non-existent email..."
curl -X POST http://localhost:8080/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "nonexistent@example.com",
    "password": "anypassword"
  }'

echo -e "\n"

# Test getting user by ID (password should be hidden)
echo "Getting user by ID (password should be hidden)..."
curl -s http://localhost:8080/api/users/7 | jq '.'

echo -e "\n"

# Test updating user password
echo "Updating user with new password..."
curl -X PUT http://localhost:8080/api/users/7 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Password User Updated",
    "phone": "+9999999999",
    "role": "senior_editor",
    "email": "password.user@nrgug.com",
    "password": "newpassword456"
  }' | jq '.'

echo -e "\n"

# Test login with new password
echo "Testing login with new password..."
curl -X POST http://localhost:8080/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "password.user@nrgug.com",
    "password": "newpassword456"
  }' | jq '.'

echo -e "\n"

# Test login with old password (should fail)
echo "Testing login with old password (should fail)..."
curl -X POST http://localhost:8080/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "password.user@nrgug.com",
    "password": "mypassword123"
  }'

echo -e "\n"

# Test getting all users (passwords should be hidden)
echo "Getting all users (passwords should be hidden)..."
curl -s http://localhost:8080/api/users | jq '.'

echo -e "\nPassword functionality test completed!"
