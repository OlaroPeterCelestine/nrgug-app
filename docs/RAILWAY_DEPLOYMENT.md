# 🚀 Railway Deployment Guide

## Pre-Deployment Checklist

### ✅ Code Verification
- [x] All Go files compile successfully
- [x] All routes registered
- [x] Roles & Permissions system implemented
- [x] Image upload to Cloudflare R2 configured
- [x] Database migrations ready

### 📋 New Features Added
1. **Roles & Permissions System**
   - New models: `role.go`, `role_repository.go`, `role_controller.go`
   - Migration: `create_roles_permissions.sql`
   - New routes: `/api/roles`, `/api/permissions`, `/api/users/{id}/permissions`

2. **User Management Updates**
   - Support for `role_id` in user creation/updates
   - Permission-based authentication

3. **Image Uploads**
   - Cloudflare R2 integration
   - Upload/delete endpoints

## 🚀 Deployment Steps

### Option 1: Railway CLI (Recommended)

```bash
# Install Railway CLI if not installed
npm install -g @railway/cli

# Login to Railway
railway login

# Navigate to API directory
cd apis

# Link to existing Railway project (or create new)
railway link

# Deploy
railway up
```

### Option 2: Git-based Deployment (Automatic)

If your Railway project is connected to GitHub:

1. **Commit all changes:**
   ```bash
   cd /Users/olaropetercelestine/Desktop/october/bbs/nrgug
   git add .
   git commit -m "Add roles & permissions system, image uploads, and admin improvements"
   git push
   ```

2. **Railway will automatically deploy** from your GitHub repository

### Option 3: Manual Deployment via Railway Dashboard

1. Go to [Railway Dashboard](https://railway.app/dashboard)
2. Select your project
3. Go to Settings → Deploy
4. Connect to GitHub repository or upload files
5. Railway will build and deploy automatically

## 📝 Database Migration Required

**IMPORTANT**: After deployment, run the roles & permissions migration:

```sql
-- Run this in your Railway PostgreSQL database
\i apis/migrations/create_roles_permissions.sql
```

Or via Railway CLI:
```bash
railway run psql < apis/migrations/create_roles_permissions.sql
```

## 🔧 Environment Variables

Ensure these are set in Railway:

### Required Variables:
- `DB_HOST` - Database host
- `DB_PORT` - Database port (usually 5432)
- `DB_USER` - Database user
- `DB_PASSWORD` - Database password
- `DB_NAME` - Database name

### Optional (for R2 uploads):
- `R2_ACCESS_KEY_ID` - Cloudflare R2 access key
- `R2_SECRET_ACCESS_KEY` - Cloudflare R2 secret key
- `R2_BUCKET_NAME` - R2 bucket name
- `R2_ACCOUNT_ID` - R2 account ID
- `R2_PUBLIC_URL` - R2 public URL

### Optional (for email):
- `SMTP_HOST` - SMTP server
- `SMTP_PORT` - SMTP port
- `SMTP_USERNAME` - SMTP username
- `SMTP_PASSWORD` - SMTP password
- `FROM_EMAIL` - From email address
- `FROM_NAME` - From name

## ✅ Post-Deployment Verification

After deployment, verify:

1. **Health Check:**
   ```bash
   curl https://nrgug-api-production.up.railway.app/health
   ```

2. **Test Roles Endpoint:**
   ```bash
   curl https://nrgug-api-production.up.railway.app/api/roles
   ```

3. **Test Permissions Endpoint:**
   ```bash
   curl https://nrgug-api-production.up.railway.app/api/permissions
   ```

4. **Run Database Migration:**
   - Connect to Railway PostgreSQL
   - Run `create_roles_permissions.sql` migration

## 📊 Deployment Summary

### Files Changed/Added:
- ✅ `apis/models/role.go` - New
- ✅ `apis/database/role_repository.go` - New
- ✅ `apis/controllers/role_controller.go` - New
- ✅ `apis/routes/routes.go` - Updated (added role routes)
- ✅ `apis/models/user.go` - Updated (added RoleID)
- ✅ `apis/database/user_repository.go` - Updated (role_id support)
- ✅ `apis/controllers/user_controller.go` - Updated (permissions in login)
- ✅ `apis/migrations/create_roles_permissions.sql` - New
- ✅ `apis/main.go` - Updated (added endpoint logging)

### Build Status:
✅ **Build Successful** - All Go files compile without errors


