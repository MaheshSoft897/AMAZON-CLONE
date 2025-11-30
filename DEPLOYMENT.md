# Deployment Guide - Amazon Clone

## Quick Deployment Checklist

### Pre-Deployment
- [ ] Server with Ubuntu 20.04/22.04 LTS
- [ ] Domain name configured
- [ ] MongoDB installed and running
- [ ] Node.js 18+ installed
- [ ] Nginx installed
- [ ] PM2 installed
- [ ] Razorpay account and API keys
- [ ] SSL certificate (Let's Encrypt)

### Step-by-Step Deployment

#### 1. Initial Server Setup

```bash
# SSH into your server
ssh user@your-server-ip

# Update system
sudo apt update && sudo apt upgrade -y

# Install essential tools
sudo apt install -y git curl wget build-essential
```

#### 2. Install Node.js

```bash
# Install Node.js 18 LTS
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Verify installation
node --version
npm --version
```

#### 3. Install MongoDB

```bash
# Import MongoDB GPG key
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -

# Add MongoDB repository
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list

# Install MongoDB
sudo apt update
sudo apt install -y mongodb-org

# Start and enable MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod

# Verify MongoDB is running
sudo systemctl status mongod
```

#### 4. Install Nginx

```bash
sudo apt install -y nginx
sudo systemctl start nginx
sudo systemctl enable nginx
```

#### 5. Install PM2

```bash
sudo npm install -g pm2
```

#### 6. Clone and Setup Project

```bash
# Navigate to web directory
cd /var/www

# Clone repository (replace with your repo URL)
sudo git clone <your-repo-url> amazon-clone
cd amazon-clone

# Install dependencies
sudo npm install
cd frontend
sudo npm install
cd ..

# Create necessary directories
sudo mkdir -p backend/uploads logs
sudo chmod 755 backend/uploads
sudo chmod 755 logs
```

#### 7. Configure Environment Variables

```bash
# Backend .env
sudo nano backend/.env
```

Paste and update:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/amazon-clone
JWT_SECRET=generate-a-very-secure-random-string-here
RAZORPAY_KEY_ID=your-razorpay-key-id
RAZORPAY_KEY_SECRET=your-razorpay-key-secret
NODE_ENV=production
```

```bash
# Frontend .env
sudo nano frontend/.env
```

Paste:
```env
REACT_APP_API_URL=https://yourdomain.com/api
```

#### 8. Build Frontend

```bash
cd frontend
sudo npm run build
cd ..
```

#### 9. Start Backend with PM2

```bash
# Start application
pm2 start ecosystem.config.js

# Save PM2 configuration
pm2 save

# Setup PM2 to start on boot
pm2 startup
# Follow the instructions shown
```

#### 10. Configure Nginx

```bash
sudo nano /etc/nginx/sites-available/amazon-clone
```

Paste:
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    # Increase upload size limit
    client_max_body_size 10M;

    # Frontend
    location / {
        root /var/www/amazon-clone/frontend/build;
        try_files $uri $uri/ /index.html;
        add_header Cache-Control "no-cache";
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Static files (uploads)
    location /uploads {
        alias /var/www/amazon-clone/backend/uploads;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/json;
}
```

Enable site:
```bash
sudo ln -s /etc/nginx/sites-available/amazon-clone /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl restart nginx
```

#### 11. Setup SSL with Let's Encrypt

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Test auto-renewal
sudo certbot renew --dry-run
```

#### 12. Configure Firewall

```bash
# Allow SSH, HTTP, HTTPS
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Enable firewall
sudo ufw enable

# Check status
sudo ufw status
```

#### 13. Secure MongoDB (Optional but Recommended)

```bash
# Edit MongoDB config
sudo nano /etc/mongod.conf
```

Uncomment and add:
```yaml
security:
  authorization: enabled
```

Restart MongoDB:
```bash
sudo systemctl restart mongod
```

Create admin user:
```bash
mongosh
use admin
db.createUser({
  user: "admin",
  pwd: "your-secure-password",
  roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]
})
exit
```

Update `MONGODB_URI` in `backend/.env`:
```
MONGODB_URI=mongodb://admin:your-secure-password@localhost:27017/amazon-clone?authSource=admin
```

Restart PM2:
```bash
pm2 restart amazon-clone-api
```

## Post-Deployment Tasks

### Create Admin User

```bash
# Connect to MongoDB
mongosh amazon-clone

# Create admin user
db.users.insertOne({
  name: "Admin",
  email: "admin@yourdomain.com",
  password: "$2a$10$hashedpasswordhere", // Use bcrypt to hash
  role: "admin",
  createdAt: new Date()
})
```

Or use the registration endpoint and manually update role in database.

### Verify Deployment

1. Check backend: `curl http://localhost:5000/api/products`
2. Check frontend: Visit `https://yourdomain.com`
3. Check PM2: `pm2 status`
4. Check Nginx: `sudo systemctl status nginx`
5. Check MongoDB: `sudo systemctl status mongod`

## Maintenance Commands

```bash
# View PM2 logs
pm2 logs amazon-clone-api

# Restart application
pm2 restart amazon-clone-api

# Stop application
pm2 stop amazon-clone-api

# View Nginx logs
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log

# Update application
cd /var/www/amazon-clone
git pull
npm install
cd frontend
npm install
npm run build
cd ..
pm2 restart amazon-clone-api
```

## Troubleshooting

### Application not starting
- Check PM2 logs: `pm2 logs amazon-clone-api`
- Verify environment variables
- Check MongoDB connection

### 502 Bad Gateway
- Verify backend is running: `pm2 status`
- Check backend logs: `pm2 logs amazon-clone-api`
- Verify Nginx proxy configuration

### Static files not loading
- Check file permissions: `sudo chmod -R 755 /var/www/amazon-clone`
- Verify Nginx configuration
- Check uploads directory exists

### SSL certificate issues
- Verify domain DNS is pointing to server
- Check firewall allows port 80 and 443
- Re-run certbot: `sudo certbot --nginx -d yourdomain.com`

## Backup Strategy

```bash
# Backup MongoDB
mongodump --out /backup/mongodb-$(date +%Y%m%d)

# Backup application files
tar -czf /backup/app-$(date +%Y%m%d).tar.gz /var/www/amazon-clone

# Restore MongoDB
mongorestore /backup/mongodb-YYYYMMDD
```

## Performance Optimization

1. Enable MongoDB indexing on frequently queried fields
2. Use CDN for static assets
3. Enable Redis caching (optional)
4. Monitor with PM2 Plus (optional)
5. Set up log rotation

## Security Checklist

- [ ] Strong JWT secret
- [ ] MongoDB authentication enabled
- [ ] Firewall configured
- [ ] SSL certificate installed
- [ ] Regular security updates
- [ ] Secure file permissions
- [ ] Environment variables secured
- [ ] Regular backups configured

