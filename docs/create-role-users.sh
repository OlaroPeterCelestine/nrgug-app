#!/bin/bash

# Create Users with Specific Roles Script
# Creates users with Digital, Tech, Programming, Commercial, and Admin roles

set -e

API_BASE="http://localhost:8080/api"
echo "👥 Creating users with specific roles..."

# Create Digital Role User
echo "📱 Creating Digital role user..."
curl -s -X POST "$API_BASE/users" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Digital Manager",
    "email": "digital@nrgug.com",
    "phone": "+1-555-1001",
    "role": "digital",
    "password": "digital123",
    "image": "/uploads/users/digital_manager.jpg"
  }' | jq -r '.id'

# Create Tech Role User
echo "💻 Creating Tech role user..."
curl -s -X POST "$API_BASE/users" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Tech Lead",
    "email": "tech@nrgug.com",
    "phone": "+1-555-1002",
    "role": "tech",
    "password": "tech123",
    "image": "/uploads/users/tech_lead.jpg"
  }' | jq -r '.id'

# Create Programming Role User
echo "⚡ Creating Programming role user..."
curl -s -X POST "$API_BASE/users" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Senior Programmer",
    "email": "programming@nrgug.com",
    "phone": "+1-555-1003",
    "role": "programming",
    "password": "programming123",
    "image": "/uploads/users/senior_programmer.jpg"
  }' | jq -r '.id'

# Create Commercial Role User
echo "💼 Creating Commercial role user..."
curl -s -X POST "$API_BASE/users" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Commercial Director",
    "email": "commercial@nrgug.com",
    "phone": "+1-555-1004",
    "role": "commercial",
    "password": "commercial123",
    "image": "/uploads/users/commercial_director.jpg"
  }' | jq -r '.id'

# Create Admin Role User
echo "🔐 Creating Admin role user..."
curl -s -X POST "$API_BASE/users" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "System Administrator",
    "email": "admin@nrgug.com",
    "phone": "+1-555-1005",
    "role": "admin",
    "password": "admin123",
    "image": "/uploads/users/system_admin.jpg"
  }' | jq -r '.id'

echo "✅ All role-based users created successfully!"

# Display all users with their roles
echo "📋 Current users and their roles:"
curl -s "$API_BASE/users" | jq '.[] | {id, name, email, role}' | grep -E "(digital|tech|programming|commercial|admin)" -A 3 -B 1

echo "🔑 Login credentials:"
echo "  Digital: digital@nrgug.com / digital123"
echo "  Tech: tech@nrgug.com / tech123"
echo "  Programming: programming@nrgug.com / programming123"
echo "  Commercial: commercial@nrgug.com / commercial123"
echo "  Admin: admin@nrgug.com / admin123"
