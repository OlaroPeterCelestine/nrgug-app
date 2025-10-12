# 🔐 GitHub Secrets Quick Reference

## Required Secrets for NRGUG Project

| Secret Name | Description | Where to Find | Example |
|-------------|-------------|---------------|---------|
| `VERCEL_TOKEN` | Vercel API token | Vercel Dashboard → Settings → Tokens | `vercel_abc123...` |
| `VERCEL_ORG_ID` | Vercel team/organization ID | Vercel Dashboard → Team Settings → General | `team_xyz789...` |
| `VERCEL_PROJECT_ID` | NRG frontend project ID | Vercel Project → Settings → General | `prj_abc123...` |
| `VERCEL_ADMIN_PROJECT_ID` | Admin dashboard project ID | Vercel Project → Settings → General | `prj_def456...` |
| `RAILWAY_TOKEN` | Railway API token | Railway Dashboard → Account → Tokens | `railway_xyz789...` |

## 🚀 Quick Setup Commands

### Using GitHub CLI (Recommended)
```bash
# Run the setup script
./setup-github-secrets.sh

# Or set secrets manually
gh secret set VERCEL_TOKEN --body "your_token_here"
gh secret set VERCEL_ORG_ID --body "your_org_id_here"
gh secret set VERCEL_PROJECT_ID --body "your_project_id_here"
gh secret set VERCEL_ADMIN_PROJECT_ID --body "your_admin_project_id_here"
gh secret set RAILWAY_TOKEN --body "your_railway_token_here"
```

### Using GitHub Web Interface
1. Go to your repository → Settings
2. Secrets and variables → Actions
3. Click "New repository secret"
4. Add each secret with the exact name and value

## 🔍 Verification

```bash
# List all secrets
gh secret list

# Test workflow
git add . && git commit -m "test: trigger workflow" && git push
```

## 📋 Checklist

- [ ] All 5 secrets added to GitHub
- [ ] Secret names match exactly (case-sensitive)
- [ ] No linter warnings about context access
- [ ] Workflows run successfully
- [ ] Deployments work correctly

## 🆘 Troubleshooting

| Error | Solution |
|-------|----------|
| "Context access might be invalid" | Secret not found or misnamed |
| "Secret not found" | Check secret name and repository |
| "Invalid token" | Regenerate token from service provider |
| "Permission denied" | Check repository permissions |

## 📚 Full Documentation

See `GITHUB_SECRETS_SETUP.md` for detailed instructions.
