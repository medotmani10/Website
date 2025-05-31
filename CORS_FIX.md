# 🔧 CORS Fix for Admin Panel

## المشكلة
Backend على Render لا يسمح بطلبات من Firebase Hosting بسبب إعدادات CORS.

## الحل السريع

### الطريقة 1: تحديث متغيرات البيئة على Render

1. اذهب إلى Render Dashboard: https://dashboard.render.com
2. اختر خدمة Backend الخاصة بك
3. اذهب إلى Environment Variables
4. أضف هذه المتغيرات:

```
FRONTEND_URL=https://bouchrataxi-eb2dd.web.app
ADMIN_URL=https://buildestate-platform-app.web.app
```

### الطريقة 2: تحديث الكود وإعادة النشر

إذا كان لديك وصول إلى الكود على Render، حدث server.js:

```javascript
// CORS configuration
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:5173',
    'http://localhost:5174',
    'https://buildestate.vercel.app',
    'https://bouchrataxi-eb2dd.web.app',
    'https://buildestate-platform-app.web.app',
    process.env.WEBSITE_URL,
    process.env.FRONTEND_URL,
    process.env.ADMIN_URL
  ].filter(Boolean),
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));
```

### الطريقة 3: الحل المؤقت - تعطيل CORS

أضف هذا في بداية server.js (حل مؤقت فقط):

```javascript
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});
```

## اختبار الحل

بعد تطبيق أي من الحلول أعلاه:

1. انتظر 2-3 دقائق لإعادة تشغيل الخدمة
2. جرب ملف الاختبار مرة أخرى
3. جرب Admin Panel: https://buildestate-platform-app.web.app

## بيانات تسجيل الدخول

- **Email**: admin@buildestate.com
- **Password**: admin123
