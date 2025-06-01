import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Properties from './pages/Properties'
import PropertyDetails from './components/properties/propertydetail';
import Aboutus from './pages/About'
import Contact from './pages/Contact'
import Footer from './components/footer';
import NotFoundPage from './components/Notfound';
import { LanguageProvider } from './contexts/LanguageContext';
import AIPropertyHub from './pages/Aiagent'
import StructuredData from './components/SEO/StructuredData';
import 'react-toastify/dist/ReactToastify.css';
import './styles/rtl.css';


export const Backendurl = import.meta.env.VITE_API_BASE_URL;

const App = () => {
  return (
    <HelmetProvider>
      <LanguageProvider>
        <Router>
          {/* Base website structured data */}
          <StructuredData type="website" />
          <StructuredData type="organization" />

          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/properties/single/:id" element={<PropertyDetails />} />
            <Route path="/about" element={<Aboutus />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/ai-property-hub" element={<AIPropertyHub />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <Footer />
          <ToastContainer />
        </Router>
      </LanguageProvider>
    </HelmetProvider>
  )
}

export default App