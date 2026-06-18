/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';

export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  longDescription?: string;
  price: number;
  category: 'Orixás' | 'Guias & Entidades' | 'Saudação' | 'Fundamento';
  imageUrl: string;
  gallery?: string[];
  features: string[];
}

export interface JournalArticle {
  id: number;
  title: string;
  date: string;
  excerpt: string;
  image: string;
  content: React.ReactNode; // Permite JSX para formatação rica
}

export enum LoadingState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  ERROR = 'ERROR',
  SUCCESS = 'SUCCESS'
}

export type ViewState =
  | { type: 'home' }
  | { type: 'product', product: Product }
  | { type: 'journal', article: JournalArticle }
  | { type: 'admin' };

export interface BannerSlide {
  id: string;
  imageUrl: string;
  title?: string;
  subtitle?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface LandingConfig {
  hero: {
    badge: string;
    title: string;
    highlightWord: string;
    subtitle: string;
    buttonText: string;
  };
  bannerSlides: BannerSlide[];
  about: {
    title: string;
    paragraph1: string;
    paragraph2: string;
    authorStamp: string;
    section2Badge: string;
    section2Title: string;
    section2Text: string;
    section3Badge: string;
    section3Title: string;
    section3Text: string;
  };
  faqs: FAQItem[];
}
