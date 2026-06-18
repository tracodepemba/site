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
import AdminLogin from './components/AdminLogin';
import { Product, ViewState, LandingConfig } from './types';
import { DEFAULT_LANDING_CONFIG } from './constants';

const ADMIN_PASSWORD = 'thi020883';
const ADMIN_SESSION_KEY = 'traco_pemba_admin_session';

function App() {
  const [view, setView] = useState<ViewState>({ type: 'home' });

  // Sessão de autenticação do painel admin (válida apenas durante a aba aberta)
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(ADMIN_SESSION_KEY) === 'true';
    } catch (e) {
      return false;
    }
  });

  // Estado central de configuração dinâmica do site
  const [landingConfig, setLandingConfig] = useState<LandingConfig>(() => {
    try {
      const saved = localStorage.getItem('traco_pemba_landing_config');
      return saved ? JSON.parse(saved) : DEFAULT_LANDING_CONFIG;
    } catch (e) {
      return DEFAULT_LANDING_CONFIG;
    }
  });

  // Verifica a rota inicial e mudanças de histórico para o link /admin
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

  // Persiste atualizações de configuração
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

  // Valida a senha de acesso ao painel admin
  const handleAdminLogin = (password: string): boolean => {
    if (password === ADMIN_PASSWORD) {
      setIsAdminAuthenticated(true);
      try {
        sessionStorage.setItem(ADMIN_SESSION_KEY, 'true');
      } catch (e) {
        // Ignora falha de sessionStorage em ambientes restritos
      }
      return true;
    }
    return false;
  };

  // Encerra a sessão admin ao voltar para o site
  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    try {
      sessionStorage.removeItem(ADMIN_SESSION_KEY);
    } catch (e) {
      // Ignora falha de sessionStorage em ambientes restritos
    }
    window.history.pushState(null, '', '/');
    setView({ type: 'home' });
    window.scrollTo({ top: 0 });
  };

  // Navega para os pontos de ancoragem das seções
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
      const headerOffset = 112; // Altura de offset do nav fixo
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });

      try {
        window.history.pushState(null, '', `#${targetId}`);
      } catch (err) {
        // Ignora SecurityError em ambientes restritos
      }
    }
  };

  // Painel admin é exibido sem o header/footer do site, e exige autenticação por senha
  if (view.type === 'admin') {
    if (!isAdminAuthenticated) {
      return (
        <AdminLogin
          onLogin={handleAdminLogin}
          onBack={() => {
            window.history.pushState(null, '', '/');
            setView({ type: 'home' });
          }}
        />
      );
    }

    return (
      <AdminArea
        config={landingConfig}
        onSave={handleSaveConfig}
        onReset={handleResetConfig}
        onBack={handleAdminLogout}
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
            <ProductGrid
              productImages={landingConfig.productImages}
              onProductClick={(p) => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setView({ type: 'product', product: p });
              }}
            />
            <About config={landingConfig.about} />
            <FAQ items={landingConfig.faqs} />
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
      </main>

      <Footer onLinkClick={handleNavClick} />
    </div>
  );
}

export default App;
