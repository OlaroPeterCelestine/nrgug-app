#!/bin/bash

# Script to initialize the database tables on Railway PostgreSQL
# Make sure you have psql installed or use Railway CLI

echo "Setting up Railway PostgreSQL database..."

# Using psql to connect and run the init.sql
psql "postgresql://postgres:zwLvAlXNfHMQkcjHqWoulsuRSUJscbzW@shinkansen.proxy.rlwy.net:50269/railway" -f init.sql

echo "Database setup completed!"
echo "You can now run the API with: go run main.go"
