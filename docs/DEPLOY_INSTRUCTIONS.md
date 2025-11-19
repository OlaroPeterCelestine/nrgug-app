# 🚀 Deploy User Type Separation

## Quick Deploy Steps

### Step 1: Commit and Push Changes
```bash
cd /Users/olaropetercelestine/Desktop/october/bbs/nrgug
git add .
git commit -m "Add user type separation: separate app users from dashboard users"
git push
```

If Railway is connected to your GitHub repo, it will automatically deploy.

### Step 2: Run Database Migration

After deployment completes, run the migration:

**Option A: Using Railway Dashboard**
1. Go to https://railway.app/dashboard
2. Select your project
3. Click on your PostgreSQL database service
4. Click "Query" or "Connect"
5. Copy and paste this SQL:

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

6. Click "Run" or execute the query

**Option B: Using Railway CLI (if linked)**
```bash
cd apis
railway run psql < sql/add_user_type_separation.sql
```

### Step 3: Verify Deployment

Test the new endpoints:
```bash
# Get all app users
curl https://nrgug-api-production.up.railway.app/api/users/app

# Get all dashboard users  
curl https://nrgug-api-production.up.railway.app/api/users/dashboard

# Get all users (includes user_type)
curl https://nrgug-api-production.up.railway.app/api/users
```

## What's Deployed

✅ Database schema with `user_type` column
✅ New API endpoints for filtering users
✅ Updated models and controllers
✅ Flutter app signup sends `user_type: 'app'`

## Next Steps

After deployment:
1. Test signup from the Flutter app
2. Verify new users are marked as `user_type='app'`
3. Check that dashboard users are separate

