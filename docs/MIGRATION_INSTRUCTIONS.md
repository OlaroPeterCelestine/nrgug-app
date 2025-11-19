# Database Migration Instructions

## Run Roles & Permissions Migration

The migration needs to be run on your Railway PostgreSQL database. Here are the options:

### Option 1: Via Railway Dashboard (Recommended)

1. Go to [Railway Dashboard](https://railway.app/dashboard)
2. Select your project: **nrgug-api-service**
3. Click on your **PostgreSQL** database service
4. Go to the **Data** tab
5. Click **Query** or **Connect** 
6. Copy and paste the contents of `migrations/create_roles_permissions.sql`
7. Execute the SQL

### Option 2: Via Railway CLI with Database URL

```bash
# Get database URL
railway variables | grep DATABASE_URL

# Run migration using the database URL
railway run --service <postgres-service-name> psql $DATABASE_URL < migrations/create_roles_permissions.sql
```

### Option 3: Connect via psql directly

1. Get database connection details from Railway dashboard
2. Connect using psql:
   ```bash
   psql -h <DB_HOST> -p <DB_PORT> -U <DB_USER> -d <DB_NAME>
   ```
3. Run the migration:
   ```sql
   \i migrations/create_roles_permissions.sql
   ```

### Option 4: Via Railway Database Plugin

1. Install Railway database plugin in your project
2. Use Railway's built-in SQL editor
3. Copy and paste the migration SQL

## Verify Migration

After running the migration, verify it worked:

```bash
# Check roles endpoint
curl https://nrgug-api-production.up.railway.app/api/roles

# Check permissions endpoint  
curl https://nrgug-api-production.up.railway.app/api/permissions
```

You should see:
- Roles endpoint returns: `[]` (empty array) or default roles
- Permissions endpoint returns: Array of all available permissions

## What the Migration Does

1. Creates `roles` table
2. Creates `permissions` table
3. Creates `role_permissions` junction table
4. Adds `role_id` column to `users` table
5. Inserts default permissions (30+ permissions)
6. Creates default roles:
   - **admin** - Full access
   - **editor** - Content management
   - **viewer** - Read-only access


