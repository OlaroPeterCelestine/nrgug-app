# How to Set Gmail App Password in Railway

## ⚠️ Security Note
**Never commit passwords to git or share them publicly!**

## Step-by-Step: Setting SMTP Password in Railway

### 1. Generate Gmail App Password

1. **Enable 2FA** (if not already enabled):
   - Go to: https://myaccount.google.com/security
   - Enable "2-Step Verification"

2. **Generate App Password**:
   - Go to: https://myaccount.google.com/apppasswords
   - Select:
     - **App**: Mail
     - **Device**: Other (Custom name)
     - **Name**: "NRG Radio API"
   - Click **Generate**
   - **Copy the 16-character password** (e.g., `abcd efgh ijkl mnop`)

### 2. Add Password to Railway

1. **Go to Railway Dashboard**:
   - Visit: https://railway.app
   - Select your project
   - Click on your API service

2. **Open Variables Tab**:
   - Click on **Variables** tab
   - You'll see existing environment variables

3. **Add SMTP_PASSWORD**:
   - Click **+ New Variable**
   - **Key**: `SMTP_PASSWORD`
   - **Value**: Paste your 16-character app password (remove spaces)
     - Example: If Google shows `abcd efgh ijkl mnop`
     - Enter: `abcdefghijklmnop` (no spaces)
   - Click **Add**

4. **Verify Other Variables Exist**:
   Make sure these are also set:
   ```
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USERNAME=bestbrodcastingservices@gmail.com
   FROM_EMAIL=bestbrodcastingservices@gmail.com
   FROM_NAME=NRG Radio Uganda
   ```

### 3. Redeploy Service

After adding the password:
- Railway will automatically redeploy
- Or click **Deploy** to manually trigger redeployment

### 4. Test Email Sending

Test that emails work:

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

Check the test email inbox for verification email.

## 🔒 Password Security

✅ **DO:**
- Store password only in Railway environment variables
- Use Gmail App Password (not your regular password)
- Keep app password private

❌ **DON'T:**
- Commit password to git
- Share password publicly
- Use your regular Gmail password
- Store password in code files

## Troubleshooting

### Password Not Working?

1. **Check format**: Remove all spaces from app password
2. **Verify 2FA**: Must have 2FA enabled to use app passwords
3. **Check Railway logs**: Look for SMTP authentication errors
4. **Regenerate password**: If needed, generate a new app password

### Common Errors

- **"Invalid credentials"**: Wrong password or using regular password instead of app password
- **"2FA required"**: Enable 2FA first, then generate app password
- **"Connection refused"**: Check SMTP_HOST and SMTP_PORT are correct

## Quick Checklist

- [ ] 2FA enabled on Gmail account
- [ ] App password generated
- [ ] `SMTP_PASSWORD` added to Railway (no spaces)
- [ ] Other SMTP variables set in Railway
- [ ] Service redeployed
- [ ] Test email sent successfully

Your email: **bestbrodcastingservices@gmail.com**

