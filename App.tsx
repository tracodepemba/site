/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import About from './components/About';
import FAQ from './components/FAQ';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import ProductDetail from './components/ProductDetail';
import AdminArea from './components/AdminArea';
import { Product, ViewState, LandingConfig } from './types';
import { DEFAULT_LANDING_CONFIG } from './constants';

function App() {
  const [view, setView] = useState<ViewState>({ type: 'home' });

  // Centralized Dynamic Content State
  const [landingConfig, setLandingConfig] = useState<LandingConfig>(() => {
    try {
      const saved = localStorage.getItem('traco_pemba_landing_config');
      return saved ? JSON.parse(saved) : DEFAULT_LANDING_CONFIG;
    } catch (e) {
      return DEFAULT_LANDING_CONFIG;
    }
  });

  // Check initial and popstate routes for /admin links
  useEffect(() => {
    const handleUrlChange = () => {
      if (window.location.pathname === '/admin') {
        setView({ type: 'admin' });
      } else {
        if (view.type === 'admin') {
          setView({ type: 'home' });
        }
      }
    };

    handleUrlChange();
    window.addEventListener('popstate', handleUrlChange);
    return () => window.removeEventListener('popstate', handleUrlChange);
  }, [view.type]);

  // Persists configuration updates
  const handleSaveConfig = (newConfig: LandingConfig) => {
    setLandingConfig(newConfig);
    try {
      localStorage.setItem('traco_pemba_landing_config', JSON.stringify(newConfig));
    } catch (e) {
      console.error('Falha de armazenamento local', e);
    }
  };

  const handleResetConfig = () => {
    setLandingConfig(DEFAULT_LANDING_CONFIG);
    try {
      localStorage.removeItem('traco_pemba_landing_config');
    } catch (e) {
      console.error('Falha de remoção local', e);
    }
  };

  // Navigate to standard section anchor points
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    
    if (view.type !== 'home') {
      setView({ type: 'home' });
      setTimeout(() => scrollToSection(targetId), 100);
    } else {
      scrollToSection(targetId);
    }
  };

  const scrollToSection = (targetId: string) => {
    if (!targetId) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
    }
    
    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 112; // Height offset of sticky nav
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });

      try {
        window.history.pushState(null, '', `#${targetId}`);
      } catch (err) {
        // Ignore SecurityError in restricted environments
      }
    }
  };

  // If viewing admin dashboard, show the pure layout without site-headers/footers
  if (view.type === 'admin') {
    return (
      <AdminArea 
        config={landingConfig}
        onSave={handleSaveConfig}
        onReset={handleResetConfig}
        onBack={() => {
          window.history.pushState(null, '', '/');
          setView({ type: 'home' });
          window.scrollTo({ top: 0 });
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans text-brandGraphite selection:bg-brandSoftBlue/30 selection:text-brandPrussian">
      <Navbar onNavClick={handleNavClick} />
      
      <main>
        {view.type === 'home' && (
          <>
            <Hero config={landingConfig.hero} />
            <ProductGrid onProductClick={(p) => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setView({ type: 'product', product: p });
            }} />
            <About config={landingConfig.about} />            <FAQ items={landingConfig.faqs} />
            <ContactForm />
          </>
        )}

        {view.type === 'product' && (
          <ProductDetail 
            product={view.product} 
            onBack={() => {
              setView({ type: 'home' });
              setTimeout(() => scrollToSection('products'), 50);
            }}
          />
        )}

export default App;
