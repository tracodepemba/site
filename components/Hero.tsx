/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { LandingConfig } from '../types';

interface HeroProps {
  config: LandingConfig['hero'];
  onShopClick?: () => void;
}

const Hero: React.FC<HeroProps> = ({ config, onShopClick }) => {
  const handleShopClick = () => {
    if (onShopClick) {
      onShopClick();
      return;
    }

    const element = document.getElementById('products');

    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full min-h-[520px] md:min-h-[620px] overflow-hidden bg-brandPrussian">

      {/* Fundo */}
      <div className="absolute inset-0">
        <img
          src={config.imageUrl}
          alt="Traço de Pemba"
          className="w-full h-full object-cover opacity-30"
          referrerPolicy="no-referrer"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-brandPrussian/80 via-brandGraphite/85 to-brandPrussian/95"></div>
      </div>

      {/* Conteúdo */}
      <div className="relative z-10 container mx-auto px-6 py-20 min-h-[520px] md:min-h-[620px] flex items-center">

        {/* Texto */}
        <div className="max-w-2xl">

          <span className="inline-block text-[10px] md:text-xs uppercase tracking-[0.25em] text-brandCream border border-brandCream/20 px-4 py-2 mb-6">
            {config.badge}
          </span>

          <h1 className="text-4xl md:text-6xl font-serif text-white leading-tight mb-6">
            {config.title}
            <br />
            <span className="italic text-brandCream">
              {config.highlightWord}
            </span>
          </h1>

          <p className="text-brandCream/90 text-sm md:text-base leading-relaxed max-w-xl mb-8">
            {config.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleShopClick}
              className="px-8 py-4 bg-brandRed text-brandCream uppercase tracking-[0.18em] text-xs font-semibold transition-all hover:opacity-90"
            >
              {config.buttonText}
            </button>

            <a
              href="#about"
              className="px-8 py-4 border border-brandCream/40 text-brandCream uppercase tracking-[0.18em] text-xs font-semibold text-center"
            >
              Conheça a Marca
            </a>
          </div>

        </div>

        {/* Símbolo decorativo */}
        <img
          src="https://res.cloudinary.com/dxkfqbs5r/image/upload/v1781870693/icon_light_pyprgn.svg"
          alt=""
          aria-hidden="true"
          className="
            hidden lg:block
            absolute
            right-[4%]
            top-1/2
            -translate-y-1/2
            w-[380px]
            xl:w-[460px]
            opacity-[0.12]
            mix-blend-screen
            pointer-events-none
            select-none
          "
        />

      </div>
    </section>
  );
};

export default Hero;
