/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useMemo } from 'react';
import { PRODUCTS } from '../constants';
import { Product } from '../types';
import ProductCard from './ProductCard';

const categories = ['Todas', 'Orixás', 'Guias e Entidades', 'Fundamento'];

interface ProductGridProps {
  onProductClick: (product: Product) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ onProductClick }) => {
  const [activeCategory, setActiveCategory] = useState('Todas');

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'Todas') return PRODUCTS;
    return PRODUCTS.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  return (

  <section id="products" className="py-20 md:py-28 px-6 md:px-12 bg-white">
    <div className="max-w-[1800px] mx-auto">

```
  {/* Header */}
  <div className="flex flex-col items-center text-center mb-16 md:mb-20">

    <span className="text-[10px] uppercase tracking-[0.25em] text-brandSoftBlue mb-4">
      Coleção Traço de Pemba
    </span>

    <h2 className="text-3xl md:text-4xl font-serif text-brandPrussian mb-6">
      Vista o fundamento
    </h2>

    <p className="max-w-xl text-sm md:text-base text-brandGraphite/80 leading-relaxed">
      Cada peça nasce de um fundamento real.
      Símbolos, pontos riscados e referências da Umbanda
      transformados em design com respeito, significado e intenção.
    </p>

    <div className="flex flex-wrap justify-center gap-8 pt-8 mt-8 border-t border-brandSoftBlue/20 w-full max-w-2xl">

      {categories.map(cat => (
        <button
          key={cat}
          onClick={() => setActiveCategory(cat)}
          className={`text-[10px] uppercase tracking-[0.25em] pb-1.5 border-b-2 transition-all duration-300 ${
            activeCategory === cat
              ? 'border-brandRed text-brandRed font-semibold'
              : 'border-transparent text-brandSoftBlue hover:text-brandPrussian'
          }`}
        >
          {cat}
        </button>
      ))}

    </div>
  </div>

  {/* Products */}
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">

    {filteredProducts.map(product => (
      <ProductCard
        key={product.id}
        product={product}
        onClick={onProductClick}
      />
    ))}

  </div>

  {/* CTA */}
  <div className="text-center mt-20">

    <a
      href="https://umapenca.com/pemba"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block px-8 py-4 bg-brandRed text-brandCream uppercase tracking-[0.18em] text-xs font-semibold transition-all hover:opacity-90"
    >
      Ver Coleção Completa
    </a>

  </div>

</div>
```

  </section>
);
            ))}
          </div>
        </div>

        {/* Large Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-16">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} onClick={onProductClick} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
