# 🔧 إعدادات Render Dashboard

## ⚙️ **إعدادات يدوية في Render Dashboard**

إذا لم يعمل render.yaml، استخدم هذه الإعدادات في Render Dashboard:

### 📋 **Build & Deploy Settings**

#### **Build Command:**
```bash
cd backend && npm install
```

#### **Start Command:**
```bash
cd backend && npm start
```

#### **Root Directory:**
```
backend
```

#### **Environment:**
```
Node
```

#### **Node Version:**
```
18
```

### 🌍 **Environment Variables**

```
NODE_ENV=production
PORT=4000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL=your_email@gmail.com
PASSWORD=your_email_password
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
ADMIN_EMAIL=admin@buildestate.com
ADMIN_PASSWORD=admin123
```

### 🔧 **Advanced Settings**

#### **Health Check Path:**
```
/status
```

#### **Auto-Deploy:**
```
Yes (enabled)
```

#### **Branch:**
```
main
```

### 📊 **Expected Logs**

بعد النشر الناجح، يجب أن ترى:

```
✅ Build successful
✅ ImageKit connected successfully!
✅ Created uploads directory
✅ Server running on port 4000
✅ MongoDB Connected
✅ Database connected successfully
```

### 🚨 **إذا استمرت المشاكل**

1. **احذف الخدمة الحالية** في Render
2. **أنشئ خدمة جديدة** من GitHub
3. **اختر مجلد backend** كـ Root Directory
4. **استخدم الإعدادات أعلاه**

### 🔗 **روابط مفيدة**

- **Render Dashboard**: https://dashboard.render.com
- **Render Docs**: https://render.com/docs
- **GitHub Repo**: https://github.com/medotmani10/Website
