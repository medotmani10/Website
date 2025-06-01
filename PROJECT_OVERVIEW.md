# 🏠 BuildEstate - Multilingual Real Estate Platform

A comprehensive, modern real estate platform with multilingual support (English, Arabic, French) built with cutting-edge web technologies.

## ✨ Features

### 🌐 **Multilingual Support**
- **English** 🇺🇸 - Default language
- **Arabic** 🇸🇦 - Full RTL (Right-to-Left) support
- **French** 🇫🇷 - Complete localization
- Auto language detection
- Persistent language selection

### 🏡 **Core Features**
- Advanced property search and filtering
- Interactive property listings with image galleries
- Detailed property information and amenities
- User authentication and profiles
- Contact forms and appointment booking
- SEO optimized with structured data
- Responsive design for all devices

### 👨‍💼 **Admin Panel**
- Property management (CRUD operations)
- Image upload with ImageKit integration
- User management
- Analytics and statistics
- Content management

## 🛠️ Tech Stack

### **Frontend**
- **React 18** - Modern UI library
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations
- **React Router** - Client-side routing

### **Backend**
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **JWT** - Authentication
- **ImageKit** - Image optimization and CDN

### **Deployment**
- **Frontend**: Firebase Hosting
- **Admin Panel**: Firebase Hosting  
- **Backend**: Render
- **Database**: MongoDB Atlas

## 🚀 Live Demo

- **🌐 Main Website**: https://bouchrataxi-eb2dd.web.app
- **👨‍💼 Admin Panel**: https://buildestate-platform-app.web.app
- **🔧 Backend API**: https://websitenv.onrender.com

## 📁 Project Structure

```
BuildEstate/
├── 📁 frontend/          # Main website (React + Vite)
│   ├── 📁 src/
│   │   ├── 📁 components/    # Reusable components
│   │   ├── 📁 pages/         # Page components
│   │   ├── 📁 contexts/      # React contexts (Language, Auth)
│   │   ├── 📁 locales/       # Translation files (en, ar, fr)
│   │   └── 📁 styles/        # CSS and styling
│   └── 📄 package.json
├── 📁 admin/             # Admin panel (React + Vite)
│   ├── 📁 src/
│   │   ├── 📁 components/    # Admin components
│   │   └── 📁 pages/         # Admin pages
│   └── 📄 package.json
├── 📁 backend/           # Backend API (Node.js + Express)
│   ├── 📁 config/           # Database and service configs
│   ├── 📁 controllers/      # Route controllers
│   ├── 📁 models/           # Database models
│   ├── 📁 routes/           # API routes
│   ├── 📁 middleware/       # Custom middleware
│   └── 📄 server.js         # Main server file
├── 📄 firebase.json      # Firebase configuration
└── 📄 .gitignore         # Git ignore rules
```

## 🔧 Getting Started

### Prerequisites
- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** (local or Atlas)
- **Firebase CLI** (for deployment)

### 📦 Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd BuildEstate
```

2. **Install dependencies**
```bash
# Frontend
cd frontend && npm install

# Backend
cd ../backend && npm install

# Admin
cd ../admin && npm install
```

### 🏃‍♂️ Running the Application

1. **Start Backend Server**
```bash
cd backend && npm start
# Server runs on http://localhost:4000
```

2. **Start Frontend**
```bash
cd frontend && npm run dev
# Frontend runs on http://localhost:5173
```

3. **Start Admin Panel**
```bash
cd admin && npm run dev
# Admin runs on http://localhost:5174
```

## 🌍 Multilingual Features

### Language Switching
- Click the globe icon (🌍) in the navigation bar
- Select from English, Arabic, or French
- Language preference is saved automatically

### RTL Support
- Arabic language automatically switches to RTL layout
- All components adapt to right-to-left reading direction

## 🚀 Deployment

### Frontend & Admin (Firebase Hosting)
```bash
# Build and deploy
npm run build
firebase deploy --only hosting
```

### Backend (Render)
- Connected to GitHub repository
- Auto-deploys on git push
- Environment variables configured in Render dashboard

## 🔐 Admin Access

- **URL**: https://buildestate-platform-app.web.app
- **Email**: admin@buildestate.com
- **Password**: admin123

## 📄 License

This project is licensed under the MIT License.

---

**Built with ❤️ by the BuildEstate Team**
