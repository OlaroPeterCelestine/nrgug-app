# 🚀 NRGUG Complete Deployment Guide

This guide will help you deploy all components of the NRGUG platform.

## 📋 Prerequisites

1. **Node.js 18+** installed
2. **Vercel account** (free tier works)
3. **Railway account** (for API - already deployed)
4. **Git** installed

## 🏗️ Architecture

- **API Backend**: Railway (already deployed)
  - URL: `https://nrgug-api-production.up.railway.app`
- **Admin Dashboard**: Vercel
- **Public Website**: Vercel

## 🚀 Quick Deployment

### Option 1: Deploy Everything (Recommended)

```bash
# From the root directory
./deploy-all.sh
```

This will:
1. Deploy Admin Dashboard to Vercel
2. Deploy Public Website to Vercel
3. Show deployment summary

### Option 2: Deploy Individually

#### Deploy Admin Dashboard

```bash
cd admin
./deploy-vercel.sh
```

#### Deploy Public Website

```bash
cd nrg
./deploy-vercel.sh
```

### Option 3: Manual Vercel Deployment

#### Admin Dashboard

```bash
cd admin
npm install
npm run build
vercel --prod
```

#### Public Website

```bash
cd nrg
npm install
npm run build
vercel --prod
```

## 🔧 Environment Variables

### Admin Dashboard (Vercel)

Set these in Vercel dashboard → Project Settings → Environment Variables:

```
BACKEND_URL=https://nrgug-api-production.up.railway.app
NEXT_PUBLIC_BACKEND_URL=https://nrgug-api-production.up.railway.app
```

### Public Website (Vercel)

The public website already has the API URL configured in `vercel.json`.

## 📝 First Time Setup

1. **Install Vercel CLI** (if not installed):
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   ./deploy-all.sh
   ```

## ✅ Post-Deployment Checklist

- [ ] Admin Dashboard is accessible
- [ ] Public Website is accessible
- [ ] Admin login works
- [ ] API connections are working
- [ ] Images upload correctly
- [ ] All CRUD operations work
- [ ] Video streaming works

## 🔗 Deployment URLs

After deployment, you'll get URLs from Vercel:
- Admin Dashboard: `https://your-admin-project.vercel.app`
- Public Website: `https://your-website-project.vercel.app`

## 🐛 Troubleshooting

### Build Errors

If you encounter build errors:
1. Clear `node_modules` and reinstall:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. Check for TypeScript errors:
   ```bash
   npm run lint
   ```

### API Connection Issues

1. Verify API is running: `https://nrgug-api-production.up.railway.app/health`
2. Check CORS settings in API
3. Verify environment variables in Vercel

### Image Upload Issues

1. Verify Cloudflare R2 credentials in API
2. Check R2 bucket permissions
3. Verify upload endpoint is working

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Railway Documentation](https://docs.railway.app)
- [Next.js Deployment](https://nextjs.org/docs/deployment)

