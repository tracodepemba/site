/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { LandingConfig } from '../types';

interface AboutProps {
  config: LandingConfig['about'];
}

const About: React.FC<AboutProps> = ({ config }) => {
  return (
    <section id="about" className="bg-white">

      {/* Introdução / História */}
      <div className="py-24 px-6 md:px-12 max-w-[1800px] mx-auto flex flex-col md:flex-row items-start gap-16 md:gap-32">
        <div className="md:w-1/3">
          <h2 className="text-2xl md:text-3xl font-serif text-brandPrussian leading-tight">
            {config?.title || "O traço que nos une."}
          </h2>
        </div>
        <div className="md:w-2/3 max-w-2xl">
          <p className="text-xs md:text-sm text-brandGraphite font-light tracking-wide leading-relaxed mb-6">
            {config?.paragraph1}
          </p>
          <p className="text-xs md:text-sm text-brandGraphite font-light tracking-wide leading-relaxed mb-8">
            {config?.paragraph2}
          </p>
          <img
            src={config?.aboutImage || "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=1200"}
            alt="Traço de Pemba"
            className="w-full h-[400px] object-cover grayscale contrast-[0.9] brightness-110 mt-12"
            referrerPolicy="no-referrer"
          />
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brandSoftBlue mt-4">
            {config?.authorStamp}
          </p>
        </div>
      </div>

      {/* Blocos de Filosofia */}
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[80vh]">
        <div className="order-2 lg:order-1 relative h-[500px] lg:h-auto overflow-hidden group">
          <img
            src={config?.section2Image || "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=1200"}
            alt="Textura"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="order-1 lg:order-2 flex flex-col justify-center p-12 lg:p-24 bg-brandGraphite">
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-brandRed mb-5">
            {config?.section2Badge}
          </span>
          <h3 className="text-2xl md:text-3xl font-serif mb-6 text-brandCream leading-tight">
            {config?.section2Title}
          </h3>
          <p className="text-xs md:text-sm text-brandCream/85 font-light tracking-wide leading-relaxed mb-8 max-w-sm">
            {config?.section2Text}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[80vh]">
        <div className="flex flex-col justify-center p-12 lg:p-24 bg-brandPrussian">
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-brandRed mb-5">
            {config?.section3Badge}
          </span>
          <h3 className="text-2xl md:text-3xl font-serif mb-6 text-brandCream leading-tight">
            {config?.section3Title}
          </h3>
          <p className="text-xs md:text-sm text-brandCream/85 font-light tracking-wide leading-relaxed mb-8 max-w-sm">
            {config?.section3Text}
          </p>
        </div>
        <div className="relative h-[500px] lg:h-auto overflow-hidden group">
          <img
            src={config?.section3Image || "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=1200"}
            alt="Tecidos naturais"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105 brightness-90"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </section>
  );
};

export default About;