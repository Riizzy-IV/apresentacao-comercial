// Estrutura da apresentação.
// - SECTIONS: botões da navegação inferior. `children` são as sub-telas do menu lateral
//   (`intro: true` = tela de abertura, que não aparece no menu lateral;
//    `steps` = passos extras da mesma tela: entram na sequência das setas, mas a tela
//    anima a mudança no lugar, sem a transição de fade, e o item do menu continua ativo).
//   `groups` = menu lateral com vários grupos recolhíveis (o título do menu é o grupo atual);
//   nesse caso `children` é montado a partir dos grupos (`logo` no grupo troca o título pela logo).
// - SLIDES: sequência linear usada pelas setas anterior/próximo.

// grupos do menu lateral da Fórmula Vértice
const FORMULA_GROUPS = [
  {
    label: 'Objetivo',
    items: [
      { route: '/objetivo', label: 'Objetivo', intro: true }, // abertura, sem menu lateral
      { route: '/objetivo/falta-de-resultado',     label: 'Falta de resultado', // causas aparecem uma de cada vez
        steps: [1, 2, 3, 4].map(n => `/objetivo/falta-de-resultado/causas/${n}`) },
      { route: '/objetivo/como-resolvemos',        label: 'Como resolvemos', // diferenciais aparecem um de cada vez
        steps: [1, 2, 3, 4].map(n => `/objetivo/como-resolvemos/diferenciais/${n}`) },
      { route: '/objetivo/iceberg-balzani',        label: 'Iceberg Balzani' },
      { route: '/objetivo/resultados',             label: 'Resultados', hidden: true },            // oculto temporariamente
      { route: '/objetivo/resultados-em-numeros',  label: 'Resultados em números', hidden: true }, // oculto temporariamente
      { route: '/objetivo/cronograma',             label: 'Cronograma', hidden: true },            // fora do menu novo
    ],
  },
  {
    label: 'Estratégia',
    logo: '/img/formula/logo-sidebar.svg', // no topo do menu, no lugar do título
    items: [
      { route: '/estrategia',             label: 'Definição' },
      { route: '/estrategia/atuacao',     label: 'Atuação' },
      { route: '/estrategia/cronograma',  label: 'Cronograma' },
      { route: '/estrategia/cases',       label: 'Cases' },
      { route: '/estrategia/entregaveis', label: 'Entregáveis' },
    ],
  },
  {
    label: 'Marketing',
    logo: '/img/formula/logo-sidebar.svg',
    items: [
      { route: '/marketing',             label: 'Marketing', intro: true }, // abertura com os 3 cards, fora do menu
      { route: '/marketing/conceito',    label: 'Conceito',     // texto → projetos (brandbooks) → entregáveis
        steps: ['/marketing/conceito/projetos', '/marketing/conceito/entregaveis'] },
      { route: '/marketing/enxoval',     label: 'Enxoval',      // texto → projetos (landing pages) → entregáveis
        steps: ['/marketing/enxoval/projetos', '/marketing/enxoval/entregaveis'] },
      { route: '/marketing/performance', label: 'Performance',  // pilares → experiência → criativo → criativo bonito → vídeo conceito → AIDA → tecnologia → criativos → dados → dashboards → funil → entregáveis
        steps: ['experiencia', 'criativo', 'criativo-bonito', 'video-conceito', 'aida', 'tecnologia', 'criativos', 'dados',
                'dashboards', 'funil', 'entregaveis'].map(p => `/marketing/performance/${p}`) },
    ],
  },
  {
    label: 'Comercial',
    logo: '/img/formula/logo-sidebar.svg',
    items: [
      { route: '/comercial',                      label: 'A importância' },
      { route: '/comercial/frentes-da-venda',     label: 'Frentes da venda' },
      { route: '/comercial/estrutura-ideal',      label: 'Estrutura ideal' },
      { route: '/comercial/o-maior-desafio',      label: 'O maior desafio' },
      { route: '/comercial/assessoria-comercial', label: 'Assessoria comercial' },
      { route: '/comercial/entregaveis',          label: 'Entregáveis' },
      { route: '/comercial/cases',                label: 'Cases' },
      { route: '/comercial/operacao-pre-vendas',  label: 'Operação pré-vendas' },
      { route: '/comercial/onde-agiriamos',       label: 'Onde agiríamos' },
      { route: '/encerramento',                   label: 'Encerramento', intro: true }, // slide final, tela cheia, fora do menu
    ],
  },
];

export const SECTIONS = [
  {
    route: '/',
    label: 'Início',
    icon: '/img/icons/home.svg', iconW: 21.5, iconH: 22.1,
  },
  {
    route: '/quem-somos',
    label: 'Quem somos',
    icon: '/img/icons/quem-somos.svg', iconActive: '/img/icons/quem-somos-active.svg', iconW: 20, iconH: 20,
    sidebarGroup: 'Grupo Balzani',
    children: [
      { route: '/quem-somos',                 label: 'Os sócios' },
      { route: '/quem-somos/grupo-balzani',   label: 'Grupo Balzani' },
      { route: '/quem-somos/zimbel',          label: 'A Zimbel' },
      { route: '/quem-somos/atta3d',          label: 'A Atta3D' },
      { route: '/quem-somos/empresarios',     label: 'Empresários' },
      { route: '/quem-somos/noticias',        label: 'Notícias' },
      { route: '/quem-somos/balzani',         label: 'A Balzani' },
      { route: '/quem-somos/parceiros',       label: 'Parceiros' },
      { route: '/quem-somos/onde-atuamos',    label: 'Onde atuamos' },
      { route: '/quem-somos/nossa-reputacao', label: 'Nossa reputação' },
    ],
  },
  {
    route: '/formula',
    label: 'Fórmula Vértice Balzani',
    icon: '/img/icons/formula.svg', iconActive: '/img/icons/formula-active.svg', iconW: 21, iconH: 20,
    entry: '/objetivo', // o botão da barra abre na 1ª tela (missão), não na logo
    groups: FORMULA_GROUPS,
    children: [
      ...FORMULA_GROUPS[0].items,                                   // Objetivo: missão … Iceberg Balzani
      { route: '/formula', label: 'Fórmula Vértice', intro: true,   // depois: abertura com a logo
        steps: ['/formula/pilares'] },                             // → 01 Estratégia, 02 Marketing, 03 Comercial
      ...FORMULA_GROUPS.slice(1).flatMap(g => g.items),             // Estratégia, Marketing, Comercial
    ],
  },
];

// `hidden: true` tira a tela das setas e do menu lateral (a rota continua existindo)
export const SLIDES = SECTIONS.flatMap(s =>
  s.children
    ? s.children.filter(c => !c.hidden).flatMap(c => [c.route, ...(c.steps ?? [])])
    : [s.route]
);

/** Item do menu (sub-tela) ao qual a rota pertence — considerando os passos. */
export function findItem(pathname) {
  for (const s of SECTIONS) {
    const child = s.children?.find(c => c.route === pathname || c.steps?.includes(pathname));
    if (child) return child;
  }
  return null;
}

const under = (pathname, route) => route === pathname || (route !== '/' && pathname.startsWith(route + '/'));

/** Seção (botão da barra inferior) à qual a rota pertence — inclui as telas dos grupos. */
export function findSection(pathname) {
  return SECTIONS.find(s => under(pathname, s.route) || s.children?.some(c => under(pathname, c.route)));
}

/** Grupo do menu lateral ao qual a rota pertence (seções com `groups`). */
export function findGroup(section, pathname) {
  return section.groups?.find(g => g.items.some(c => under(pathname, c.route)));
}

export function findLabel(pathname) {
  const child = findItem(pathname);
  if (child) return child.label;
  return SECTIONS.find(s => s.route === pathname)?.label ?? null;
}
