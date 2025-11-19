# Gmail SMTP Configuration Fix

## ❌ Current Issue
Gmail is rejecting the credentials with error: `535 5.7.8 Username and Password not accepted`

## ✅ Solution Steps

### Step 1: Enable 2-Factor Authentication
1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Sign in with `bestbrodcastingservices@gmail.com`
3. Under "Signing in to Google", click "2-Step Verification"
4. Follow the setup process to enable 2FA

### Step 2: Generate App Password
1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Click "2-Step Verification" (if not already enabled)
3. Scroll down to "App passwords"
4. Click "App passwords"
5. Select "Mail" as the app
6. Select "Other" as the device and name it "NRGUG Email System"
7. Click "Generate"
8. **Copy the 16-character password** (it will look like: `abcd efgh ijkl mnop`)

### Step 3: Update Configuration
Replace the current password with the new App Password:

```bash
export SMTP_USERNAME=bestbrodcastingservices@gmail.com
export SMTP_PASSWORD=your-16-character-app-password-here
export SMTP_HOST=smtp.gmail.com
export SMTP_PORT=587
export FROM_EMAIL=bestbrodcastingservices@gmail.com
export FROM_NAME="Best Broadcasting Services"
export BASE_URL=http://localhost:3000
```

### Step 4: Test Again
Run the test script again:
```bash
cd apis
go run test-smtp-direct.go
```

## 🔍 Common Issues

### Issue 1: "Less secure app access"
- **Solution**: Use App Passwords instead of regular password
- **Don't use**: "Less secure app access" (deprecated by Google)

### Issue 2: "Username and Password not accepted"
- **Solution**: Make sure you're using the App Password, not your regular Gmail password
- **Check**: App Password is exactly 16 characters (no spaces)

### Issue 3: "2-Step Verification required"
- **Solution**: Enable 2FA first, then generate App Password

## 📧 Alternative: Use Different Email Provider

If Gmail continues to have issues, you can use:

### Outlook/Hotmail
```bash
export SMTP_HOST=smtp-mail.outlook.com
export SMTP_PORT=587
export SMTP_USERNAME=your-outlook-email@outlook.com
export SMTP_PASSWORD=your-outlook-password
```

### Yahoo
```bash
export SMTP_HOST=smtp.mail.yahoo.com
export SMTP_PORT=587
export SMTP_USERNAME=your-yahoo-email@yahoo.com
export SMTP_PASSWORD=your-yahoo-app-password
```

## 🎯 Next Steps
1. Follow the Gmail setup steps above
2. Get the App Password
3. Update the environment variables
4. Test again with `go run test-smtp-direct.go`
5. If successful, restart the API with the new credentials
