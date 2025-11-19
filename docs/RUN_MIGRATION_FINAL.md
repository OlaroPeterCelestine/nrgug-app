# Final Migration Guide: Separate Employees and Users Tables

## Overview
This migration separates dashboard/admin users (employees) from app signup users into different tables.

## Prerequisites
- Database access to Railway PostgreSQL
- Railway CLI installed (optional, for easier access)

## Migration Steps

### Option 1: Using Railway CLI (Recommended)

1. **Connect to Railway database:**
   ```bash
   railway connect postgres
   ```

2. **Run the migration:**
   ```bash
   \i sql/migrate_to_separate_tables.sql
   ```

3. **Verify the migration:**
   ```sql
   SELECT 'employees' as table_name, COUNT(*) as count FROM employees
   UNION ALL
   SELECT 'users' as table_name, COUNT(*) as count FROM users;
   ```

### Option 2: Using psql directly

1. **Get database connection string from Railway dashboard**

2. **Run migration:**
   ```bash
   psql <connection_string> -f sql/migrate_to_separate_tables.sql
   ```

### Option 3: Using Railway Dashboard

1. Go to Railway dashboard → Your project → PostgreSQL service
2. Open the "Data" tab
3. Click "Query" and paste the contents of `sql/migrate_to_separate_tables.sql`
4. Click "Run"

## What the Migration Does

1. **Backs up existing users table** → `users_old`
2. **Creates `employees` table** for dashboard/admin users
3. **Creates new `users` table** for app signups (without role/user_type)
4. **Migrates data:**
   - Admin/Editor/Viewer users → `employees` table
   - App users (role='user') → `users` table
5. **Creates indexes** for performance

## Verification

After migration, verify:

```sql
-- Check employees
SELECT id, name, email, role FROM employees LIMIT 5;

-- Check app users
SELECT id, name, email, points FROM users LIMIT 5;

-- Check counts
SELECT 
    (SELECT COUNT(*) FROM employees) as employees_count,
    (SELECT COUNT(*) FROM users) as users_count;
```

## After Migration

1. **Update admin dashboard login** to use `/api/employees/login`
2. **Create "App Users" page** in dashboard to show app users
3. **Update "Users" page** to manage employees

## Rollback (if needed)

If you need to rollback:

```sql
-- Drop new tables
DROP TABLE IF EXISTS employees;
DROP TABLE IF EXISTS users;

-- Restore original table
ALTER TABLE users_old RENAME TO users;
```

## Important Notes

- The `users_old` table is kept as a backup
- You can drop it after verifying everything works: `DROP TABLE IF EXISTS users_old;`
- Foreign keys in related tables (listening_sessions, texting_studio_logs, points_history) still reference `users` table (for app users only)

