/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Camada de persistência remota usando a API REST do Supabase.
 *
 * Por que assim: o site é totalmente client-side (sem servidor próprio),
 * então conversamos direto com a API REST do Supabase usando apenas a
 * chave pública "anon". As regras de acesso (Row Level Security) feitas
 * no painel do Supabase é que controlam o que essa chave pode ou não fazer —
 * por isso ela pode ficar exposta no código do navegador com segurança.
 *
 * A tabela "site_config" tem uma única linha (id = 'main') com uma coluna
 * "data" do tipo jsonb, que guarda o LandingConfig inteiro.
 */

import { LandingConfig } from '../types';

const SUPABASE_URL = 'https://ttrcmuhzhpdbwbwoxnnd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR0cmNtdWh6aHBkYndib3hubmQiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTc4MTkwMDgzNCwiZXhwIjoyMDk3NDc2ODM0fQ.hnDWRQDFRwikVIwRoKWBY55L29o2ZNf8T85TlFSvlAU';

const REST_ENDPOINT = `${SUPABASE_URL}/rest/v1/site_config`;

const baseHeaders = {
  apikey: SUPABASE_ANON_KEY,
  Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
  'Content-Type': 'application/json',
};

/**
 * Busca a configuração salva no Supabase.
 * Retorna null se não houver linha, se a tabela estiver vazia,
 * ou se a requisição falhar (sem internet, projeto pausado, etc.) —
 * o chamador deve cair para o cache local (localStorage) nesses casos.
 */
export async function fetchRemoteConfig(): Promise<LandingConfig | null> {
  try {
    const response = await fetch(
      `${REST_ENDPOINT}?id=eq.main&select=data`,
      { headers: baseHeaders }
    );

    if (!response.ok) {
      console.error('Supabase: falha ao buscar configuração', response.status);
      return null;
    }

    const rows = await response.json();
    if (!Array.isArray(rows) || rows.length === 0) return null;

    const data = rows[0]?.data;
    if (!data || typeof data !== 'object' || Object.keys(data).length === 0) {
      return null;
    }

    return data as LandingConfig;
  } catch (err) {
    console.error('Supabase: erro de rede ao buscar configuração', err);
    return null;
  }
}

/**
 * Salva a configuração no Supabase, sobrescrevendo a linha única ('main').
 * Retorna true em caso de sucesso, false em caso de falha — o chamador
 * deve avisar o usuário se isso falhar, já que o salvamento local
 * (localStorage) continua funcionando independente disso.
 */
export async function saveRemoteConfig(config: LandingConfig): Promise<boolean> {
  try {
    const response = await fetch(`${REST_ENDPOINT}?id=eq.main`, {
      method: 'PATCH',
      headers: { ...baseHeaders, Prefer: 'return=minimal' },
      body: JSON.stringify({ data: config, updated_at: new Date().toISOString() }),
    });

    if (!response.ok) {
      console.error('Supabase: falha ao salvar configuração', response.status);
      return false;
    }

    return true;
  } catch (err) {
    console.error('Supabase: erro de rede ao salvar configuração', err);
    return false;
  }
}
