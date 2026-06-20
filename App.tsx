/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect, useCallback } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
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
import { fetchRemoteConfig, saveRemoteConfig } from './services/supabase';

const ADMIN_PASSWORD = 'thi020883';
const ADMIN_SESSION_KEY = 'traco_pemba_admin_session';
const LOCAL_STORAGE_KEY = 'traco_pemba_landing_config';

// Garante que uma config (vinda do localStorage ou do Supabase) sempre
// tenha todos os campos esperados, preenchendo qualquer ausência com o
// valor padrão. Protege contra configs antigas ou parcialmente salvas.
function mergeWithDefaults(parsed: Partial<LandingConfig> | null | undefined): LandingConfig {
  if (!parsed) return DEFAULT_LANDING_CONFIG;
  return {
    ...DEFAULT_LANDING_CONFIG,
    ...parsed,
    hero: { ...DEFAULT_LANDING_CONFIG.hero, ...(parsed.hero || {}) },
    about: { ...DEFAULT_LANDING_CONFIG.about, ...(parsed.about || {}) },
    products: Array.isArray(parsed.products) ? parsed.products : DEFAULT_LANDING_CONFIG.products,
    bannerSlides: Array.isArray(parsed.bannerSlides) ? parsed.bannerSlides : DEFAULT_LANDING_CONFIG.bannerSlides,
    faqs: Array.isArray(parsed.faqs) ? parsed.faqs : DEFAULT_LANDING_CONFIG.faqs,
  };
}

function readLocalConfig(): LandingConfig {
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!saved) return DEFAULT_LANDING_CONFIG;
    return mergeWithDefaults(JSON.parse(saved));
  } catch (e) {
    return DEFAULT_LANDING_CONFIG;
  }
}

function writeLocalConfig(config: LandingConfig) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(config));
  } catch (e) {
    console.error('Falha de armazenamento local', e);
  }
}

export type SyncStatus = 'idle' | 'syncing' | 'synced' | 'offline-fallback' | 'error';

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

  // Estado central de configuração dinâmica do site.
  // Começa com o cache local (para não mostrar tela em branco enquanto
  // a rede carrega), e é substituído pela versão do Supabase assim que
  // ela chegar — essa é a fonte de verdade, compartilhada entre dispositivos.
  const [landingConfig, setLandingConfig] = useState<LandingConfig>(() => readLocalConfig());
  const [syncStatus, setSyncStatus] = useState<SyncStatus>('idle');

  // Busca a configuração mais recente do Supabase ao carregar o site
  useEffect(() => {
    let isMounted = true;

    (async () => {
      setSyncStatus('syncing');
      const remote = await fetchRemoteConfig();

      if (!isMounted) return;

      if (remote) {
        const merged = mergeWithDefaults(remote);
        setLandingConfig(merged);
        writeLocalConfig(merged); // mantém o cache local atualizado
        setSyncStatus('synced');
      } else {
        // Sem internet, projeto pausado, ou ainda sem dados salvos na nuvem.
        // Continua com o que já está no cache local / padrão.
        setSyncStatus('offline-fallback');
      }
    })();

    return () => { isMounted = false; };
  }, []);

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

  // Salva a configuração: grava local imediatamente (resposta rápida na UI)
  // e envia para o Supabase em seguida (fonte de verdade compartilhada).
  const handleSaveConfig = useCallback(async (newConfig: LandingConfig) => {
    setLandingConfig(newConfig);
    writeLocalConfig(newConfig);

    setSyncStatus('syncing');
    const success = await saveRemoteConfig(newConfig);
    setSyncStatus(success ? 'synced' : 'error');
    return success;
  }, []);

  const handleResetConfig = useCallback(async () => {
    setLandingConfig(DEFAULT_LANDING_CONFIG);
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } catch (e) {
      console.error('Falha de remoção local', e);
    }
    setSyncStatus('syncing');
    const success = await saveRemoteConfig(DEFAULT_LANDING_CONFIG);
    setSyncStatus(success ? 'synced' : 'error');
  }, []);

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
        syncStatus={syncStatus}
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
              products={landingConfig.products}
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
      <Analytics />
      <SpeedInsights />
    </div>
  );
}

export default App;
