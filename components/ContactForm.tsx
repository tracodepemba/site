/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';

// Chave pública do Web3Forms — envia os dados do formulário para tracodepemba@gmail.com.
// Não é uma credencial sensível: é segura para ficar exposta no código do navegador.
const WEB3FORMS_ACCESS_KEY = '6fbe096b-ae96-40b8-906e-452c161c3efc';

const ContactForm: React.FC = () => {
  const [formState, setFormState] = useState({
    nome: '',
    email: '',
    contato: '',
    mensagem: '',
    interesse: 'encomenda'
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const interesseLabels: Record<string, string> = {
    encomenda: 'Encomendas Especiais',
    duvida: 'Fundamento de Estampas',
    parceria: 'Parcerias e Collabs',
    outro: 'Outros Assuntos'
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.nome || !formState.email || !formState.mensagem) return;

    setLoading(true);
    setError(false);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `Traço de Pemba — Novo contato (${interesseLabels[formState.interesse] || formState.interesse})`,
          from_name: formState.nome,
          email: formState.email,
          'WhatsApp / Instagram': formState.contato || 'Não informado',
          Assunto: interesseLabels[formState.interesse] || formState.interesse,
          Mensagem: formState.mensagem,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSuccess(true);
        setFormState({
          nome: '',
          email: '',
          contato: '',
          mensagem: '',
          interesse: 'encomenda'
        });
      } else {
        setError(true);
      }
    } catch (err) {
      console.error('Falha ao enviar formulário de contato', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="bg-white py-32 px-6 md:px-12 border-t border-brandSoftBlue/10">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">

        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            <span className="block text-[10px] font-bold uppercase tracking-[0.25em] text-brandRed mb-4">Conectar & Firmar</span>
            <h2 className="text-2xl md:text-3xl font-serif text-brandPrussian mb-6 leading-tight">
              Queremos ouvir <br /> seu traço.
            </h2>
            <p className="text-xs font-light tracking-wide leading-relaxed text-brandGraphite/90 mb-4">
              Para encomendas de peças exclusivas, projetos com terreiros e comunidades, ou dúvidas sobre nossos fundamentos de design, envie uma mensagem.
            </p>
            <p className="text-xs font-light tracking-wide leading-relaxed text-brandGraphite/90 mb-8">
              Respondemos com atenção — sem pressa, sem automação.
            </p>
          </div>

          <div className="space-y-4 pt-8 border-t border-brandSoftBlue/20 text-xs font-light tracking-wide text-brandGraphite/95">
            <div>
              <span className="block font-bold text-[10px] uppercase text-brandPrussian tracking-[0.2em] mb-1">E-mail</span>
              <a href="mailto:tracodepemba@gmail.com" className="hover:text-brandRed transition-colors">tracodepemba@gmail.com</a>
            </div>
            <div>
              <span className="block font-bold text-[10px] uppercase text-brandPrussian tracking-[0.2em] mb-1">Atendimento</span>
              <p>Segunda a sexta, das 9h às 18h</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 bg-brandSoftBlue/5 p-8 md:p-12 shadow-xl shadow-brandPrussian/5 rounded-none border border-brandSoftBlue/15">
          {success ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-16 animate-fade-in-up">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-12 h-12 text-brandRed mb-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-lg font-serif text-brandPrussian mb-3">Mensagem Enviada</h3>
              <p className="text-xs font-light tracking-wide leading-relaxed text-brandGraphite/90 max-w-sm mb-6">
                Recebemos seu contato. Vamos responder em breve. Axé!
              </p>
              <button
                onClick={() => setSuccess(false)}
                className="text-[10px] uppercase tracking-[0.2em] font-semibold text-brandPrussian underline underline-offset-4 hover:text-brandRed transition-colors"
              >
                Enviar nova mensagem
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {error && (
                <div className="bg-red-50 border-l-4 border-brandRed p-4">
                  <p className="text-xs font-semibold text-red-800 tracking-wide">
                    Não foi possível enviar sua mensagem. Tente novamente ou escreva direto para tracodepemba@gmail.com.
                  </p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col gap-2">
                  <label htmlFor="nome" className="text-[10px] font-bold uppercase tracking-[0.2em] text-brandPrussian">Seu Nome</label>
                  <input
                    type="text"
                    id="nome"
                    required
                    value={formState.nome}
                    onChange={(e) => setFormState({ ...formState, nome: e.target.value })}
                    placeholder="Como deseja ser chamado(a)?"
                    className="bg-transparent border-b border-brandSoftBlue/20 py-1.5 text-xs font-light tracking-wide text-brandGraphite placeholder-brandSoftBlue/45 outline-none focus:border-brandPrussian transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-[10px] font-bold uppercase tracking-[0.2em] text-brandPrussian">E-mail</label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="seu@contato.com"
                    className="bg-transparent border-b border-brandSoftBlue/20 py-1.5 text-xs font-light tracking-wide text-brandGraphite placeholder-brandSoftBlue/45 outline-none focus:border-brandPrussian transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col gap-2">
                  <label htmlFor="contato" className="text-[10px] font-bold uppercase tracking-[0.2em] text-brandPrussian">WhatsApp / Instagram</label>
                  <input
                    type="text"
                    id="contato"
                    value={formState.contato}
                    onChange={(e) => setFormState({ ...formState, contato: e.target.value })}
                    placeholder="(opcional)"
                    className="bg-transparent border-b border-brandSoftBlue/20 py-1.5 text-xs font-light tracking-wide text-brandGraphite placeholder-brandSoftBlue/45 outline-none focus:border-brandPrussian transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="interesse" className="text-[10px] font-bold uppercase tracking-[0.2em] text-brandPrussian">Assunto Principal</label>
                  <select
                    id="interesse"
                    value={formState.interesse}
                    onChange={(e) => setFormState({ ...formState, interesse: e.target.value })}
                    className="bg-transparent border-b border-brandSoftBlue/20 py-1.5 text-xs font-light tracking-wide text-brandGraphite outline-none focus:border-brandPrussian transition-colors cursor-pointer"
                  >
                    <option value="encomenda">Encomendas Especiais</option>
                    <option value="duvida">Fundamento de Estampas</option>
                    <option value="parceria">Parcerias e Collabs</option>
                    <option value="outro">Outros Assuntos</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="mensagem" className="text-[10px] font-bold uppercase tracking-[0.2em] text-brandPrussian">Mensagem</label>
                <textarea
                  id="mensagem"
                  required
                  rows={4}
                  value={formState.mensagem}
                  onChange={(e) => setFormState({ ...formState, mensagem: e.target.value })}
                  placeholder="Espaço para descrever sua encomenda ou intenção..."
                  className="bg-transparent border border-brandSoftBlue/20 p-3 text-xs font-light tracking-wide text-brandGraphite placeholder-brandSoftBlue/45 outline-none focus:border-brandPrussian transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-brandRed text-brandCream uppercase tracking-[0.18em] text-xs font-semibold hover:bg-[#a00f19] transition-colors disabled:opacity-50"
              >
                {loading ? 'Enviando...' : 'Enviar Mensagem'}
              </button>
            </form>
          )}
        </div>

      </div>
    </section>
  );
};

export default ContactForm;
