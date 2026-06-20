/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  return (
    <div className="group flex flex-col gap-4 cursor-pointer" onClick={() => onClick(product)}>
      <div className="relative w-full aspect-square overflow-hidden bg-brandSoftBlue/5">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-1000 ease-in-out group-hover:scale-110 sepia-[0.05]"
          referrerPolicy="no-referrer"
        />

        <div className="absolute inset-0 bg-brandPrussian/0 group-hover:bg-brandPrussian/10 transition-colors duration-500 flex items-center justify-center p-3">
          <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
            <span className="bg-brandRed text-brandCream text-[10px] uppercase tracking-widest font-medium px-4 py-2.5 rounded-none inline-block">
              Ver Detalhes
            </span>
          </div>
        </div>
      </div>

      <div className="text-center">
        <h3 className="text-sm md:text-base font-serif font-medium text-brandPrussian mb-1 group-hover:text-brandRed transition-colors">{product.name}</h3>
        <p className="text-[10px] font-light text-brandSoftBlue tracking-wide">{product.category}</p>
      </div>
    </div>
  );
};

export default ProductCard;
