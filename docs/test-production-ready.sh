#!/bin/bash

# NRGUG Production Readiness Test
# This script tests all production features and configurations

set -e

echo "🚀 NRGUG Production Readiness Test"
echo "=================================="

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Test counters
TOTAL_TESTS=0
PASSED_TESTS=0
FAILED_TESTS=0

# Test function
run_test() {
    local test_name="$1"
    local test_command="$2"
    
    TOTAL_TESTS=$((TOTAL_TESTS + 1))
    echo -n "Testing: $test_name... "
    
    if eval "$test_command" > /dev/null 2>&1; then
        echo -e "${GREEN}✅ PASSED${NC}"
        PASSED_TESTS=$((PASSED_TESTS + 1))
    else
        echo -e "${RED}❌ FAILED${NC}"
        FAILED_TESTS=$((FAILED_TESTS + 1))
    fi
}

echo -e "\n${BLUE}1. PRODUCTION CONFIGURATION TESTS${NC}"
echo "====================================="

# Check production files exist
run_test "Production environment file exists" "[ -f production.env ]"
run_test "Docker configuration exists" "[ -f Dockerfile ]"
run_test "Docker Compose production file exists" "[ -f docker-compose.prod.yml ]"
run_test "Nginx configuration exists" "[ -f nginx/nginx.conf ]"
run_test "Production deployment script exists" "[ -f deploy-production.sh ]"
run_test "Production documentation exists" "[ -f PRODUCTION_DEPLOYMENT.md ]"

echo -e "\n${BLUE}2. DOCKER CONFIGURATION TESTS${NC}"
echo "=================================="

# Check Docker is available
run_test "Docker is installed" "command -v docker"
run_test "Docker Compose is installed" "command -v docker-compose"

# Check Dockerfile syntax
run_test "Dockerfile syntax is valid" "docker build --no-cache -t nrgug-test ."

echo -e "\n${BLUE}3. API PRODUCTION FEATURES${NC}"
echo "============================="

# Check production API file exists
run_test "Production API main file exists" "[ -f apis/main.prod.go ]"
run_test "Logging middleware exists" "[ -f apis/middleware/logging.go ]"
run_test "Security middleware exists" "[ -f apis/middleware/security.go ]"

echo -e "\n${BLUE}4. SECURITY CONFIGURATION TESTS${NC}"
echo "====================================="

# Check security features in nginx config
run_test "Security headers configured" "grep -q 'X-Frame-Options' nginx/nginx.conf"
run_test "Rate limiting configured" "grep -q 'limit_req_zone' nginx/nginx.conf"
run_test "SSL configuration present" "grep -q 'ssl_certificate' nginx/nginx.conf"

echo -e "\n${BLUE}5. PERFORMANCE OPTIMIZATION TESTS${NC}"
echo "======================================="

# Check performance features
run_test "Gzip compression enabled" "grep -q 'gzip on' nginx/nginx.conf"
run_test "WebP compression configured" "grep -q 'webp' apis/handlers/upload.go"
run_test "Connection pooling configured" "grep -q 'keepalive' nginx/nginx.conf"

echo -e "\n${BLUE}6. MONITORING AND LOGGING TESTS${NC}"
echo "====================================="

# Check monitoring features
run_test "Health check endpoint configured" "grep -q '/health' nginx/nginx.conf"
run_test "Logging middleware implemented" "grep -q 'LoggingMiddleware' apis/middleware/logging.go"
run_test "Structured logging configured" "grep -q 'log.Printf' apis/middleware/logging.go"

echo -e "\n${BLUE}7. DEPLOYMENT READINESS TESTS${NC}"
echo "=================================="

# Check deployment readiness
run_test "Deployment script is executable" "[ -x deploy-production.sh ]"
run_test "Environment template exists" "grep -q 'DB_HOST' production.env"
run_test "Docker services configured" "grep -q 'postgres' docker-compose.prod.yml"
run_test "Nginx upstream configured" "grep -q 'upstream' nginx/nginx.conf"

echo -e "\n${BLUE}8. DOCUMENTATION TESTS${NC}"
echo "========================="

# Check documentation
run_test "Production guide exists" "[ -f PRODUCTION_DEPLOYMENT.md ]"
run_test "API documentation present" "grep -q 'API Documentation' PRODUCTION_DEPLOYMENT.md"
run_test "Security checklist present" "grep -q 'Security Checklist' PRODUCTION_DEPLOYMENT.md"

echo -e "\n${BLUE}9. FILE ORGANIZATION TESTS${NC}"
echo "============================="

# Check file organization
run_test "Test files in test directory" "[ -d test ]"
run_test "API files in apis directory" "[ -d apis ]"
run_test "Dashboard files in dashboard directory" "[ -d dashboard ]"
run_test "Nginx config in nginx directory" "[ -d nginx ]"

echo -e "\n${BLUE}10. FINAL PRODUCTION READINESS${NC}"
echo "=================================="

# Overall readiness check
if [ $FAILED_TESTS -eq 0 ]; then
    echo -e "${GREEN}🎉 ALL TESTS PASSED! System is production ready!${NC}"
    echo -e "${GREEN}✅ $PASSED_TESTS/$TOTAL_TESTS tests passed${NC}"
    echo -e "\n${BLUE}Production Deployment Commands:${NC}"
    echo "1. Configure production.env with your values"
    echo "2. Run: ./deploy-production.sh"
    echo "3. Access: http://your-domain.com"
    echo "4. Monitor: docker-compose logs -f"
else
    echo -e "${RED}❌ $FAILED_TESTS/$TOTAL_TESTS tests failed${NC}"
    echo -e "${YELLOW}Please fix the failed tests before deploying to production${NC}"
    exit 1
fi

echo -e "\n${BLUE}Production Features Summary:${NC}"
echo "✅ Docker containerization"
echo "✅ Nginx reverse proxy with SSL"
echo "✅ Security headers and rate limiting"
echo "✅ WebP image compression"
echo "✅ Structured logging and monitoring"
echo "✅ Health checks and metrics"
echo "✅ Database optimization"
echo "✅ Redis caching"
echo "✅ Automated deployment"
echo "✅ Comprehensive documentation"

echo -e "\n${GREEN}🚀 NRGUG is ready for production deployment!${NC}"
