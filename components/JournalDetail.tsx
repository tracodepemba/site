/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { JournalArticle } from '../types';

interface JournalDetailProps {
  article: JournalArticle;
  onBack: () => void;
}

const JournalDetail: React.FC<JournalDetailProps> = ({ article, onBack }) => {
  return (
    <div className="min-h-screen bg-white animate-fade-in-up">
       {/* Hero Image for Article - Full bleed to top so navbar sits on it */}
       <div className="w-full h-[50vh] md:h-[60vh] relative overflow-hidden">
          <img 
             src={article.image} 
             alt={article.title} 
             className="w-full h-full object-cover"
             referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/20"></div>
       </div>

       <div className="max-w-3xl mx-auto px-6 md:px-12 -mt-32 relative z-10 pb-32">
          <div className="bg-white p-8 md:p-16 border border-brandSoftBlue/15 shadow-xl shadow-brandPrussian/5">
             <div className="flex justify-between items-center mb-12 border-b border-brandSoftBlue/20 pb-8">
                <button 
                  onClick={onBack}
                  className="group flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-brandSoftBlue hover:text-brandPrussian transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                  </svg>
                  Voltar ao Fundamento
                </button>
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brandSoftBlue">{article.date}</span>
             </div>

             <h1 className="text-2xl md:text-3xl font-serif text-brandPrussian mb-12 leading-tight text-center">
               {article.title}
             </h1>

             <div className="prose prose-stone mx-auto text-xs md:text-sm font-light tracking-wide leading-relaxed text-brandGraphite/90">
               {article.content}
             </div>
             
             <div className="mt-16 pt-12 border-t border-brandSoftBlue/20 flex justify-center">
                 <span className="text-2xl font-serif italic text-brandPrussian">Traço de Pemba</span>
             </div>
          </div>
       </div>
    </div>
  );
};

export default JournalDetail;
