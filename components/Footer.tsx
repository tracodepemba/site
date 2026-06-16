/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';

interface FooterProps {
  onLinkClick: (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onLinkClick }) => {
  const [subscribeStatus, setSubscribeStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [email, setEmail] = useState('');

  const handleSubscribe = () => {
    if (!email) return;
    setSubscribeStatus('loading');
    setTimeout(() => {
      setSubscribeStatus('success');
      setEmail('');
    }, 1500);
  };

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
            <li><a href="#products" onClick={(e) => onLinkClick(e, 'products')} className="hover:text-brandRed transition-colors underline-offset-4 hover:underline">Linha Orixás</a></li>
            <li><a href="#products" onClick={(e) => onLinkClick(e, 'products')} className="hover:text-brandRed transition-colors underline-offset-4 hover:underline">Linha Guias e Entidades</a></li>
            <li><a href="#products" onClick={(e) => onLinkClick(e, 'products')} className="hover:text-brandRed transition-colors underline-offset-4 hover:underline">Limpeza e Defumação</a></li>
          </ul>
        </div>
        
        <div className="md:col-span-2">
          <h4 className="font-bold text-brandPrussian mb-4 tracking-[0.2em] text-[10px] uppercase">Sobre</h4>
          <ul className="space-y-2.5 text-xs font-light tracking-wide text-brandGraphite/75">
            <li><a href="#about" onClick={(e) => onLinkClick(e, 'about')} className="hover:text-brandRed transition-colors underline-offset-4 hover:underline">Nossa História</a></li>
            <li><a href="#about" onClick={(e) => onLinkClick(e, 'about')} className="hover:text-brandRed transition-colors underline-offset-4 hover:underline">Minimalismo Sagrado</a></li>
            <li><a href="#journal" onClick={(e) => onLinkClick(e, 'journal')} className="hover:text-brandRed transition-colors underline-offset-4 hover:underline">Fundamento</a></li>
            <li><a href="#contact" onClick={(e) => onLinkClick(e, 'contact')} className="hover:text-brandRed transition-colors underline-offset-4 hover:underline">Contato e Encomendas</a></li>
          </ul>
        </div>

        <div className="md:col-span-4">
          <h4 className="font-bold text-brandPrussian mb-4 tracking-[0.2em] text-[10px] uppercase">Novidades</h4>
          <div className="flex flex-col gap-4">
            <p className="text-xs font-light tracking-wide text-brandGraphite/75">Fique por dentro de nossos novos lançamentos e estudos sobre o sagrado.</p>
            <input 
              type="email" 
              placeholder="seu@email.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={subscribeStatus === 'loading' || subscribeStatus === 'success'}
              className="bg-transparent border-b border-brandPrussian/30 py-1.5 text-xs font-light tracking-wide outline-none focus:border-brandPrussian transition-colors placeholder-brandGraphite/40 text-brandGraphite disabled:opacity-50" 
            />
            <button 
              onClick={handleSubscribe}
              disabled={subscribeStatus !== 'idle' || !email}
              className="self-start text-[10px] font-semibold uppercase tracking-[0.2em] mt-1 text-brandPrussian hover:text-brandRed disabled:cursor-default disabled:hover:text-brandPrussian/50 disabled:opacity-50 transition-colors"
            >
              {subscribeStatus === 'idle' && 'Inscrever-se'}
              {subscribeStatus === 'loading' && 'Inscrevendo...'}
              {subscribeStatus === 'success' && 'Inscrito com Sucesso!'}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1800px] mx-auto mt-20 pt-8 border-t border-brandSoftBlue/15 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-[0.2em] text-brandGraphite/50">
        <p>© {new Date().getFullYear()} Traço de Pemba — Do terreiro ao mundo.</p>
        <p>Criado com amor & fé</p>
      </div>
    </footer>
  );
};

export default Footer;
