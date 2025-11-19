# 🚀 NRGUG Broadcasting Services

A comprehensive broadcasting management system with API and dashboard for news, shows, clients, and subscriber management.

## 📁 Project Structure

```
nrgug/
├── apis/                    # Go API backend
│   ├── main.go             # Main API server
│   ├── main.prod.go        # Production API server
│   ├── middleware/         # Security and logging middleware
│   ├── models/             # Data models
│   ├── controllers/        # API controllers
│   ├── database/           # Database repositories
│   ├── handlers/           # Request handlers
│   ├── routes/             # API routes
│   ├── services/           # Business logic services
│   └── utils/              # Utility functions
├── dashboard/              # Next.js frontend dashboard
│   ├── src/                # Source code
│   ├── public/             # Static assets
│   └── uploads/            # File uploads
├── scripts/                # Production scripts and configs
│   ├── deploy-production.sh
│   ├── test-production-ready.sh
│   ├── create-role-users.sh
│   ├── Dockerfile
│   ├── docker-compose.prod.yml
│   ├── production.env
│   ├── PRODUCTION_DEPLOYMENT.md
│   └── PRODUCTION_READY_SUMMARY.md
├── test/                   # Test scripts
│   ├── test-all-apis.sh
│   └── test-complete-system.sh
└── nginx/                  # Nginx configuration
    └── nginx.conf
```

## 🚀 Quick Start

### Development
```bash
# Start API server
cd apis
go run main.go

# Start dashboard
cd dashboard
npm run dev
```

### Production
```bash
# Deploy to production
./scripts/deploy-production.sh
```

## ✨ Features

- **News Management** - Create, edit, and manage news articles
- **Shows Management** - Schedule and manage broadcasting shows
- **Client Management** - Manage client information and relationships
- **User Management** - Role-based user authentication
- **Subscriber Management** - Email subscription system
- **Email System** - Bulk email with unsubscribe functionality
- **File Uploads** - Image upload with WebP compression
- **Dashboard** - Modern React dashboard with shadcn/ui
- **API** - RESTful API with comprehensive endpoints

## 🛠️ Technology Stack

### Backend
- **Go** - High-performance API server
- **PostgreSQL** - Primary database
- **Redis** - Caching and session storage
- **Docker** - Containerization

### Frontend
- **Next.js** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components
- **Axios** - HTTP client

### Production
- **Nginx** - Reverse proxy and load balancer
- **Docker Compose** - Service orchestration
- **SSL/TLS** - Security encryption
- **WebP** - Image compression

## 📚 Documentation

- **API Documentation** - Available at `/api/docs`
- **Production Guide** - `scripts/PRODUCTION_DEPLOYMENT.md`
- **Production Summary** - `scripts/PRODUCTION_READY_SUMMARY.md`

## 🔧 Configuration

### Environment Variables
Copy `scripts/production.env` and configure:
- Database connection
- SMTP email settings
- Security keys
- Domain configuration

## 🚀 Deployment

The system is production-ready with:
- ✅ Docker containerization
- ✅ Nginx reverse proxy
- ✅ SSL/HTTPS support
- ✅ Security hardening
- ✅ Performance optimization
- ✅ WebP image compression
- ✅ Automated deployment

## 📞 Support

For support and documentation:
- Check the production guides in `scripts/`
- Review API documentation
- Use health check endpoint: `/health`

## 📄 License

NRGUG Broadcasting Services - Production Ready System
