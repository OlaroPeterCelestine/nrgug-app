# Run Database Migration for User Type Separation

## ⚠️ IMPORTANT: Run This After Deployment

After Railway finishes deploying the API code, you **must** run the database migration to add the `user_type` column.

## How to Run the Migration

### Option 1: Railway Dashboard (Easiest)

1. **Go to Railway Dashboard**
   - Visit: https://railway.app/dashboard
   - Select your project

2. **Open PostgreSQL Database**
   - Click on your PostgreSQL service
   - Click "Query" or "Connect" button

3. **Run the Migration SQL**
   Copy and paste this SQL and execute:

```sql
-- Add user_type column to separate app users from dashboard/employee users
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS user_type TEXT DEFAULT 'dashboard' CHECK (user_type IN ('app', 'dashboard'));

-- Create index for user_type
CREATE INDEX IF NOT EXISTS idx_users_user_type ON users(user_type);

-- Update existing users
UPDATE users 
SET user_type = CASE 
    WHEN role IN ('admin', 'editor', 'viewer') OR role = '' THEN 'dashboard'
    WHEN role = 'user' THEN 'app'
    ELSE 'dashboard'
END
WHERE user_type IS NULL OR user_type = 'dashboard';
```

4. **Verify Migration**
   Run this query to check:
```sql
SELECT id, name, email, role, user_type FROM users;
```

### Option 2: Railway CLI

If you have Railway CLI linked to your project:

```bash
cd apis
railway run psql < sql/add_user_type_separation.sql
```

### Option 3: Direct Database Connection

If you have direct database access:

```bash
psql -h your-db-host -U your-user -d your-database -f apis/sql/add_user_type_separation.sql
```

## Verify Migration Success

After running the migration, test the new endpoints:

```bash
# Get all app users
curl https://nrgug-api-production.up.railway.app/api/users/app

# Get all dashboard users
curl https://nrgug-api-production.up.railway.app/api/users/dashboard

# Get all users (should include user_type field)
curl https://nrgug-api-production.up.railway.app/api/users
```

## What the Migration Does

1. ✅ Adds `user_type` column to `users` table
2. ✅ Creates index for faster queries
3. ✅ Updates existing users:
   - Admin/Editor/Viewer users → `user_type='dashboard'`
   - Users with role='user' → `user_type='app'`
4. ✅ Sets default for new users

## Troubleshooting

If you get an error that the column already exists:
- The migration uses `IF NOT EXISTS`, so it's safe to run multiple times
- If you still get errors, check if the column exists:
  ```sql
  SELECT column_name FROM information_schema.columns 
  WHERE table_name = 'users' AND column_name = 'user_type';
  ```

