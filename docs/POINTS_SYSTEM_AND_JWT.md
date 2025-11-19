# Points System and JWT Authentication Implementation

## ✅ Completed Features

### 1. JWT Authentication
- ✅ JWT token generation and validation utilities (`apis/utils/jwt.go`)
- ✅ Login endpoint now returns JWT token
- ✅ Signup endpoint now returns JWT token
- ✅ Token expires in 30 days
- ✅ Token includes user ID, email, and role

### 2. Points System
- ✅ User model updated with points fields:
  - `points` - Total points
  - `listening_hours` - Total listening hours
  - `texting_studio_points` - Points from texting studio
  - `total_listening_minutes` - Total minutes listened

### 3. Points Awarding
- ✅ **Listening Hours**: 1 point per minute of listening
- ✅ **Texting Studio**: 5 points per text message

### 4. Database Schema
- ✅ SQL migration script created (`apis/sql/add_points_system.sql`)
- ✅ New tables:
  - `listening_sessions` - Track listening sessions
  - `texting_studio_logs` - Track texting studio interactions
  - `points_history` - Complete points transaction history

### 5. API Endpoints

#### Authentication Endpoints
- `POST /api/users/login` - Returns JWT token
- `POST /api/users` - Signup, returns JWT token

#### Points Endpoints
- `POST /api/points/listening` - Record listening session and award points
- `POST /api/points/texting-studio` - Record texting studio interaction and award points
- `GET /api/points/history/{user_id}` - Get points history for a user
- `GET /api/points/leaderboard` - Get top users by points

## 📋 Next Steps

### 1. Run Database Migration
```bash
cd apis
psql -h your-db-host -U your-user -d your-database -f sql/add_points_system.sql
```

Or if using Railway/PostgreSQL:
```bash
# Connect to your database and run:
\i sql/add_points_system.sql
```

### 2. Set JWT Secret Environment Variable
```bash
export JWT_SECRET="your-super-secure-secret-key-here"
```

For Railway, add it in the dashboard under Environment Variables.

### 3. Update Flutter App

#### Update Login/Signup to use JWT tokens:

**File: `app/nrgug/lib/pages/login_screen.dart`**
- Store JWT token in SharedPreferences
- Send token in Authorization header for API calls
- Update API calls to include: `Authorization: Bearer <token>`

**File: `app/nrgug/lib/pages/signup_screen.dart`**
- Store JWT token after signup
- Navigate to home with token

**File: `app/nrgug/lib/config/api_config.dart`**
- Add method to get auth headers with JWT token

#### Track Listening Hours:

**File: `app/nrgug/lib/main.dart`**
- Track radio play time
- Send listening session to API when radio stops or app closes
- Example: If user listens for 30 minutes, send:
  ```dart
  POST /api/points/listening
  {
    "user_id": 123,
    "duration_minutes": 30,
    "start_time": "2025-01-01T10:00:00Z",
    "end_time": "2025-01-01T10:30:00Z"
  }
  ```

#### Texting Studio Integration:

When user sends a text to studio:
```dart
POST /api/points/texting-studio
{
  "user_id": 123,
  "message": "User's message"
}
```

## 📊 Points System Details

### Listening Points
- **Rate**: 1 point per minute
- **Tracking**: Automatic when radio is playing
- **Session**: Recorded when radio stops or app closes

### Texting Studio Points
- **Rate**: 5 points per text message
- **Tracking**: When user sends a message to studio

### Points History
All points are tracked in `points_history` table with:
- User ID
- Points amount
- Source (listening, texting_studio, manual, etc.)
- Description
- Timestamp

## 🔐 JWT Token Usage

### Token Structure
```json
{
  "user_id": 123,
  "email": "user@example.com",
  "role": "user",
  "exp": 1234567890,
  "iat": 1234567890,
  "iss": "nrgug-api"
}
```

### Using Token in API Calls
```dart
headers: {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer $token'
}
```

### Token Validation
The token is valid for 30 days. After expiration, user needs to login again.

## 📝 API Request Examples

### Login
```bash
curl -X POST https://nrgug-api-production.up.railway.app/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

Response:
```json
{
  "user": {
    "id": 123,
    "name": "User Name",
    "email": "user@example.com",
    "role": "user",
    "points": 150,
    "listening_hours": 2.5,
    "texting_studio_points": 25,
    "total_listening_minutes": 150
  },
  "permissions": [],
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Record Listening Session
```bash
curl -X POST https://nrgug-api-production.up.railway.app/api/points/listening \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "user_id": 123,
    "duration_minutes": 30,
    "start_time": "2025-01-01T10:00:00Z",
    "end_time": "2025-01-01T10:30:00Z"
  }'
```

### Record Texting Studio Interaction
```bash
curl -X POST https://nrgug-api-production.up.railway.app/api/points/texting-studio \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "user_id": 123,
    "message": "Hello studio!"
  }'
```

### Get Leaderboard
```bash
curl -X GET "https://nrgug-api-production.up.railway.app/api/points/leaderboard?limit=10"
```

## 🎯 Implementation Status

- ✅ Backend API - Complete
- ✅ Database Schema - Ready (needs migration)
- ⏳ Flutter App Integration - Pending
- ⏳ Database Migration - Pending

## 🔧 Configuration

### Environment Variables
- `JWT_SECRET` - Secret key for JWT token signing (required)

### Database
Run the migration script to add points columns and tables.

## 📚 Files Created/Modified

### New Files
- `apis/utils/jwt.go` - JWT utilities
- `apis/models/points.go` - Points models
- `apis/database/points_repository.go` - Points data operations
- `apis/controllers/points_controller.go` - Points API endpoints
- `apis/sql/add_points_system.sql` - Database migration

### Modified Files
- `apis/models/user.go` - Added points fields
- `apis/database/user_repository.go` - Updated queries to include points
- `apis/controllers/user_controller.go` - Added JWT token generation
- `apis/routes/routes.go` - Added points routes
- `apis/go.mod` - Added JWT dependency

