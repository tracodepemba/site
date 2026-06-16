/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { Product } from '../types';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onBack }) => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  
  // Brazil sizes for premium clothing (P, M, G, GG)
  const sizes = ['P', 'M', 'G', 'GG'];
  const showSizes = true; // All products are clothing pieces

  return (
    <div className="pt-10 min-h-screen bg-white animate-fade-in-up">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 pb-24">
        
        {/* Breadcrumb / Back */}
        <button 
          onClick={onBack}
          className="group flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-brandSoftBlue hover:text-brandPrussian transition-colors mb-8"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Voltar para as Coleções
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          
          {/* Left: Main Image */}
          <div className="flex flex-col gap-4">
            <div className="w-full aspect-[4/5] bg-brandSoftBlue/5 overflow-hidden">
              <img 
                src={product.imageUrl} 
                alt={product.name} 
                className="w-full h-full object-cover animate-fade-in-up"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Right: Details */}
          <div className="flex flex-col justify-center max-w-xl">
             <span className="text-[10px] font-semibold text-brandSoftBlue uppercase tracking-[0.2em] mb-2">{product.category}</span>
             <h1 className="text-2xl md:text-3xl font-serif text-brandPrussian mb-4">{product.name}</h1>
             <span className="text-lg font-light text-brandGraphite mb-6 block">R$ {product.price}</span>
             
             <p className="text-xs md:text-sm text-brandGraphite font-light tracking-wide leading-relaxed mb-6 border-b border-brandSoftBlue/20 pb-6">
               {product.longDescription || product.description}
             </p>

             {showSizes && (
                <div className="mb-8">
                   <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-brandPrussian mb-3">Escolha o Tamanho</span>
                   <div className="flex gap-4">
                     {sizes.map(size => (
                       <button 
                         key={size}
                         onClick={() => setSelectedSize(size)}
                         className={`w-10 h-10 flex items-center justify-center text-xs font-semibold border transition-all duration-300 ${
                           selectedSize === size 
                             ? 'border-brandPrussian bg-brandPrussian text-white' 
                             : 'border-brandSoftBlue/20 text-brandSoftBlue hover:border-brandPrussian'
                         }`}
                       >
                         {size}
                       </button>
                     ))}
                   </div>
                </div>
             )}

             <div className="flex flex-col gap-4">
                <a 
                  href={`https://wa.me/5511999999999?text=${encodeURIComponent(`Olá! Gostaria de consultar a disponibilidade e fazer uma encomenda da peça "${product.name}"${selectedSize ? ` no tamanho ${selectedSize}` : ''}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 bg-brandRed text-brandCream text-center uppercase tracking-[0.18em] text-[11px] font-semibold hover:bg-[#a00f19] transition-colors inline-block"
                >
                  Consultar Peça via WhatsApp
                </a>
                
                <div className="mt-8">
                  <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-brandPrussian mb-3">Como encomendar</span>
                  <p className="text-xs text-brandGraphite/90 font-light tracking-wide leading-relaxed mb-6">
                     Trabalhamos sob o conceito do ateliê de criação autoral. Nossas coleções celebram o Minimalismo Sagrado em edições sob encomenda com tiragens limitadas. Você pode entrar em contato conosco para encomendar a sua peça ou tirar dúvidas sobre o fundamento espiritual de cada grafismo.
                  </p>
                  
                  <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-brandPrussian mb-3">Detalhes da Peça</span>
                  <ul className="space-y-2 text-xs text-brandGraphite font-light tracking-wide">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        <span className="w-1 h-1 bg-brandRed rounded-full mb-0.5"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
