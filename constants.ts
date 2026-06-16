/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { Product, JournalArticle, LandingConfig } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Camiseta Flecha de Oxóssi',
    tagline: 'O traço que firma a direção.',
    description: 'Design limpo e preciso feito para quem caminha sob a guarda e a fartura do caçador de uma flecha só.',
    longDescription: 'A canção silencia para dar espaço ao vento: a flecha já partiu da corda. No "Minimalismo Sagrado", a Flecha de Oxóssi não necessita de legendas explicativas — quem compreende a força da mata e o compasso da precisão, reconhece seu poder instantaneamente. Confeccionada em algodão 100% fio 30.1 penteado, na cor off-white, com estampa minimalista em tom terra.',
    price: 149,
    category: 'Orixás',
    imageUrl: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=1000',
    gallery: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&q=80&w=1000'
    ],
    features: ['Algodão 100% Fio 30.1 Penteado', 'Estampa Serigráfica de Alta Fixação', 'Modelagem Streetwear Conforto']
  },
  {
    id: 'p2',
    name: 'Moletom Guia de Preto Velho',
    tagline: 'A sabedoria contida no silêncio.',
    description: 'Um abraço caloroso feito de algodão robusto com grafia minimalista do terço e contas sagradas.',
    longDescription: 'Inspirado na doçura, na paciência infinita e no colo acolhedor dos Pretos Velhos. O design discreto traz a representação gráfica de um terço de contas de lágrimas-de-nossa-senhora, lembrando que a verdadeira sabedoria reside no tempo, no silêncio e no respeito. Estrutura encorpada para a rua.',
    price: 289,
    category: 'Guias e Entidades',
    imageUrl: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=1000',
    gallery: [
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=1000'
    ],
    features: ['Moletom Premium 3 Cabos', 'Acabamento Interno Flanelado', 'Grafismo Bordado em Tom Suave']
  },
  {
    id: 'p3',
    name: 'Camiseta Ponto Riscado de Exu',
    tagline: 'Equilíbrio nos caminhos da rua.',
    description: 'O compasso que estabelece a ordem do movimento. Preto profundo com estampa off-white precisa de cruzamento de retas.',
    longDescription: 'O ponto riscado é a escrita do sagrado, o círculo que fecha e protege. Esta peça evoca a força e a astúcia dos guardiões através de um design refinado que representa a encruzilhada. Ideal para vestir onde quer que sua caminhada passe, com elegância e convicção.',
    price: 159,
    category: 'Fundamento',
    imageUrl: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=1000',
    gallery: [
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=1000'
    ],
    features: ['Algodão amaciado premium', 'Estampa DTG de alta fidelidade', 'Corte moderno com caimento perfeito']
  },
  {
    id: 'p4',
    name: 'Camiseta Espada de Ogum',
    tagline: 'A lei, o ferro e o caminho aberto.',
    description: 'O corte preciso que afasta as demandas externas. Cor chumbo estonada com estampa que remete ao corte do ferro sagrado.',
    longDescription: 'Ogum é a força ativa que abre frentes e lidera batalhas cotidianas. O design centraliza as qualidades do orixá: assertivo, cortante, firme. Uma linha vertical fina e minimalista em tinta metálica mate, simbolizando a lança e a espada que defendem quem caminha.',
    price: 149,
    category: 'Orixás',
    imageUrl: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&q=80&w=1000',
    gallery: [
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&q=80&w=1000'
    ],
    features: ['100% Algodão Premium Estonado', 'Gola canelada encorpada de 2cm', 'Estampa em tinta metálica fosca']
  },
  {
    id: 'p5',
    name: 'Camiseta Águas de Oxum',
    tagline: 'O brilho silencioso que cura.',
    description: 'A doçura e a força unidas. Tecido cor areia com o traço circular dourado sutil inspirado no abebé do orixá d\'água.',
    longDescription: 'Inspirada no Abebé de Oxum, o espelho ritualístico que reflete a beleza divina e repele toda negatividade. Um design feito de traços circulares límpidos de cor amarelo areia sobre algodão orgânico, trazendo serenidade, amor-próprio e abundância silenciosa.',
    price: 149,
    category: 'Orixás',
    imageUrl: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&q=80&w=1000',
    gallery: [
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&q=80&w=1000'
    ],
    features: ['Algodão certificado sustentável', 'Toque super macio com amaciante natural', 'Design curvilíneo exclusivo']
  },
  {
    id: 'p6',
    name: 'Boné Aba Curva Giz de Pemba',
    tagline: 'Conexão e firmeza na sua cabeça.',
    description: 'Acessório estruturado em sarja peletizada na cor barro com bordado minimalista de giz sagrado bordado à mão livre.',
    longDescription: 'A Pemba abre portais, firma reinos e delimita o espaço sagrado. Nosso boné traz a sutil representação do giz em forma de pequenos traços geométricos em alto relevo, ton-sur-ton, mantendo-se elegante, discreto e carregado de história.',
    price: 119,
    category: 'Fundamento',
    imageUrl: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&q=80&w=1000',
    gallery: [
      'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&q=80&w=1000'
    ],
    features: ['Sarja peletizada robusta 100%', 'Fecho ajustável em latão envelhecido', 'Bordado frontal minimalista tom-sur-ton']
  }
];

export const JOURNAL_ARTICLES: JournalArticle[] = [
  {
    id: 1,
    title: "A Pemba não é um giz comum",
    date: "16 de Junho, 2026",
    excerpt: "Diferente de um mero instrumento escolar, a Pemba firma portais e delimita reinos na Umbanda. Descubra sua força oculta.",
    image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=1000",
    content: React.createElement(React.Fragment, null,
      React.createElement("p", { className: "mb-6 first-letter:text-5xl first-letter:font-serif first-letter:mr-3 first-letter:float-left text-brandGraphite" },
        "A Pemba não é um simples giz de calcário. Ela é solo consagrado, sopro de vida e ferramenta de lei. É através dela que as entidades firmam sua presença, riscam seus pontos, traçam caminhos de proteção e desfazem as amarras que prendem o corpo e a mente."
      ),
      React.createElement("p", { className: "mb-8 text-brandGraphite" },
        "O ato de riscar o ponto é uma das cerimônias gráficas mais antigas e poderosas da Umbanda. No terreiro, o silêncio é preenchido pelo atrito suave da Pemba contra o chão de terra ou cimento. Cada reta, triângulo, flecha ou espiral é uma coordenada no invisível, uma invocação condensada em formas geométricas puras."
      ),
      React.createElement("blockquote", { className: "border-l-2 border-brandRed pl-6 italic text-xl text-brandPrussian my-10 font-serif" },
        "\"O traço que firma. O giz que protege. A forma que abriga fundamento.\""
      ),
      React.createElement("p", { className: "mb-6 text-brandGraphite" },
        "E foi desse exato ato de síntese espiritual que nasceu a nossa marca. Entendemos que o fundamento não precisa de excessos. O minimalismo da estampa Traço de Pemba honra essa escrita sagrada: um único traço, no lugar certo, carrega toda a força capaz de firmar e orientar a caminhada."
      )
    )
  },
  {
    id: 2,
    title: "Manifesto do Minimalismo Sagrado",
    date: "08 de Junho, 2026",
    excerpt: "Acreditamos que a força de um símbolo espiritual reside na sua precisão e reverência, não no excesso gráfico.",
    image: "https://images.unsplash.com/photo-1507908708419-7799010c51c6?auto=format&fit=crop&q=80&w=1000",
    content: React.createElement(React.Fragment, null,
      React.createElement("p", { className: "mb-6 text-brandGraphite" },
        "O círculo fecha, a cruz direciona, a flecha projeta. Antes das palavras complexas expressarem o intangível, as marcas ancestrais já habitavam o solo. A Traço de Pemba nasce para perpetuar essa memória cultural profunda — não como mero adorno ou peça de passarela efêmera, mas como uma prática de vestir com propósito sagrado."
      ),
      React.createElement("p", { className: "mb-8 text-brandGraphite" },
        "Não explicamos a Umbanda. Nós a vestimos com respeito e dedicação sincera. Estudamos o peso simbólico e a tradição de cada linha antes de passá-la para as telas digitais e telas físicas de impressão. O design de vestuário se torna, assim, um ritual de honra."
      ),
      React.createElement("div", { className: "my-12 p-8 bg-brandSoftBlue/5 border border-brandSoftBlue/15 font-serif text-brandPrussian italic text-center" },
        React.createElement("p", null, "Saber que o axé está presente"),
        React.createElement("p", null, "Sem precisar fazer estardalhaço."),
        React.createElement("p", null, "Que proteção não se exibe"),
        React.createElement("p", null, "Apenas se sente."),
        React.createElement("p", null, "O fundamento reside na essência"),
        React.createElement("p", null, "Não no excesso de ornamentos.")
      ),
      React.createElement("p", { className: "mb-6 text-brandGraphite" },
        "Esta é a fundação de nossa caminhada: a crença firme de que a precisão material carrega muito mais força espiritual do que qualquer acréscimo vazio. Convidamos você a sentir essa vibração do Minimalismo Sagrado e carregar o fundamento no peito."
      )
    )
  },
  {
    id: 3,
    title: "Pesquisa, Cuidado e Humildade no Terreiro",
    date: "25 de Maio, 2026",
    excerpt: "Como o terreiro e o ateliê de design contemporâneo conversam para criar vestimentas com fundamento real.",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=1000",
    content: React.createElement(React.Fragment, null,
      React.createElement("p", { className: "mb-6 text-brandGraphite" },
        "Não somos apenas uma marca de camisetas convencionais. Somos um estúdio focado em pesquisar, sintetizar e reinterpretar as riquezas gráficas da cultura de terreiro brasileira. Essa missão nos impõe um cuidado extremo."
      ),
      React.createElement("p", { className: "mb-8 text-brandGraphite" },
        "Sabemos que muitos símbolos de terreiro são rotulados sob preconceito ou representados de maneira folclórica ou comercial rasa. Em nosso ateliê, cada projeto começa imerso na pesquisa etnográfica, ouvindo zeladores, pesquisando e respeitando o segredo e o fundamento sagrado. Apenas o que pode e deve ir para as ruas é traduzido em traço estético."
      ),
      React.createElement("p", { className: "mb-6 text-brandGraphite" },
        "Lançar mão do algodão 100% puro e das tintas biodegradáveis é nossa expressão de respeito. Se a matéria-prima carrega o axé do trabalho humano, ela deve ser a mais digna possível. É essa a qualidade irredutível que colocamos sob a sua pele."
      )
    )
  }
];

export const BRAND_NAME = 'Traço de Pemba';
export const PRIMARY_COLOR = 'stone-900'; 
export const ACCENT_COLOR = 'amber-800';

export const DEFAULT_LANDING_CONFIG: LandingConfig = {
  hero: {
    badge: "Minimalismo Sagrado — Do terreiro ao mundo",
    title: "A Umbanda tem",
    highlightWord: "forma.",
    subtitle: "O fundamento, na sua forma mais essencial. Vestuário com respeito, precisão e pertencimento.",
    buttonText: "Descobrir Coleção"
  },
  bannerSlides: [
    {
      id: "slide1",
      imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=1200",
      title: "Coleção Raízes",
      subtitle: "A força ancestral em cada ponto riscado."
    },
    {
      id: "slide2",
      imageUrl: "https://images.unsplash.com/photo-1507908708419-7799010c51c6?auto=format&fit=crop&q=80&w=1200",
      title: "Tecido & Devoção",
      subtitle: "Algodão puro trabalhado com intenção e respeito."
    },
    {
      id: "slide3",
      imageUrl: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=1200",
      title: "Olhar para o Sagrado",
      subtitle: "Conectando o sutil ao visível no cotidiano e no asfalto."
    }
  ],
  about: {
    title: "O traço que nos une.",
    paragraph1: "A Pemba risca. Firma. Protege. É com esse mesmo gesto ancestral de síntese e fé que nascemos — da vontade de traduzir fundamentos profundos da Umbanda em formas que vestem o corpo no místico asfalto da rua, no terreiro e no dia a dia. Não como moda passageira que imita a tradição, mas como design autêntico que a compreende, a respeita e a honra.",
    paragraph2: "Sob o ideal do Minimalismo Sagrado, acreditamos que a precisão gráfica de um único traço, colocado com intenção, carrega muito mais força e axé do que qualquer acúmulo de elementos rebuscados. Na Traço de Pemba, cada peça é desenvolvida depois de uma de nossas cuidadosas pesquisas de significados. Vista-se com verdade.",
    authorStamp: "Ateliê de Algodão e Arte, Brasil",
    section2Badge: "Fundamento",
    section2Title: "Raiz e significado antes de tudo.",
    section2Text: "Cada peça e grafismo tem um porquê. Entendemos a origem e a força espiritual de cada flecha, círculo e linha antes de sugerir seu design final. Nada existe por mero ornamento ou tendência vazia de moda; tudo nasce porque tem raiz viva.",
    section3Badge: "Irredutível",
    section3Title: "Qualidade como piso, e não como opcional.",
    section3Text: "Usamos algodão penteado 100% puro Fio 30.1 e estamparias de alta durabilidade (serigrafia fina e DTG preciso) para garantir que sua vestir espiritual dure tanto quanto a sua fé. Um caimento impecável que respeita sua presença."
  },
  faqs: [
    {
      id: "faq1",
      question: "As estampas possuem fundamento real?",
      answer: "Sim. Cada estampa é desenvolvida após cuidadosa pesquisa histórica e espiritual, respeitando os preceitos da doutrina umbandista e trazendo apenas grafismos adequados para o uso público no dia a dia."
    },
    {
      id: "faq2",
      question: "Como funciona a produção sob encomenda?",
      answer: "Trabalhamos de forma lenta e consciente. Nossos lotes são feitos sob demanda para evitar desperdício de matéria-prima e garantir que cada peça passe por um processo de controle de qualidade rigoroso antes de ser enviada."
    },
    {
      id: "faq3",
      question: "Posso usar as roupas no terreiro e no dia a dia?",
      answer: "Absolutamente. As peças foram desenvolvidas sob o conceito de Minimalismo Sagrado para unir a reverência adequada dentro da gira ao caimento e estética adequados para a vida urbana e o cotidiano residencial."
    },
    {
      id: "faq4",
      question: "Como as peças da marca Traço de Pemba são feitas?",
      answer: "Nossas peças são produzidas com algodão 100% penteado puro da mais alta qualidade (Fio 30.1) e processos de estamparia duradouros como a serigrafia fina de toque zero e a impressão direta sob tecido (DTG), respeitando o meio ambiente."
    }
  ]
};