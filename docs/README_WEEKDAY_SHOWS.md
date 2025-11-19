# Weekday Shows Database Setup

This directory contains SQL scripts to create duplicate shows for each weekday (Monday-Thursday).

## Files

1. **`create_weekday_shows.sql`** - Creates sample shows for each weekday
2. **`duplicate_shows_for_weekdays.sql`** - Duplicates existing shows for each weekday
3. **`run_weekday_shows.sql`** - Helper script to run the creation script

## How to Use

### Option 1: Create New Sample Shows
If you want to create fresh sample shows for each weekday:

```bash
# Connect to your database and run:
psql -h your_host -U your_user -d your_database -f create_weekday_shows.sql
```

### Option 2: Duplicate Existing Shows
If you already have shows in your database and want to duplicate them:

```bash
# Connect to your database and run:
psql -h your_host -U your_user -d your_database -f duplicate_shows_for_weekdays.sql
```

## What This Does

- Creates 6 shows per weekday (Monday-Thursday)
- Each show has the same content but different `day_of_week` values
- Shows include:
  - Morning Show (6:00 AM - 9:00 AM)
  - Midday Music Mix (9:00 AM - 12:00 PM)
  - Afternoon Drive (12:00 PM - 3:00 PM)
  - Evening Vibes (3:00 PM - 6:00 PM)
  - Night Shift (6:00 PM - 9:00 PM)
  - Late Night Mix (9:00 PM - 12:00 AM)

## Result

After running the script, you'll have:
- 24 total shows (6 shows × 4 weekdays)
- Each weekday will have its own dedicated shows
- The Listen and Watch pages will show the correct shows for each day
- No more "No shows scheduled for today" messages

## Database Connection

Make sure to update the connection details in the scripts:
- Host: Your database host
- User: Your database username
- Database: Your database name
- Password: Will be prompted or set via environment variable

## Verification

After running the script, you can verify the results by checking:
```sql
SELECT day_of_week, COUNT(*) as show_count 
FROM shows 
WHERE day_of_week IN ('Monday', 'Tuesday', 'Wednesday', 'Thursday')
GROUP BY day_of_week 
ORDER BY day_of_week;
```

This should show 6 shows for each weekday.














