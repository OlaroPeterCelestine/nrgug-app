# Update SMTP Email in Railway

## Email Account
**Use**: `bestbrodcastingservices@gmail.com`

## Steps to Update Railway Environment Variables

### Option 1: Railway Dashboard (Recommended)

1. Go to [Railway Dashboard](https://railway.app)
2. Select your API service/project
3. Click on **"Variables"** tab
4. Update the following variables:

```
SMTP_USERNAME=bestbrodcastingservices@gmail.com
FROM_EMAIL=bestbrodcastingservices@gmail.com
FROM_NAME=NRG Radio Uganda
```

5. **Important**: Update `SMTP_PASSWORD` with a new Gmail App Password for `bestbrodcastingservices@gmail.com`

### Option 2: Railway CLI

If you have Railway CLI installed and linked:

```bash
cd apis
railway variables set SMTP_USERNAME=bestbrodcastingservices@gmail.com
railway variables set FROM_EMAIL=bestbrodcastingservices@gmail.com
railway variables set FROM_NAME="NRG Radio Uganda"
```

## Generate Gmail App Password

1. **Enable 2-Factor Authentication** on `bestbrodcastingservices@gmail.com`:
   - Go to: https://myaccount.google.com/security
   - Enable "2-Step Verification"

2. **Generate App Password**:
   - Go to: https://myaccount.google.com/apppasswords
   - Select:
     - **App**: Mail
     - **Device**: Other (Custom name)
     - **Name**: "NRG Radio API"
   - Click **Generate**
   - Copy the **16-character password** (remove spaces)

3. **Set in Railway**:
   - Variable: `SMTP_PASSWORD`
   - Value: `<your-16-character-app-password>`

## Verify Configuration

After updating, check the variables:

```bash
cd apis
railway variables | grep -i smtp
```

Expected output:
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=bestbrodcastingservices@gmail.com
SMTP_PASSWORD=<16-character-app-password>
FROM_EMAIL=bestbrodcastingservices@gmail.com
FROM_NAME=NRG Radio Uganda
```

## Test Email Sending

After updating:
1. Sign up a new user in the app
2. Check Railway logs for email sending status
3. Verify email arrives from `bestbrodcastingservices@gmail.com`

## Current Status

✅ Code defaults updated to use `bestbrodcastingservices@gmail.com`
⏳ Railway environment variables need to be updated manually via dashboard

