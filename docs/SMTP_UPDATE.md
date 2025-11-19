# SMTP Email Update

## Updated Configuration

**New SMTP Email**: `bestbrodcastingservices@gmail.com`

### Railway Environment Variables Updated:
- ✅ `SMTP_USERNAME=bestbrodcastingservices@gmail.com`
- ✅ `FROM_EMAIL=bestbrodcastingservices@gmail.com`

### Default Values Updated:
- Updated `config/email.go` to use `bestbrodcastingservices@gmail.com` as default
- Updated `FROM_NAME` to "NRG Radio Uganda"

## Important Notes

1. **Gmail App Password Required**: 
   - You need to generate a Gmail App Password for `bestbrodcastingservices@gmail.com`
   - Go to: https://myaccount.google.com/apppasswords
   - Generate a password and set it as `SMTP_PASSWORD` in Railway

2. **2FA Must Be Enabled**:
   - Two-factor authentication must be enabled on the Gmail account
   - App passwords only work with 2FA enabled

3. **Current SMTP_PASSWORD**:
   - The current password in Railway may need to be updated
   - Check Railway variables to ensure `SMTP_PASSWORD` is set correctly

## Verification

After deployment, test email sending by:
1. Signing up a new user
2. Check Railway logs for email sending status
3. Verify email arrives from `bestbrodcastingservices@gmail.com`

## Railway Variables Status

Check current variables:
```bash
cd apis
railway variables | grep -i smtp
```

Expected values:
- `SMTP_HOST=smtp.gmail.com`
- `SMTP_PORT=587`
- `SMTP_USERNAME=bestbrodcastingservices@gmail.com`
- `SMTP_PASSWORD=<16-character-app-password>`
- `FROM_EMAIL=bestbrodcastingservices@gmail.com`
- `FROM_NAME=NRG Radio Uganda`

