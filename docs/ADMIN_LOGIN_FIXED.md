# ✅ Admin Login Fixed

## Issue
The admin login with `admin@nrgug.com` / `admin123` was not working.

## Solution
✅ **Password hash has been reset** in the database.

## Test Results

### API Endpoint (Direct)
```bash
curl -X POST https://nrgug-api-production.up.railway.app/api/employees/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@nrgug.com","password":"admin123"}'
```
✅ **Working** - Returns employee data and JWT token

### Admin Dashboard Login
1. Go to: https://admin-5ltxkeo46-olaropetercelestines-projects.vercel.app/login
2. Email: `admin@nrgug.com`
3. Password: `admin123`
4. ✅ **Should work now!**

## Available Admin Accounts

1. **Admin User**
   - Email: `admin@nrgug.com`
   - Password: `admin123`
   - Role: `admin`

2. **Albert Admin**
   - Email: `albert@nrgug.radio`
   - Password: (needs to be reset - contact admin)
   - Role: `viewer`

## If Login Still Doesn't Work

1. **Clear browser cache and cookies**
2. **Try incognito/private mode**
3. **Check browser console for errors**
4. **Verify the dashboard is using the correct API endpoint** (`/api/employees/login`)

## Reset Password (if needed)

To reset a password, use the Employees page in the dashboard:
1. Login as admin
2. Go to "Employees" page
3. Click "Edit" on the employee
4. Enter new password
5. Click "Update"

Or via API:
```bash
curl -X PUT https://nrgug-api-production.up.railway.app/api/employees/3 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin User",
    "email": "admin@nrgug.com",
    "password": "new_password_here",
    "role": "admin"
  }'
```

