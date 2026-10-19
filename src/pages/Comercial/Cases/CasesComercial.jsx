import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import FormulaBackground from '../../../components/FormulaBackground/FormulaBackground';
import base from '../../Estrategia/Cases/Cases.module.css'; // abas: mesmas dos cases da Estratégia
import styles from './CasesComercial.module.css';

const IMG = '/img/comercial/cases';

// posição absoluta (coordenadas do Figma, tela de 1920×1080)
const at = (left, top, extra) => ({ left, top, ...extra });

/**
 * Cartão de vidro com o número em destaque e um gráfico (Figma: cartões de 400,9×377,2).
 * As peças internas ficam nas mesmas posições em todos os cases. `curvaPonto` = gráfico numa peça só
 * (Prime e Nexus); sem ele, curva e ponto separados (Incorp). `desfoque` = blur do vidro.
 * `pill.icone` = x do ícone de seta (no Figma a distância até o fim da pílula varia).
 */
function Cartao({ pos, antes, valor, pill, legenda, curvaPonto, desfoque = 5.155 }) {
  return (
    <div className={styles.cartao} style={{ ...pos, '--desfoque': `${desfoque}px` }} data-anim="card">
      <img src={`${IMG}/grade.svg`} alt="" width="321.871" height="156.647" className={styles.grade} style={at(37.37, 179.1)} />
      {curvaPonto
        ? <img src={`${IMG}/curva-ponto.svg`} alt="" width="266.718" height="131.293" className={styles.abs} style={at(95.92, 193.37)} />
        : (
          <>
            <img src={`${IMG}/curva.svg`} alt="" width="260.273" height="124.845" className={styles.abs} style={at(36.02, 199.85)} />
            <img src={`${IMG}/ponto.svg`} alt="" width="15.2084" height="15.2084" className={styles.abs} style={at(287.45, 193.35)} />
          </>
        )}
      {antes && <p className={styles.antes}>{antes}</p>}
      <p className={styles.valor}>{valor}</p>
      <p className={styles.cartaoPill} style={{ width: pill.w }}>{pill.texto}</p>
      <img src={`${IMG}/icone-seta.svg`} alt="" width="19.6364" height="19.6364" className={styles.abs}
        style={at(pill.icone, 130.91)} />
      {legenda && <p className={styles.legenda}>{legenda}</p>}
    </div>
  );
}

/** Bloco com a pílula laranja e o texto ("Nosso desafio", "A atuação da Balzani"). */
const Bloco = ({ titulo, largura, children, style }) => (
  <div className={styles.bloco} style={style} data-anim="item">
    <p className={styles.pill}>{titulo}</p>
    <p className={styles.texto} style={largura ? { width: largura } : undefined}>{children}</p>
  </div>
);

/** Case de assessoria comercial (Figma "Tela 36", "Tela 56" e "Tela 57"). */
function Case({ logo, nome, cidade, desafio, atuacao, resultado, cartoes, posicoes }) {
  // Incorp: blocos em posições soltas do Figma; Prime e Nexus: coluna com 26px entre os blocos
  const solto = top => posicoes && at(423, top, { position: 'absolute' });
  const conteudo = (
    <>
      <Bloco titulo="Nosso desafio" style={solto(476)}>{desafio}</Bloco>
      <Bloco titulo="A atuação da Balzani" largura={atuacao.largura} style={solto(598)}>{atuacao.texto}</Bloco>
      <div className={styles.resultado} style={solto(723)} data-anim="item">
        <p className={styles.resultadoTitulo}>O resultado</p>
        <p className={styles.resultadoTexto}>{resultado}</p>
      </div>
    </>
  );

  return (
    <>
      <div className={styles.logoCartao} data-anim="card">
        <img src={`${IMG}/${logo.src}`} alt={nome.join(' ')} className={styles.logo} style={logo.caixa} draggable={false} />
      </div>

      <div className={styles.titulo} style={{ top: cidade ? 289 : 303 }} data-anim="item">
        <p className={styles.nome}>{nome[0]}<br />{nome[1]}</p>
        {cidade && <p className={styles.cidade}>{cidade}</p>}
      </div>

      {posicoes ? conteudo : <div className={styles.coluna}>{conteudo}</div>}

      {cartoes.map(c => <Cartao key={c.valor} {...c} />)}
    </>
  );
}

const laranja = texto => <b className={styles.destaque}>{texto}</b>;

// cases (abas)
const CASES = [
  {
    aba: 'Incorp Construtora',
    logo: { src: 'logo-incorp.png', caixa: at(14, 33, { width: 183, height: 42 }) },
    nome: ['Incorp', 'construtora'], cidade: 'Ilhéus - Bahia', posicoes: true,
    desafio: <>Os próprios corretores atendiam os leads, sem um SDR dedicado.<br />O empreendimento registrava, em média, apenas 3 visitas presenciais por mês.</>,
    atuacao: { largura: 560, texto: 'Orientamos a contratação de um SDR e treinamos o profissional para assumir o atendimento dos leads e trabalhar o agendamento de visitas.' },
    resultado: <>A média mensal passou para {laranja('15 visitas realizadas')}, com {laranja('10 visitas')} já no primeiro mês de atuação do SDR.</>,
    cartoes: [
      { pos: at(1269, 223), valor: '5x mais', pill: { texto: 'visitas presenciais', w: 180, icone: 205.36 } },
      { pos: at(1473, 508), antes: 'de 3 para', valor: '15 visitas', pill: { texto: 'realizadas por mês', w: 187.364, icone: 214.37 }, desfoque: 29.05 },
    ],
  },
  {
    aba: 'Prime Empreendimentos',
    logo: { src: 'logo-prime.png', caixa: at(21, 25, { width: 174, height: 59 }) },
    nome: ['Prime', 'empreendimentos'],
    desafio: 'Organizar a operação comercial de mais de oito empreendimentos, com uma estrutura capaz de gerenciar o atendimento dos leads e a atuação dos corretores.',
    atuacao: { texto: 'Apoiamos a reestruturação comercial, com a contratação de um SDR e a implantação de uma coordenação comercial responsável por gerenciar o SDR e os corretores.' },
    resultado: <>Com a nova estrutura em funcionamento, a Prime realizou {laranja('8 vendas diretamente provenientes de leads em setembro de 2026.')}</>,
    cartoes: [
      { pos: at(1269, 355), valor: '8 vendas', pill: { texto: 'em um mês', w: 180, icone: 205.36 }, curvaPonto: true,
        legenda: 'Vendas originadas de leads em setembro de 2026.' },
    ],
  },
  {
    aba: 'Nexus Empreendimentos',
    logo: { src: 'logo-nexus.png', caixa: at(14, 4, { width: 176, height: 106 }) },
    nome: ['Mônaco', 'residencial'], cidade: 'Nexus empreendimentos',
    desafio: 'Iniciar a divulgação do empreendimento com foco em investidores, sem uma estrutura de SDR para atender, qualificar e conduzir os leads até a visita.',
    atuacao: { texto: 'Orientamos a contratação de um SDR antes do pré-lançamento e treinamos o profissional. Estruturamos o atendimento com o SDR responsável pela qualificação e pelo agendamento, e o corretor entrando a partir da visita presencial.' },
    resultado: <>Com a estrutura em operação desde o início da divulgação, {laranja('o empreendimento conquistou 7 vendas provenientes de leads em apenas 45 dias.')}</>,
    cartoes: [
      { pos: at(1269, 355), valor: '7 vendas', pill: { texto: 'em 45 dias', w: 180, icone: 205.36 }, curvaPonto: true,
        legenda: 'Vendas originadas de leads durante o pré-lançamento.' },
    ],
  },
];

/** Comercial · Cases: abas com os cases de assessoria comercial. */
export default function CasesComercial() {
  const rootRef = useRef(null);
  const contentRef = useRef(null);
  const [tab, setTab] = useState(0);
  const first = useRef(true);
  const { aba, ...caso } = CASES[tab];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from('[data-anim="bg"]',  { opacity: 0, duration: 1.4, ease: 'power2.out' }, 0)
        .from('[data-anim="tab"]', { opacity: 0, y: -12, duration: 0.5, stagger: 0.08 }, 0.15);
    }, rootRef);
    return () => ctx.revert();
  }, []);

  // entrada do conteúdo (na abertura e a cada troca de aba)
  useLayoutEffect(() => {
    const delay = first.current ? 0.3 : 0;
    first.current = false;
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: 'power3.out' }, delay })
        .from('[data-anim="card"]', { opacity: 0, y: 24, duration: 0.8, stagger: 0.12 }, 0)
        .from('[data-anim="item"]', { opacity: 0, y: 16, duration: 0.5, stagger: 0.06 }, 0.15);
    }, contentRef);
    return () => ctx.revert();
  }, [tab]);

  return (
    <div ref={rootRef}>
      <FormulaBackground />

      <div className={styles.tabs}>
        {CASES.map((cs, i) => (
          <button key={cs.aba} className={`${base.tab} ${i === tab ? base.tabActive : ''}`}
            onClick={() => setTab(i)} data-anim="tab">
            {cs.aba}
          </button>
        ))}
      </div>

      <div ref={contentRef} key={aba}>
        <Case {...caso} />
      </div>
    </div>
  );
}
