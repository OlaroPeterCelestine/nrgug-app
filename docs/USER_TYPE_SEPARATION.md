# User Type Separation - App Users vs Dashboard Users

## Overview
This update separates app users (mobile app signups) from dashboard/employee users (admin panel users) in the database schema.

## Database Changes

### Migration Script
Run the migration script to add the `user_type` column:
```bash
psql -h your-db-host -U your-user -d your-database -f sql/add_user_type_separation.sql
```

Or in Railway/PostgreSQL:
```sql
\i sql/add_user_type_separation.sql
```

### Schema Changes
- Added `user_type` column to `users` table
- Values: `'app'` or `'dashboard'`
- Default: `'dashboard'` (for backward compatibility)
- Index created on `user_type` for faster queries

## API Endpoints

### New Endpoints
- `GET /api/users/app` - Get only app users
- `GET /api/users/dashboard` - Get only dashboard/employee users

### Existing Endpoints (Updated)
- `GET /api/users` - Get all users (includes `user_type` in response)
- `POST /api/users` - Create user (automatically sets `user_type` based on role)

## User Type Logic

### Automatic Assignment
- **App Users** (`user_type='app'`):
  - Users with `role='user'` (default for app signups)
  - Explicitly set when `user_type='app'` in request

- **Dashboard Users** (`user_type='dashboard'`):
  - Users with `role='admin'`, `'editor'`, `'viewer'`, or empty role
  - Default for users created via admin dashboard

### Manual Override
You can explicitly set `user_type` in the request:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "user",
  "user_type": "app"
}
```

## Flutter App Changes
The signup screen now automatically sends `user_type: 'app'` when creating new users.

## Admin Dashboard
The admin dashboard should use `/api/users/dashboard` to show only employee/admin users, and `/api/users/app` to show app users separately.

## Migration Notes
- Existing users are automatically categorized:
  - Users with roles `admin`, `editor`, `viewer`, or empty → `dashboard`
  - Users with role `user` → `app`
- All new signups from the app will be marked as `app` users
- All new users created via admin dashboard will be marked as `dashboard` users

