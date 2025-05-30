# 🚀 BuildEstate Deployment Guide

This guide will help you deploy the BuildEstate platform to production.

## 📋 Current Deployment Status

### ✅ Completed Deployments

| Component | Platform | URL | Status |
|-----------|----------|-----|--------|
| **Frontend** | Firebase Hosting | https://bouchrataxi-eb2dd.web.app | ✅ Live |
| **Admin Panel** | Firebase Hosting | https://buildestate-platform-app.web.app | ✅ Live |
| **Backend API** | Render (Pending) | Coming Soon | 🔄 In Progress |

## 🔧 Backend Deployment on Render

### Step 1: Prepare Repository
```bash
# Commit all changes
git add .
git commit -m "Prepare for deployment"

# Push to GitHub
git remote add origin https://github.com/YOUR_USERNAME/buildestate-platform.git
git push -u origin main
```

### Step 2: Create Render Account
1. Go to [render.com](https://render.com)
2. Sign up with GitHub account
3. Authorize Render to access your repositories

### Step 3: Create Web Service
1. Click "New +" → "Web Service"
2. Connect your GitHub repository
3. Select the repository: `buildestate-platform`

### Step 4: Configure Service Settings
```yaml
Name: buildestate-backend
Environment: Node
Region: Oregon (US West)
Branch: main
Root Directory: backend
Build Command: npm install
Start Command: npm start
Instance Type: Free
```

### Step 5: Environment Variables
Add these environment variables in Render dashboard:

```env
NODE_ENV=production
PORT=4000
MONGODB_URI=mongodb+srv://medotmani5:Ye7REqjyxZ1usyrC@cluster0.skekfqj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=9cda3352b777114f63f2ce7d9e92e1ee2e017a19cda82af765831296b48b0f747093f88f6717b7c0f53dddb24570ce5f4488aef7905097522dcfb407d6034929ef08777d5c0a0a10e94c79b64a449e45a4cbc90c1c60715c5b4f3ed706fa53f05b5d4c071e30ccd8c9822affa266a60a12352bc1cc23a291d829b5407459d1258ce5443de7a691444d5a98acdd326aa790b1a011b35d68e8a53dad4c9bd91b328c25d987de74ec7f9829ff86ff27fe16ca1150dc2daf365b561fffeb1f783a917ae5854fbae7c5dc40704e557b2cb68e5a163317de62d29c01200d33dfa23f9309bcb46b63b476a8de73be4b4c853ec15722e95aec401d83517e8b7a40332d9e
EMAIL=jokey.silver1@gmail.com
PASSWORD=ghazaouet13400
AZURE_API_KEY=E6tzYKDUQYtrVkfLW77oshCvK1VkEUGX0sWkt685FcH4pOjwq6Q3JQQJ99BEACYeBjFXJ3w3AAAEACOGW7iO
FIRECRAWL_API_KEY=fc-d92129171f4d46078099de0730afdd53
IMAGEKIT_PUBLIC_KEY=public_k04pXlcsbQGPv2oIoCW2X1Mbs3I=
IMAGEKIT_PRIVATE_KEY=private_bHB8WV5ogj3ORrzyaEPIFM+u5JQ=
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/rmlpzvmnz/
ADMIN_EMAIL=admin@buildestate.com
ADMIN_PASSWORD=admin123
WEBSITE_URL=https://bouchrataxi-eb2dd.web.app
```

### Step 6: Deploy
1. Click "Create Web Service"
2. Wait for deployment to complete (5-10 minutes)
3. Your backend will be available at: `https://buildestate-backend.onrender.com`

## 🔄 Update Frontend API URLs

After backend deployment, update the API URLs in frontend:

### Frontend API Configuration
```javascript
// frontend/src/services/api.js
const API_BASE_URL = 'https://buildestate-backend.onrender.com/api';
```

### Admin API Configuration
```javascript
// admin/src/services/api.js
const API_BASE_URL = 'https://buildestate-backend.onrender.com/api';
```

## 🔄 Redeploy Frontend & Admin

After updating API URLs:

```bash
# Build and deploy frontend
cd frontend
npm run build
cd ..
firebase use bouchrataxi-eb2dd
firebase deploy --only hosting

# Build and deploy admin
cd admin
npm run build
cd ..
firebase use buildestate-platform-app
firebase deploy --only hosting
```

## 🌐 Final URLs

After complete deployment:

| Service | URL | Purpose |
|---------|-----|---------|
| **Main Website** | https://bouchrataxi-eb2dd.web.app | User interface |
| **Admin Dashboard** | https://buildestate-platform-app.web.app | Management panel |
| **API Server** | https://buildestate-backend.onrender.com | Backend API |

## 🔍 Testing Deployment

### Test Backend API
```bash
curl https://buildestate-backend.onrender.com/status
```

### Test Frontend
1. Visit main website
2. Try property search
3. Test user registration
4. Check API connectivity

### Test Admin Panel
1. Visit admin dashboard
2. Login with admin credentials
3. Check analytics
4. Test property management

## 🛠️ Troubleshooting

### Common Issues

1. **Backend not starting**
   - Check environment variables
   - Verify MongoDB connection
   - Check build logs in Render

2. **Frontend API errors**
   - Verify API URL is correct
   - Check CORS settings
   - Ensure backend is running

3. **Database connection issues**
   - Verify MongoDB URI
   - Check network access in MongoDB Atlas
   - Ensure database user has correct permissions

### Monitoring

- **Render Dashboard**: Monitor backend performance
- **Firebase Console**: Check hosting analytics
- **MongoDB Atlas**: Monitor database usage

## 🔄 Continuous Deployment

### Automatic Deployments
- **Backend**: Auto-deploys on git push to main branch
- **Frontend/Admin**: Manual deployment via Firebase CLI

### Update Process
1. Make changes locally
2. Test thoroughly
3. Commit and push to GitHub
4. Backend auto-deploys
5. Manually deploy frontend/admin if needed

## 📞 Support

If you encounter issues:
1. Check the troubleshooting section
2. Review deployment logs
3. Verify all environment variables
4. Test locally first

---

🎉 **Congratulations! Your BuildEstate platform is now live!**
