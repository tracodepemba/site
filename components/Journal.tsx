/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { JOURNAL_ARTICLES } from '../constants';
import { JournalArticle } from '../types';

interface JournalProps {
  onArticleClick: (article: JournalArticle) => void;
}

const Journal: React.FC<JournalProps> = ({ onArticleClick }) => {
  return (
    <section id="journal" className="bg-white py-32 px-6 md:px-12 border-t border-brandSoftBlue/10">
      <div className="max-w-[1800px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 pb-8 border-b border-brandSoftBlue/20">
            <div>
                <span className="block text-[10px] font-bold uppercase tracking-[0.25em] text-brandRed mb-4">Estudo & Tradição</span>
                <h2 className="text-2xl md:text-3xl font-serif text-brandPrussian">Fundamento</h2>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {JOURNAL_ARTICLES.map((article) => (
                <div key={article.id} className="group cursor-pointer flex flex-col text-left" onClick={() => onArticleClick(article)}>
                    <div className="w-full aspect-[4/3] overflow-hidden mb-8 bg-brandSoftBlue/5">
                        <img 
                            src={article.image} 
                            alt={article.title} 
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 grayscale-[0.2] group-hover:grayscale-0"
                            referrerPolicy="no-referrer"
                        />
                    </div>
                    <div className="flex flex-col flex-1 text-left">
                        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brandSoftBlue mb-3">{article.date}</span>
                        <h3 className="text-lg font-serif text-brandPrussian mb-3 leading-tight group-hover:text-brandRed transition-colors">{article.title}</h3>
                        <p className="text-xs font-light tracking-wide leading-relaxed text-brandGraphite/90">{article.excerpt}</p>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Journal;
