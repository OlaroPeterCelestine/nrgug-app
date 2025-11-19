# Railway Environment Variables Configuration

## Required Environment Variables for NRG Radio API

Copy and paste these into your Railway project's Variables tab:

### Email Configuration (Gmail SMTP)
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=bestbrodcastingservices@gmail.com
SMTP_PASSWORD=YOUR_16_CHARACTER_APP_PASSWORD_HERE
FROM_EMAIL=bestbrodcastingservices@gmail.com
FROM_NAME=NRG Radio Uganda
```

**⚠️ Important**: 
- `SMTP_PASSWORD` must be a Gmail App Password (not your regular password)
- Generate it at: https://myaccount.google.com/apppasswords
- Remove spaces when entering (e.g., `abcd efgh ijkl mnop` → `abcdefghijklmnop`)
- See `HOW_TO_SET_PASSWORD.md` for detailed instructions

### JWT Secret (Required for Authentication)
```
JWT_SECRET=your-super-secure-jwt-secret-key-change-this-in-production
```

### Database Configuration
(Already configured in Railway, but verify these exist)
```
DB_HOST=your-railway-db-host
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your-railway-db-password
DB_NAME=railway
DB_SSLMODE=require
```

### Cloudflare R2 (Optional - for file uploads)
```
R2_ACCESS_KEY_ID=your-r2-access-key
R2_SECRET_ACCESS_KEY=your-r2-secret-key
R2_BUCKET_NAME=nrgug-uploads
R2_ACCOUNT_ID=your-r2-account-id
R2_PUBLIC_URL=your-r2-public-url
```

## Quick Setup Steps

1. **Go to Railway Dashboard** → Your Project → Your API Service → Variables

2. **Add Email Variables** (copy the block above)

3. **Generate Gmail App Password**:
   - Go to: https://myaccount.google.com/apppasswords
   - Enable 2FA first if not already enabled
   - Generate app password for "Mail"
   - Copy the 16-character password
   - Paste it as `SMTP_PASSWORD` (remove spaces)

4. **Set JWT Secret**:
   - Generate a secure random string
   - Use as `JWT_SECRET`

5. **Redeploy** your service after adding variables

## Verification

After setting variables, test email sending:

```bash
# Sign up a test user
curl -X POST https://nrgug-api-production.up.railway.app/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "your-test-email@example.com",
    "password": "testpass123",
    "role": "user"
  }'
```

Check the test email inbox for verification email from `bestbrodcastingservices@gmail.com`

## Your Email Address

**Email**: `bestbrodcastingservices@gmail.com`

This email will be used to send:
- Email verification emails
- Password reset emails (if implemented)
- Contact form notifications
- Other system emails

