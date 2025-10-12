# 🎵 NRGUG - NRG Radio Uganda Broadcasting System

A comprehensive full-stack broadcasting management system for NRG Radio Uganda, featuring a public website, admin dashboard, and RESTful API.

## 🏗️ Architecture

This project consists of three main components:

### 📡 **API Backend** (`/apis/`)
- **Technology**: Go with Gorilla Mux
- **Database**: PostgreSQL
- **Storage**: Cloudflare R2 + local fallback
- **Deployment**: Railway
- **Features**: RESTful API, email system, file uploads, authentication

### 🌐 **Public Website** (`/nrg/`)
- **Technology**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS
- **Deployment**: Vercel
- **Features**: News, shows, events, merchandise, contact forms

### ⚙️ **Admin Dashboard** (`/admin/`)
- **Technology**: Next.js 15 with TypeScript
- **UI**: Radix UI components
- **Deployment**: Vercel
- **Features**: Content management, analytics, user management

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- Go 1.24+
- PostgreSQL 15+
- Docker (optional)

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/nrgug.git
   cd nrgug
   ```

2. **Set up environment variables**
   ```bash
   cp docs/env.example .env
   # Edit .env with your configuration
   ```

3. **Start with Docker Compose**
   ```bash
   docker-compose up -d
   ```

4. **Or start individual services**
   ```bash
   # API
   cd apis
   go mod tidy
   go run main.go
   
   # NRG Frontend
   cd nrg
   npm install
   npm run dev
   
   # Admin Dashboard
   cd admin
   npm install
   npm run dev
   ```

## 📊 Services

| Service | Port | Description |
|---------|------|-------------|
| API | 8080 | Go REST API |
| NRG Frontend | 3000 | Public website |
| Admin Dashboard | 3001 | Admin interface |
| PostgreSQL | 5432 | Database |

## 🔧 Configuration

### Environment Variables

See `docs/env.example` for all required environment variables:

- **Database**: Connection settings for PostgreSQL
- **Email**: SMTP configuration for notifications
- **Storage**: Cloudflare R2 settings
- **Security**: JWT and encryption secrets

### Database Setup

1. Create PostgreSQL database
2. Run SQL scripts from `apis/sql/`
3. Set database connection in environment variables

## 🚀 Deployment

### GitHub Actions (Recommended)

The project includes automated deployment workflows:

- **API**: Deploys to Railway on push to main
- **Frontends**: Deploy to Vercel on push to main
- **Testing**: Automated testing and linting

See `docs/GITHUB_DEPLOYMENT.md` for detailed setup instructions.

### Manual Deployment

- **API**: Deploy to Railway using Railway CLI
- **Frontends**: Deploy to Vercel using Vercel CLI
- **Docker**: Use provided Dockerfiles for containerized deployment

## 📁 Project Structure

```
nrgug/
├── apis/                    # Go API backend
│   ├── .github/workflows/   # API deployment workflow
│   ├── controllers/         # API controllers
│   ├── database/           # Database repositories
│   ├── models/             # Data models
│   ├── routes/             # API routes
│   └── sql/                # Database scripts
├── nrg/                    # Public website
│   ├── .github/workflows/  # Frontend deployment workflow
│   ├── src/                # Next.js source code
│   └── public/             # Static assets
├── admin/                  # Admin dashboard
│   ├── .github/workflows/  # Admin deployment workflow
│   ├── src/                # Next.js source code
│   └── public/             # Static assets
├── docs/                   # Documentation
├── docker-compose.yml      # Local development setup
└── README.md              # This file
```

## 🎯 Features

### Content Management
- News articles with image uploads
- Radio show scheduling
- Video content management
- Client/partner management
- Hero section configuration

### User Management
- JWT-based authentication
- Role-based access control
- Email subscription system
- Contact form handling

### Email System
- Bulk email campaigns
- Automated notifications
- Unsubscribe functionality
- Delivery tracking

### File Management
- Image upload with WebP conversion
- Cloudflare R2 storage
- Local fallback storage
- Optimized file serving

## 🔒 Security

- JWT authentication
- Input validation
- CORS protection
- Rate limiting
- Secure file uploads
- Environment variable protection

## 📈 Monitoring

- Health check endpoints
- Deployment status tracking
- Error logging
- Performance monitoring
- Database connection monitoring

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is proprietary to NRG Radio Uganda.

## 📞 Support

For support and questions:
- Check the documentation in `docs/`
- Review GitHub Issues
- Contact the development team

---

**Built with ❤️ for NRG Radio Uganda**
