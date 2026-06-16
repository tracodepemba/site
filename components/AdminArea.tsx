import React, { useState } from 'react';
import { LandingConfig, BannerSlide, FAQItem } from '../types';

interface AdminAreaProps {
  config: LandingConfig;
  onSave: (newConfig: LandingConfig) => void;
  onReset: () => void;
  onBack: () => void;
}

const AdminArea: React.FC<AdminAreaProps> = ({ config, onSave, onReset, onBack }) => {
  const [activeTab, setActiveTab] = useState<'hero' | 'banner' | 'about' | 'faq'>('hero');
  const [tempConfig, setTempConfig] = useState<LandingConfig>(JSON.parse(JSON.stringify(config)));
  const [saveSuccess, setSaveSuccess] = useState(false);

  // New slide form state
  const [newSlideUrl, setNewSlideUrl] = useState('');
  const [newSlideTitle, setNewSlideTitle] = useState('');
  const [newSlideSubtitle, setNewSlideSubtitle] = useState('');

  // New FAQ form state
  const [newFaqQuestion, setNewFaqQuestion] = useState('');
  const [newFaqAnswer, setNewFaqAnswer] = useState('');

  const handleSave = () => {
    onSave(tempConfig);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleReset = () => {
    if (window.confirm('Tem certeza de que deseja restaurar todos os textos e imagens para o padrão original da marca? Todas as alterações atuais serão perdidas.')) {
      onReset();
      // Wait a moment for parent state to trigger or update local state
      onBack();
    }
  };

  // Image Presets for rapid testing
  const presets = [
    { name: 'Tecidos Rústicos', url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=1200' },
    { name: 'Plantas Sagradas', url: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=1200' },
    { name: 'Modelagem Natural', url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=1200' },
    { name: 'Oficinas & Tecares', url: 'https://images.unsplash.com/photo-1507908708419-7799010c51c6?auto=format&fit=crop&q=80&w=1200' },
    { name: 'Minimalismo Branco', url: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=1200' },
  ];

  // Carousel methods
  const addSlide = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSlideUrl) return;

    const newSlide: BannerSlide = {
      id: 'slide_' + Date.now(),
      imageUrl: newSlideUrl,
      title: newSlideTitle,
      subtitle: newSlideSubtitle
    };

    setTempConfig({
      ...tempConfig,
      bannerSlides: [...tempConfig.bannerSlides, newSlide]
    });

    setNewSlideUrl('');
    setNewSlideTitle('');
    setNewSlideSubtitle('');
  };

  const removeSlide = (id: string) => {
    setTempConfig({
      ...tempConfig,
      bannerSlides: tempConfig.bannerSlides.filter(s => s.id !== id)
    });
  };

  // FAQ methods
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

  // General text edits
  const updateHeroField = (field: keyof LandingConfig['hero'], value: string) => {
    setTempConfig({
      ...tempConfig,
      hero: {
        ...tempConfig.hero,
        [field]: value
      }
    });
  };

  const updateAboutField = (field: keyof LandingConfig['about'], value: string) => {
    setTempConfig({
      ...tempConfig,
      about: {
        ...tempConfig.about,
        [field]: value
      }
    });
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12 px-6">
      <div className="max-w-6xl mx-auto bg-white border border-slate-200/80 shadow-md">
        
        {/* Admin Header */}
        <div className="bg-brandPrussian p-8 md:p-10 text-brandCream flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-brandSoftBlue/10">
          <div>
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-brandRed font-bold mb-2">
              <span className="w-1.5 h-1.5 bg-brandRed rounded-full animate-ping"></span>
              Painel de Administração
            </div>
            <h1 className="text-2xl md:text-3xl font-serif text-white tracking-wide">
              Gerenciar Conteúdo Oficial
            </h1>
            <p className="text-xs text-brandCream/70 font-light mt-1.5 tracking-wide">
              Modifique de forma integrada cada detalhe, imagem corporativa e texto sagrado do Traço de Pemba.
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
              Visualizar & Salvar
            </button>
          </div>
        </div>

        {/* Tab System & Reset option */}
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-100 bg-slate-50/50 px-6 py-2.5">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTab('hero')}
              className={`py-2 px-4 text-xs font-semibold tracking-wider uppercase transition-colors rounded-none ${
                activeTab === 'hero' 
                  ? 'border-b-2 border-brandPrussian text-brandPrussian' 
                  : 'text-slate-500 hover:text-brandPrussian'
              }`}
            >
              Capa / Hero
            </button>
            <button
              onClick={() => setActiveTab('banner')}
              className={`py-2 px-4 text-xs font-semibold tracking-wider uppercase transition-colors rounded-none ${
                activeTab === 'banner' 
                  ? 'border-b-2 border-brandPrussian text-brandPrussian' 
                  : 'text-slate-500 hover:text-brandPrussian'
              }`}
            >
              Banner Rotativo
            </button>
            <button
              onClick={() => setActiveTab('about')}
              className={`py-2 px-4 text-xs font-semibold tracking-wider uppercase transition-colors rounded-none ${
                activeTab === 'about' 
                  ? 'border-b-2 border-brandPrussian text-brandPrussian' 
                  : 'text-slate-500 hover:text-brandPrussian'
              }`}
            >
              Nossa História (Sobre)
            </button>
            <button
              onClick={() => setActiveTab('faq')}
              className={`py-2 px-4 text-xs font-semibold tracking-wider uppercase transition-colors rounded-none ${
                activeTab === 'faq' 
                  ? 'border-b-2 border-brandPrussian text-brandPrussian' 
                  : 'text-slate-500 hover:text-brandPrussian'
              }`}
            >
              Acordo FAQ
            </button>
          </div>

          <button
            onClick={handleReset}
            className="text-[10px] text-brandRed font-light tracking-[0.15em] uppercase hover:underline transition-all mt-4 md:mt-0 p-1"
          >
            Restaurar Originais de Fábrica
          </button>
        </div>

        {/* Feedback Area */}
        {saveSuccess && (
          <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 mx-8 mt-6">
            <div className="flex items-center gap-3">
              <svg className="h-5 w-5 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.0} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="text-xs font-semibold text-emerald-800 tracking-wide">
                Alterações firmadas com sucesso! Volte ao site para ver a energia do novo desenho.
              </div>
            </div>
          </div>
        )}

        {/* Tab Contents */}
        <div className="p-8 md:p-10">
          
          {/* TAB 1: HERO COPY */}
          {activeTab === 'hero' && (
            <div className="space-y-6 max-w-3xl">
              <h2 className="text-lg font-serif text-brandPrussian mb-4 pb-2 border-b border-slate-100">
                Textos do Cabeçalho da Página (Hero)
              </h2>
              
              <div className="grid grid-cols-1 gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-brandPrussian">
                    Selo / Mini-Título Superior
                  </label>
                  <input
                    type="text"
                    value={tempConfig.hero.badge}
                    onChange={(e) => updateHeroField('badge', e.target.value)}
                    className="border border-slate-200 p-3 text-xs tracking-wide focus:border-brandPrussian outline-none transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-brandPrussian">
                      Título Principal (Antes do destaque)
                    </label>
                    <input
                      type="text"
                      value={tempConfig.hero.title}
                      onChange={(e) => updateHeroField('title', e.target.value)}
                      className="border border-slate-200 p-3 text-xs tracking-wide focus:border-brandPrussian outline-none transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-brandPrussian">
                      Palavra Destacada (Em Itálico)
                    </label>
                    <input
                      type="text"
                      value={tempConfig.hero.highlightWord}
                      onChange={(e) => updateHeroField('highlightWord', e.target.value)}
                      className="border border-slate-200 p-3 text-xs tracking-wide focus:border-brandPrussian outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-brandPrussian">
                    Subtítulo Resumido
                  </label>
                  <textarea
                    rows={3}
                    value={tempConfig.hero.subtitle}
                    onChange={(e) => updateHeroField('subtitle', e.target.value)}
                    className="border border-slate-200 p-3 text-xs tracking-wide focus:border-brandPrussian outline-none transition-colors resize-none"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-brandPrussian">
                    Texto do Botão
                  </label>
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

          {/* TAB 2: ROTATING BANNER */}
          {activeTab === 'banner' && (
            <div className="space-y-10">
              <div>
                <h2 className="text-lg font-serif text-brandPrussian mb-4 pb-2 border-b border-slate-100">
                  Gerenciar Banner Rotativo (Imagens da Transição)
                </h2>
                <p className="text-xs text-slate-500 font-light max-w-2xl leading-relaxed mb-6">
                  Modifique e adicione as fotos de alta resolução que compõem o slideshow inserido logo abaixo do cabeçalho. As imagens serão salvas localmente no cache do seu navegador.
                </p>

                {/* Slides Grid list */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {tempConfig.bannerSlides.map((slide, i) => (
                    <div key={slide.id} className="border border-slate-200 bg-slate-50/50 p-4 flex flex-col justify-between">
                      <div>
                        {/* Img Preview */}
                        <div className="w-full h-32 bg-slate-200 mb-4 overflow-hidden relative border border-slate-200">
                          <img 
                            src={slide.imageUrl} 
                            alt={slide.title || 'Slide Preview'} 
                            className="w-full h-full object-cover grayscale"
                            referrerPolicy="no-referrer"
                          />
                          <span className="absolute top-2 left-2 px-2 py-0.5 bg-brandPrussian text-brandCream text-[9px] uppercase tracking-wider">
                            Slide {i + 1}
                          </span>
                        </div>

                        {/* Title input and subtitle */}
                        <div className="space-y-3">
                          <input
                            type="text"
                            placeholder="Título do Slide"
                            value={slide.title || ''}
                            onChange={(e) => {
                              const newList = tempConfig.bannerSlides.map(s => s.id === slide.id ? { ...s, title: e.target.value } : s);
                              setTempConfig({ ...tempConfig, bannerSlides: newList });
                            }}
                            className="w-full border border-slate-200 p-2 text-xs focus:border-brandPrussian bg-white outline-none"
                          />
                          <input
                            type="text"
                            placeholder="Frase de efeito"
                            value={slide.subtitle || ''}
                            onChange={(e) => {
                              const newList = tempConfig.bannerSlides.map(s => s.id === slide.id ? { ...s, subtitle: e.target.value } : s);
                              setTempConfig({ ...tempConfig, bannerSlides: newList });
                            }}
                            className="w-full border border-slate-200 p-2 text-xs focus:border-brandPrussian bg-white outline-none"
                          />
                          <input
                            type="text"
                            placeholder="URL da Imagem"
                            value={slide.imageUrl}
                            onChange={(e) => {
                              const newList = tempConfig.bannerSlides.map(s => s.id === slide.id ? { ...s, imageUrl: e.target.value } : s);
                              setTempConfig({ ...tempConfig, bannerSlides: newList });
                            }}
                            className="w-full border border-slate-200 p-2 text-[10px] text-slate-500 focus:border-brandPrussian bg-white outline-none font-mono"
                          />
                        </div>
                      </div>
                      
                      <button
                        onClick={() => removeSlide(slide.id)}
                        className="mt-4 py-2 w-full text-center text-brandRed hover:bg-brandRed/5 border border-brandRed/20 text-[10px] font-bold uppercase tracking-wider transition-colors"
                      >
                        Excluir Slide
                      </button>
                    </div>
                  ))}
                  
                  {tempConfig.bannerSlides.length === 0 && (
                    <div className="col-span-full py-12 text-center border border-dashed border-slate-300 text-slate-400 text-xs font-light">
                      Nenhum slide cadastrado. Adicione um novo no formulário abaixo.
                    </div>
                  )}
                </div>
              </div>

              {/* Add New Slide Form */}
              <div className="bg-slate-50 p-6 md:p-8 border border-slate-200 rounded-none max-w-3xl">
                <h3 className="text-sm font-bold text-brandPrussian uppercase tracking-wider mb-4">
                  + Adicionar Novo Slide
                </h3>
                
                {/* Form fields */}
                <form onSubmit={addSlide} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] font-bold uppercase tracking-wider text-slate-500">Título do Slide</label>
                      <input
                        type="text"
                        placeholder="Ex: Coleção Inverno"
                        value={newSlideTitle}
                        onChange={(e) => setNewSlideTitle(e.target.value)}
                        className="border border-slate-200 p-2 bg-white text-xs outline-none focus:border-brandPrussian"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] font-bold uppercase tracking-wider text-slate-500">Subtítulo sutil</label>
                      <input
                        type="text"
                        placeholder="Ex: Conexão minimalista de vestir"
                        value={newSlideSubtitle}
                        onChange={(e) => setNewSlideSubtitle(e.target.value)}
                        className="border border-slate-200 p-2 bg-white text-xs outline-none focus:border-brandPrussian"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[9px] font-bold uppercase tracking-wider text-slate-500">URL Completo da Imagem</label>
                    <input
                      type="url"
                      required
                      placeholder="Cole um link de imagem do Unsplash, Imgur, etc."
                      value={newSlideUrl}
                      onChange={(e) => setNewSlideUrl(e.target.value)}
                      className="border border-slate-200 p-2 bg-white text-xs outline-none focus:border-brandPrussian font-mono"
                    />
                  </div>

                  {/* Preset Helper */}
                  <div>
                    <h4 className="text-[9px] font-bold uppercase tracking-wider text-slate-400 mb-2">Presilhas rápidas para teste (Presets)</h4>
                    <div className="flex flex-wrap gap-2">
                      {presets.map((p) => (
                        <button
                          key={p.name}
                          type="button"
                          onClick={() => setNewSlideUrl(p.url)}
                          className="bg-white border border-slate-200 hover:border-brandSoftBlue px-2.5 py-1 text-[10px] text-slate-600 font-medium tracking-wide transition-colors"
                        >
                          {p.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="py-2.5 px-6 bg-brandPrussian text-brandCream hover:bg-slate-800 text-xs font-semibold uppercase tracking-wider transition-colors inline-block"
                  >
                    Adicionar no Banner
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* TAB 3: ABOUT COPY */}
          {activeTab === 'about' && (
            <div className="space-y-8 max-w-3xl">
              <div>
                <h2 className="text-lg font-serif text-brandPrussian mb-4 pb-2 border-b border-slate-100">
                  Textos da Seção "Nossa História / Sobre"
                </h2>
                
                <div className="space-y-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-brandPrussian">
                      Título da Seção
                    </label>
                    <input
                      type="text"
                      value={tempConfig.about.title}
                      onChange={(e) => updateAboutField('title', e.target.value)}
                      className="border border-slate-200 p-3 text-xs tracking-wide focus:border-brandPrussian outline-none transition-colors"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-brandPrussian">
                      Parágrafo 1 (História)
                    </label>
                    <textarea
                      rows={4}
                      value={tempConfig.about.paragraph1}
                      onChange={(e) => updateAboutField('paragraph1', e.target.value)}
                      className="border border-slate-200 p-3 text-xs tracking-wide focus:border-brandPrussian outline-none transition-colors resize-none leading-relaxed"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-brandPrussian">
                      Parágrafo 2 (Filosofia)
                    </label>
                    <textarea
                      rows={4}
                      value={tempConfig.about.paragraph2}
                      onChange={(e) => updateAboutField('paragraph2', e.target.value)}
                      className="border border-slate-200 p-3 text-xs tracking-wide focus:border-brandPrussian outline-none transition-colors resize-none leading-relaxed"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-brandPrussian">
                      Selo de Assinatura do Ateliê
                    </label>
                    <input
                      type="text"
                      value={tempConfig.about.authorStamp}
                      onChange={(e) => updateAboutField('authorStamp', e.target.value)}
                      className="border border-slate-200 p-3 text-xs tracking-wide focus:border-brandPrussian outline-none transition-colors w-1/2"
                    />
                  </div>
                </div>
              </div>

              {/* Feature block 1 (Fundamento) */}
              <div className="border-t border-slate-100 pt-6">
                <h3 className="font-serif text-sm text-brandPrussian font-bold uppercase tracking-wider mb-4">
                  Bloco de Informação 1 (Escuro - Fundamento)
                </h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Etiqueta/Badge</label>
                      <input
                        type="text"
                        value={tempConfig.about.section2Badge}
                        onChange={(e) => updateAboutField('section2Badge', e.target.value)}
                        className="border border-slate-200 p-2 text-xs outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Título do Bloco</label>
                      <input
                        type="text"
                        value={tempConfig.about.section2Title}
                        onChange={(e) => updateAboutField('section2Title', e.target.value)}
                        className="border border-slate-200 p-2 text-xs outline-none"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Conteúdo do Bloco</label>
                    <textarea
                      rows={3}
                      value={tempConfig.about.section2Text}
                      onChange={(e) => updateAboutField('section2Text', e.target.value)}
                      className="border border-slate-200 p-2 text-xs outline-none resize-none leading-relaxed"
                    />
                  </div>
                </div>
              </div>

              {/* Feature block 2 (Irredutível) */}
              <div className="border-t border-slate-100 pt-6">
                <h3 className="font-serif text-sm text-brandPrussian font-bold uppercase tracking-wider mb-4">
                  Bloco de Informação 2 (Prussiano - Irredutível)
                </h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Etiqueta/Badge</label>
                      <input
                        type="text"
                        value={tempConfig.about.section3Badge}
                        onChange={(e) => updateAboutField('section3Badge', e.target.value)}
                        className="border border-slate-200 p-2 text-xs outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Título do Bloco</label>
                      <input
                        type="text"
                        value={tempConfig.about.section3Title}
                        onChange={(e) => updateAboutField('section3Title', e.target.value)}
                        className="border border-slate-200 p-2 text-xs outline-none"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Conteúdo do Bloco</label>
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

          {/* TAB 4: FAQ MANAGEMENT */}
          {activeTab === 'faq' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-lg font-serif text-brandPrussian mb-4 pb-2 border-b border-slate-100">
                  Gerenciar Acordo FAQ (Dúvidas Frequentes)
                </h2>
                <p className="text-xs text-slate-500 font-light max-w-2xl leading-relaxed mb-6">
                  Adicione, remova ou edite o texto detalhado de cada pergunta e resposta abaixo. As dúvidas aparecem em forma de acordeão logo acima do formulário de contato.
                </p>

                {/* FAQ list */}
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
                          Excluir Dúvida
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
                      Nenhuma pergunta cadastrada. Use o formulário abaixo para adicionar uma.
                    </div>
                  )}
                </div>
              </div>

              {/* Add FAQ form */}
              <div className="bg-slate-50 p-6 md:p-8 border border-slate-200 rounded-none max-w-3xl">
                <h3 className="text-sm font-bold text-brandPrussian uppercase tracking-wider mb-4">
                  + Adicionar Nova Dúvida FAQ
                </h3>
                
                <form onSubmit={addFAQ} className="space-y-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[9px] font-bold uppercase tracking-wider text-slate-500">Título da Pergunta de Dúvida</label>
                    <input
                      type="text"
                      placeholder="Ex: Como posso lavar minha camiseta sem danificar a estampa?"
                      value={newFaqQuestion}
                      onChange={(e) => setNewFaqQuestion(e.target.value)}
                      className="border border-slate-200 p-2.5 bg-white text-xs outline-none focus:border-brandPrussian"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[9px] font-bold uppercase tracking-wider text-slate-500">Resposta Detalhada</label>
                    <textarea
                      rows={3}
                      placeholder="Ex: Recomendamos lavar do lado avesso e não passar o ferro diretamente sobre a tinta estêncil para garantir toque suave duradouro..."
                      value={newFaqAnswer}
                      onChange={(e) => setNewFaqAnswer(e.target.value)}
                      className="border border-slate-200 p-2.5 bg-white text-xs outline-none focus:border-brandPrussian resize-none leading-relaxed"
                    />
                  </div>

                  <button
                    type="submit"
                    className="py-2.5 px-6 bg-brandPrussian text-brandCream hover:bg-slate-800 text-xs font-semibold uppercase tracking-wider transition-colors inline-block"
                  >
                    Adicionar no FAQ
                  </button>
                </form>
              </div>
            </div>
          )}

        </div>

        {/* Footer actions */}
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
