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
    <section id="products" className="py-32 px-6 md:px-12 bg-white">
      <div className="max-w-[1800px] mx-auto">
        
        {/* Header Area */}
        <div className="flex flex-col items-center text-center mb-24 space-y-8">
          <h2 className="text-2xl md:text-3xl font-serif text-brandPrussian">Nossas Coleções</h2>
          <p className="max-w-md text-[10px] md:text-xs text-brandSoftBlue font-light uppercase tracking-[0.2em]">
            Fio por fio, símbolo por símbolo. Peças criadas para vestir o axé do corpo.
          </p>
          
          {/* Minimal Filter - Montserrat, delicate and tracking wide */}
          <div className="flex flex-wrap justify-center gap-8 pt-4 border-t border-brandSoftBlue/20 w-full max-w-2xl">
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
