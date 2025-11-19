# 🚀 NRGUG Production Deployment Guide

## Overview
This guide provides comprehensive instructions for deploying the NRGUG Broadcasting Services system to production.

## Prerequisites

### System Requirements
- **OS**: Ubuntu 20.04+ / CentOS 8+ / RHEL 8+
- **RAM**: Minimum 4GB, Recommended 8GB+
- **CPU**: 2+ cores
- **Storage**: 50GB+ available space
- **Network**: Public IP with ports 80, 443, 8080 open

### Software Requirements
- Docker 20.10+
- Docker Compose 2.0+
- Git
- SSL Certificate (Let's Encrypt recommended)

## Quick Start

### 1. Clone Repository
```bash
git clone <your-repo-url>
cd nrgug
```

### 2. Configure Environment
```bash
cp production.env.example production.env
# Edit production.env with your production values
```

### 3. Deploy
```bash
./deploy-production.sh
```

## Detailed Configuration

### Environment Variables

#### Database Configuration
```bash
DB_HOST=your-production-db-host.com
DB_PORT=5432
DB_USER=your-production-user
DB_PASSWORD=your-secure-production-password
DB_NAME=nrgug_production
DB_SSLMODE=require
```

#### Email Configuration
```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=your-production-email@domain.com
SMTP_PASSWORD=your-production-app-password
FROM_EMAIL=your-production-email@domain.com
FROM_NAME="NRGUG Broadcasting Services"
BASE_URL=https://your-production-domain.com
```

#### Security Configuration
```bash
JWT_SECRET=your-super-secure-jwt-secret-key-for-production
BCRYPT_COST=12
CORS_ORIGINS=https://your-production-domain.com,https://www.your-production-domain.com
```

### SSL Certificate Setup

#### Using Let's Encrypt
```bash
# Install Certbot
sudo apt-get install certbot

# Generate certificate
sudo certbot certonly --standalone -d your-domain.com -d www.your-domain.com

# Copy certificates to nginx directory
sudo cp /etc/letsencrypt/live/your-domain.com/fullchain.pem nginx/ssl/cert.pem
sudo cp /etc/letsencrypt/live/your-domain.com/privkey.pem nginx/ssl/key.pem
```

### Domain Configuration

#### Update Nginx Configuration
Edit `nginx/nginx.conf`:
```nginx
server_name your-domain.com www.your-domain.com;
```

#### DNS Configuration
Point your domain to your server's IP address:
```
A    your-domain.com        -> YOUR_SERVER_IP
A    www.your-domain.com    -> YOUR_SERVER_IP
CNAME api.your-domain.com   -> your-domain.com
```

## Production Features

### Security Features
- ✅ **HTTPS Enforcement** - SSL/TLS encryption
- ✅ **Security Headers** - XSS, CSRF, Clickjacking protection
- ✅ **Rate Limiting** - API and upload rate limits
- ✅ **Input Validation** - SQL injection and XSS prevention
- ✅ **CORS Protection** - Configurable cross-origin policies
- ✅ **File Upload Security** - Type and size validation

### Performance Features
- ✅ **WebP Compression** - Automatic image optimization
- ✅ **Gzip Compression** - Response compression
- ✅ **Connection Pooling** - Database connection optimization
- ✅ **Caching** - Redis-based caching
- ✅ **CDN Ready** - Static file serving optimization

### Monitoring Features
- ✅ **Health Checks** - Automated service monitoring
- ✅ **Structured Logging** - Request/response logging
- ✅ **Error Tracking** - Comprehensive error logging
- ✅ **Metrics Collection** - Performance metrics

### Scalability Features
- ✅ **Docker Containerization** - Easy scaling
- ✅ **Load Balancing** - Nginx reverse proxy
- ✅ **Database Optimization** - Indexed queries
- ✅ **Horizontal Scaling** - Multi-instance support

## Maintenance

### Backup Strategy
```bash
# Database backup
docker-compose exec postgres pg_dump -U nrgug_user nrgug_production > backup_$(date +%Y%m%d_%H%M%S).sql

# File backup
tar -czf uploads_backup_$(date +%Y%m%d_%H%M%S).tar.gz uploads/
```

### Monitoring Commands
```bash
# View logs
docker-compose logs -f

# Check service status
docker-compose ps

# Monitor resources
docker stats

# Health check
curl http://localhost:8080/health
```

### Updates
```bash
# Pull latest changes
git pull origin main

# Rebuild and restart
docker-compose up --build -d

# Run migrations
docker-compose exec api ./nrgug-api migrate
```

## Troubleshooting

### Common Issues

#### Service Won't Start
```bash
# Check logs
docker-compose logs api

# Check environment variables
docker-compose config

# Restart services
docker-compose restart
```

#### Database Connection Issues
```bash
# Check database status
docker-compose exec postgres pg_isready -U nrgug_user -d nrgug_production

# Check database logs
docker-compose logs postgres
```

#### Email Issues
```bash
# Test SMTP connection
docker-compose exec api ./nrgug-api test-smtp

# Check email logs
docker-compose logs api | grep -i email
```

### Performance Optimization

#### Database Optimization
```sql
-- Check slow queries
SELECT query, mean_time, calls 
FROM pg_stat_statements 
ORDER BY mean_time DESC 
LIMIT 10;

-- Analyze table statistics
ANALYZE;
```

#### Memory Optimization
```bash
# Monitor memory usage
docker stats --no-stream

# Adjust Docker memory limits
# Edit docker-compose.prod.yml
```

## Security Checklist

- [ ] SSL certificate installed and configured
- [ ] Environment variables secured
- [ ] Database password is strong and unique
- [ ] SMTP credentials are secure
- [ ] CORS origins are properly configured
- [ ] Rate limiting is enabled
- [ ] Security headers are configured
- [ ] File upload restrictions are in place
- [ ] Regular backups are scheduled
- [ ] Monitoring is set up
- [ ] Log rotation is configured
- [ ] Firewall rules are properly configured

## API Documentation

### Endpoints
- **Health Check**: `GET /health`
- **News API**: `GET|POST|PUT|DELETE /api/news`
- **Shows API**: `GET|POST|PUT|DELETE /api/shows`
- **Clients API**: `GET|POST|PUT|DELETE /api/clients`
- **Users API**: `GET|POST|PUT|DELETE /api/users`
- **Subscribers API**: `GET|POST|PUT|DELETE /api/subscribers`
- **Mail Queue API**: `GET|POST|PUT|DELETE /api/mail-queue`
- **File Upload**: `POST /api/upload`

### Authentication
- **Login**: `POST /api/users/login`
- **JWT Token**: Required for protected endpoints

## Support

For production support and issues:
- **Documentation**: Check this guide and API documentation
- **Logs**: Review application and system logs
- **Health Checks**: Use `/health` endpoint for status
- **Monitoring**: Set up alerts for critical metrics

## License

This production deployment is part of the NRGUG Broadcasting Services system.
