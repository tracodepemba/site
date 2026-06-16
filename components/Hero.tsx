/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React from 'react';
import { LandingConfig } from '../types';

interface HeroProps {
  config: LandingConfig['hero'];
}

const Hero: React.FC<HeroProps> = ({ config }) => {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 112; // Adjusted offset for fixed/sticky header
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

  return (
    <section className="relative w-full h-[380px] md:h-[400px] overflow-hidden bg-brandPrussian">
      
      {/* Background Image - Earthy Textured Clay/Slate representing Pemba */}
      <div className="absolute inset-0 w-full h-full p-0">
        <img 
            src="https://images.unsplash.com/photo-1604147706283-d7119b5b822c?auto=format&fit=crop&q=80&w=2000" 
            alt="Textura de barro e pemba" 
            className="w-full h-full object-cover grayscale opacity-45 mix-blend-overlay"
            referrerPolicy="no-referrer"
        />
        {/* Deep navy and graphite gradients for Shadow Depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-brandPrussian/90 via-brandGraphite/95 to-brandPrussian mix-blend-multiply"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-start text-left md:items-center md:text-center px-6">
        <div className="animate-fade-in-up w-full md:w-auto">
          <span className="block text-[10px] font-medium uppercase tracking-[0.22em] text-brandCream mb-4 backdrop-blur-sm bg-white/5 border border-brandSoftBlue/20 px-3 py-1 rounded-full mx-0 md:mx-auto w-fit">
            {config?.badge || "Minimalismo Sagrado"}
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-normal text-white tracking-wide mb-4 drop-shadow-sm leading-tight animate-fade-in">
            {config?.title || "A Umbanda tem"} <span className="italic text-brandCream font-serif">{config?.highlightWord || "forma."}</span>
          </h1>
          <p className="max-w-xl mx-0 md:mx-auto text-xs md:text-sm text-brandCream/85 font-light tracking-wide leading-relaxed mb-6 text-shadow-sm">
            {config?.subtitle || "O fundamento na sua forma mais essencial."}
          </p>
          
          <a 
            href="#products" 
            onClick={(e) => handleNavClick(e, 'products')}
            className="group relative px-6 py-3 bg-brandRed text-brandCream rounded-none text-[10px] font-semibold uppercase tracking-[0.18em] hover:bg-[#a00f19] transition-all duration-300 inline-block"
          >
            <span className="relative z-10">{config?.buttonText || "Descobrir Coleção"}</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;

