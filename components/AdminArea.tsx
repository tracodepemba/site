import React, { useState } from 'react';
import { LandingConfig, BannerSlide, FAQItem } from '../types';
import { PRODUCTS } from '../constants';

interface AdminAreaProps {
  config: LandingConfig;
  onSave: (newConfig: LandingConfig) => void;
  onReset: () => void;
  onBack: () => void;
}

const AdminArea: React.FC<AdminAreaProps> = ({ config, onSave, onReset, onBack }) => {
  const [activeTab, setActiveTab] = useState<'hero' | 'images' | 'about' | 'faq'>('hero');
  const [tempConfig, setTempConfig] = useState<LandingConfig>(JSON.parse(JSON.stringify(config)));
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [newFaqQuestion, setNewFaqQuestion] = useState('');
  const [newFaqAnswer, setNewFaqAnswer] = useState('');

  const handleSave = () => {
    onSave(tempConfig);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleReset = () => {
    if (window.confirm('Tem certeza de que deseja restaurar todos os textos para o padrão original da marca? Todas as alterações atuais serão perdidas.')) {
      onReset();
      onBack();
    }
  };

  const addFAQ = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFaqQuestion || !newFaqAnswer) return;

    const newFaq: FAQItem = {
      id: 'faq_' + Date.now(),
      question: newFaqQuestion,
      answer: newFaqAnswer
    };

    setTempConfig({
      ...tempConfig,
      faqs: [...tempConfig.faqs, newFaq]
    });

    setNewFaqQuestion('');
    setNewFaqAnswer('');
  };

  const removeFAQ = (id: string) => {
    setTempConfig({
      ...tempConfig,
      faqs: tempConfig.faqs.filter(f => f.id !== id)
    });
  };

  const updateFAQ = (id: string, field: 'question' | 'answer', value: string) => {
    setTempConfig({
      ...tempConfig,
      faqs: tempConfig.faqs.map(f => f.id === id ? { ...f, [field]: value } : f)
    });
  };

  const updateHeroField = (field: keyof LandingConfig['hero'], value: string) => {
    setTempConfig({
      ...tempConfig,
      hero: { ...tempConfig.hero, [field]: value }
    });
  };

  const updateAboutField = (field: keyof LandingConfig['about'], value: string) => {
    setTempConfig({
      ...tempConfig,
      about: { ...tempConfig.about, [field]: value }
    });
  };

  // Sobrescreve a imagem de um produto específico pelo seu id
  const updateProductImage = (productId: string, url: string) => {
    setTempConfig({
      ...tempConfig,
      productImages: { ...(tempConfig.productImages || {}), [productId]: url }
    });
  };

  // Remove a sobrescrita, voltando a usar a imagem original do produto
  const resetProductImage = (productId: string) => {
    const updated = { ...(tempConfig.productImages || {}) };
    delete updated[productId];
    setTempConfig({
      ...tempConfig,
      productImages: updated
    });
  };

  const getProductImage = (productId: string, fallback: string) => {
    return (tempConfig.productImages && tempConfig.productImages[productId]) || fallback;
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12 px-6">
      <div className="max-w-6xl mx-auto bg-white border border-slate-200/80 shadow-md">

        <div className="bg-brandPrussian p-8 md:p-10 text-brandCream flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-brandSoftBlue/10">
          <div>
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-brandRed font-bold mb-2">
              <span className="w-1.5 h-1.5 bg-brandRed rounded-full animate-ping"></span>
              Painel de Administração
            </div>
            <h1 className="text-2xl md:text-3xl font-serif text-white tracking-wide">
              Gerenciar Conteúdo do Site
            </h1>
            <p className="text-xs text-brandCream/70 font-light mt-1.5 tracking-wide">
              Edite os textos das seções principais da landing page.
            </p>
          </div>

          <div className="flex gap-4">
            <button
              onClick={onBack}
              className="py-2.5 px-5 border border-brandCream/35 hover:bg-white/5 text-brandCream text-xs font-semibold uppercase tracking-[0.16em] transition-colors"
            >
              Voltar ao Site
            </button>
            <button
              onClick={handleSave}
              className="py-2.5 px-6 bg-brandRed text-brandCream hover:bg-[#a00f19] text-xs font-semibold uppercase tracking-[0.16em] transition-colors"
            >
              Salvar Alterações
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-100 bg-slate-50/50 px-6 py-2.5">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTab('hero')}
              className={`py-2 px-4 text-xs font-semibold tracking-wider uppercase transition-colors rounded-none ${
                activeTab === 'hero' ? 'border-b-2 border-brandPrussian text-brandPrussian' : 'text-slate-500 hover:text-brandPrussian'
              }`}
            >
              Capa / Hero
            </button>
            <button
              onClick={() => setActiveTab('images')}
              className={`py-2 px-4 text-xs font-semibold tracking-wider uppercase transition-colors rounded-none ${
                activeTab === 'images' ? 'border-b-2 border-brandPrussian text-brandPrussian' : 'text-slate-500 hover:text-brandPrussian'
              }`}
            >
              Imagens
            </button>
            <button
              onClick={() => setActiveTab('about')}
              className={`py-2 px-4 text-xs font-semibold tracking-wider uppercase transition-colors rounded-none ${
                activeTab === 'about' ? 'border-b-2 border-brandPrussian text-brandPrussian' : 'text-slate-500 hover:text-brandPrussian'
              }`}
            >
              Nossa História
            </button>
            <button
              onClick={() => setActiveTab('faq')}
              className={`py-2 px-4 text-xs font-semibold tracking-wider uppercase transition-colors rounded-none ${
                activeTab === 'faq' ? 'border-b-2 border-brandPrussian text-brandPrussian' : 'text-slate-500 hover:text-brandPrussian'
              }`}
            >
              FAQ
            </button>
          </div>

          <button
            onClick={handleReset}
            className="text-[10px] text-brandRed font-light tracking-[0.15em] uppercase hover:underline transition-all mt-4 md:mt-0 p-1"
          >
            Restaurar Padrão Original
          </button>
        </div>

        {saveSuccess && (
          <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 mx-8 mt-6">
            <div className="flex items-center gap-3">
              <svg className="h-5 w-5 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.0} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="text-xs font-semibold text-emerald-800 tracking-wide">
                Alterações salvas com sucesso.
              </div>
            </div>
          </div>
        )}

        <div className="p-8 md:p-10">

          {activeTab === 'hero' && (
            <div className="space-y-6 max-w-3xl">
              <h2 className="text-lg font-serif text-brandPrussian mb-4 pb-2 border-b border-slate-100">
                Textos do Cabeçalho (Hero)
              </h2>

              <div className="grid grid-cols-1 gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-brandPrussian">Selo Superior</label>
                  <input
                    type="text"
                    value={tempConfig.hero.badge}
                    onChange={(e) => updateHeroField('badge', e.target.value)}
                    className="border border-slate-200 p-3 text-xs tracking-wide focus:border-brandPrussian outline-none transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-brandPrussian">Título Principal</label>
                    <input
                      type="text"
                      value={tempConfig.hero.title}
                      onChange={(e) => updateHeroField('title', e.target.value)}
                      className="border border-slate-200 p-3 text-xs tracking-wide focus:border-brandPrussian outline-none transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-brandPrussian">Palavra Destacada</label>
                    <input
                      type="text"
                      value={tempConfig.hero.highlightWord}
                      onChange={(e) => updateHeroField('highlightWord', e.target.value)}
                      className="border border-slate-200 p-3 text-xs tracking-wide focus:border-brandPrussian outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-brandPrussian">Subtítulo</label>
                  <textarea
                    rows={3}
                    value={tempConfig.hero.subtitle}
                    onChange={(e) => updateHeroField('subtitle', e.target.value)}
                    className="border border-slate-200 p-3 text-xs tracking-wide focus:border-brandPrussian outline-none transition-colors resize-none"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-brandPrussian">Texto do Botão</label>
                  <input
                    type="text"
                    value={tempConfig.hero.buttonText}
                    onChange={(e) => updateHeroField('buttonText', e.target.value)}
                    className="border border-slate-200 p-3 text-xs tracking-wide focus:border-brandPrussian outline-none transition-colors w-1/2"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'images' && (
            <div className="space-y-10 max-w-5xl">

              {/* Imagem do Hero */}
              <div>
                <h2 className="text-lg font-serif text-brandPrussian mb-4 pb-2 border-b border-slate-100">
                  Imagem de Fundo do Cabeçalho (Hero)
                </h2>
                <p className="text-xs text-slate-500 font-light max-w-2xl leading-relaxed mb-6">
                  Esta é a imagem de fundo exibida na primeira seção do site, logo abaixo do menu.
                </p>

                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="w-full md:w-64 h-40 bg-slate-200 overflow-hidden border border-slate-200 shrink-0">
                    <img
                      src={tempConfig.hero.imageUrl}
                      alt="Pré-visualização do Hero"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex-1 flex flex-col gap-2 w-full">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-brandPrussian">
                      URL da Imagem
                    </label>
                    <input
                      type="url"
                      value={tempConfig.hero.imageUrl}
                      onChange={(e) => updateHeroField('imageUrl', e.target.value)}
                      placeholder="Cole o link de uma imagem (Unsplash, Imgur, etc.)"
                      className="border border-slate-200 p-3 text-xs font-mono tracking-wide focus:border-brandPrussian outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Imagens dos Produtos */}
              <div className="border-t border-slate-100 pt-8">
                <h2 className="text-lg font-serif text-brandPrussian mb-4 pb-2 border-b border-slate-100">
                  Imagens dos Produtos
                </h2>
                <p className="text-xs text-slate-500 font-light max-w-2xl leading-relaxed mb-6">
                  Substitua a imagem de qualquer peça da coleção. A alteração vale tanto para a vitrine quanto para a página do produto.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {PRODUCTS.map((product) => {
                    const currentImage = getProductImage(product.id, product.imageUrl);
                    const isOverridden = Boolean(tempConfig.productImages && tempConfig.productImages[product.id]);
                    return (
                      <div key={product.id} className="border border-slate-200 bg-slate-50/50 p-4 flex flex-col gap-3">
                        <div className="w-full h-40 bg-slate-200 overflow-hidden relative border border-slate-200">
                          <img
                            src={currentImage}
                            alt={product.name}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                          {isOverridden && (
                            <span className="absolute top-2 left-2 px-2 py-0.5 bg-brandRed text-brandCream text-[9px] uppercase tracking-wider">
                              Imagem alterada
                            </span>
                          )}
                        </div>

                        <div>
                          <span className="block text-xs font-serif text-brandPrussian font-medium leading-tight">
                            {product.name}
                          </span>
                          <span className="block text-[10px] text-brandSoftBlue tracking-wide mt-0.5">
                            {product.category}
                          </span>
                        </div>

                        <input
                          type="url"
                          placeholder="URL da nova imagem"
                          value={currentImage}
                          onChange={(e) => updateProductImage(product.id, e.target.value)}
                          className="w-full border border-slate-200 p-2 text-[10px] font-mono text-slate-600 focus:border-brandPrussian bg-white outline-none"
                        />

                        {isOverridden && (
                          <button
                            onClick={() => resetProductImage(product.id)}
                            className="text-[10px] text-brandRed tracking-wide uppercase hover:underline font-semibold text-left"
                          >
                            Restaurar imagem original
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Imagens da Seção Sobre */}
              <div className="border-t border-slate-100 pt-8">
                <h2 className="text-lg font-serif text-brandPrussian mb-4 pb-2 border-b border-slate-100">
                  Imagens da Seção "Sobre"
                </h2>
                <p className="text-xs text-slate-500 font-light max-w-2xl leading-relaxed mb-6">
                  Edite as imagens das seções: Introdução, Bloco 1 (Fundamento) e Bloco 2 (Qualidade).
                </p>

                <div className="space-y-8">
                  {/* Imagem Introdução */}
                  <div className="border border-slate-200 bg-slate-50/50 p-6">
                    <h3 className="text-sm font-bold text-brandPrussian uppercase tracking-wider mb-4">
                      Imagem — Introdução
                    </h3>
                    <div className="flex flex-col md:flex-row gap-6 items-start">
                      <div className="w-full md:w-48 h-32 bg-slate-200 overflow-hidden border border-slate-200 shrink-0">
                        <img
                          src={tempConfig.about.aboutImage || 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=1200'}
                          alt="Imagem da Introdução"
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="flex-1 flex flex-col gap-2 w-full">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-brandPrussian">
                          URL da Imagem
                        </label>
                        <input
                          type="url"
                          value={tempConfig.about.aboutImage || ''}
                          onChange={(e) => updateAboutField('aboutImage', e.target.value)}
                          placeholder="Cole o link de uma imagem"
                          className="border border-slate-200 p-3 text-xs font-mono tracking-wide focus:border-brandPrussian outline-none transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Imagem Seção 2 - Fundamento */}
                  <div className="border border-slate-200 bg-slate-50/50 p-6">
                    <h3 className="text-sm font-bold text-brandPrussian uppercase tracking-wider mb-4">
                      Imagem — Bloco 1 (Fundamento)
                    </h3>
                    <div className="flex flex-col md:flex-row gap-6 items-start">
                      <div className="w-full md:w-48 h-32 bg-slate-200 overflow-hidden border border-slate-200 shrink-0">
                        <img
                          src={tempConfig.about.section2Image || 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=1200'}
                          alt="Imagem do Bloco de Fundamento"
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="flex-1 flex flex-col gap-2 w-full">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-brandPrussian">
                          URL da Imagem
                        </label>
                        <input
                          type="url"
                          value={tempConfig.about.section2Image || ''}
                          onChange={(e) => updateAboutField('section2Image', e.target.value)}
                          placeholder="Cole o link de uma imagem"
                          className="border border-slate-200 p-3 text-xs font-mono tracking-wide focus:border-brandPrussian outline-none transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Imagem Seção 3 - Qualidade */}
                  <div className="border border-slate-200 bg-slate-50/50 p-6">
                    <h3 className="text-sm font-bold text-brandPrussian uppercase tracking-wider mb-4">
                      Imagem — Bloco 2 (Qualidade)
                    </h3>
                    <div className="flex flex-col md:flex-row gap-6 items-start">
                      <div className="w-full md:w-48 h-32 bg-slate-200 overflow-hidden border border-slate-200 shrink-0">
                        <img
                          src={tempConfig.about.section3Image || 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=1200'}
                          alt="Imagem do Bloco de Qualidade"
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="flex-1 flex flex-col gap-2 w-full">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-brandPrussian">
                          URL da Imagem
                        </label>
                        <input
                          type="url"
                          value={tempConfig.about.section3Image || ''}
                          onChange={(e) => updateAboutField('section3Image', e.target.value)}
                          placeholder="Cole o link de uma imagem"
                          className="border border-slate-200 p-3 text-xs font-mono tracking-wide focus:border-brandPrussian outline-none transition-colors"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'about' && (
            <div className="space-y-8 max-w-3xl">
              <div>
                <h2 className="text-lg font-serif text-brandPrussian mb-4 pb-2 border-b border-slate-100">
                  Textos da Seção "Sobre"
                </h2>

                <div className="space-y-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-brandPrussian">Título da Seção</label>
                    <input
                      type="text"
                      value={tempConfig.about.title}
                      onChange={(e) => updateAboutField('title', e.target.value)}
                      className="border border-slate-200 p-3 text-xs tracking-wide focus:border-brandPrussian outline-none transition-colors"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-brandPrussian">Parágrafo 1</label>
                    <textarea
                      rows={4}
                      value={tempConfig.about.paragraph1}
                      onChange={(e) => updateAboutField('paragraph1', e.target.value)}
                      className="border border-slate-200 p-3 text-xs tracking-wide focus:border-brandPrussian outline-none transition-colors resize-none leading-relaxed"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-brandPrussian">Parágrafo 2</label>
                    <textarea
                      rows={4}
                      value={tempConfig.about.paragraph2}
                      onChange={(e) => updateAboutField('paragraph2', e.target.value)}
                      className="border border-slate-200 p-3 text-xs tracking-wide focus:border-brandPrussian outline-none transition-colors resize-none leading-relaxed"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-brandPrussian">Assinatura</label>
                    <input
                      type="text"
                      value={tempConfig.about.authorStamp}
                      onChange={(e) => updateAboutField('authorStamp', e.target.value)}
                      className="border border-slate-200 p-3 text-xs tracking-wide focus:border-brandPrussian outline-none transition-colors w-1/2"
                    />
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-6">
                <h3 className="font-serif text-sm text-brandPrussian font-bold uppercase tracking-wider mb-4">
                  Bloco 1 — Fundamento
                </h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Etiqueta</label>
                      <input
                        type="text"
                        value={tempConfig.about.section2Badge}
                        onChange={(e) => updateAboutField('section2Badge', e.target.value)}
                        className="border border-slate-200 p-2 text-xs outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Título</label>
                      <input
                        type="text"
                        value={tempConfig.about.section2Title}
                        onChange={(e) => updateAboutField('section2Title', e.target.value)}
                        className="border border-slate-200 p-2 text-xs outline-none"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Texto</label>
                    <textarea
                      rows={3}
                      value={tempConfig.about.section2Text}
                      onChange={(e) => updateAboutField('section2Text', e.target.value)}
                      className="border border-slate-200 p-2 text-xs outline-none resize-none leading-relaxed"
                    />
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-6">
                <h3 className="font-serif text-sm text-brandPrussian font-bold uppercase tracking-wider mb-4">
                  Bloco 2 — Qualidade
                </h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Etiqueta</label>
                      <input
                        type="text"
                        value={tempConfig.about.section3Badge}
                        onChange={(e) => updateAboutField('section3Badge', e.target.value)}
                        className="border border-slate-200 p-2 text-xs outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Título</label>
                      <input
                        type="text"
                        value={tempConfig.about.section3Title}
                        onChange={(e) => updateAboutField('section3Title', e.target.value)}
                        className="border border-slate-200 p-2 text-xs outline-none"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Texto</label>
                    <textarea
                      rows={3}
                      value={tempConfig.about.section3Text}
                      onChange={(e) => updateAboutField('section3Text', e.target.value)}
                      className="border border-slate-200 p-2 text-xs outline-none resize-none leading-relaxed"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'faq' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-lg font-serif text-brandPrussian mb-4 pb-2 border-b border-slate-100">
                  Gerenciar FAQ
                </h2>
                <p className="text-xs text-slate-500 font-light max-w-2xl leading-relaxed mb-6">
                  Adicione, remova ou edite as perguntas e respostas exibidas em forma de acordeão.
                </p>

                <div className="space-y-6 max-w-3xl">
                  {tempConfig.faqs.map((faq, index) => (
                    <div key={faq.id} className="border border-slate-200 bg-slate-50/50 p-5 space-y-4">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                        <span className="text-[10px] font-bold tracking-wider uppercase text-slate-400">
                          Pergunta #{index + 1}
                        </span>
                        <button
                          onClick={() => removeFAQ(faq.id)}
                          className="text-[10px] text-brandRed tracking-wide uppercase hover:underline font-semibold"
                        >
                          Excluir
                        </button>
                      </div>

                      <div className="space-y-3">
                        <div className="flex flex-col gap-1">
                          <label className="text-[9px] font-bold uppercase tracking-wider text-brandPrussian">Pergunta</label>
                          <input
                            type="text"
                            value={faq.question}
                            onChange={(e) => updateFAQ(faq.id, 'question', e.target.value)}
                            className="border border-slate-200 p-2.5 bg-white text-xs outline-none focus:border-brandPrussian"
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="text-[9px] font-bold uppercase tracking-wider text-brandPrussian">Resposta</label>
                          <textarea
                            rows={3}
                            value={faq.answer}
                            onChange={(e) => updateFAQ(faq.id, 'answer', e.target.value)}
                            className="border border-slate-200 p-2.5 bg-white text-xs outline-none focus:border-brandPrussian resize-none leading-relaxed"
                          />
                        </div>
                      </div>
                    </div>
                  ))}

                  {tempConfig.faqs.length === 0 && (
                    <div className="py-12 text-center border border-dashed border-slate-300 text-slate-400 text-xs font-light">
                      Nenhuma pergunta cadastrada.
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-slate-50 p-6 md:p-8 border border-slate-200 rounded-none max-w-3xl">
                <h3 className="text-sm font-bold text-brandPrussian uppercase tracking-wider mb-4">
                  + Adicionar Pergunta
                </h3>

                <form onSubmit={addFAQ} className="space-y-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[9px] font-bold uppercase tracking-wider text-slate-500">Pergunta</label>
                    <input
                      type="text"
                      placeholder="Ex: Como posso lavar minha camiseta?"
                      value={newFaqQuestion}
                      onChange={(e) => setNewFaqQuestion(e.target.value)}
                      className="border border-slate-200 p-2.5 bg-white text-xs outline-none focus:border-brandPrussian"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[9px] font-bold uppercase tracking-wider text-slate-500">Resposta</label>
                    <textarea
                      rows={3}
                      placeholder="Ex: Prefira lavar à mão ou em ciclo delicado, com água fria..."
                      value={newFaqAnswer}
                      onChange={(e) => setNewFaqAnswer(e.target.value)}
                      className="border border-slate-200 p-2.5 bg-white text-xs outline-none focus:border-brandPrussian resize-none leading-relaxed"
                    />
                  </div>

                  <button
                    type="submit"
                    className="py-2.5 px-6 bg-brandPrussian text-brandCream hover:bg-slate-800 text-xs font-semibold uppercase tracking-wider transition-colors inline-block"
                  >
                    Adicionar
                  </button>
                </form>
              </div>
            </div>
          )}

        </div>

        <div className="bg-slate-50 p-6 border-t border-slate-100 flex justify-end gap-4">
          <button
            onClick={onBack}
            className="py-2 px-5 border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-semibold uppercase tracking-wider transition-colors"
          >
            Sair do Painel
          </button>
          <button
            onClick={handleSave}
            className="py-2.5 px-8 bg-brandPrussian text-brandCream hover:bg-slate-800 text-xs font-semibold uppercase tracking-wider transition-colors"
          >
            Salvar Alterações
          </button>
        </div>

      </div>
    </div>
  );
};

export default AdminArea;