import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import FormulaBackground from '../../../components/FormulaBackground/FormulaBackground';
import { PilaresIntro } from '../Conceito/Conceito';
import Projetos from '../Conceito/Projetos';
import Entregaveis from '../Conceito/Entregaveis';
import styles from './Enxoval.module.css';

// print da landing page do projeto, rolando dentro do painel
const print = src => () => <img src={src} alt="" className={styles.print} draggable={false} />;

// projetos de enxoval (abas). `Conteudo: null` = ainda sem layout no Figma
const PROJETOS = [
  { nome: 'Areias do Sul',        Conteudo: null },
  { nome: 'Bella Vida Graminha',  Conteudo: null },
  { nome: 'Chamoun Riviera',      Conteudo: null },
  { nome: 'Helena Bay Residence', Conteudo: null },
  { nome: 'Léman View', cliente: 'Construtora Fenícia', Conteudo: print('/img/marketing/enxoval/leman-view.jpg') },
];

/** Passo 1 (Figma "Tela 51"): texto + quatro pilares, foto à direita. */
const Intro = () => <PilaresIntro titulo="Enxoval" foto="/img/marketing/enxoval-intro.jpg" />;

/** Passo 2 (/marketing/enxoval/projetos, Figma "Tela 14"): abas com a landing page de cada projeto. */
const ProjetosEnxoval = () => (
  <Projetos projetos={PROJETOS} classes={{ painel: styles.painel, cliente: styles.cliente }} />
);

// entregáveis em duas colunas
const COLUNAS = [
  {
    left: 464,
    linha: { src: '/img/marketing/enxoval/linha-lista-592.svg', width: 592 },
    itens: [
      '1 landing page', '2 layouts para outdoor', '1 layout de folder',
      '1 vídeo conceito de até 120 segundos', '1 layout de book para impressão', '1 layout de book digital',
    ],
  },
  {
    left: 1096,
    linha: { src: '/img/marketing/enxoval/linha-lista-644.svg', width: 644 },
    itens: [
      '1 layout de lona para fachada ou tapume', '1 layout para windbanner', '1 layout para cavalete',
      <>Criação de 30 artes para instagram<br /><small>(20 estáticas / 10 vídeos)</small></>,
      'Capas de destaque e bio',
    ],
  },
];

/** Passo 3 (/marketing/enxoval/entregaveis, Figma "Tela 52"): lista dos entregáveis. */
const EntregaveisEnxoval = () => <Entregaveis sub="Enxoval" colunas={COLUNAS} mockup={null} />;

/**
 * Marketing · Enxoval em passos (sem fade entre eles, cada passo anima a própria entrada):
 * texto → projetos → entregáveis.
 */
const PASSOS = { projetos: ProjetosEnxoval, entregaveis: EntregaveisEnxoval };

export default function Enxoval() {
  const { pathname } = useLocation();
  const rootRef = useRef(null);
  const Passo = PASSOS[pathname.split('/')[3]] ?? Intro;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-anim="bg"]', { opacity: 0, duration: 1.4, ease: 'power2.out' });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef}>
      <FormulaBackground />
      <Passo key={pathname} />
    </div>
  );
}
