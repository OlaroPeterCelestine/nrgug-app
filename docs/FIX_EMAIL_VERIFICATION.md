# Fix Email Verification - Not Receiving Confirmation Emails

## Problem
Users are not receiving confirmation emails when signing up.

## Root Cause
The email sending is happening in a goroutine (async) and errors are silently ignored. If SMTP configuration is missing or incorrect, the emails fail silently.

## Solution Applied

### 1. Added Error Logging
- Added logging to `SendVerificationEmail` function
- Errors are now logged to help diagnose issues
- Logs include: token generation, verification record creation, and email sending

### 2. Check SMTP Configuration

**Required Environment Variables in Railway:**
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=bestbrodcastingservices@gmail.com
SMTP_PASSWORD=your-16-character-app-password
FROM_EMAIL=bestbrodcastingservices@gmail.com
FROM_NAME=NRG Radio Uganda
```

### 3. Verify SMTP Settings

**To check if SMTP is configured in Railway:**
```bash
cd apis
railway variables | grep -i smtp
```

**To set SMTP variables in Railway:**
1. Go to Railway dashboard
2. Select your API service
3. Go to "Variables" tab
4. Add/update the SMTP variables above

### 4. Gmail App Password Setup

If using Gmail, you need:
1. **Enable 2-Factor Authentication** on `bestbrodcastingservices@gmail.com`
2. **Generate App Password**:
   - Go to: https://myaccount.google.com/apppasswords
   - Select "Mail" and "Other (Custom name)"
   - Enter "NRG Radio API"
   - Copy the 16-character password (remove spaces)
   - Use this as `SMTP_PASSWORD`

### 5. Check Railway Logs

After deploying, check Railway logs for email errors:
```bash
railway logs
```

Look for:
- `ERROR: Failed to send verification email` - SMTP configuration issue
- `SMTP configuration not set` - Missing environment variables
- `failed to send email` - SMTP authentication or connection error

### 6. Test Email Sending

After fixing SMTP configuration:
1. Sign up a new user via the app
2. Check Railway logs for email sending status
3. Check the user's email inbox (and spam folder)

## Common Issues

### Issue 1: "SMTP configuration not set"
**Solution:** Add all SMTP environment variables in Railway

### Issue 2: "authentication failed"
**Solution:** 
- Use Gmail App Password (not regular password)
- Ensure 2FA is enabled
- Remove spaces from app password

### Issue 3: "connection refused"
**Solution:**
- Check `SMTP_HOST` is `smtp.gmail.com`
- Check `SMTP_PORT` is `587`
- Check firewall/network settings

### Issue 4: Emails go to spam
**Solution:**
- This is normal for new email senders
- Users should check spam folder
- Consider using a dedicated email service (SendGrid, Mailgun) for better deliverability

## Next Steps

1. **Check Railway Variables:**
   ```bash
   cd apis
   railway variables
   ```

2. **Verify SMTP credentials are set**

3. **Deploy the updated code with error logging**

4. **Test signup and check logs:**
   ```bash
   railway logs --follow
   ```

5. **Check for error messages in logs**

## Files Changed

- `apis/controllers/user_controller.go` - Added error logging for email sending
- `apis/controllers/email_verification_controller.go` - Added detailed error logging

