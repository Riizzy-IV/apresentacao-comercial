// Cronograma estratégico (Figma "Tela 5").
// resp: 'cliente' | 'ambos' | 'balzani'

export const MESES = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro']
  .map(m => `${m}/26`);

// cada etapa: caixa da etapa (laranja), lista de atividades e área do gráfico, com as
// posições do Figma (top/height da caixa laranja e da área do gráfico podem diferir um pouco)
export const ETAPAS = [
  {
    nome: 'Planejamento', prazo: '20~30 dias',
    stage: [109, 236], list: [110, 235], chart: [114, 231],
    atividades: [
      ['Registro de Incorporação', 'cliente'],
      ['Definição/Execução Imagens 3D', 'cliente'],
      ['Definir Orçamento (Obra)', 'cliente'],
      ['Estruturar Tabela de Vendas', 'cliente'],
      ['Definição do Orçamento de Marketing', 'cliente'],
      ['Definição do Coordenador Comercial', 'cliente'],
      ['Definição das Comissões (Externos)', 'cliente'],
      ['Realização de Análise de Mercado', 'ambos'],
      ['Definição do Público-Alvo', 'ambos'],
      ['Seleção das Imobiliárias Parceiras (5)', 'ambos'],
      ['Definição da Estratégia do Lançamento', 'balzani'],
      ['Definição da Gráfica', 'cliente'],
    ],
  },
  {
    nome: 'Execução', prazo: '45~60 dias',
    stage: [349, 328], list: [349, 328], chart: [349, 328],
    atividades: [
      ['Logo e Manual de Marca', 'balzani'],
      ['1 Landing Page', 'balzani'],
      ['1 Vídeo Conceito', 'balzani'],
      ['1 Flyer', 'balzani'],
      ['1 Folder', 'balzani'],
      ['1 Book Digital e Impresso', 'balzani'],
      ['1 Tapume', 'balzani'],
      ['2 Outdoors', 'balzani'],
      ['1 Windbanner', 'balzani'],
      ['1 Cavalete', 'balzani'],
      ['Acesso/Configuração BM', 'balzani'],
      ['Criativos', 'balzani'],
      ['Drive Corretores', 'balzani'],
      ['Comunidade no WhatsApp (Corretores)', 'cliente'],
      ['Criação de Ficha Cadastral', 'ambos'],
      ['Definir Mídias Alternativas', 'ambos'],
      ['Enviar Materiais Gráficas', 'cliente'],
    ],
  },
  {
    nome: 'Pré-lançamento', prazo: '45~60 dias',
    stage: [681, 97], list: [681, 97], chart: [681, 97],
    atividades: [
      ['Apresentação nas Imobiliárias', 'cliente'],
      ['Meeting Corretores', 'cliente'],
      ['Anúncios (Tráfego Pago)', 'balzani'],
      ['Panfletagem (Pontos estratégicos)', 'cliente'],
      ['Mídias Alternativas', 'ambos'],
    ],
  },
  {
    nome: 'Lançamento', prazo: '60 dias',
    stage: [782, 97], list: [782, 97], chart: [782, 97],
    atividades: [
      ['Evento de Lançamento', 'ambos'],
      ['Anúncios (Tráfego Pago)', 'balzani'],
      ['Panfletagem', 'cliente'],
      ['Mídias Alternativas', 'ambos'],
      ['Imobiliárias', 'cliente'],
    ],
  },
  {
    nome: 'Manutenção', prazo: '60 dias',
    stage: [883, 59], list: [883, 59], chart: [883, 59],
    atividades: [
      ['Anúncios (Tráfego Pago)', 'balzani'],
      ['Mídias Alternativas', 'ambos'],
      ['Imobiliárias', 'cliente'],
    ],
  },
];

// barras do gráfico: [left, top, width, height] em px do Figma
export const BARRAS = [
  // planejamento
  [817, 133, 175, 13], [795, 152, 167, 13], [795, 171, 112, 13], [795, 190, 112, 13],
  [795, 209, 227, 13], [1022, 228, 113, 13], [1022, 247, 113, 13], [1022, 266, 113, 13],
  [1022, 285, 113, 13], [848, 304, 115, 13], [934, 323, 116, 13],
  // execução
  [821, 357, 57, 18],
  ...Array.from({ length: 12 }, (_, i) => [993, 375 + i * 16, 87, 15]),
  [1196, 572, 27, 15], [1167, 589, 56, 15], [993, 605, 230, 15], [1080, 622, 115, 15],
  // pré-lançamento
  [1222, 684, 57, 15], [1222, 723, 144, 15], [1222, 741, 144, 15], [1222, 759, 144, 15],
  // lançamento
  [1366, 811, 230, 15], [1366, 828, 230, 15], [1366, 845, 230, 15], [1366, 862, 230, 15],
  // manutenção
  [1598, 887, 226, 15], [1598, 905, 226, 15], [1598, 923, 226, 15],
];

// linhas pontilhadas das semanas (35 linhas entre a 1ª e a última semana)
export const SEMANAS_X = Array.from({ length: 35 }, (_, i) => Math.round(819 + i * (1795 - 819) / 34));
