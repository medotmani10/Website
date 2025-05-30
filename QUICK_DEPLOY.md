# 🚀 Quick Deploy Guide - BuildEstate Backend

## 📋 Prerequisites
- GitHub account
- Render account (free)

## ⚡ Quick Steps

### 1. Push to GitHub
```bash
# Add remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/buildestate-platform.git

# Push code
git push -u origin main
```

### 2. Deploy on Render
1. Go to [render.com](https://render.com)
2. Click "New +" → "Web Service"
3. Connect GitHub repository
4. Use these settings:

```
Name: buildestate-backend
Environment: Node
Root Directory: backend
Build Command: npm install
Start Command: npm start
```

### 3. Add Environment Variables
Copy these to Render Environment Variables:

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

### 4. Deploy & Test
1. Click "Create Web Service"
2. Wait 5-10 minutes for deployment
3. Test API: `https://YOUR_SERVICE_NAME.onrender.com`

## 🔄 Update Frontend API URLs

After backend is live, update these files:

**frontend/src/context/AppContext.jsx:**
```javascript
const backendUrl = 'https://YOUR_SERVICE_NAME.onrender.com';
```

**admin/src/context/AppContext.jsx:**
```javascript
const backendUrl = 'https://YOUR_SERVICE_NAME.onrender.com';
```

Then redeploy frontend & admin:
```bash
npm run build
firebase deploy --only hosting
```

## ✅ Final Check
- ✅ Backend: https://YOUR_SERVICE_NAME.onrender.com
- ✅ Frontend: https://bouchrataxi-eb2dd.web.app
- ✅ Admin: https://buildestate-platform-app.web.app

🎉 **Done! Your BuildEstate platform is fully deployed!**
