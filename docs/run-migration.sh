#!/bin/bash

# Run Roles & Permissions Migration on Railway

echo "🚀 Running Roles & Permissions Migration on Railway..."
echo ""

# Run the migration
railway run psql < migrations/create_roles_permissions.sql

echo ""
echo "✅ Migration completed!"
echo ""
echo "Verify by checking:"
echo "  curl https://nrgug-api-production.up.railway.app/api/roles"
echo "  curl https://nrgug-api-production.up.railway.app/api/permissions"


