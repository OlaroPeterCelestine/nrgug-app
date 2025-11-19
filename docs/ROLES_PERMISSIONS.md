# Roles and Permissions System

This document describes the role-based permission system implemented for the NRGUG admin dashboard.

## Overview

The system allows you to create custom roles with granular permissions. Each user is assigned a role, and roles define what actions users can perform in the system.

## Database Schema

### Tables

1. **roles** - Stores role definitions
   - `id` (BIGSERIAL PRIMARY KEY)
   - `name` (TEXT UNIQUE NOT NULL)
   - `description` (TEXT)
   - `created_at` (TIMESTAMPTZ)
   - `updated_at` (TIMESTAMPTZ)

2. **permissions** - Stores available permissions
   - `id` (BIGSERIAL PRIMARY KEY)
   - `name` (TEXT UNIQUE NOT NULL) - e.g., "news.create"
   - `description` (TEXT)
   - `category` (TEXT NOT NULL) - e.g., "content", "users", "emails"
   - `created_at` (TIMESTAMPTZ)

3. **role_permissions** - Junction table linking roles to permissions
   - `role_id` (BIGINT REFERENCES roles)
   - `permission_id` (BIGINT REFERENCES permissions)
   - PRIMARY KEY (role_id, permission_id)

4. **users** - Updated to include role_id
   - `role_id` (BIGINT REFERENCES roles) - New column
   - `role` (TEXT) - Legacy column, kept for backward compatibility

## Default Roles

The system comes with three default roles:

### 1. Admin
- **Description**: Full system access with all permissions
- **Permissions**: All permissions in the system

### 2. Editor
- **Description**: Content editor with create, read, and update permissions
- **Permissions**:
  - All content create, read, and update permissions (news, shows, clients, videos)
  - Dashboard view
  - Contact read and reply

### 3. Viewer
- **Description**: Read-only access to view content
- **Permissions**:
  - All read permissions (news, shows, clients, videos, emails, subscribers, contact)
  - Dashboard view

## Available Permissions

### Content Management
- `news.create` - Create news articles
- `news.read` - View news articles
- `news.update` - Edit news articles
- `news.delete` - Delete news articles
- `shows.create` - Create radio shows
- `shows.read` - View radio shows
- `shows.update` - Edit radio shows
- `shows.delete` - Delete radio shows
- `clients.create` - Create clients
- `clients.read` - View clients
- `clients.update` - Edit clients
- `clients.delete` - Delete clients
- `videos.create` - Create videos
- `videos.read` - View videos
- `videos.update` - Edit videos
- `videos.delete` - Delete videos

### User Management
- `users.create` - Create users
- `users.read` - View users
- `users.update` - Edit users
- `users.delete` - Delete users
- `roles.manage` - Manage roles and permissions

### Email Management
- `emails.create` - Create email campaigns
- `emails.read` - View email campaigns
- `emails.send` - Send email campaigns
- `emails.delete` - Delete email campaigns
- `subscribers.read` - View subscribers
- `subscribers.delete` - Delete subscribers

### Contact Management
- `contact.read` - View contact messages
- `contact.reply` - Reply to contact messages
- `contact.update` - Update contact message status
- `contact.delete` - Delete contact messages

### System
- `dashboard.view` - View dashboard
- `system.settings` - Manage system settings

## API Endpoints

### Roles
- `GET /api/roles` - Get all roles
- `POST /api/roles` - Create a new role
- `GET /api/roles/{id}` - Get a role by ID
- `PUT /api/roles/{id}` - Update a role
- `DELETE /api/roles/{id}` - Delete a role

### Permissions
- `GET /api/permissions` - Get all available permissions
- `GET /api/users/{id}/permissions` - Get permissions for a specific user

### Users
- Updated to support `role_id` in create/update requests
- Login endpoint now returns user permissions

## Migration

To set up the roles and permissions system, run the migration:

```sql
-- Run the migration file
\i apis/migrations/create_roles_permissions.sql
```

Or manually execute the SQL in `apis/migrations/create_roles_permissions.sql`.

## Usage

### Creating a Custom Role

1. Navigate to "Roles & Permissions" in the admin dashboard
2. Click "Create Role"
3. Enter role name and description
4. Select the permissions you want to assign
5. Click "Create Role"

### Assigning Roles to Users

1. Navigate to "Users" in the admin dashboard
2. Click "Add User" or edit an existing user
3. Select a role from the dropdown
4. Save the user

### Checking Permissions in Code

In the frontend, use the permission utilities:

```typescript
import { hasPermission, getUserPermissions, PERMISSIONS } from '@/lib/permissions'

const userPermissions = getUserPermissions()

// Check if user can create news
if (hasPermission(userPermissions, PERMISSIONS.NEWS_CREATE)) {
  // Show create button
}
```

## Best Practices

1. **Principle of Least Privilege**: Only grant permissions that are necessary for a role
2. **Regular Audits**: Periodically review roles and permissions
3. **Descriptive Names**: Use clear, descriptive names for custom roles
4. **Test Permissions**: Test that permissions work as expected before deploying

## Security Notes

- Admin users always have full access regardless of role assignments
- Permissions are checked on both frontend and backend
- Always validate permissions on the backend, never rely solely on frontend checks
- The `role` column in users table is kept for backward compatibility but `role_id` is preferred


