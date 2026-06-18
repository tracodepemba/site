import React, { useState } from 'react';
import { FAQItem } from '../types';

interface FAQProps {
  items: FAQItem[];
}

const FAQ: React.FC<FAQProps> = ({ items = [] }) => {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleFAQ = (id: string) => {
    setOpenId((prevOpenId) => (prevOpenId === id ? null : id));
  };

  return (
    <section id="faq" className="bg-brandCream/15 py-24 border-t border-brandSoftBlue/10">
      <div className="max-w-[1000px] mx-auto px-6">

        <div className="text-center mb-16">
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-brandRed block mb-3">
            Dúvidas Frequentes
          </span>
          <h2 className="text-3xl md:text-4xl font-serif text-brandPrussian tracking-wide">
            Fundamentos & Detalhes
          </h2>
          <p className="max-w-md mx-auto text-xs text-brandGraphite/75 font-light tracking-wide mt-4">
            Sobre materiais, cuidados com a peça e o respeito ao fundamento de cada estampa.
          </p>
        </div>

        <div className="space-y-4">
          {items.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className="bg-white border border-brandSoftBlue/15 hover:border-brandSoftBlue/30 transition-all duration-300"
              >
                <button
                  onClick={() => toggleFAQ(item.id)}
                  className="w-full py-5 px-6 md:px-8 text-left flex justify-between items-center gap-4 focus:outline-none transition-colors"
                >
                  <span className="font-serif text-sm md:text-base font-medium tracking-wide text-brandPrussian">
                    {item.question}
                  </span>

                  <span className="shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-brandCream/30 text-brandRed transition-transform duration-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2.0}
                      stroke="currentColor"
                      className={`w-3.5 h-3.5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    >
                      {isOpen ? (
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      )}
                    </svg>
                  </span>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-[300px] border-t border-brandSoftBlue/10' : 'max-h-0'
                  }`}
                >
                  <div className="p-6 md:p-8 bg-brandCream/10 text-xs text-brandGraphite/80 font-light tracking-wide leading-relaxed">
                    {item.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default FAQ;
