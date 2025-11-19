# Database Migration: Separate Employees and Users Tables

This migration separates dashboard/admin users (employees) from app signup users into different tables.

## Migration Steps

1. **Backup your database** (IMPORTANT!)

2. **Run the migration script**:
   ```bash
   psql -h <host> -U <user> -d <database> -f sql/migrate_to_separate_tables.sql
   ```

   Or via Railway CLI:
   ```bash
   railway connect postgres
   \i sql/migrate_to_separate_tables.sql
   ```

3. **Verify the migration**:
   - Check that employees table has admin/editor/viewer users
   - Check that users table has app signup users
   - Verify counts match

4. **After verification, you can drop the backup table**:
   ```sql
   DROP TABLE IF EXISTS users_old;
   ```

## What Changed

### Tables
- **`employees`**: Dashboard/admin users (admin, editor, viewer roles)
- **`users`**: App signup users (mobile app users)

### API Endpoints

#### Employees (Dashboard Users)
- `POST /api/employees/login` - Employee login
- `GET /api/employees` - List all employees
- `POST /api/employees` - Create employee
- `GET /api/employees/{id}` - Get employee by ID
- `PUT /api/employees/{id}` - Update employee (can change role to admin)
- `DELETE /api/employees/{id}` - Delete employee

#### Users (App Signups)
- `POST /api/users/login` - App user login
- `GET /api/users/list` - Get app users list for dashboard (emails and count)
- `GET /api/users` - List all app users
- `POST /api/users` - Create app user (signup)
- `GET /api/users/{id}` - Get app user by ID
- `PUT /api/users/{id}` - Update app user
- `DELETE /api/users/{id}` - Delete app user

## Admin Dashboard Updates Needed

1. **Update login endpoint** to use `/api/employees/login` instead of `/api/users/login`
2. **Create "App Users" page** to display app users (emails and count) using `/api/users/list`
3. **Update "Users" page** to manage employees using `/api/employees` endpoints
4. **Allow changing employee roles** to make them admins via `PUT /api/employees/{id}`

## Notes

- Existing admin/editor/viewer users are migrated to `employees` table
- Existing app users (role='user') are migrated to `users` table
- Foreign keys in related tables (listening_sessions, texting_studio_logs, points_history) still reference `users` table (for app users only)

