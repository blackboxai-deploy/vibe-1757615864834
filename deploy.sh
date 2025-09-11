#!/bin/bash

# ScrapeMaster Pro - Quick Deployment Script
# Usage: ./deploy.sh [platform] [domain]

set -e

echo "🚀 ScrapeMaster Pro - Deployment Script"
echo "========================================"

PLATFORM=${1:-vercel}
DOMAIN=${2:-}

echo "📋 Platform: $PLATFORM"
echo "🌐 Domain: ${DOMAIN:-"auto-generated"}"
echo ""

# Check prerequisites
check_prerequisites() {
    echo "🔍 Checking prerequisites..."
    
    if ! command -v node &> /dev/null; then
        echo "❌ Node.js not found. Please install Node.js 18+"
        exit 1
    fi
    
    if ! command -v pnpm &> /dev/null; then
        echo "📦 Installing pnpm..."
        corepack enable pnpm
    fi
    
    echo "✅ Prerequisites check passed"
}

# Build application
build_app() {
    echo "🔨 Building application..."
    pnpm install
    pnpm run build --no-lint
    echo "✅ Build successful"
}

# Deploy to Vercel
deploy_vercel() {
    echo "🚀 Deploying to Vercel..."
    
    if ! command -v vercel &> /dev/null; then
        echo "📦 Installing Vercel CLI..."
        npm i -g vercel
    fi
    
    echo "🔐 Vercel login required..."
    vercel login
    
    echo "🚀 Starting deployment..."
    if [ -n "$DOMAIN" ]; then
        vercel --prod --alias $DOMAIN
        echo "✅ Deployed to: https://$DOMAIN"
    else
        URL=$(vercel --prod | tail -1)
        echo "✅ Deployed to: $URL"
    fi
}

# Deploy with Docker
deploy_docker() {
    echo "🐳 Deploying with Docker..."
    
    if ! command -v docker &> /dev/null; then
        echo "❌ Docker not found. Please install Docker"
        exit 1
    fi
    
    echo "📝 Creating environment file..."
    if [ ! -f .env ]; then
        cp .env.example .env
        echo "⚠️  Please edit .env with your configuration"
        echo "📝 Opening .env file..."
        ${EDITOR:-nano} .env
    fi
    
    echo "🚀 Starting Docker deployment..."
    docker-compose up -d
    
    echo "✅ Deployment complete!"
    echo "🌐 Access your app at: http://localhost:3000"
    
    if [ -n "$DOMAIN" ]; then
        echo "🔧 Configure your domain to point to this server"
        echo "📝 Update nginx.conf with your domain settings"
    fi
}

# Deploy to VPS
deploy_vps() {
    echo "🏠 Setting up VPS deployment..."
    
    echo "📦 Installing PM2..."
    if ! command -v pm2 &> /dev/null; then
        npm install -g pm2
    fi
    
    echo "📝 Creating environment file..."
    if [ ! -f .env ]; then
        cp .env.example .env
        echo "⚠️  Please edit .env with your configuration"
        ${EDITOR:-nano} .env
    fi
    
    echo "🚀 Starting with PM2..."
    pm2 start ecosystem.config.js
    pm2 save
    pm2 startup
    
    echo "✅ Deployment complete!"
    echo "🌐 Access your app at: http://localhost:3000"
    
    echo "🔧 Next steps:"
    echo "  1. Configure reverse proxy (nginx)"
    echo "  2. Set up SSL certificate"
    echo "  3. Configure firewall"
}

# Setup SSL with Let's Encrypt
setup_ssl() {
    if [ -n "$DOMAIN" ] && [ "$PLATFORM" = "vps" ]; then
        echo "🔒 Setting up SSL certificate..."
        
        if command -v certbot &> /dev/null; then
            sudo certbot --nginx -d $DOMAIN
            echo "✅ SSL certificate installed"
        else
            echo "📦 Install certbot for SSL: sudo apt install certbot python3-certbot-nginx"
        fi
    fi
}

# Health check
health_check() {
    echo "🏥 Running health check..."
    sleep 5
    
    if curl -f http://localhost:3000/api/health > /dev/null 2>&1; then
        echo "✅ Health check passed"
        echo "📊 Application is running successfully"
    else
        echo "❌ Health check failed"
        echo "🔍 Check logs: pm2 logs (for PM2) or docker-compose logs (for Docker)"
    fi
}

# Main deployment flow
main() {
    check_prerequisites
    build_app
    
    case $PLATFORM in
        "vercel")
            deploy_vercel
            ;;
        "docker")
            deploy_docker
            health_check
            ;;
        "vps")
            deploy_vps
            setup_ssl
            health_check
            ;;
        *)
            echo "❌ Unknown platform: $PLATFORM"
            echo "📋 Supported platforms: vercel, docker, vps"
            exit 1
            ;;
    esac
    
    echo ""
    echo "🎉 Deployment Complete!"
    echo "========================"
    echo "✅ ScrapeMaster Pro is now running"
    echo "🌐 Platform: $PLATFORM"
    echo "📱 Features: AI scraping, multi-bot, CRM, analytics"
    echo "🔧 Admin: /config"
    echo "📚 Docs: README-DEPLOYMENT.md"
    echo ""
    echo "🚀 Happy scraping!"
}

# Handle script interruption
trap 'echo "❌ Deployment interrupted"; exit 1' INT

# Run main deployment
main

# Make script executable
chmod +x deploy.sh