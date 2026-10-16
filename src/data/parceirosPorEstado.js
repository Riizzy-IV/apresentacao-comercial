// Parceiros por estado — aparecem no card ao passar o mouse / tocar no estado (tela "Onde atuamos").
// Só os estados listados aqui respondem ao hover. Chave = sigla do estado (ver src/data/mapaBrasil.js).
// `clientes`: nomes exibidos nas etiquetas (o card sempre termina com "e muito mais...").
// Fonte (exceto SP, que veio do Figma): planilha "Balzani Clientes informações" — até 4 nomes por
// estado, priorizando a classe "ALTA".
export const PARCEIROS_POR_ESTADO = {
  SP: {
    clientes: ['Diálogo Engenharia', 'Porte Engenharia', 'Plano&Plano', 'TOM Incorporadora'],
  },
  BA: {
    clientes: ['KR Engenharia', 'OKE', 'Villa Boutique', 'Legus'],
  },
  PR: {
    clientes: ['Live Imobi', 'Anton Incorporadora', 'Construtora Paranaense', 'Volteio'],
  },
  MG: {
    clientes: ['Bruno Lara Imóveis', 'JPC Incorporadora', 'Alto dos Pinheiros', 'JLTP Incorporadora'],
  },
  ES: {
    clientes: ['Construtora Lacerda', 'Brasil Construtora', 'Cecília Tower', 'Chamoun Incorporadora'],
  },
  RS: {
    clientes: ['Size Engenharia', 'Boréas', 'Refrilar Empreendimentos', 'BFS Incorporadora'],
  },
  SC: {
    clientes: ['STT Construtora', 'Construtora Absoluta', 'FBK Empreendimentos', 'Engebrique'],
  },
  GO: {
    clientes: ['Tai Empreendimentos', 'Bem Viver', 'Nexus Empreendimentos', 'Lusah Empreendimentos'],
  },
  RJ: {
    clientes: ['Zenite', 'Thiaris VSG', 'Edifica Real', 'Verde Vida'],
  },
  MT: {
    clientes: ['Ville de France', 'Ginco', 'Incorpore Realty'],
  },
  PA: {
    clientes: ['VSG Construtora e Incorporadora', 'Like Premium', 'Construtora Coimbra'],
  },
  AL: {
    clientes: ['Construtora DF', 'ACF Lucas'],
  },
  PB: {
    clientes: ['Fazenda Alteza', 'ZGT Empreendimentos'],
  },
  CE: { clientes: ['Enatec'] },
  MS: { clientes: ['Camargo e Borba'] },
  PE: { clientes: ['Torre Empreendimentos'] },
  RN: { clientes: ['Camelo e Costa'] },
};
