/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { JournalArticle, LandingConfig } from './types';

export const JOURNAL_ARTICLES: JournalArticle[] = [
  {
    id: 1,
    title: "A Pemba não é um giz comum",
    date: "16 de Junho, 2026",
    excerpt: "É através dela que as entidades firmam sua presença, riscam seus pontos, traçam proteção.",
    image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=1000",
    content: React.createElement(React.Fragment, null,
      React.createElement("p", { className: "mb-6 first-letter:text-5xl first-letter:font-serif first-letter:mr-3 first-letter:float-left text-brandGraphite" },
        "A Pemba não é um giz comum. É através dela que as entidades firmam sua presença, riscam seus pontos, traçam proteção. É um dos gestos mais antigos e poderosos da Umbanda — e foi ele que deu nome à nossa marca."
      ),
      React.createElement("p", { className: "mb-8 text-brandGraphite" },
        "Cada estampa que criamos parte desse ato. Do traço que firma, nasce o design que você veste."
      ),
      React.createElement("blockquote", { className: "border-l-2 border-brandRed pl-6 italic text-xl text-brandPrussian my-10 font-serif" },
        "\"O traço que firma. O giz que protege.\""
      )
    )
  },
  {
    id: 2,
    title: "Não explicamos a Umbanda",
    date: "08 de Junho, 2026",
    excerpt: "Não explicamos a Umbanda. Nós a vestimos.",
    image: "https://images.unsplash.com/photo-1507908708419-7799010c51c6?auto=format&fit=crop&q=80&w=1000",
    content: React.createElement(React.Fragment, null,
      React.createElement("p", { className: "mb-6 text-brandGraphite" },
        "Existe uma linguagem mais antiga que a palavra. É o traço que firma. O giz que marca. O círculo que fecha e protege."
      ),
      React.createElement("p", { className: "mb-8 text-brandGraphite" },
        "Traço de Pemba nasce dessa memória — não como ornamento, mas como prática. Não explicamos a Umbanda. Nós a vestimos."
      ),
      React.createElement("p", { className: "mb-6 text-brandGraphite" },
        "Cada estampa nasce de um fundamento real. Cada linha carrega intenção. Não há traço por acidente, não há forma por decoração. O design é o ritual."
      )
    )
  },
  {
    id: 3,
    title: "Minimalismo Sagrado",
    date: "25 de Maio, 2026",
    excerpt: "Minimalismo Sagrado não é ausência. É precisão.",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=1000",
    content: React.createElement(React.Fragment, null,
      React.createElement("p", { className: "mb-6 text-brandGraphite" },
        "Fazemos para quem não precisa provar o que crê. Para quem leva o axé sem precisar anunciá-lo. Para quem entende que proteção não se exibe — se sente."
      ),
      React.createElement("p", { className: "mb-8 text-brandGraphite" },
        "Minimalismo Sagrado não é ausência. É precisão. É saber que um único traço, no lugar certo, é suficiente para firmar tudo."
      )
    )
  }
];

export const BRAND_NAME = 'Traço de Pemba';
export const PRIMARY_COLOR = 'brandPrussian';
export const ACCENT_COLOR = 'brandRed';

// Categorias sugeridas para o autocomplete no painel admin.
// O admin pode digitar qualquer categoria nova — esta lista é só um ponto de partida.
export const SUGGESTED_CATEGORIES = ['Orixás', 'Guias & Entidades', 'Saudação', 'Fundamento'];

export const DEFAULT_LANDING_CONFIG: LandingConfig = {
  hero: {
    badge: "Minimalismo Sagrado",
    title: "O fundamento, na sua forma mais",
    highlightWord: "essencial.",
    subtitle: "Existe uma linguagem mais antiga que a palavra. Não explicamos a Umbanda. Nós a vestimos.",
    buttonText: "Vista o fundamento",
    imageUrl: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=2000&q=80"
  },
  products: [],
  bannerSlides: [
    {
      id: "slide1",
      imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=1200",
      title: "Linha Orixás",
      subtitle: "Para quem carrega a energia dos mais velhos."
    },
    {
      id: "slide2",
      imageUrl: "https://images.unsplash.com/photo-1507908708419-7799010c51c6?auto=format&fit=crop&q=80&w=1200",
      title: "Linha Guias & Entidades",
      subtitle: "Para quem foi acolhido por quem veio antes."
    },
    {
      id: "slide3",
      imageUrl: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=1200",
      title: "Linha Fundamento",
      subtitle: "Pontos riscados que chegam até você sem perder o que têm de sagrado."
    }
  ],
  about: {
    title: "O traço que nos une.",
    paragraph1: "A Pemba risca. Firma. Protege. É com esse mesmo gesto que nascemos — da vontade de transformar fundamentos da Umbanda em formas que cabem no corpo, na rua, no dia a dia. Não como moda que imita o sagrado, mas como design que o compreende.",
    paragraph2: "Na Traço de Pemba, cada peça é desenvolvida com respeito e pesquisa. Os símbolos que usamos têm raiz, têm história, têm força — e é essa força que transferimos para o tecido. Somos para quem carrega a fé por dentro e quer que ela também apareça por fora.",
    authorStamp: "Do terreiro ao mundo — sem perder o fundamento.",
    section2Badge: "Fundamento",
    section2Title: "Raiz e significado antes de tudo.",
    section2Text: "Pesquisamos o símbolo, entendemos sua origem, entendemos sua força. Só então chegamos ao design — e somente quando o design honra o fundamento, ele se torna uma peça da coleção.",
    section3Badge: "Qualidade",
    section3Title: "Qualidade como piso, não como diferencial.",
    section3Text: "Usamos algodão 100% fio 30.1 penteado. O toque é macio, o caimento é certo, e a peça resiste ao tempo sem perder a forma."
  },
  faqs: [
    {
      id: "faq1",
      question: "De que material são feitas as camisetas?",
      answer: "Usamos algodão 100% fio 30.1 penteado — uma escolha deliberada. O toque é macio, o caimento é certo, e a peça resiste ao tempo sem perder a forma."
    },
    {
      id: "faq2",
      question: "As estampas desbotam?",
      answer: "Não quando cuidadas corretamente. Trabalhamos com serigrafia de alta fixação e DTG em peças que pedem mais detalhe. Com lavagem no avesso em água fria, a estampa dura tanto quanto a sua fé."
    },
    {
      id: "faq3",
      question: "Como devo lavar minha peça?",
      answer: "Prefira lavar à mão ou em ciclo delicado, com água fria. Sem alvejante. Seque na sombra. Passe o ferro do avesso. A estampa agradece — e dura muito mais."
    },
    {
      id: "faq4",
      question: "Vocês entregam para todo o Brasil?",
      answer: "Sim. Do terreiro ao seu endereço, em qualquer canto do país. O prazo e o valor do frete aparecem ao informar o CEP na página do produto."
    },
    {
      id: "faq5",
      question: "Posso trocar ou devolver?",
      answer: "Sim. Você tem até 7 dias corridos após o recebimento para solicitar troca ou devolução, conforme o Código de Defesa do Consumidor. Consulte nossa Política de Trocas para o passo a passo."
    },
    {
      id: "faq6",
      question: "Fazem encomendas personalizadas?",
      answer: "Sim. Fazemos encomendas. Se você tem uma ideia — uma entidade que quer homenagear, uma saudação que quer carregar, um fundamento que ainda não encontrou forma — entre em contato. A gente pesquisa, desenvolve o design com o mesmo cuidado de toda a coleção e cria uma peça exclusiva para você. A estampa fica disponível em um link privado: só você decide quem pode comprar."
    },
    {
      id: "faq7",
      question: "Como entro em contato?",
      answer: "Por e-mail em contato@tracodepemba.com.br ou pelo WhatsApp, de segunda a sexta, das 9h às 18h. Respondemos com atenção — sem pressa, sem automação."
    }
  ]
};
