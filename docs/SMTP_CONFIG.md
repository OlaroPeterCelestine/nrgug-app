# SMTP Configuration for Email Verification

## Email Service Configuration

The email service is configured to use Gmail SMTP for sending verification emails.

### Required Environment Variables

Set these environment variables in your deployment (Railway, Heroku, etc.):

```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=bestbrodcastingservices@gmail.com
SMTP_PASSWORD=your-16-character-app-password
FROM_EMAIL=bestbrodcastingservices@gmail.com
FROM_NAME=NRG Radio Uganda
```

**Your Email**: `bestbrodcastingservices@gmail.com`

### Gmail App Password Setup

Since you're using Gmail, you need to:

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate an App Password**:
   - Go to: https://myaccount.google.com/apppasswords
   - Select "Mail" and "Other (Custom name)"
   - Enter "NRG Radio API" as the name
   - Copy the 16-character password
   - Use this as `SMTP_PASSWORD` (not your regular Gmail password)

### Testing SMTP Configuration

You can test the SMTP configuration by:

1. **Signing up a new user** - This will trigger a verification email
2. **Checking the logs** for any SMTP errors
3. **Verifying the email** arrives in the user's inbox

### Email Templates

The verification email includes:
- Professional HTML template
- Verification link with token
- 24-hour expiry notice
- Branded with NRG Radio Uganda styling

### Troubleshooting

If emails aren't sending:

1. **Check SMTP credentials** are correct
2. **Verify App Password** is set (not regular password)
3. **Check 2FA is enabled** on Gmail account
4. **Check spam folder** - emails might be filtered
5. **Review server logs** for SMTP errors

### Security Notes

- Never commit SMTP passwords to git
- Use environment variables only
- App passwords are safer than regular passwords
- Consider using a dedicated email service (SendGrid, Mailgun) for production

