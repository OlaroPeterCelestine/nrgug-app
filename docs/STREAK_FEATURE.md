# 🔥 Streak Feature Implementation

## Overview
The streak feature tracks consecutive days of app opens, encouraging daily engagement with the NRG Radio Uganda app.

## Features

### ✅ Backend (API)
1. **Database Schema**
   - Added `streak_days` column (current consecutive days)
   - Added `last_app_open_date` column (last date app was opened)
   - Added `longest_streak` column (best streak ever achieved)
   - Migration script: `apis/sql/add_streak_feature.sql`

2. **API Endpoints**
   - `POST /api/streak/update` - Updates streak when app opens
   - `GET /api/streak/{user_id}` - Gets streak information

3. **Streak Logic**
   - First app open: Starts streak at 1 day
   - Consecutive day: Increments streak
   - Missed day: Resets streak to 1
   - Tracks longest streak ever achieved

### ✅ Frontend (Flutter App)
1. **Automatic Tracking**
   - Streak updates automatically when app opens (for logged-in users)
   - Non-blocking background update
   - Only tracks for registered users (not guests)

2. **Profile Display**
   - Beautiful streak card with fire icon
   - Shows current streak and longest streak
   - Motivational messages based on streak length

## How It Works

1. **When App Opens:**
   - App checks if user is logged in (not guest)
   - Calls `POST /api/streak/update` with user ID
   - API calculates if it's a new day
   - Updates streak accordingly

2. **Streak Calculation:**
   - If last open was today: No change
   - If last open was yesterday: Increment streak
   - If last open was 2+ days ago: Reset to 1
   - Updates longest streak if current > longest

3. **Display:**
   - Profile screen shows streak card
   - Displays current and longest streak
   - Shows encouraging messages

## Database Migration

Run the migration script to add streak columns:

```bash
cd apis
psql <your_connection_string> -f sql/add_streak_feature.sql
```

Or via Railway:
```bash
railway connect postgres
\i sql/add_streak_feature.sql
```

## Testing

1. **Test Streak Update:**
   ```bash
   curl -X POST https://nrgug-api-production.up.railway.app/api/streak/update \
     -H "Content-Type: application/json" \
     -d '{"user_id": 1}'
   ```

2. **Test Streak Info:**
   ```bash
   curl https://nrgug-api-production.up.railway.app/api/streak/1
   ```

## Future Enhancements

- [ ] Award bonus points for streaks (e.g., 10 points for 7-day streak)
- [ ] Streak milestones (7, 30, 100 days)
- [ ] Push notifications for streak reminders
- [ ] Streak leaderboard

## Files Changed

### Backend
- `apis/sql/add_streak_feature.sql` - Database migration
- `apis/models/user.go` - Added streak fields
- `apis/models/streak.go` - Streak models
- `apis/database/user_repository.go` - Updated queries
- `apis/database/streak_repository.go` - Streak logic
- `apis/controllers/streak_controller.go` - API endpoints
- `apis/controllers/user_controller.go` - Include streak in responses
- `apis/routes/routes.go` - Added streak routes

### Frontend
- `app/nrgug/lib/services/streak_service.dart` - Streak API service
- `app/nrgug/lib/main.dart` - Auto-update streak on app open
- `app/nrgug/lib/pages/profile_screen.dart` - Display streak card
- `app/nrgug/lib/config/api_config.dart` - Added streak endpoints

