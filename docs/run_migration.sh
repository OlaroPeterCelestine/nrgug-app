#!/bin/bash
# Script to run the migration using Railway CLI

cd "$(dirname "$0")"

echo "🔍 Getting database connection string from Railway..."
DATABASE_URL=$(railway variables --json 2>&1 | grep -o 'postgresql://[^"]*' | head -1)

if [ -z "$DATABASE_URL" ]; then
    echo "❌ Could not get DATABASE_URL from Railway"
    echo ""
    echo "Please run the migration manually:"
    echo "1. Go to Railway Dashboard → PostgreSQL service → Data tab → Query"
    echo "2. Copy and paste the contents of sql/migrate_to_separate_tables.sql"
    echo "3. Click Run"
    exit 1
fi

echo "✅ Found database connection"
echo ""
echo "📋 Running migration script..."
echo ""

# Try to run with psql if available
if command -v psql &> /dev/null; then
    psql "$DATABASE_URL" -f sql/migrate_to_separate_tables.sql
else
    echo "❌ psql not found. Please install PostgreSQL client tools."
    echo ""
    echo "Alternative: Use Railway Dashboard"
    echo "1. Go to Railway Dashboard → PostgreSQL service → Data tab → Query"
    echo "2. Copy and paste the contents of sql/migrate_to_separate_tables.sql"
    echo "3. Click Run"
    exit 1
fi

echo ""
echo "✅ Migration complete!"
echo ""
echo "Verify with:"
echo "SELECT 'employees' as table_name, COUNT(*) as count FROM employees"
echo "UNION ALL"
echo "SELECT 'users' as table_name, COUNT(*) as count FROM users;"

