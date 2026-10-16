// Parceiros por estado — aparecem no card ao passar o mouse / tocar no estado (tela "Onde atuamos").
// Só os estados listados aqui respondem ao hover. Chave = sigla do estado (ver src/data/mapaBrasil.js).
// `clientes`: nomes exibidos nas etiquetas; `maisClientes: true` acrescenta a etiqueta "e muito mais".
// Fonte (exceto SP, que veio do Figma): planilha "Balzani Clientes informações" — total = clientes
// únicos do estado; etiquetas = até 4 nomes, priorizando a classe "ALTA".
export const PARCEIROS_POR_ESTADO = {
  SP: {
    total: 28,
    clientes: ['Diálogo Engenharia', 'Porte Engenharia', 'Plano&Plano', 'TOM Incorporadora'],
    maisClientes: true,
  },
  BA: {
    total: 15,
    clientes: ['KR Engenharia', 'OKE', 'Villa Boutique', 'Legus'],
    maisClientes: true,
  },
  PR: {
    total: 11,
    clientes: ['Live Imobi', 'Anton Incorporadora', 'Construtora Paranaense', 'Volteio'],
    maisClientes: true,
  },
  MG: {
    total: 7,
    clientes: ['Bruno Lara Imóveis', 'JPC Incorporadora', 'Alto dos Pinheiros', 'JLTP Incorporadora'],
    maisClientes: true,
  },
  ES: {
    total: 6,
    clientes: ['Construtora Lacerda', 'Brasil Construtora', 'Cecília Tower', 'Chamoun Incorporadora'],
    maisClientes: true,
  },
  RS: {
    total: 6,
    clientes: ['Size Engenharia', 'Boréas', 'Refrilar Empreendimentos', 'BFS Incorporadora'],
    maisClientes: true,
  },
  SC: {
    total: 5,
    clientes: ['STT Construtora', 'Construtora Absoluta', 'FBK Empreendimentos', 'Engebrique'],
    maisClientes: true,
  },
  GO: {
    total: 4,
    clientes: ['Tai Empreendimentos', 'Bem Viver', 'Nexus Empreendimentos', 'Lusah Empreendimentos'],
  },
  RJ: {
    total: 4,
    clientes: ['Zenite', 'Thiaris VSG', 'Edifica Real', 'Verde Vida'],
  },
  MT: {
    total: 3,
    clientes: ['Ville de France', 'Ginco', 'Incorpore Realty'],
  },
  PA: {
    total: 3,
    clientes: ['VSG Construtora e Incorporadora', 'Like Premium', 'Construtora Coimbra'],
  },
  AL: {
    total: 2,
    clientes: ['Construtora DF', 'ACF Lucas'],
  },
  PB: {
    total: 2,
    clientes: ['Fazenda Alteza', 'ZGT Empreendimentos'],
  },
  CE: { total: 1, clientes: ['Enatec'] },
  MS: { total: 1, clientes: ['Camargo e Borba'] },
  PE: { total: 1, clientes: ['Torre Empreendimentos'] },
  RN: { total: 1, clientes: ['Camelo e Costa'] },
};
