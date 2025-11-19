# Update SMTP Email to bestbrodcastingservices@gmail.com

## ✅ Code Already Updated
The code defaults have been updated to use `bestbrodcastingservices@gmail.com`.

## ⚠️ Action Required: Update Railway Environment Variables

You need to update the environment variables in Railway Dashboard:

### Step 1: Go to Railway Dashboard
1. Visit: https://railway.app
2. Select your API service/project
3. Click on **"Variables"** tab

### Step 2: Update These Variables

Update the following variables:

| Variable | Current Value | New Value |
|----------|--------------|-----------|
| `SMTP_USERNAME` | `nrgug.broadcasting@gmail.com` | `bestbrodcastingservices@gmail.com` |
| `FROM_EMAIL` | `nrgug.broadcasting@gmail.com` | `bestbrodcastingservices@gmail.com` |
| `FROM_NAME` | (optional) | `NRG Radio Uganda` |

### Step 3: Generate Gmail App Password

**Important**: You need a Gmail App Password for `bestbrodcastingservices@gmail.com`:

1. **Enable 2-Factor Authentication**:
   - Go to: https://myaccount.google.com/security
   - Sign in with `bestbrodcastingservices@gmail.com`
   - Enable "2-Step Verification"

2. **Generate App Password**:
   - Go to: https://myaccount.google.com/apppasswords
   - Select:
     - **App**: Mail
     - **Device**: Other (Custom name)
     - **Name**: "NRG Radio API"
   - Click **Generate**
   - Copy the **16-character password** (it looks like: `abcd efgh ijkl mnop`)
   - **Remove spaces** when using it

3. **Update in Railway**:
   - Variable: `SMTP_PASSWORD`
   - Value: `<your-16-character-app-password-without-spaces>`

### Step 4: Verify

After updating, your Railway variables should be:

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=bestbrodcastingservices@gmail.com
SMTP_PASSWORD=<your-16-character-app-password>
FROM_EMAIL=bestbrodcastingservices@gmail.com
FROM_NAME=NRG Radio Uganda
```

### Step 5: Test

1. Sign up a new user in the app
2. Check Railway logs for email sending status
3. Verify email arrives from `bestbrodcastingservices@gmail.com`

## Summary

✅ Code defaults updated  
⏳ **You need to update Railway variables manually via dashboard**  
⏳ **Generate new Gmail App Password for bestbrodcastingservices@gmail.com**

