# NRG UG - Complete Radio Station Platform

A comprehensive radio station platform consisting of a Go API backend, Next.js public website, and Next.js admin dashboard.

## 🏗️ Project Structure

```
nrgug/
├── apis/          # Go API Backend (Railway deployed)
├── nrg/           # Next.js Public Website (Vercel deployed)
├── admin/         # Next.js Admin Dashboard (Vercel deployed)
├── docs/          # Documentation and guides
└── .github/       # GitHub Actions workflows
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- Go 1.21+
- PostgreSQL
- Git

### Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/OlaroPeterCelestine/nrgug-website.git
   cd nrgug
   ```

2. **API Backend**
   ```bash
   cd apis
   go mod download
   go run main.go
   ```

3. **Public Website**
   ```bash
   cd nrg
   npm install
   npm run dev
   ```

4. **Admin Dashboard**
   ```bash
   cd admin
   npm install
   npm run dev
   ```

## 📚 Documentation

- [Complete Web App Report](docs/NRGUG_WEB_APP_REPORT.md)
- [GitHub Secrets Setup](docs/GITHUB_SECRETS_SETUP.md)
- [Streaming Configuration](docs/STREAMING_CONFIG.md)
- [Quick Reference](docs/GITHUB_SECRETS_QUICK_REFERENCE.md)

## 🌐 Live Deployments

- **Public Website**: [nrgug-website.vercel.app](https://nrgug-website.vercel.app)
- **API Backend**: [nrgug-api-production.up.railway.app](https://nrgug-api-production.up.railway.app)
- **Admin Dashboard**: [nrgug-admin.vercel.app](https://nrgug-admin.vercel.app)

## 🛠️ Tech Stack

### Backend (APIs)
- **Go** with Gorilla Mux
- **PostgreSQL** database
- **Railway** deployment
- **Cloudflare R2** storage

### Frontend (NRG Website)
- **Next.js 15** with App Router
- **TypeScript**
- **Tailwind CSS**
- **Vercel** deployment

### Admin Dashboard
- **Next.js 15** with App Router
- **TypeScript**
- **Tailwind CSS**
- **Vercel** deployment

## 🎯 Features

- **Live Audio Streaming** - Real-time radio broadcast
- **Live Video Streaming** - Visual radio experience
- **Real-time Schedule** - Dynamic show scheduling
- **News Management** - Content management system
- **User Authentication** - Secure admin access
- **Mobile Responsive** - Optimized for all devices
- **SEO Optimized** - Search engine friendly

## 📱 Mobile App

A Flutter mobile application with the same features as the website, including:
- Live streaming
- Schedule viewing
- News reading
- Gamification system
- Push notifications

## 🔧 Development

Each component can be developed independently:

- **APIs**: Go backend with PostgreSQL
- **NRG Website**: Next.js frontend
- **Admin**: Next.js admin dashboard

## 📄 License

This project is proprietary to NRG Radio Uganda.

## 🤝 Contributing

This is a private project. For access or questions, contact the development team.

---

**NRG Radio Uganda** - The Number One Name in Music 🎵