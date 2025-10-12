# 🚀 GitHub Deployment Guide for NRGUG

This guide covers deploying the NRGUG Broadcasting System using GitHub Actions and various deployment platforms.

## 📋 Prerequisites

- GitHub repository with the NRGUG code
- Railway account (for API deployment)
- Vercel account (for frontend deployments)
- Docker (for local development)

## 🔧 Setup Instructions

### 1. GitHub Repository Setup

1. **Create a new GitHub repository** or push your existing code to GitHub
2. **Enable GitHub Actions** in your repository settings
3. **Set up required secrets** in GitHub repository settings:

#### Required Secrets

Go to `Settings > Secrets and variables > Actions` and add:

**For API Deployment (Railway):**
- `RAILWAY_TOKEN` - Your Railway authentication token

**For Frontend Deployments (Vercel):**
- `VERCEL_TOKEN` - Your Vercel authentication token
- `VERCEL_ORG_ID` - Your Vercel organization ID
- `VERCEL_PROJECT_ID` - Your NRG frontend project ID
- `VERCEL_ADMIN_PROJECT_ID` - Your Admin dashboard project ID

### 2. Railway Setup (API)

1. **Create a Railway account** at [railway.app](https://railway.app)
2. **Create a new project** for your API
3. **Get your Railway token** from account settings
4. **Set up environment variables** in Railway dashboard:
   ```
   DB_HOST=your-db-host
   DB_PORT=5432
   DB_USER=your-db-user
   DB_PASSWORD=your-db-password
   DB_NAME=your-db-name
   SMTP_HOST=your-smtp-host
   SMTP_PORT=587
   SMTP_USERNAME=your-smtp-username
   SMTP_PASSWORD=your-smtp-password
   FROM_EMAIL=your-from-email
   FROM_NAME=NRG Radio
   ```

### 3. Vercel Setup (Frontends)

1. **Create a Vercel account** at [vercel.com](https://vercel.com)
2. **Import your GitHub repository** to Vercel
3. **Create separate projects** for:
   - NRG Frontend (public website)
   - Admin Dashboard
4. **Get project IDs** from Vercel dashboard
5. **Set up environment variables** in Vercel:
   ```
   NEXT_PUBLIC_API_URL=https://your-api-url.railway.app
   ```

## 🚀 Deployment Methods

### Method 1: GitHub Actions (Recommended)

The repository includes GitHub Actions workflows that automatically deploy when you push to the main branch:

#### API Deployment
- **File**: `.github/workflows/api-deploy.yml`
- **Triggers**: Push to main branch with changes in `apis/` folder
- **Platform**: Railway
- **Features**: Automated testing, building, and deployment

#### NRG Frontend Deployment
- **File**: `.github/workflows/nrg-deploy.yml`
- **Triggers**: Push to main branch with changes in `nrg/` folder
- **Platform**: Vercel
- **Features**: Linting, building, and deployment

#### Admin Dashboard Deployment
- **File**: `.github/workflows/admin-deploy.yml`
- **Triggers**: Push to main branch with changes in `admin/` folder
- **Platform**: Vercel
- **Features**: Linting, building, and deployment

### Method 2: Docker Compose (Local Development)

For local development and testing:

```bash
# Clone the repository
git clone https://github.com/yourusername/nrgug.git
cd nrgug

# Create environment file
cp .env.example .env
# Edit .env with your configuration

# Start all services
docker-compose up -d

# View logs
docker-compose logs -f
```

**Services will be available at:**
- API: http://localhost:8080
- NRG Frontend: http://localhost:3000
- Admin Dashboard: http://localhost:3001
- PostgreSQL: localhost:5432

### Method 3: Manual Deployment

#### API (Railway)
```bash
cd apis
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Deploy
railway up
```

#### Frontends (Vercel)
```bash
# NRG Frontend
cd nrg
npx vercel --prod

# Admin Dashboard
cd admin
npx vercel --prod
```

## 🔄 Workflow Triggers

### Automatic Deployment
- **Push to main branch** triggers deployment for changed components
- **Pull requests** trigger testing only (no deployment)
- **Path-based triggers** ensure only relevant components are deployed

### Manual Deployment
- Use GitHub Actions tab to manually trigger workflows
- Use `workflow_dispatch` event for manual triggers

## 📊 Monitoring and Logs

### GitHub Actions
- View deployment status in the "Actions" tab
- Check logs for any deployment issues
- Monitor build and test results

### Railway (API)
- Monitor API health at `https://your-api-url.railway.app/health`
- View logs in Railway dashboard
- Monitor resource usage

### Vercel (Frontends)
- View deployment status in Vercel dashboard
- Monitor performance and analytics
- Check function logs for serverless functions

## 🛠️ Troubleshooting

### Common Issues

1. **Build Failures**
   - Check GitHub Actions logs
   - Verify all dependencies are installed
   - Ensure environment variables are set

2. **Deployment Failures**
   - Verify secrets are correctly set
   - Check platform-specific logs
   - Ensure all required environment variables are configured

3. **Database Connection Issues**
   - Verify database credentials
   - Check network connectivity
   - Ensure database is accessible from deployment platform

### Debug Commands

```bash
# Check API health
curl https://your-api-url.railway.app/health

# Test database connection
# (Use your database client or Railway dashboard)

# Check Vercel deployments
npx vercel ls
```

## 🔒 Security Considerations

1. **Environment Variables**
   - Never commit sensitive data to repository
   - Use GitHub Secrets for sensitive information
   - Rotate secrets regularly

2. **Database Security**
   - Use strong passwords
   - Enable SSL connections
   - Restrict database access

3. **API Security**
   - Implement rate limiting
   - Use HTTPS in production
   - Validate all inputs

## 📈 Scaling and Performance

### API Scaling
- Railway automatically scales based on traffic
- Monitor resource usage in Railway dashboard
- Consider upgrading plan for high traffic

### Frontend Scaling
- Vercel provides automatic scaling
- Use Vercel Analytics for performance monitoring
- Consider CDN optimization for global reach

## 🔄 Continuous Integration

The GitHub Actions workflows include:
- **Automated testing** before deployment
- **Code linting** and formatting checks
- **Build verification** to catch issues early
- **Deployment rollback** capabilities

## 📞 Support

For deployment issues:
1. Check GitHub Actions logs
2. Review platform-specific documentation
3. Check this guide for common solutions
4. Create an issue in the GitHub repository

---

**Happy Deploying! 🚀**
