import React from 'react';
import { LandingConfig } from '../types';

interface HeroProps {
config: LandingConfig['hero'];
}

const Hero: React.FC<HeroProps> = ({ config }) => {
const handleShopClick = () => {
window.open('https://umapenca.com/pemba', '_blank');
};

return ( <section className="relative w-full min-h-[520px] md:min-h-[620px] overflow-hidden bg-brandPrussian">

```
  {/* Background */}
  <div className="absolute inset-0">
    <img
      src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=2000&q=80"
      alt="Traço de Pemba"
      className="w-full h-full object-cover opacity-30"
      referrerPolicy="no-referrer"
    />

    <div className="absolute inset-0 bg-gradient-to-b from-brandPrussian/80 via-brandGraphite/85 to-brandPrussian/95"></div>
  </div>

  {/* Content */}
  <div className="relative z-10 container mx-auto px-6 py-20 min-h-[520px] md:min-h-[620px] flex items-center">

    <div className="max-w-2xl">

      <span className="inline-block text-[10px] md:text-xs uppercase tracking-[0.25em] text-brandCream border border-brandCream/20 px-4 py-2 mb-6">
        Minimalismo Sagrado
      </span>

      <h1 className="text-4xl md:text-6xl font-serif text-white leading-tight mb-6">
        O fundamento,
        <br />
        na sua forma mais
        <span className="italic text-brandCream"> essencial.</span>
      </h1>

      <p className="text-brandCream/90 text-sm md:text-base leading-relaxed max-w-xl mb-8">
        Peças inspiradas nos fundamentos da Umbanda.
        Design autoral, símbolos com significado e respeito à tradição.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">

        <button
          onClick={handleShopClick}
          className="px-8 py-4 bg-brandRed text-brandCream uppercase tracking-[0.18em] text-xs font-semibold transition-all hover:opacity-90"
        >
          Descobrir Coleção
        </button>

        <a
          href="#about"
          className="px-8 py-4 border border-brandCream/40 text-brandCream uppercase tracking-[0.18em] text-xs font-semibold"
        >
          Conheça a Marca
        </a>

      </div>

    </div>

  </div>
</section>
```

);
};

export default Hero;
