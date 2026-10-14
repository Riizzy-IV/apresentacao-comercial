// Cases da tela "Resultados em números" (Objetivo).
// ABAS: cada aba é um menu suspenso com subcategorias; o título da tela é "<aba> <subcategoria>",
// ou o `titulo` da subcategoria quando definido (ex.: "Loteamento aberto").
// Cards em 2 linhas: até 6 ficam numa grade 3x2; mais que isso viram colunas extras com rolagem
// horizontal (preencha na ordem: toda a 1ª linha, depois a 2ª). Card:
//   `alta: true` mostra o ícone de seta para cima ao lado do status.
//   `selo100: true` mostra o selo laranja "100% VENDIDO" no canto da foto.
//   nome, local, tipo (etiqueta sobre a foto), foto, quantidade (ex.: "8 unidades"), valor (ex.: "27 milhões"),
//   status: { destaque, detalhe } — texto à direita; `detalhe` aceita JSX (ex.: <>em <b>4 meses</b></>).
//   Use `statusSimples` no lugar de `status` para uma única linha menor (ex.: "Etapa de Pré-lançamento").
// Subcategoria sem cards mostra "em breve".
export const ABAS = [
  {
    id: 'loteamentos',
    label: 'Loteamentos',
    subs: [
      {
        id: 'abertos',
        label: 'Abertos',
        titulo: 'Loteamento aberto',
        cards: [
          { nome: 'Novo Centro', local: 'Ilhéus - Bahia', tipo: 'Loteamento aberto popular',
            foto: '/img/objetivo/cases/novo-centro.jpg', quantidade: '1050 Lotes', valor: '123 milhões',
            status: { destaque: '30 vendas/mês', detalhe: '(remanescentes)' } },
          { nome: 'Mirante do Mar', local: 'Ivaiporã - PR', tipo: 'Loteamento aberto popular',
            foto: '/img/objetivo/cases/mirante-do-mar.jpg', quantidade: '246 lotes', valor: '30 milhões',
            status: { destaque: '80% vendido', detalhe: 'em 2 meses' } },
        ],
      },
      {
        id: 'fechados',
        label: 'Fechados',
        titulo: 'Loteamento fechado',
        cards: [
          // 1ª linha
          { nome: 'Mirante do Ivaí', local: 'Águas Lindas de Goiás - GO', tipo: 'Loteamento popular',
            foto: '/img/objetivo/cases/mirante-ivai.jpg', quantidade: '180 lotes', valor: '16.2 milhões',
            status: { destaque: '100% vendido', detalhe: <>em <b>2 semanas</b></> } },
          { nome: 'Altos de Campo Limpo', local: 'Campo Limpo Paulista - SP', tipo: 'Loteamento popular',
            foto: '/img/objetivo/cases/altos-campo-limpo.jpg', quantidade: '386 lotes', valor: '77.2 milhões', alta: true,
            status: { destaque: '70% vendas', detalhe: <>em <b>4 meses</b> (remanescentes)</> } },
          { nome: 'Residencial Comitivas', local: 'Barretos - SP', tipo: 'Loteamento médio padrão',
            foto: '/img/objetivo/cases/comitivas.jpg', quantidade: '163 lotes', valor: '57 milhões',
            status: { destaque: '60% vendido', detalhe: <>em <b>4 meses</b></> } },
          { nome: 'Ginco Zurique', local: 'Cuiabá - MT', tipo: 'Loteamento alto padrão',
            foto: '/img/objetivo/cases/ginco-zurique.jpg', quantidade: '294 lotes', valor: '450 milhões',
            status: { destaque: '85% vendido', detalhe: <>no <b>lançamento</b></> } },
          { nome: 'Fazenda Alteza', local: 'Bananeiras - PB', tipo: 'Loteamento alto padrão',
            foto: '/img/objetivo/cases/fazenda-alteza.jpg', quantidade: '347 lotes', valor: '145 milhões', alta: true,
            status: { destaque: '70% vendas', detalhe: <>em <b>4 meses</b></> } },
          // 2ª linha
          { nome: 'Fazenda Lucrian', local: 'Porto Feliz - SP', tipo: 'Loteamento médio padrão',
            foto: '/img/objetivo/cases/fazenda-lucrian.jpg', quantidade: '350 lotes', valor: '105 milhões',
            statusSimples: <>Relançamento com 30%<br />de vendas em 2 meses</> },
          { nome: 'Villas Encanto do Paxixi', local: 'Camisão - MS', tipo: 'Loteamento médio padrão',
            foto: '/img/objetivo/cases/villas-paxixi.jpg', quantidade: '35 lotes', valor: '6 milhões',
            status: { destaque: '70% vendido', detalhe: <>em <b>3 meses</b></> } },
          { nome: 'Volteio', local: 'Piraquara - PR', tipo: 'Loteamento médio padrão',
            foto: '/img/objetivo/cases/volteio.jpg', quantidade: '197 lotes', valor: '64 milhões',
            status: { destaque: '90% vendido', detalhe: <>em <b>5 meses</b></> } },
          { nome: 'FCK Empreendimentos', local: 'Campinas - SP', tipo: 'Loteamento alto padrão',
            foto: '/img/objetivo/cases/fck.jpg', quantidade: '280 lotes', valor: '420 milhões', alta: true,
            statusSimples: <>60% de vendas nos<br />6 primeiros meses</> },
          { nome: 'TOM (Atlantis Igaratá)', local: 'Igaratá - SP', tipo: 'Loteamento alto padrão',
            foto: '/img/objetivo/cases/tom-atlantis.jpg', quantidade: '86 lotes', valor: '110 milhões',
            status: { destaque: '70% vendido', detalhe: <>em <b>12 meses</b></> } },
        ],
      },
    ],
  },
  {
    id: 'verticais',
    label: 'Verticais',
    subs: [
      {
        id: 'alto-padrao',
        label: 'Alto padrão',
        cards: [
          { nome: 'Mirante do Atlântico', local: 'Bombinhas - SC', tipo: 'Vertical Alto Padrão (litoral)',
            foto: '/img/objetivo/cases/mirante-atlantico.jpg', quantidade: '8 unidades', valor: '27 milhões',
            statusSimples: 'Etapa de Pré-lançamento' },
          { nome: 'Residencial OKE Horto', local: 'Salvador - BA', tipo: 'Vertical Alto Padrão',
            foto: '/img/objetivo/cases/oke-horto.jpg', quantidade: '49 unidades', valor: '78 milhões',
            status: { destaque: '5 vendas', detalhe: <><b>2 meses prim.</b> (remanescentes)</> } },
          { nome: 'Residencial ER Giardino', local: 'Praia Grande - SP', tipo: 'Vertical Alto Padrão',
            foto: '/img/objetivo/cases/er-giardino.jpg', quantidade: '56 unidades', valor: '108 milhões',
            status: { destaque: '40% vendido', detalhe: <>no <b>lançamento</b></> } },
          { nome: 'Residencial Sereine', local: 'Santos - SP', tipo: 'Vertical Alto Padrão',
            foto: '/img/objetivo/cases/sereine.jpg', quantidade: '64 unidades', valor: '76 milhões',
            status: { destaque: '60% vendido', detalhe: <>em <b>4 meses</b></> } },
        ],
      },
      {
        id: 'medio-padrao',
        label: 'Médio padrão',
        cards: [
          { nome: 'Aruba Residence', local: 'Ubatuba - SP', tipo: 'Vertical Médio Padrão (litoral)',
            foto: '/img/objetivo/cases/aruba.jpg', quantidade: '108 apartamentos', valor: '52 milhões',
            status: { destaque: '80% vendido', detalhe: <>em <b>5 meses</b></> } },
          // TODO: no Figma a cidade está como "16.8 milhões" — confirmar a cidade
          { nome: 'Citta di Perugia', local: '', tipo: 'Vertical Médio Padrão (litoral)',
            foto: '/img/objetivo/cases/citta-perugia.jpg', quantidade: '28 apartamentos', valor: '77.2 milhões',
            status: { destaque: '100% vendido', detalhe: <>em <b>6 meses</b></> } },
          { nome: 'Residencial Ilha Bela', local: 'Ilhéus - BA', tipo: 'Vertical Médio Padrão (litoral)',
            foto: '/img/objetivo/cases/ilha-bela.jpg', quantidade: '26 apartamentos', valor: '16 milhões',
            status: { destaque: '70% vendido', detalhe: <>no <b>evento de lançamento</b></> } },
          // Fazenda Lucrian também aparece aqui no Figma, mas é loteamento (fica só em Loteamentos › Fechados)
        ],
      },
      {
        id: 'mcmv',
        label: 'MCMV',
        titulo: 'Verticais Minha Casa Minha Vida',
        cards: [
          { nome: 'Bella Vida Santo Antônio', local: 'Louveira - SP', tipo: 'Minha Casa Minha Vida',
            foto: '/img/objetivo/cases/bella-vida.jpg', quantidade: '80 unidades', valor: '23 milhões',
            status: { destaque: '90% vendido', detalhe: <>em <b>3 meses</b></> } },
          { nome: 'Residencial Esperança Prime', local: 'São Paulo - SP', tipo: 'Minha Casa Minha Vida',
            foto: '/img/objetivo/cases/esperanca-prime.jpg', quantidade: '29 unidades', valor: '10 milhões', selo100: true,
            status: { destaque: '100% vendido', detalhe: <>em <b>5 meses</b></> } },
          { nome: 'Residencial Vila das Rosas', local: 'São Carlos - SP', tipo: 'Minha Casa Minha Vida',
            foto: '/img/objetivo/cases/vila-das-rosas.jpg', quantidade: '500 unidades', valor: '125 milhões',
            status: { destaque: '90% vendido', detalhe: <>em <b>7 meses</b></> } },
        ],
      },
    ],
  },
  {
    id: 'horizontais',
    label: 'Horizontais',
    subs: [
      { id: 'alto-padrao',  label: 'Alto padrão',  cards: [] },
      { id: 'medio-padrao', label: 'Médio padrão', cards: [] },
      { id: 'mcmv',         label: 'MCMV',         cards: [] },
    ],
  },
];
