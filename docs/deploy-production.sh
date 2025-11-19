#!/bin/bash

# NRGUG Production Deployment Script
# This script deploys the NRGUG system to production

set -e

echo "🚀 Starting NRGUG Production Deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
PROJECT_NAME="nrgug"
DOCKER_COMPOSE_FILE="docker-compose.prod.yml"
ENV_FILE="production.env"

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if running as root
if [[ $EUID -eq 0 ]]; then
   print_error "This script should not be run as root for security reasons"
   exit 1
fi

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    print_error "Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    print_error "Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Check if environment file exists
if [ ! -f "$ENV_FILE" ]; then
    print_error "Environment file $ENV_FILE not found. Please create it first."
    exit 1
fi

print_status "Pre-deployment checks passed"

# Create necessary directories
print_status "Creating necessary directories..."
mkdir -p uploads logs nginx/ssl

# Set proper permissions
print_status "Setting file permissions..."
chmod +x deploy-production.sh
chmod 755 uploads logs

# Build and start services
print_status "Building and starting production services..."
docker-compose -f $DOCKER_COMPOSE_FILE --env-file $ENV_FILE up --build -d

# Wait for services to be ready
print_status "Waiting for services to be ready..."
sleep 30

# Health check
print_status "Performing health checks..."

# Check API health
if curl -f http://localhost:8080/health > /dev/null 2>&1; then
    print_success "API health check passed"
else
    print_error "API health check failed"
    exit 1
fi

# Check database connection
if docker-compose -f $DOCKER_COMPOSE_FILE exec -T postgres pg_isready -U nrgug_user -d nrgug_production > /dev/null 2>&1; then
    print_success "Database health check passed"
else
    print_error "Database health check failed"
    exit 1
fi

# Check Redis
if docker-compose -f $DOCKER_COMPOSE_FILE exec -T redis redis-cli ping > /dev/null 2>&1; then
    print_success "Redis health check passed"
else
    print_error "Redis health check failed"
    exit 1
fi

# Run database migrations
print_status "Running database migrations..."
docker-compose -f $DOCKER_COMPOSE_FILE exec -T api ./nrgug-api migrate

# Display service status
print_status "Service status:"
docker-compose -f $DOCKER_COMPOSE_FILE ps

# Display access information
print_success "🎉 NRGUG Production Deployment Completed Successfully!"
echo ""
echo "📊 Service Information:"
echo "  API Server: http://localhost:8080"
echo "  Health Check: http://localhost:8080/health"
echo "  Database: localhost:5432"
echo "  Redis: localhost:6379"
echo ""
echo "📝 Useful Commands:"
echo "  View logs: docker-compose -f $DOCKER_COMPOSE_FILE logs -f"
echo "  Stop services: docker-compose -f $DOCKER_COMPOSE_FILE down"
echo "  Restart services: docker-compose -f $DOCKER_COMPOSE_FILE restart"
echo "  Update services: docker-compose -f $DOCKER_COMPOSE_FILE up --build -d"
echo ""
print_warning "Remember to:"
echo "  1. Configure your domain name in nginx/nginx.conf"
echo "  2. Set up SSL certificates in nginx/ssl/"
echo "  3. Update production.env with your actual production values"
echo "  4. Set up monitoring and backup systems"
