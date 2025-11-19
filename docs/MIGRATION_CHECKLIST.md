# Migration Checklist

## ✅ Pre-Migration Checks

- [x] Code compiles successfully
- [x] API endpoints updated
- [x] Admin dashboard updated to use `/api/employees/login`
- [x] Flutter app uses `/api/users/login` (correct for app users)
- [x] Migration script ready

## 📋 Migration Steps

### Step 1: Run Database Migration

**Option A: Railway CLI (Recommended)**
```bash
railway connect postgres
\i sql/migrate_to_separate_tables.sql
```

**Option B: Railway Dashboard**
1. Go to Railway → Your project → PostgreSQL service
2. Open "Data" tab → Click "Query"
3. Paste contents of `sql/migrate_to_separate_tables.sql`
4. Click "Run"

**Option C: psql**
```bash
psql <connection_string> -f sql/migrate_to_separate_tables.sql
```

### Step 2: Verify Migration

Run this query to verify:
```sql
SELECT 'employees' as table_name, COUNT(*) as count FROM employees
UNION ALL
SELECT 'users' as table_name, COUNT(*) as count FROM users;
```

Expected results:
- `employees` table should have admin/editor/viewer users
- `users` table should have app signup users

### Step 3: Test Logins

**Test Admin Dashboard Login:**
1. Go to admin dashboard login page
2. Login with employee credentials (admin/editor/viewer)
3. Should work with `/api/employees/login`

**Test Flutter App Login:**
1. Open Flutter app
2. Login with app user credentials
3. Should work with `/api/users/login`

### Step 4: Verify Dashboard Features

- [ ] Can login to admin dashboard
- [ ] "Employees" page shows dashboard users
- [ ] Can create/edit/delete employees
- [ ] Can change employee roles (including making them admins)
- [ ] "App Users" page shows app signup users (emails and count)

## 🔍 Troubleshooting

### If migration fails:
1. Check if `users_old` table exists (backup)
2. Check error messages in Railway logs
3. Verify database connection

### If login doesn't work:
1. Check API endpoint URLs
2. Verify employees/users tables exist
3. Check Railway deployment status
4. Verify credentials in database

### If dashboard shows errors:
1. Check browser console for errors
2. Verify API endpoints are correct
3. Check network tab for failed requests

## ✅ Post-Migration

After successful migration:
- [ ] Verify all logins work
- [ ] Test employee management
- [ ] Test app user viewing
- [ ] Drop backup table (optional): `DROP TABLE IF EXISTS users_old;`

## 📝 Notes

- The `users_old` table is kept as a backup
- You can drop it after verifying everything works
- Foreign keys in related tables still reference `users` table (for app users only)

