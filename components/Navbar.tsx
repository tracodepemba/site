/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';

interface NavbarProps {
  onNavClick: (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    setMobileMenuOpen(false);
    onNavClick(e, targetId);
  };

  return (
    <>
      <nav className="sticky top-0 bg-white/95 backdrop-blur-sm py-4 border-b border-brandSoftBlue/10 z-50">
        <div className="max-w-[1800px] mx-auto px-8 flex items-center justify-between">
          {/* Logo — wordmark tipográfico enquanto o arquivo de logo definitivo não é adicionado em /public */}
          
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
              onNavClick(e, '');
            }}
            className="z-50 relative focus:outline-none block"
          >
  <img
    src="https://res.cloudinary.com/dxkfqbs5r/image/upload/v1781784327/tipo_logo_krjbzp.svg"
    alt="Traço de Pemba"
    className="h-10 md:h-12 w-auto object-contain"
  />
</a>
          </a>

          {/* Links centrais - Desktop */}
          <div className="hidden md:flex items-center gap-10 text-[11px] font-medium tracking-[0.2em] uppercase text-brandPrussian/80">
            <a href="#products" onClick={(e) => handleLinkClick(e, 'products')} className="hover:text-brandRed transition-colors">Coleção</a>
            <a href="#about" onClick={(e) => handleLinkClick(e, 'about')} className="hover:text-brandRed transition-colors">Manifesto</a>
            <a href="#faq" onClick={(e) => handleLinkClick(e, 'faq')} className="hover:text-brandRed transition-colors">FAQ</a>
            <a href="#contact" onClick={(e) => handleLinkClick(e, 'contact')} className="hover:text-brandRed transition-colors">Contato</a>
          </div>

          {/* Ações à direita */}
          <div className="flex items-center gap-6 z-50 relative text-brandPrussian">
            
              href="https://umapenca.com/pemba/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex px-5 py-2 bg-brandRed text-brandCream text-[10px] uppercase tracking-[0.18em] font-semibold"
            >
              Vista o Fundamento
            </a>

            {/* Toggle do menu mobile */}
            <button
              className="block md:hidden focus:outline-none text-brandPrussian"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Abrir menu"
            >
              {mobileMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Overlay do menu mobile */}
      <div className={`fixed inset-0 bg-white z-40 flex flex-col justify-center items-center transition-all duration-500 ease-in-out ${
        mobileMenuOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-10 pointer-events-none'
      }`}>
        <div className="flex flex-col items-center space-y-8 text-sm font-medium tracking-[0.2em] uppercase text-brandPrussian">
          <a href="#products" onClick={(e) => handleLinkClick(e, 'products')} className="hover:text-brandRed transition-colors">Coleção</a>
          <a href="#about" onClick={(e) => handleLinkClick(e, 'about')} className="hover:text-brandRed transition-colors">Manifesto</a>
          <a href="#faq" onClick={(e) => handleLinkClick(e, 'faq')} className="hover:text-brandRed transition-colors">FAQ</a>
          <a href="#contact" onClick={(e) => handleLinkClick(e, 'contact')} className="hover:text-brandRed transition-colors">Contato</a>
        </div>
      </div>
    </>
  );
};

export default Navbar;
