import React, { useState } from 'react';
import { LandingConfig, FAQItem, Product } from '../types';
import { SUGGESTED_CATEGORIES } from '../constants';
import { SyncStatus } from '../App';

interface AdminAreaProps {
  config: LandingConfig;
  onSave: (newConfig: LandingConfig) => Promise<boolean>;
  onReset: () => void;
  onBack: () => void;
  syncStatus: SyncStatus;
}

const emptyProduct = (): Product => ({
  id: 'prod_' + Date.now(),
  name: '',
  tagline: '',
  description: '',
  longDescription: '',
  category: '',
  imageUrl: '',
  features: []
});

const AdminArea: React.FC<AdminAreaProps> = ({ config, onSave, onReset, onBack, syncStatus }) => {
  const [activeTab, setActiveTab] = useState<'hero' | 'products' | 'images' | 'about' | 'faq'>('hero');
  const [tempConfig, setTempConfig] = useState<LandingConfig>(JSON.parse(JSON.stringify(config)));
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveFailed, setSaveFailed] = useState(false);
  const [saving, setSaving] = useState(false);

  const [newFaqQuestion, setNewFaqQuestion] = useState('');
  const [newFaqAnswer, setNewFaqAnswer] = useState('');

  // Controla qual produto está sendo editado (id) e o rascunho de edição
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [productDraft, setProductDraft] = useState<Product | null>(null);
  const [featuresDraftText, setFeaturesDraftText] = useState('');

  const handleSave = async () => {
    setSaving(true);
    setSaveFailed(false);
    const success = await onSave(tempConfig);
    setSaving(false);

    if (success) {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } else {
      setSaveFailed(true);
    }
  };

  const handleReset = () => {
    if (window.confirm('Tem certeza de que deseja restaurar todos os textos e produtos para o padrão original da marca? Todas as alterações atuais serão perdidas.')) {
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

  const moveFAQ = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= tempConfig.faqs.length) return;

    const reordered = [...tempConfig.faqs];
    [reordered[index], reordered[targetIndex]] = [reordered[targetIndex], reordered[index]];

    setTempConfig({
      ...tempConfig,
      faqs: reordered
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

  // ---- CRUD de produtos ----

  const existingCategories = Array.from(
    new Set([...SUGGESTED_CATEGORIES, ...tempConfig.products.map(p => p.category).filter(Boolean)])
  );

  const startNewProduct = () => {
    const draft = emptyProduct();
    setEditingProductId(draft.id);
    setProductDraft(draft);
    setFeaturesDraftText('');
  };

  const startEditProduct = (product: Product) => {
    setEditingProductId(product.id);
    setProductDraft({ ...product });
    setFeaturesDraftText(product.features.join('\n'));
  };

  const cancelEditProduct = () => {
    setEditingProductId(null);
    setProductDraft(null);
    setFeaturesDraftText('');
  };

  const updateProductDraftField = (field: keyof Product, value: string) => {
    if (!productDraft) return;
    setProductDraft({ ...productDraft, [field]: value });
  };

  const saveProductDraft = () => {
    if (!productDraft) return;
    if (!productDraft.name.trim()) {
      window.alert('O produto precisa ter um nome.');
      return;
    }

    const finalProduct: Product = {
      ...productDraft,
      features: featuresDraftText
        .split('\n')
        .map(f => f.trim())
        .filter(Boolean)
    };

    const exists = tempConfig.products.some(p => p.id === finalProduct.id);
    const updatedProducts = exists
      ? tempConfig.products.map(p => p.id === finalProduct.id ? finalProduct : p)
      : [...tempConfig.products, finalProduct];

    setTempConfig({ ...tempConfig, products: updatedProducts });
    cancelEditProduct();
  };

  const deleteProduct = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta peça? Esta ação não pode ser desfeita após salvar.')) {
      setTempConfig({
        ...tempConfig,
        products: tempConfig.products.filter(p => p.id !== id)
      });
      if (editingProductId === id) cancelEditProduct();
    }
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
              Edite os textos, imagens e produtos das seções principais da landing page.
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
              disabled={saving}
              className="py-2.5 px-6 bg-brandRed text-brandCream hover:bg-[#a00f19] text-xs font-semibold uppercase tracking-[0.16em] transition-colors disabled:opacity-60"
            >
              {saving ? 'Salvando...' : 'Salvar Alterações'}
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
              onClick={() => setActiveTab('products')}
              className={`py-2 px-4 text-xs font-semibold tracking-wider uppercase transition-colors rounded-none ${
                activeTab === 'products' ? 'border-b-2 border-brandPrussian text-brandPrussian' : 'text-slate-500 hover:text-brandPrussian'
              }`}
            >
              Produtos
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

        {/* Indicador de sincronização com a nuvem */}
        <div className={`flex items-center gap-2 px-8 py-2 text-[10px] font-semibold uppercase tracking-[0.15em] ${
          syncStatus === 'synced' ? 'bg-emerald-50 text-emerald-700' :
          syncStatus === 'syncing' ? 'bg-slate-100 text-slate-500' :
          syncStatus === 'error' ? 'bg-red-50 text-brandRed' :
          syncStatus === 'offline-fallback' ? 'bg-amber-50 text-amber-700' :
          'bg-slate-50 text-slate-400'
        }`}>
          <span className={`w-1.5 h-1.5 rounded-full ${
            syncStatus === 'synced' ? 'bg-emerald-500' :
            syncStatus === 'syncing' ? 'bg-slate-400 animate-pulse' :
            syncStatus === 'error' ? 'bg-brandRed' :
            syncStatus === 'offline-fallback' ? 'bg-amber-500' :
            'bg-slate-300'
          }`}></span>
          {syncStatus === 'synced' && 'Sincronizado com a nuvem — visível em todos os dispositivos'}
          {syncStatus === 'syncing' && 'Sincronizando com a nuvem...'}
          {syncStatus === 'error' && 'Falha ao sincronizar com a nuvem — alterações salvas apenas neste navegador'}
          {syncStatus === 'offline-fallback' && 'Sem conexão com a nuvem — exibindo dados salvos neste navegador'}
          {syncStatus === 'idle' && 'Conectando à nuvem...'}
        </div>

        {saveSuccess && (
          <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 mx-8 mt-6">
            <div className="flex items-center gap-3">
              <svg className="h-5 w-5 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.0} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="text-xs font-semibold text-emerald-800 tracking-wide">
                Alterações salvas na nuvem com sucesso — já disponíveis em qualquer dispositivo.
              </div>
            </div>
          </div>
        )}

        {saveFailed && (
          <div className="bg-red-50 border-l-4 border-brandRed p-4 mx-8 mt-6">
            <div className="flex items-center gap-3">
              <svg className="h-5 w-5 text-brandRed shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.0} d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
              </svg>
              <div className="text-xs font-semibold text-red-800 tracking-wide">
                Não foi possível salvar na nuvem. As alterações ficaram salvas só neste navegador — tente novamente com uma conexão de internet estável.
              </div>
            </div>
          </div>
        )}

        <div className="p-8 md:p-10">

          {/* ABA: HERO */}
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

          {/* ABA: PRODUTOS (CRUD completo) */}
          {activeTab === 'products' && (
            <div className="space-y-8 max-w-5xl">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h2 className="text-lg font-serif text-brandPrussian mb-1">
                    Gerenciar Produtos
                  </h2>
                  <p className="text-xs text-slate-500 font-light max-w-xl leading-relaxed">
                    Crie, edite ou exclua qualquer peça da coleção. As alterações só valem no site após clicar em "Salvar Alterações".
                  </p>
                </div>
                {!productDraft && (
                  <button
                    onClick={startNewProduct}
                    className="py-2.5 px-6 bg-brandPrussian text-brandCream hover:bg-slate-800 text-xs font-semibold uppercase tracking-wider transition-colors shrink-0"
                  >
                    + Nova Peça
                  </button>
                )}
              </div>

              {/* Formulário de criação/edição */}
              {productDraft && (
                <div className="border-2 border-brandPrussian/20 bg-slate-50/70 p-6 md:p-8 space-y-5">
                  <h3 className="text-sm font-bold text-brandPrussian uppercase tracking-wider mb-2">
                    {tempConfig.products.some(p => p.id === productDraft.id) ? 'Editando Peça' : 'Nova Peça'}
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-brandPrussian">Nome do Produto</label>
                      <input
                        type="text"
                        value={productDraft.name}
                        onChange={(e) => updateProductDraftField('name', e.target.value)}
                        placeholder="Ex: Camiseta Ogum Yê"
                        className="border border-slate-200 p-3 text-xs tracking-wide focus:border-brandPrussian outline-none transition-colors bg-white"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-brandPrussian">Categoria</label>
                      <input
                        type="text"
                        list="category-suggestions"
                        value={productDraft.category}
                        onChange={(e) => updateProductDraftField('category', e.target.value)}
                        placeholder="Ex: Orixás (ou crie uma nova)"
                        className="border border-slate-200 p-3 text-xs tracking-wide focus:border-brandPrussian outline-none transition-colors bg-white"
                      />
                      <datalist id="category-suggestions">
                        {existingCategories.map(cat => (
                          <option key={cat} value={cat} />
                        ))}
                      </datalist>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-brandPrussian">Tagline (frase curta de destaque)</label>
                    <input
                      type="text"
                      value={productDraft.tagline}
                      onChange={(e) => updateProductDraftField('tagline', e.target.value)}
                      placeholder='Ex: "Antes de qualquer caminho, ele já estava lá."'
                      className="border border-slate-200 p-3 text-xs tracking-wide focus:border-brandPrussian outline-none transition-colors bg-white"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-brandPrussian">Descrição Curta</label>
                    <textarea
                      rows={2}
                      value={productDraft.description}
                      onChange={(e) => updateProductDraftField('description', e.target.value)}
                      placeholder="Descrição breve exibida em listagens"
                      className="border border-slate-200 p-3 text-xs tracking-wide focus:border-brandPrussian outline-none transition-colors resize-none bg-white"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-brandPrussian">Descrição Completa</label>
                    <textarea
                      rows={4}
                      value={productDraft.longDescription || ''}
                      onChange={(e) => updateProductDraftField('longDescription', e.target.value)}
                      placeholder="Texto completo exibido na página do produto"
                      className="border border-slate-200 p-3 text-xs tracking-wide focus:border-brandPrussian outline-none transition-colors resize-none leading-relaxed bg-white"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-brandPrussian">Características (uma por linha)</label>
                    <textarea
                      rows={3}
                      value={featuresDraftText}
                      onChange={(e) => setFeaturesDraftText(e.target.value)}
                      placeholder={'Algodão 100% fio 30.1 penteado\nEstampa serigráfica de alta fixação\nEstampa localizada no peito esquerdo'}
                      className="border border-slate-200 p-3 text-[11px] tracking-wide focus:border-brandPrussian outline-none transition-colors resize-none leading-relaxed font-mono bg-white"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-brandPrussian">URL da Imagem</label>
                    <div className="flex flex-col md:flex-row gap-4 items-start">
                      {productDraft.imageUrl && (
                        <div className="w-full md:w-32 h-32 bg-slate-200 overflow-hidden border border-slate-200 shrink-0">
                          <img
                            src={productDraft.imageUrl}
                            alt="Pré-visualização"
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      )}
                      <input
                        type="url"
                        value={productDraft.imageUrl}
                        onChange={(e) => updateProductDraftField('imageUrl', e.target.value)}
                        placeholder="Cole o link de uma imagem (Cloudinary, Imgur, etc.)"
                        className="flex-1 border border-slate-200 p-3 text-xs font-mono tracking-wide focus:border-brandPrussian outline-none transition-colors bg-white"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={saveProductDraft}
                      className="py-2.5 px-6 bg-brandRed text-brandCream hover:bg-[#a00f19] text-xs font-semibold uppercase tracking-wider transition-colors"
                    >
                      Confirmar Peça
                    </button>
                    <button
                      onClick={cancelEditProduct}
                      className="py-2.5 px-6 border border-slate-300 hover:bg-slate-100 text-slate-600 text-xs font-semibold uppercase tracking-wider transition-colors"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              )}

              {/* Lista de produtos cadastrados */}
              {!productDraft && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {tempConfig.products.map((product) => (
                    <div key={product.id} className="border border-slate-200 bg-slate-50/50 p-4 flex flex-col gap-3">
                      <div className="w-full h-40 bg-slate-200 overflow-hidden border border-slate-200">
                        {product.imageUrl ? (
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[10px] text-slate-400 uppercase tracking-wider">
                            Sem imagem
                          </div>
                        )}
                      </div>

                      <div>
                        <span className="block text-xs font-serif text-brandPrussian font-medium leading-tight">
                          {product.name || 'Sem nome'}
                        </span>
                        <span className="block text-[10px] text-brandSoftBlue tracking-wide mt-0.5">
                          {product.category || 'Sem categoria'}
                        </span>
                      </div>

                      <div className="flex gap-2 mt-1">
                        <button
                          onClick={() => startEditProduct(product)}
                          className="flex-1 py-2 text-center text-brandPrussian border border-brandPrussian/30 hover:bg-brandPrussian/5 text-[10px] font-bold uppercase tracking-wider transition-colors"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => deleteProduct(product.id)}
                          className="flex-1 py-2 text-center text-brandRed border border-brandRed/30 hover:bg-brandRed/5 text-[10px] font-bold uppercase tracking-wider transition-colors"
                        >
                          Excluir
                        </button>
                      </div>
                    </div>
                  ))}

                  {tempConfig.products.length === 0 && (
                    <div className="col-span-full py-16 text-center border border-dashed border-slate-300 text-slate-400 text-xs font-light">
                      Nenhuma peça cadastrada ainda. Clique em "+ Nova Peça" para começar.
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* ABA: IMAGENS (Hero + Sobre) */}
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

              <p className="text-xs text-slate-500 font-light max-w-2xl leading-relaxed border-t border-slate-100 pt-6">
                As imagens dos produtos agora são editadas diretamente na aba <strong>"Produtos"</strong>, junto com o restante das informações de cada peça.
              </p>

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

          {/* ABA: SOBRE */}
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

          {/* ABA: FAQ */}
          {activeTab === 'faq' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-lg font-serif text-brandPrussian mb-4 pb-2 border-b border-slate-100">
                  Gerenciar FAQ
                </h2>
                <p className="text-xs text-slate-500 font-light max-w-2xl leading-relaxed mb-6">
                  Adicione, remova, edite ou reordene as perguntas e respostas exibidas em forma de acordeão. Use as setas para mudar a ordem de exibição no site.
                </p>

                <div className="space-y-6 max-w-3xl">
                  {tempConfig.faqs.map((faq, index) => (
                    <div key={faq.id} className="border border-slate-200 bg-slate-50/50 p-5 space-y-4">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                        <span className="text-[10px] font-bold tracking-wider uppercase text-slate-400">
                          Pergunta #{index + 1}
                        </span>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => moveFAQ(index, 'up')}
                              disabled={index === 0}
                              title="Mover para cima"
                              className="w-6 h-6 flex items-center justify-center text-brandPrussian border border-slate-200 hover:bg-brandPrussian/5 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                              </svg>
                            </button>
                            <button
                              onClick={() => moveFAQ(index, 'down')}
                              disabled={index === tempConfig.faqs.length - 1}
                              title="Mover para baixo"
                              className="w-6 h-6 flex items-center justify-center text-brandPrussian border border-slate-200 hover:bg-brandPrussian/5 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                              </svg>
                            </button>
                          </div>
                          <button
                            onClick={() => removeFAQ(faq.id)}
                            className="text-[10px] text-brandRed tracking-wide uppercase hover:underline font-semibold"
                          >
                            Excluir
                          </button>
                        </div>
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
            disabled={saving}
            className="py-2.5 px-8 bg-brandPrussian text-brandCream hover:bg-slate-800 text-xs font-semibold uppercase tracking-wider transition-colors disabled:opacity-60"
          >
            {saving ? 'Salvando...' : 'Salvar Alterações'}
          </button>
        </div>

      </div>
    </div>
  );
};

export default AdminArea;
