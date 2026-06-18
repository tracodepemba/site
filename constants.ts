/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { Product, JournalArticle, LandingConfig } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Camiseta Ogum Yê',
    tagline: 'Antes de qualquer caminho, ele já estava lá.',
    description: 'A palavra "Ogum" em escrita rúnica adaptada, atravessada por uma lâmina geométrica em diagonal. Estampa localizada no peito esquerdo.',
    longDescription: 'Ogum não pede passagem. Ele abre. Esta peça é para quem também abre — caminhos, portas, possibilidades. O traço que corta também protege. Estampa localizada no peito esquerdo, em algodão 100% fio 30.1 penteado.',
    price: 149,
    category: 'Orixás',
    imageUrl: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=1000',
    gallery: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=1000'
    ],
    features: ['Algodão 100% fio 30.1 penteado', 'Estampa serigráfica de alta fixação', 'Estampa localizada no peito esquerdo']
  },
  {
    id: 'p2',
    name: 'Camiseta Odoyá',
    tagline: 'O mar não explica sua profundidade.',
    description: 'Um círculo quase fechado e duas linhas de onda. Ao lado, "Odoyá" em tipografia serifada fina. Estampa centralizada no peito.',
    longDescription: 'Iemanjá carrega tudo: o que foi, o que virá, o que nunca se diz. Esta peça é para quem conhece esse silêncio. Estampa centralizada, em algodão 100% fio 30.1 penteado.',
    price: 149,
    category: 'Orixás',
    imageUrl: 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&q=80&w=1000',
    gallery: [
      'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&q=80&w=1000'
    ],
    features: ['Algodão 100% fio 30.1 penteado', 'Estampa serigráfica de alta fixação', 'Estampa centralizada no peito']
  },
  {
    id: 'p3',
    name: 'Camiseta Êpa Babá',
    tagline: 'A cruz que não cai. A luz que não apaga.',
    description: 'A cruz de Oxalá firmada sobre o monte, irradiando luz em traços finos, dentro de um medalhão. Estampa centralizada no peito.',
    longDescription: 'Oxalá não precisa se mover para estar em todo lugar. Sua força não grita — ela irradia. Devagar, constante, sem interrupção. Para quem tem o mais velho por pai. Estampa centralizada, em algodão 100% fio 30.1 penteado.',
    price: 149,
    category: 'Orixás',
    imageUrl: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=1000',
    gallery: [
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=1000'
    ],
    features: ['Algodão 100% fio 30.1 penteado', 'Estampa serigráfica de alta fixação', 'Estampa centralizada no peito']
  },
  {
    id: 'p4',
    name: 'Camiseta Eparrei Oyá',
    tagline: 'Ela não avisa que vai chegar.',
    description: 'Três raios em traço fino e assimétrico, descendo em diagonal. Abaixo, "Eparrei" em cursivo veloz. Estampa centralizada e ampla.',
    longDescription: 'O vento muda, a temperatura cai, e ela já está lá. Para quem tem Oyá por dentro — e sabe que quando ela passa, nada fica como estava. Estampa centralizada e ampla, em algodão 100% fio 30.1 penteado.',
    price: 149,
    category: 'Orixás',
    imageUrl: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&q=80&w=1000',
    gallery: [
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&q=80&w=1000'
    ],
    features: ['Algodão 100% fio 30.1 penteado', 'Estampa serigráfica de alta fixação', 'Estampa centralizada e ampla']
  },
  {
    id: 'p5',
    name: 'Camiseta Zé Pilintra',
    tagline: 'Ele não se apressa. Ele já chegou.',
    description: 'Nome em tipografia art déco fina e inclinada. Um chapéu de aba larga em dois traços geométricos. Estampa localizada no peito esquerdo.',
    longDescription: 'Zé Pilintra conhece todos os caminhos tortos e sabe que o mais curto nem sempre é o mais certo. Para quem tem jogo, tem charme, tem fundamento. Estampa localizada no peito esquerdo, em algodão 100% fio 30.1 penteado.',
    price: 149,
    category: 'Guias & Entidades',
    imageUrl: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=1000',
    gallery: [
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=1000'
    ],
    features: ['Algodão 100% fio 30.1 penteado', 'Estampa serigráfica de alta fixação', 'Estampa localizada no peito esquerdo']
  },
  {
    id: 'p6',
    name: 'Camiseta Vovó',
    tagline: 'Ela senta. Acende o cachimbo. E já sabe.',
    description: 'Um cachimbo em traço único e contínuo. Ao lado, "Vovó" em tipo serifado delicado. Estampa localizada no peito esquerdo.',
    longDescription: 'Vovó Maria Conga carrega a sabedoria que só vem de quem viveu, sofreu e ainda assim escolheu curar. Estampa localizada no peito esquerdo, em algodão 100% fio 30.1 penteado.',
    price: 149,
    category: 'Guias & Entidades',
    imageUrl: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=1000',
    gallery: [
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=1000'
    ],
    features: ['Algodão 100% fio 30.1 penteado', 'Estampa serigráfica de alta fixação', 'Estampa localizada no peito esquerdo']
  },
  {
    id: 'p7',
    name: 'Camiseta Pena Branca',
    tagline: 'O leve e o firme. O que voa e o que finca.',
    description: 'Uma pena em traço único, vertical e levíssimo. Abaixo, "Caboclo" em caixa alta espaçada. Estampa centralizada.',
    longDescription: 'O Caboclo conhece cada trilha, cada planta, cada sinal. Sua pena branca não é ornamento — é proteção. Estampa centralizada, em algodão 100% fio 30.1 penteado.',
    price: 149,
    category: 'Guias & Entidades',
    imageUrl: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&q=80&w=1000',
    gallery: [
      'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&q=80&w=1000'
    ],
    features: ['Algodão 100% fio 30.1 penteado', 'Estampa serigráfica de alta fixação', 'Estampa centralizada']
  },
  {
    id: 'p8',
    name: 'Camiseta Maria Padilha',
    tagline: 'Ela não pede licença para entrar.',
    description: 'Uma rosa em três traços. Abaixo, "Maria Padilha" em cursivo elegante e firme. Estampa localizada no peito esquerdo.',
    longDescription: 'Para quem conhece seu próprio poder — e parou de pedir desculpa por ocupar espaço. Estampa localizada no peito esquerdo, em algodão 100% fio 30.1 penteado.',
    price: 149,
    category: 'Guias & Entidades',
    imageUrl: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=1000',
    gallery: [
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=1000'
    ],
    features: ['Algodão 100% fio 30.1 penteado', 'Estampa serigráfica de alta fixação', 'Estampa localizada no peito esquerdo']
  },
  {
    id: 'p9',
    name: 'Camiseta Eparrei Iansã',
    tagline: 'O vento não pede.',
    description: '"EPARREI" em display bold branco fragmentado, com "Iansã" em cursivo dourado cortando por baixo. Fundo vermelho.',
    longDescription: 'A saudação de Oyá em vermelho e dourado, do jeito que ela merece ser anunciada. Para quem não teme a transformação. Estampa no peito, em algodão 100% fio 30.1 penteado.',
    price: 159,
    category: 'Saudação',
    imageUrl: 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&q=80&w=1000',
    gallery: [
      'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&q=80&w=1000'
    ],
    features: ['Algodão 100% fio 30.1 penteado', 'Estampa serigráfica de alta fixação', 'Linha Saudação']
  },
  {
    id: 'p10',
    name: 'Camiseta Salve Seu Zé',
    tagline: 'O chapéu que todo mundo reconhece.',
    description: 'Chapéu panamá irradiando luz, com "Salve Seu Zé!" em cursivo branco e contorno preto. Fundo vermelho.',
    longDescription: 'Uma peça de celebração para os filhos que já foram atendidos por ele, que já ouviram o conselho que ninguém mais daria. Estampa no peito, em algodão 100% fio 30.1 penteado.',
    price: 159,
    category: 'Saudação',
    imageUrl: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=1000',
    gallery: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=1000'
    ],
    features: ['Algodão 100% fio 30.1 penteado', 'Estampa serigráfica de alta fixação', 'Linha Saudação']
  },
  {
    id: 'p11',
    name: 'Camiseta Odoyá Yemanjá',
    tagline: 'O mar não tem pressa. Nunca teve.',
    description: '"ODOYÁ" em display serifado azul-claro com "yemanjá" em cursivo azul-marinho sobreposto. Fundo preto.',
    longDescription: 'A saudação que cabe num sussurro e num grito ao mesmo tempo. Para os filhos de Yemanjá que carregam essa profundidade como herança. Estampa no peito, em algodão 100% fio 30.1 penteado.',
    price: 159,
    category: 'Saudação',
    imageUrl: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&q=80&w=1000',
    gallery: [
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&q=80&w=1000'
    ],
    features: ['Algodão 100% fio 30.1 penteado', 'Estampa serigráfica de alta fixação', 'Linha Saudação']
  },
  {
    id: 'p12',
    name: 'Camiseta Patakori Ogum',
    tagline: 'Antes de qualquer caminho, uma lâmina.',
    description: '"PATAKORI" em display bold azul-escuro, com "Ogum" em cursivo vermelho circulando por cima. Fundo preto.',
    longDescription: 'O reconhecimento de quem viu o trabalho e entende o que ele custa. Para quem foi abençoado pela lâmina e carrega essa bênção com responsabilidade. Estampa no peito, em algodão 100% fio 30.1 penteado.',
    price: 159,
    category: 'Saudação',
    imageUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=1000',
    gallery: [
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=1000'
    ],
    features: ['Algodão 100% fio 30.1 penteado', 'Estampa serigráfica de alta fixação', 'Linha Saudação']
  },
  {
    id: 'p13',
    name: 'Camiseta Ponto de Abertura',
    tagline: 'Antes de qualquer coisa, o ponto é riscado.',
    description: 'O ponto riscado de abertura de gira, em sua forma original, em giz branco sobre preto. Estampa centralizada e grande.',
    longDescription: 'Para quem sabe o que está vendo, é reconhecimento imediato. Para quem não sabe, é geometria com força que não precisa ser nomeada. Estampa centralizada, em algodão 100% fio 30.1 penteado.',
    price: 149,
    category: 'Fundamento',
    imageUrl: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=1000',
    gallery: [
      'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=1000'
    ],
    features: ['Algodão 100% fio 30.1 penteado', 'Estampa serigráfica de alta fixação', 'Estampa centralizada']
  },
  {
    id: 'p14',
    name: 'Camiseta Firmeza',
    tagline: 'Firmeza não é rigidez. É raiz.',
    description: '"FIRMEZA" em caixa alta, tipografia bastão espaçada, com uma linha horizontal fina abaixo. Estampa centralizada.',
    longDescription: 'No terreiro, firmar é mais do que fixar. É confirmar: estou aqui, estou presente, estou protegido. Estampa centralizada, em algodão 100% fio 30.1 penteado.',
    price: 149,
    category: 'Fundamento',
    imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=1000',
    gallery: [
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=1000'
    ],
    features: ['Algodão 100% fio 30.1 penteado', 'Estampa serigráfica de alta fixação', 'Estampa centralizada']
  },
  {
    id: 'p15',
    name: 'Camiseta Cruzeiro',
    tagline: 'A encruzilhada não é dúvida. É escolha.',
    description: 'Uma cruz de Exu em traço geométrico limpo, com um ponto central e quatro pontos menores ao redor. Estampa centralizada e média.',
    longDescription: 'Para quem não foge das encruzilhadas e sabe que Exu está em toda esquina — e que isso é proteção, não ameaça. Estampa centralizada, em algodão 100% fio 30.1 penteado.',
    price: 149,
    category: 'Fundamento',
    imageUrl: 'https://images.unsplash.com/photo-1507908708419-7799010c51c6?auto=format&fit=crop&q=80&w=1000',
    gallery: [
      'https://images.unsplash.com/photo-1507908708419-7799010c51c6?auto=format&fit=crop&q=80&w=1000'
    ],
    features: ['Algodão 100% fio 30.1 penteado', 'Estampa serigráfica de alta fixação', 'Estampa centralizada']
  },
  {
    id: 'p16',
    name: 'Camiseta Axé',
    tagline: 'Axé não é uma despedida. É uma confirmação.',
    description: 'A palavra "AXÉ" em três tipografias sobrepostas em transparência: blackletter, serifado romano e bastão moderno. Estampa grande, ocupando o peito.',
    longDescription: 'Três tempos. Uma palavra. Porque o axé sempre foi maior do que qualquer forma consegue conter sozinha. Estampa ampla, em algodão 100% fio 30.1 penteado.',
    price: 149,
    category: 'Fundamento',
    imageUrl: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=1000',
    gallery: [
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=1000'
    ],
    features: ['Algodão 100% fio 30.1 penteado', 'Estampa serigráfica de alta fixação', 'Estampa ampla']
  }
];

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

export const DEFAULT_LANDING_CONFIG: LandingConfig = {
  hero: {
    badge: "Minimalismo Sagrado",
    title: "O fundamento, na sua forma mais",
    highlightWord: "essencial.",
    subtitle: "Existe uma linguagem mais antiga que a palavra. Não explicamos a Umbanda. Nós a vestimos.",
    buttonText: "Vista o fundamento"
  },
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
