# Deploy User Type Separation

## Steps to Deploy

### 1. Deploy API Code

**Option A: Using Railway CLI (Recommended)**
```bash
cd apis
railway up
```

**Option B: Using Git (if Railway is connected to GitHub)**
```bash
cd /Users/olaropetercelestine/Desktop/october/bbs/nrgug
git add .
git commit -m "Add user type separation: app users vs dashboard users"
git push
```

### 2. Run Database Migration

After the API is deployed, run the migration:

**Using Railway CLI:**
```bash
cd apis
railway run psql < sql/add_user_type_separation.sql
```

**Or connect to Railway database directly:**
1. Go to Railway Dashboard
2. Select your project
3. Go to PostgreSQL service
4. Click "Connect" or "Query"
5. Copy and paste the contents of `sql/add_user_type_separation.sql`
6. Execute

### 3. Verify Deployment

Test the new endpoints:
```bash
# Get all app users
curl https://nrgug-api-production.up.railway.app/api/users/app

# Get all dashboard users
curl https://nrgug-api-production.up.railway.app/api/users/dashboard

# Get all users (should include user_type)
curl https://nrgug-api-production.up.railway.app/api/users
```

## What Changed

1. **Database**: Added `user_type` column to `users` table
2. **API**: New endpoints `/api/users/app` and `/api/users/dashboard`
3. **Models**: Updated to include `user_type` field
4. **Flutter App**: Signup now sends `user_type: 'app'`

## Migration Details

The migration will:
- Add `user_type` column (default: 'dashboard')
- Create index on `user_type`
- Update existing users:
  - `role='admin'/'editor'/'viewer'` or empty → `user_type='dashboard'`
  - `role='user'` → `user_type='app'`

