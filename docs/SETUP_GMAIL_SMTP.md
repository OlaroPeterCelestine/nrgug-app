# Setup Gmail SMTP for Email Verification

## Quick Setup Guide

✅ **Confirmed Email**: **bestbrodcastingservices@gmail.com**

This is your email address for sending verification emails.

### Step 1: Enable 2-Factor Authentication

1. Go to your Google Account: https://myaccount.google.com/security
2. Under "Signing in to Google", click **2-Step Verification**
3. Follow the prompts to enable 2FA

### Step 2: Generate App Password

1. Go to: https://myaccount.google.com/apppasswords
2. Select:
   - **App**: Mail
   - **Device**: Other (Custom name)
   - **Name**: Enter "NRG Radio API"
3. Click **Generate**
4. Copy the **16-character password** (it will look like: `abcd efgh ijkl mnop`)

### Step 3: Set Environment Variables

#### For Railway Deployment:

1. Go to your Railway project dashboard
2. Click on your API service
3. Go to **Variables** tab
4. Add these variables:

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=bestbrodcastingservices@gmail.com
SMTP_PASSWORD=abcdefghijklmnop
FROM_EMAIL=bestbrodcastingservices@gmail.com
FROM_NAME=NRG Radio Uganda
```

**Important**: 
- Use the 16-character app password (remove spaces)
- Do NOT use your regular Gmail password
- The app password will look like: `abcdefghijklmnop` (no spaces)

#### For Local Development:

Create a `.env` file in the `apis` folder:

```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=bestbrodcastingservices@gmail.com
SMTP_PASSWORD=your-16-character-app-password
FROM_EMAIL=bestbrodcastingservices@gmail.com
FROM_NAME=NRG Radio Uganda
```

### Step 4: Test Email Sending

1. **Sign up a new user** via the API:
   ```bash
   curl -X POST https://nrgug-api-production.up.railway.app/api/users \
     -H "Content-Type: application/json" \
     -d '{
       "name": "Test User",
       "email": "test@example.com",
       "password": "testpass123",
       "role": "user"
     }'
   ```

2. **Check the email** sent to `test@example.com`
3. **Verify the email** using the token from the email

### Troubleshooting

#### Emails not sending?

1. **Check 2FA is enabled** - App passwords only work with 2FA
2. **Verify app password** - Make sure you're using the app password, not regular password
3. **Check spam folder** - Gmail might filter verification emails
4. **Check Railway logs** - Look for SMTP errors in the deployment logs
5. **Test SMTP connection**:
   ```bash
   # Check if SMTP variables are set
   curl https://nrgug-api-production.up.railway.app/health
   ```

#### Common Errors

- **"Invalid credentials"**: You're using the wrong password (use app password, not regular password)
- **"2FA not enabled"**: Enable 2FA first, then generate app password
- **"Connection timeout"**: Check firewall/network settings
- **"Email not received"**: Check spam folder, verify email address is correct

### Security Best Practices

✅ **DO:**
- Use app passwords (not regular passwords)
- Store passwords in environment variables only
- Never commit passwords to git
- Use 2FA on your Gmail account

❌ **DON'T:**
- Use your regular Gmail password
- Commit `.env` files to git
- Share app passwords publicly
- Disable 2FA

### Email Verification Flow

1. User signs up → API creates user account
2. API generates verification token
3. API sends verification email to user
4. User clicks link in email
5. User is verified → Can now login

### Next Steps

After setting up SMTP:

1. ✅ Test signup flow
2. ✅ Verify email arrives
3. ✅ Test email verification
4. ✅ Test login after verification

Your email is now configured! 🎉

