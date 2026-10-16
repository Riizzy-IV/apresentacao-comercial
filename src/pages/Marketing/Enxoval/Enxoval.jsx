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

  return online
    ? <iframe src={url} title="Landing page" className={styles.site} />
    : <img src={reserva} alt="" className={styles.print} draggable={false} />;
}

/**
 * Vídeo dentro do painel (fica no app, roda offline), com o botão próprio de ampliar/reduzir no canto:
 * a tela cheia é do quadro inteiro (vídeo + botão), então o botão de reduzir continua visível.
 */
function VideoPainel({ src, drive, capa }) {
  const boxRef = useRef(null);
  const [cheia, setCheia] = useState(false);
  const [online, setOnline] = useState(() => navigator.onLine);

  useEffect(() => {
    const on = () => setOnline(true), off = () => setOnline(false);
    window.addEventListener('online', on);
    window.addEventListener('offline', off);
    return () => { window.removeEventListener('online', on); window.removeEventListener('offline', off); };
  }, []);

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
      {drive ? (
        // vídeo do Google Drive (precisa de internet); sem conexão, mostra a capa com um aviso
        online
          ? <iframe src={`https://drive.google.com/file/d/${drive}/preview`} title="Vídeo conceito"
              allow="autoplay; fullscreen" className={styles.video} />
          : (
            <div className={styles.videoOffline}>
              <img src={capa} alt="" draggable={false} />
              <p>Conecte-se à internet para assistir ao vídeo</p>
            </div>
          )
      ) : (
        <video src={src} poster={capa} controls controlsList="nofullscreen" disablePictureInPicture
          playsInline preload="metadata" className={styles.video} onDoubleClick={alternar} />
      )}
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

const video = (src, capa) => () => <VideoPainel src={src} capa={capa} />;
const videoDrive = (id, capa) => () => <VideoPainel drive={id} capa={capa} />;

// book digital: páginas do PDF (convertidas em imagem) uma embaixo da outra, rolando no painel
const PAGINAS_BOOK = Array.from({ length: 46 }, (_, i) =>
  `/img/marketing/enxoval/book/pagina-${String(i + 1).padStart(2, '0')}.webp`);
const Book = () => (
  <div className={styles.book}>
    {PAGINAS_BOOK.map((src, i) => (
      <img key={src} src={src} alt={`Página ${i + 1}`} width="1800" height="1200"
        loading={i < 2 ? 'eager' : 'lazy'} className={styles.bookPagina} draggable={false} />
    ))}
  </div>
);

// peças do enxoval (abas). Cada peça mostra o seu empreendimento no título.
// `Conteudo: null` = peça ainda sem material ("Em breve")
const PROJETOS = [
  { aba: 'Landing Page', nome: 'Chamoun Riviera', cliente: 'Chamoun Incorporadora',
    Conteudo: () => <SiteAoVivo url="https://chamounriviera.com.br/" reserva="/img/marketing/enxoval/chamoun-riviera.jpg" /> },
  { aba: 'Vídeo Conceito', nome: 'Porto Belo Lagos', cliente: 'JTA Empreendimentos',
    // tocado direto do Google Drive (arquivo grande demais para ir no app)
    Conteudo: videoDrive('1JEnotsfn-7dYl5HoP_LDOZI2-yM4Sp8S', '/img/marketing/enxoval/porto-belo-lagos-capa.jpg') },
  { aba: 'Book', nome: 'Areias do Sul', Conteudo: Book },
  { aba: 'Mídia Off', nome: '', Conteudo: null },
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
