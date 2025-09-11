# 🚀 ScrapeMaster Pro - Deployment Guide

## Quick Deployment Options

### 1. 🔥 **Vercel (Recommended - Fastest)**

#### Option A: One-Click Deploy
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/scrapemaster-pro)

#### Option B: Manual Vercel Deployment
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy from this directory
vercel --prod

# Set custom domain (optional)
vercel domains add your-domain.com
vercel alias set your-deployment-url.vercel.app your-domain.com
```

**Environment Variables for Vercel:**
- Add in Vercel Dashboard → Settings → Environment Variables
- Copy from `.env.example` and customize values

### 2. 🐳 **Docker Deployment**

#### Prerequisites
- Docker & Docker Compose installed
- Domain name (optional)

#### Quick Start
```bash
# Clone or copy the project files
git clone [your-repo] scrapemaster-pro
cd scrapemaster-pro

# Create environment file
cp .env.example .env
# Edit .env with your values

# Build and start
docker-compose up -d

# Check status
docker-compose ps
```

#### Custom Domain Setup
```bash
# Update nginx.conf with your domain
# Add SSL certificates to ./ssl/ directory
# Restart nginx container
docker-compose restart nginx
```

### 3. ☁️ **Cloud Platform Deployment**

#### AWS (EC2 + RDS)
```bash
# Launch EC2 instance (Ubuntu 22.04)
# Install Docker and Docker Compose
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Clone and deploy
git clone [repo] && cd scrapemaster-pro
cp .env.example .env
# Update .env with RDS connection string
docker-compose up -d
```

#### Google Cloud Platform
```bash
# Use Cloud Run for serverless deployment
gcloud run deploy scrapemaster-pro \
  --image gcr.io/[PROJECT]/scrapemaster-pro \
  --region us-central1 \
  --allow-unauthenticated
```

#### DigitalOcean App Platform
- Connect GitHub repository
- Set environment variables
- Deploy automatically

### 4. 🏠 **Self-Hosted VPS**

#### Ubuntu/Debian Setup
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install pnpm
corepack enable pnpm

# Clone project
git clone [repo] scrapemaster-pro
cd scrapemaster-pro

# Install dependencies
pnpm install

# Build application
pnpm run build --no-lint

# Start with PM2
npm install -g pm2
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

## 🔧 Production Configuration

### Environment Variables Setup
```bash
# Copy example file
cp .env.example .env

# Required variables:
NEXT_PUBLIC_APP_URL=https://your-domain.com
DATABASE_URL=your-database-connection
CLAUDE_API_KEY=your-ai-api-key
PROXY_PROVIDER_API_KEY=your-proxy-service-key

# CRM Integration keys:
SALESFORCE_CLIENT_ID=your-salesforce-key
HUBSPOT_API_KEY=your-hubspot-key
```

### Database Setup
```sql
-- PostgreSQL setup
CREATE DATABASE scrapemaster;
CREATE USER scrapemaster_user WITH PASSWORD 'secure_password';
GRANT ALL PRIVILEGES ON DATABASE scrapemaster TO scrapemaster_user;

-- Tables will be created automatically on first run
```

### SSL Certificate Setup
```bash
# Using Let's Encrypt (free)
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com

# Certificate will auto-renew
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

## 🔐 Security Checklist

### Essential Security Steps
- [ ] Change all default passwords
- [ ] Set strong JWT_SECRET and ENCRYPTION_KEY
- [ ] Enable rate limiting
- [ ] Configure CORS properly
- [ ] Set up SSL/TLS certificates
- [ ] Enable firewall (UFW/iptables)
- [ ] Regular security updates
- [ ] Database backups
- [ ] Monitor logs and errors

### Firewall Configuration
```bash
# Ubuntu UFW
sudo ufw enable
sudo ufw allow ssh
sudo ufw allow 80
sudo ufw allow 443
sudo ufw status
```

## 📊 Monitoring & Maintenance

### Health Checks
```bash
# Application health
curl https://your-domain.com/api/health

# Database connection
curl https://your-domain.com/api/health/db

# System resources
htop
df -h
```

### Log Management
```bash
# Application logs
pm2 logs

# Docker logs
docker-compose logs -f

# System logs
journalctl -f
```

### Backup Strategy
```bash
# Database backup
pg_dump scrapemaster > backup_$(date +%Y%m%d).sql

# File backup
tar -czf backup_files_$(date +%Y%m%d).tar.gz uploads/

# Automated backup script (daily)
#!/bin/bash
pg_dump scrapemaster > /backups/db_$(date +%Y%m%d).sql
tar -czf /backups/files_$(date +%Y%m%d).tar.gz /app/uploads/
# Keep only last 30 days
find /backups -name "*.sql" -mtime +30 -delete
```

## 🔄 Updates & Scaling

### Application Updates
```bash
# Pull latest code
git pull origin main

# Rebuild and restart
docker-compose down
docker-compose build --no-cache
docker-compose up -d

# Or with PM2
git pull
pnpm install
pnpm run build --no-lint
pm2 restart all
```

### Scaling Options
- **Horizontal**: Multiple app instances + load balancer
- **Vertical**: Increase server resources
- **Database**: Read replicas, connection pooling
- **CDN**: Static asset caching
- **Redis**: Session and data caching

## 💡 Custom Domain Setup

### DNS Configuration
```
# A Records
your-domain.com → your-server-ip
www.your-domain.com → your-server-ip

# CNAME (if using cloud platform)
your-domain.com → your-app.platform.com
```

### Domain Verification
```bash
# Check DNS propagation
dig your-domain.com
nslookup your-domain.com

# Test SSL
curl -I https://your-domain.com
```

## 📞 Support & Troubleshooting

### Common Issues
1. **Port 3000 in use**: `sudo lsof -i :3000` and kill process
2. **Database connection**: Check connection string and firewall
3. **SSL issues**: Verify certificate installation
4. **Memory issues**: Increase server RAM or optimize config

### Getting Help
- Check application logs first
- Verify environment variables
- Test database connectivity
- Monitor system resources
- Review security configurations

---

## 🎯 Production Checklist

- [ ] Domain configured and DNS propagated
- [ ] SSL certificate installed and valid
- [ ] Environment variables set correctly
- [ ] Database connected and migrated
- [ ] Email service configured
- [ ] CRM integrations tested
- [ ] Backup strategy implemented
- [ ] Monitoring and logging active
- [ ] Security measures in place
- [ ] Performance optimized

**Your enterprise-grade web scraper is ready for production! 🚀**