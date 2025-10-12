# 🔐 GitHub Secrets Setup Guide

This guide will help you configure the required secrets in your GitHub repository to resolve the linter warnings about context access.

## 🚨 Current Issues

The linter is showing warnings for these environment variables:
- `VERCEL_TOKEN`
- `VERCEL_ORG_ID` 
- `VERCEL_PROJECT_ID`
- `VERCEL_ADMIN_PROJECT_ID`
- `RAILWAY_TOKEN`

## 📋 Required GitHub Secrets

### 1. Vercel Secrets (for Frontend Deployments)

#### VERCEL_TOKEN
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click on your profile picture → Settings
3. Go to "Tokens" tab
4. Click "Create Token"
5. Name it "GitHub Actions"
6. Copy the token
7. In GitHub: Settings → Secrets and variables → Actions → New repository secret
8. Name: `VERCEL_TOKEN`
9. Value: [paste your token]

#### VERCEL_ORG_ID
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click on your team/organization
3. Go to Settings → General
4. Copy the "Team ID" (this is your ORG_ID)
5. In GitHub: Settings → Secrets and variables → Actions → New repository secret
6. Name: `VERCEL_ORG_ID`
7. Value: [paste your team ID]

#### VERCEL_PROJECT_ID (for NRG frontend)
1. Go to your NRG project in Vercel
2. Go to Settings → General
3. Copy the "Project ID"
4. In GitHub: Settings → Secrets and variables → Actions → New repository secret
5. Name: `VERCEL_PROJECT_ID`
6. Value: [paste your project ID]

#### VERCEL_ADMIN_PROJECT_ID (for Admin dashboard)
1. Go to your Admin project in Vercel
2. Go to Settings → General
3. Copy the "Project ID"
4. In GitHub: Settings → Secrets and variables → Actions → New repository secret
5. Name: `VERCEL_ADMIN_PROJECT_ID`
6. Value: [paste your admin project ID]

### 2. Railway Secrets (for API Deployment)

#### RAILWAY_TOKEN
1. Go to [Railway Dashboard](https://railway.app/dashboard)
2. Click on your profile → Account Settings
3. Go to "Tokens" tab
4. Click "New Token"
5. Name it "GitHub Actions"
6. Copy the token
7. In GitHub: Settings → Secrets and variables → Actions → New repository secret
8. Name: `RAILWAY_TOKEN`
9. Value: [paste your token]

## 🔧 Step-by-Step Setup

### Step 1: Access GitHub Repository Settings
1. Go to your GitHub repository
2. Click "Settings" tab
3. In the left sidebar, click "Secrets and variables" → "Actions"

### Step 2: Add Vercel Secrets
Add these secrets one by one:

```
VERCEL_TOKEN = [your vercel token]
VERCEL_ORG_ID = [your vercel org/team id]
VERCEL_PROJECT_ID = [your nrg project id]
VERCEL_ADMIN_PROJECT_ID = [your admin project id]
```

### Step 3: Add Railway Secrets
```
RAILWAY_TOKEN = [your railway token]
```

### Step 4: Verify Secrets
1. Go to "Actions" tab in your repository
2. Check that the workflows can access the secrets
3. The linter warnings should disappear once secrets are properly configured

## 🚀 Alternative: Environment-Specific Workflows

If you prefer not to use secrets, you can modify the workflows to use environment variables instead:

### Option 1: Use Environment Variables
```yaml
env:
  VERCEL_TOKEN: ${{ vars.VERCEL_TOKEN }}
  VERCEL_ORG_ID: ${{ vars.VERCEL_ORG_ID }}
  VERCEL_PROJECT_ID: ${{ vars.VERCEL_PROJECT_ID }}
```

### Option 2: Use Repository Variables
1. Go to Settings → Secrets and variables → Actions
2. Click "Variables" tab
3. Add your variables there instead of secrets

## 🔍 Troubleshooting

### Common Issues

1. **"Context access might be invalid"**
   - Ensure the secret exists in your repository
   - Check the secret name matches exactly (case-sensitive)
   - Verify you have the correct permissions

2. **"Secret not found"**
   - Double-check the secret name
   - Ensure you're in the correct repository
   - Verify the secret was saved successfully

3. **"Invalid token"**
   - Regenerate the token from the service provider
   - Check if the token has expired
   - Verify the token has the correct permissions

### Verification Steps

1. **Check Secret Existence:**
   ```bash
   # In your workflow, add a debug step
   - name: Debug secrets
     run: |
       echo "VERCEL_TOKEN exists: ${{ secrets.VERCEL_TOKEN != '' }}"
       echo "RAILWAY_TOKEN exists: ${{ secrets.RAILWAY_TOKEN != '' }}"
   ```

2. **Test Deployment:**
   - Push a small change to trigger the workflow
   - Check the Actions tab for any errors
   - Verify the deployment succeeds

## 📚 Additional Resources

- [GitHub Secrets Documentation](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- [Vercel CLI Documentation](https://vercel.com/docs/cli)
- [Railway CLI Documentation](https://docs.railway.app/develop/cli)

## ✅ Checklist

- [ ] VERCEL_TOKEN added to GitHub secrets
- [ ] VERCEL_ORG_ID added to GitHub secrets
- [ ] VERCEL_PROJECT_ID added to GitHub secrets
- [ ] VERCEL_ADMIN_PROJECT_ID added to GitHub secrets
- [ ] RAILWAY_TOKEN added to GitHub secrets
- [ ] All linter warnings resolved
- [ ] Workflows running successfully
- [ ] Deployments working correctly

Once you've added all the required secrets, the linter warnings should disappear and your GitHub Actions workflows will be able to deploy your applications successfully!
