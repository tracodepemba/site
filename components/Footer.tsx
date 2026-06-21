/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';

interface FooterProps {
  onLinkClick: (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onLinkClick }) => {
  return (
    <footer className="bg-white pt-24 pb-12 px-6 text-brandGraphite/90 border-t border-brandSoftBlue/15">
      <div className="max-w-[1800px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">

        <div className="md:col-span-4">
          <h4 className="text-lg font-serif text-brandPrussian mb-4">Traço de Pemba</h4>
          <p className="max-w-xs text-xs font-light tracking-wide leading-relaxed text-brandGraphite/75">
            Uma marca brasileira de vestuário enraizada na cultura e na espiritualidade da Umbanda.
            O fundamento, na sua forma mais essencial.
          </p>
        </div>

        <div className="md:col-span-2">
          <h4 className="font-bold text-brandPrussian mb-4 tracking-[0.2em] text-[10px] uppercase">Coleções</h4>
          <ul className="space-y-2.5 text-xs font-light tracking-wide text-brandGraphite/75">
            <li><a href="#products" onClick={(e) => onLinkClick(e, 'products')} className="hover:text-brandRed transition-colors underline-offset-4 hover:underline">Todas as Peças</a></li>
          </ul>
        </div>

        <div className="md:col-span-2">
          <h4 className="font-bold text-brandPrussian mb-4 tracking-[0.2em] text-[10px] uppercase">Sobre</h4>
          <ul className="space-y-2.5 text-xs font-light tracking-wide text-brandGraphite/75">
            <li><a href="#about" onClick={(e) => onLinkClick(e, 'about')} className="hover:text-brandRed transition-colors underline-offset-4 hover:underline">Nossa História</a></li>
            <li><a href="#about" onClick={(e) => onLinkClick(e, 'about')} className="hover:text-brandRed transition-colors underline-offset-4 hover:underline">Minimalismo Sagrado</a></li>
            <li><a href="#faq" onClick={(e) => onLinkClick(e, 'faq')} className="hover:text-brandRed transition-colors underline-offset-4 hover:underline">Dúvidas Frequentes</a></li>
            <li><a href="#contact" onClick={(e) => onLinkClick(e, 'contact')} className="hover:text-brandRed transition-colors underline-offset-4 hover:underline">Contato e Encomendas</a></li>
          </ul>
        </div>

        <div className="md:col-span-4 flex justify-start md:justify-end">
          <img
            src="https://res.cloudinary.com/dxkfqbs5r/image/upload/v1781784328/mao_logo_dqphyt.svg"
            alt="Traço de Pemba"
            className="w-full max-w-[210px] h-auto object-contain"
          />
        </div>
      </div>

      <div className="max-w-[1800px] mx-auto mt-20 pt-8 border-t border-brandSoftBlue/15 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-[0.2em] text-brandGraphite/50">
        <p>© {new Date().getFullYear()} Traço de Pemba — Do terreiro ao mundo.</p>
        <p>O fundamento, na sua forma mais essencial.</p>
      </div>
    </footer>
  );
};

export default Footer;
