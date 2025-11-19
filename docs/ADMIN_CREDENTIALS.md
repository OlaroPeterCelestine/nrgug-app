# 🔐 Admin Login Credentials

## Admin Dashboard Access

**Admin Dashboard URL**: https://admin-5ltxkeo46-olaropetercelestines-projects.vercel.app

## Available Admin Accounts

### Option 1: Albert Admin
- **Email**: `albert@nrgug.com`
- **Password**: `admin123` (just reset)
- **Name**: Albert Admin
- **Role**: admin

### Option 2: Admin User  
- **Email**: `admin@nrgug.com`
- **Password**: `admin123`
- **Name**: Admin User
- **Role**: admin

## How to Login

1. Go to: https://admin-5ltxkeo46-olaropetercelestines-projects.vercel.app/login
2. Enter one of the email/password combinations above
3. Click "Sign In"

## Create New Admin User

If you need to create a new admin user:

### Via Admin Dashboard (Recommended)
1. Login with existing admin credentials
2. Go to **Users** page
3. Click **Add User**
4. Fill in:
   - Name: Your name
   - Email: your-email@example.com
   - Password: your-password
   - Role: Select **admin** role
5. Click **Create**

### Via API

```bash
curl -X POST https://nrgug-api-production.up.railway.app/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Your Name",
    "email": "your-email@example.com",
    "password": "your-password",
    "role": "admin"
  }'
```

## Reset Password

To reset a password for an existing user:

1. Login to admin dashboard
2. Go to **Users** page
3. Click **Edit** on the user
4. Enter new password
5. Click **Update**

Or via API:
```bash
curl -X PUT https://nrgug-api-production.up.railway.app/api/users/USER_ID \
  -H "Content-Type: application/json" \
  -d '{
    "name": "User Name",
    "email": "user@example.com",
    "password": "new-password",
    "role": "admin"
  }'
```

## Troubleshooting

If login fails:
1. Verify the API is running: https://nrgug-api-production.up.railway.app/health
2. Check that the user exists in the database
3. Try creating a new admin user
4. Verify the email and password are correct

## Security Note

⚠️ **Change default passwords** after first login for security!
