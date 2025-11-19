# How to Run Migration on Railway

Since Railway CLI might not be directly accessible, here are the steps to run the migration:

## Option 1: Railway Dashboard (Easiest)

1. **Go to Railway Dashboard**: https://railway.app
2. **Select your project** (nrgug-api-production or similar)
3. **Click on PostgreSQL service**
4. **Go to "Data" tab**
5. **Click "Query" button**
6. **Copy and paste the entire contents of `sql/migrate_to_separate_tables.sql`**
7. **Click "Run"**

## Option 2: Railway CLI (If linked)

If you have Railway CLI linked to your project:

```bash
cd apis
railway connect postgres
```

Then in the psql prompt:
```sql
\i sql/migrate_to_separate_tables.sql
```

Or if that doesn't work, copy-paste the SQL directly:
```sql
-- Copy entire contents of migrate_to_separate_tables.sql here
```

## Option 3: Using psql with Connection String

1. **Get connection string from Railway**:
   - Go to Railway Dashboard → PostgreSQL service
   - Go to "Variables" tab
   - Copy the `DATABASE_URL` or `POSTGRES_URL`

2. **Run migration**:
   ```bash
   cd apis
   psql "$DATABASE_URL" -f sql/migrate_to_separate_tables.sql
   ```

## Option 4: Railway CLI with Service Name

Try different service names:
```bash
railway connect postgresql
railway connect db
railway connect database
```

Or list all services:
```bash
railway service list
```

## Verify Migration

After running, verify with:
```sql
SELECT 'employees' as table_name, COUNT(*) as count FROM employees
UNION ALL
SELECT 'users' as table_name, COUNT(*) as count FROM users;
```

## Migration Script Location

The migration script is at: `apis/sql/migrate_to_separate_tables.sql`

