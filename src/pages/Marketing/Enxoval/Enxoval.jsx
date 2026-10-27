import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import FormulaBackground from '../../../components/FormulaBackground/FormulaBackground';
import { PilaresIntro } from '../Conceito/Conceito';
import Projetos from '../Conceito/Projetos';
import Entregaveis from '../Conceito/Entregaveis';
import MenuPassos from '../../../components/MenuPassos/MenuPassos';
import styles from './Enxoval.module.css';

const MENU = [
  { rota: '/marketing/enxoval',             label: 'Introdução' },
  { rota: '/marketing/enxoval/projetos',    label: 'Cases' },
  { rota: '/marketing/enxoval/entregaveis', label: 'Entregáveis' },
];

// print da landing page do projeto, rolando dentro do painel
const print = src => () => <img src={src} alt="" className={styles.print} draggable={false} />;

/**
 * Site ao vivo dentro do painel. Sem internet (ou se o site não responder em 5 s), mostra o print
 * da página no lugar, para nunca ficar em branco na apresentação.
 */
function SiteAoVivo({ url, reserva }) {
  const [online, setOnline] = useState(() => navigator.onLine);

  useEffect(() => {
    let vivo = true;
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 5000);
    if (navigator.onLine) {
      fetch(url, { mode: 'no-cors', cache: 'no-store', signal: ctrl.signal })
        .catch(() => vivo && setOnline(false))
        .finally(() => clearTimeout(timer));
    }
    const off = () => setOnline(false);
    window.addEventListener('offline', off);
    return () => { vivo = false; ctrl.abort(); clearTimeout(timer); window.removeEventListener('offline', off); };
  }, [url]);

  if (online) return <iframe src={url} title="Landing page" className={styles.site} />;
  return reserva
    ? <img src={reserva} alt="" className={styles.print} draggable={false} />
    : <p className={styles.siteOffline}>Conecte-se à internet para ver o site</p>;
}

const site = (url, reserva) => () => <SiteAoVivo url={url} reserva={reserva} />;

/**
 * Vídeo dentro do painel (fica no app, roda offline), com o botão próprio de ampliar/reduzir no canto:
 * a tela cheia é do quadro inteiro (vídeo + botão), então o botão de reduzir continua visível.
 */
function VideoPainel({ src, capa }) {
  const boxRef = useRef(null);
  const [cheia, setCheia] = useState(false);

  useEffect(() => {
    const mudou = () => setCheia(document.fullscreenElement === boxRef.current);
    document.addEventListener('fullscreenchange', mudou);
    return () => document.removeEventListener('fullscreenchange', mudou);
  }, []);

  const alternar = () => {
    if (document.fullscreenElement === boxRef.current) document.exitFullscreen();
    else boxRef.current.requestFullscreen();
  };

  return (
    <div ref={boxRef} className={styles.videoBox}>
      <video src={src} poster={capa} controls controlsList="nofullscreen" disablePictureInPicture
        playsInline preload="metadata" className={styles.video} onDoubleClick={alternar} />
      <button className={styles.videoTamanho} onClick={alternar} aria-label={cheia ? 'Reduzir vídeo' : 'Ampliar vídeo'}>
        {cheia ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 3v6H3M15 3v6h6M9 21v-6H3M15 21v-6h6" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9V3h6M21 9V3h-6M3 15v6h6M21 15v6h-6" />
          </svg>
        )}
        <span>{cheia ? 'Reduzir' : 'Tela cheia'}</span>
      </button>
    </div>
  );
}

// vídeos conceito: arquivos do app (public/videos/enxoval, 1080p a ~5 Mbps), tocam na hora e sem internet
const video = (nome, capa = `/videos/enxoval/${nome}-capa.jpg`) => () => (
  <VideoPainel src={`/videos/enxoval/${nome}.mp4`} capa={capa} />
);

// book digital: páginas do PDF (convertidas em imagem com 1800 px de largura) uma embaixo da outra,
// rolando no painel. `alturas` = altura de cada página, ou um número só quando todas são iguais.
const book = (pasta, total, alturas) => () => (
  <div className={styles.book}>
    {Array.from({ length: total }, (_, i) => {
      const src = `/img/marketing/enxoval/${pasta}/pagina-${String(i + 1).padStart(2, '0')}.webp`;
      return (
        <img key={src} src={src} alt={`Página ${i + 1}`} width="1800"
          height={Array.isArray(alturas) ? alturas[i] : alturas}
          loading={i < 2 ? 'eager' : 'lazy'} className={styles.bookPagina} draggable={false} />
      );
    })}
  </div>
);

// mídia off: os 4 mockups de cada projeto (caixas de 1459×816 do Figma, em 1,25×), um embaixo do outro
const midiaOff = projeto => () => (
  <div className={styles.book}>
    {[1, 2, 3, 4].map(n => (
      <img key={n} src={`/img/marketing/enxoval/midia-off/${projeto}-${n}.jpg`} alt={`Mockup ${n}`}
        width="1824" height="1020" loading={n < 2 ? 'eager' : 'lazy'} className={styles.bookPagina} draggable={false} />
    ))}
  </div>
);

// Olive Garden: capa e contracapa avulsas, o miolo em páginas duplas
const ALTURAS_OLIVE = Array.from({ length: 31 }, (_, i) => (i === 0 || i === 30 ? 1484 : 766));

// peças do enxoval (abas). Cada peça mostra o seu empreendimento no título.
// `Conteudo: null` = peça ainda sem material ("Em breve")
const PROJETOS = [
  { aba: 'Landing Page', opcoes: [
    { nome: 'Chamoun Riviera', cliente: 'Chamoun Incorporadora',
      Conteudo: site('https://chamounriviera.com.br/', '/img/marketing/enxoval/chamoun-riviera.jpg') },
    { nome: 'Areias do Sul', Conteudo: site('https://areias-do-sul.vercel.app/') },
    { nome: 'Léman View',    Conteudo: site('https://lemanview.com.br/') },
    { nome: 'Nex Monaco',    Conteudo: site('https://nex-monaco.vercel.app/monaco') },
  ] },
  { aba: 'Vídeo Conceito', opcoes: [
    { nome: 'Porto Belo Lagos', cliente: 'JTA Empreendimentos',
      Conteudo: video('porto-belo-lagos', '/img/marketing/enxoval/porto-belo-lagos-capa.jpg') },
    { nome: 'Chamoun Riviera', cliente: 'Chamoun Incorporadora', Conteudo: video('chamoun-riviera') },
    { nome: 'Vale das Montanhas', cliente: 'Edifica Real', Conteudo: video('vale-das-montanhas') },
    { nome: 'Cipasa Urbanismo', Conteudo: video('cipasa') },
  ] },
  { aba: 'Book', opcoes: [
    { nome: 'Areias do Sul',   Conteudo: book('book', 46, 1200) },
    { nome: 'Chamoun Riviera', cliente: 'Chamoun Incorporadora', Conteudo: book('book-chamoun', 51, 900) },
    { nome: 'Léman View',      Conteudo: book('book-leman', 42, 1013) },
    { nome: 'Olive Garden',    Conteudo: book('book-olive', 31, ALTURAS_OLIVE) },
  ] },
  { aba: 'Mídia Off', opcoes: [
    { nome: 'ACF Lucas', Conteudo: midiaOff('acf-lucas') },
    { nome: 'Arvin',     Conteudo: midiaOff('arvin') },
    { nome: 'Madrid',    Conteudo: midiaOff('madrid') },
  ] },
];

// carregados escondidos já na introdução, para o passo "Cases" abrir com o cache quente
const PREAQUECER = ['https://chamounriviera.com.br/'];

/** Passo 1 (Figma "Tela 51"): texto + quatro pilares, foto à direita. */
const Intro = () => (
  <>
    <PilaresIntro titulo="Enxoval" foto="/img/marketing/enxoval-intro.jpg" pilares={false}
      texto="O enxoval de lançamento imobiliário é o conjunto de materiais, peças de marketing para divulgar, posicionar e vender um novo empreendimento desde a fase de pré-lançamento até a comercialização de todas as unidades." />
    {navigator.onLine && PREAQUECER.map(url => (
      <iframe key={url} src={url} title="" aria-hidden="true" tabIndex={-1} className={styles.preaquecer} />
    ))}
  </>
);

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
const EntregaveisEnxoval = () => <Entregaveis sub="Enxoval" colunas={COLUNAS} mockup={null} linhaTop={73} />;

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
      <MenuPassos itens={MENU} />
    </div>
  );
}
