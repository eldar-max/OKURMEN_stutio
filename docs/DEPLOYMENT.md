# Deployment Guide - ОКУРМЭН Platform

## Overview

Руководство по развертыванию платформы ОКУРМЭН в production.

---

## Prerequisites

- Node.js 18+ и npm
- PostgreSQL 14+
- Domain name (например, okurmen.kg)
- SSL Certificate
- Telegram Bot Token

---

## Frontend Deployment

### Option 1: Vercel (Рекомендуется)

1. **Push код на GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/okurmen-frontend.git
git push -u origin main
```

2. **Connect Vercel**
- Зайти на [vercel.com](https://vercel.com)
- Import project from GitHub
- Выбрать репозиторий

3. **Configure Environment Variables**
```env
VITE_API_URL=https://api.okurmen.kg/api
VITE_TELEGRAM_BOT_TOKEN=your_bot_token
VITE_ENV=production
```

4. **Deploy**
- Vercel автоматически деплоит при каждом push
- Получите URL: `https://okurmen-frontend.vercel.app`

5. **Custom Domain**
- Settings → Domains
- Добавить `okurmen.kg`
- Настроить DNS записи

### Option 2: Netlify

Аналогично Vercel:
1. Push на GitHub
2. Connect на [netlify.com](https://netlify.com)
3. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Add environment variables
5. Deploy

### Option 3: VPS (Manual)

**На сервере:**

```bash
# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install nginx
sudo apt install nginx

# Clone repository
git clone https://github.com/yourusername/okurmen-frontend.git
cd okurmen-frontend

# Install dependencies
npm install

# Create .env file
nano .env
# Add: VITE_API_URL=https://api.okurmen.kg/api

# Build
npm run build

# Copy to nginx
sudo cp -r dist/* /var/www/okurmen/

# Configure nginx
sudo nano /etc/nginx/sites-available/okurmen
```

**Nginx config:**
```nginx
server {
    listen 80;
    server_name okurmen.kg www.okurmen.kg;

    root /var/www/okurmen;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/okurmen /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

# Install SSL (Let's Encrypt)
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d okurmen.kg -d www.okurmen.kg
```

---

## Backend Deployment

### Database Setup

**1. Install PostgreSQL**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
```

**2. Create Database**
```bash
sudo -u postgres psql

CREATE DATABASE okurmen;
CREATE USER okurmen_user WITH PASSWORD 'secure_password';
GRANT ALL PRIVILEGES ON DATABASE okurmen TO okurmen_user;
\q
```

**3. Run Migrations**
```bash
# Используйте ваш инструмент миграций
# Например, Prisma:
npx prisma migrate deploy

# Или выполните SQL скрипт:
psql -U okurmen_user -d okurmen -f database_schema.sql
```

### Backend Application

**Option 1: PM2 (Рекомендуется для Node.js)**

```bash
# Install PM2
npm install -g pm2

# Clone backend repository
git clone https://github.com/yourusername/okurmen-backend.git
cd okurmen-backend

# Install dependencies
npm install

# Create .env file
nano .env
```

**.env file:**
```env
PORT=3000
NODE_ENV=production
DATABASE_URL=postgresql://okurmen_user:secure_password@localhost:5432/okurmen
JWT_SECRET=your_very_secure_secret_key_change_this
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_CHAT_ID=your_chat_id
CORS_ORIGIN=https://okurmen.kg
```

```bash
# Start with PM2
pm2 start npm --name "okurmen-api" -- start

# Save PM2 config
pm2 save

# Setup PM2 startup
pm2 startup
# Follow the instructions

# View logs
pm2 logs okurmen-api

# Monitor
pm2 monit
```

**Nginx reverse proxy для API:**
```nginx
server {
    listen 80;
    server_name api.okurmen.kg;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

```bash
# Enable and restart nginx
sudo ln -s /etc/nginx/sites-available/api /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

# Setup SSL for API
sudo certbot --nginx -d api.okurmen.kg
```

---

## Telegram Bot Configuration

**1. Create Bot**
```
1. Открыть Telegram и найти @BotFather
2. Отправить /newbot
3. Следовать инструкциям
4. Получить токен: 1234567890:ABCdefGHIjklMNOpqrsTUVwxyz
```

**2. Get Chat ID**
```
1. Найти @userinfobot
2. Отправить /start
3. Скопировать ID
```

**3. Test Bot**
```bash
curl -X POST "https://api.telegram.org/bot<YOUR_BOT_TOKEN>/sendMessage" \
  -d "chat_id=<YOUR_CHAT_ID>" \
  -d "text=Hello from OKURMEN!"
```

---

## Security Checklist

### Frontend
- [ ] HTTPS enabled (SSL certificate)
- [ ] Environment variables не в репозитории
- [ ] Content Security Policy настроен
- [ ] XSS protection enabled
- [ ] CORS правильно настроен

### Backend
- [ ] JWT secret secure и уникальный
- [ ] Database passwords secure
- [ ] Rate limiting настроен
- [ ] Input validation включена
- [ ] SQL injection protection
- [ ] HTTPS only для API
- [ ] Helmet.js настроен (для Express)
- [ ] Environment variables secure

### Database
- [ ] Strong password
- [ ] Firewall настроен (только localhost или specific IPs)
- [ ] Regular backups настроены
- [ ] SSL connection enabled

---

## Monitoring

### Setup Monitoring

**1. PM2 Monitoring**
```bash
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 7
```

**2. Database Monitoring**
```sql
-- Check connections
SELECT count(*) FROM pg_stat_activity;

-- Check database size
SELECT pg_size_pretty(pg_database_size('okurmen'));

-- Slow queries
CREATE EXTENSION pg_stat_statements;
```

**3. Application Monitoring (Optional)**
- Sentry для error tracking
- Google Analytics для аналитики
- Uptime Robot для мониторинга доступности

---

## Backup Strategy

### Database Backups

**Automatic daily backups:**
```bash
# Create backup script
sudo nano /usr/local/bin/backup-okurmen-db.sh
```

```bash
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups/okurmen"
mkdir -p $BACKUP_DIR

pg_dump -U okurmen_user okurmen | gzip > $BACKUP_DIR/okurmen_$DATE.sql.gz

# Keep only last 30 days
find $BACKUP_DIR -name "okurmen_*.sql.gz" -mtime +30 -delete
```

```bash
# Make executable
sudo chmod +x /usr/local/bin/backup-okurmen-db.sh

# Add to crontab (daily at 2 AM)
sudo crontab -e
0 2 * * * /usr/local/bin/backup-okurmen-db.sh
```

### Application Backups
```bash
# Backup uploaded files (if any)
rsync -avz /var/www/okurmen/uploads /backups/okurmen/uploads_$(date +%Y%m%d)
```

---

## Scaling

### Horizontal Scaling

**Load Balancer (Nginx):**
```nginx
upstream backend {
    server 127.0.0.1:3000;
    server 127.0.0.1:3001;
    server 127.0.0.1:3002;
}

server {
    listen 80;
    server_name api.okurmen.kg;
    
    location / {
        proxy_pass http://backend;
    }
}
```

**Start multiple instances:**
```bash
pm2 start npm --name "okurmen-api-1" -- start
pm2 start npm --name "okurmen-api-2" -- start -- --port 3001
pm2 start npm --name "okurmen-api-3" -- start -- --port 3002
```

### Database Scaling

**Read Replicas:**
- Настроить PostgreSQL replication
- Читающие запросы -> replica
- Записывающие запросы -> master

---

## Maintenance

### Update Application

**Frontend:**
```bash
cd okurmen-frontend
git pull origin main
npm install
npm run build
sudo cp -r dist/* /var/www/okurmen/
```

**Backend:**
```bash
cd okurmen-backend
git pull origin main
npm install
pm2 restart okurmen-api
```

### Database Migrations
```bash
# Run new migrations
npx prisma migrate deploy
# Or your migration tool

# Backup before migration!
pg_dump okurmen > backup_before_migration.sql
```

---

## Troubleshooting

### Common Issues

**Frontend не загружается:**
```bash
# Check nginx
sudo nginx -t
sudo systemctl status nginx
sudo tail -f /var/log/nginx/error.log

# Check permissions
ls -la /var/www/okurmen
```

**Backend не отвечает:**
```bash
# Check PM2
pm2 status
pm2 logs okurmen-api

# Check port
netstat -tulpn | grep 3000

# Restart
pm2 restart okurmen-api
```

**Database connection error:**
```bash
# Check PostgreSQL
sudo systemctl status postgresql
sudo -u postgres psql -c "SELECT version();"

# Check connections
sudo -u postgres psql -d okurmen -c "SELECT count(*) FROM pg_stat_activity;"
```

**Telegram notifications not working:**
```bash
# Test bot
curl "https://api.telegram.org/bot<TOKEN>/getMe"

# Check logs
pm2 logs okurmen-api | grep telegram
```

---

## Performance Optimization

### Frontend
- [x] Vite build optimization (уже настроено)
- [x] Code splitting
- [x] Lazy loading images
- [ ] CDN для статических файлов
- [ ] Compression (gzip/brotli)
- [ ] Browser caching

### Backend
- [ ] Database indexing (уже в schema)
- [ ] Redis для кеширования
- [ ] API rate limiting
- [ ] Query optimization
- [ ] Connection pooling

### Database
```sql
-- Add indexes for common queries
CREATE INDEX CONCURRENTLY idx_bookings_created_date 
  ON bookings(created_at DESC);

-- Analyze tables
ANALYZE bookings;
ANALYZE students;
ANALYZE payments;

-- Vacuum
VACUUM ANALYZE;
```

---

## Cost Estimation

### Basic Setup (Small - Medium)
- **Frontend (Vercel):** Free tier
- **Backend VPS:** $5-10/month (DigitalOcean, Hetzner)
- **Database:** Included in VPS
- **Domain:** $10-15/year
- **SSL:** Free (Let's Encrypt)

**Total:** ~$7-12/month

### Professional Setup (Medium - Large)
- **Frontend (Vercel Pro):** $20/month
- **Backend VPS:** $20-40/month
- **Managed Database:** $15-30/month
- **CDN:** $10-20/month
- **Monitoring:** $10-20/month

**Total:** ~$75-130/month

---

## Support

После deployment:
1. Мониторьте логи первые несколько дней
2. Тестируйте все функции
3. Настройте алерты
4. Документируйте любые изменения

Удачи! 🚀
