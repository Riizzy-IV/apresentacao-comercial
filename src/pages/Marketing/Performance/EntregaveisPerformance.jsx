import Entregaveis from '../Conceito/Entregaveis';

const COLUNAS = [{
  left: 464,
  linha: { src: '/img/marketing/performance/linha-lista-1130.svg', width: 1130 },
  itens: [
    'Desenvolvimento de criativos (vídeo e estático)',
    'Criação e gestão de campanhas do Meta e Google Ads',
    'Estratégias focadas em geração de leads e autoridade digital',
    'Relatórios com insights e análises',
    'Reuniões mensais de acompanhamento de resultados',
    'Acompanhamento diário das métricas relacionadas aos anúncios e campanhas',
  ],
}];

/** Marketing · Performance, passo 12 (Figma "Tela 53"): lista dos entregáveis de performance digital. */
export default function EntregaveisPerformance() {
  return <Entregaveis sub="Performance digital" colunas={COLUNAS} mockup={null} />;
}
