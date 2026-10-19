import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import StageImage from '../../../components/StageImage/StageImage';
import styles from './Parceiros.module.css';

// `sobre` = texto do balão que aparece ao passar o mouse / tocar no logo
const LOGOS = [
  // ECO NJR no lugar da TOM, centralizada no mesmo ponto (625.8, 479.5)
  { src: '/img/logos/eco-njr-branco.png', alt: 'Ecossistema Neymar Jr.', left: 485.8, top: 444.3, width: 280, height: 70.4,
    sobre: 'Complexo esportivo e de lazer em Porto Belo (SC), com hotel, quadras e o espaço NJ Experience, dentro de um bairro planejado.' },
  { src: '/img/parceiros/inc.png', alt: 'INC Empreendimentos', left: 969, top: 438, width: 214, height: 89,
    sobre: 'A INC Empreendimentos é uma construtora e incorporadora brasileira fundada em 2008 na cidade de Juiz de Fora, Minas Gerais. Em 2018, a empresa foi listada na Bolsa de Valores (B3), sob o código de negociação INNC3.' },
  { src: '/img/parceiros/dialogo.png', alt: 'Diálogo Engenharia', left: 1374.29, top: 432, width: 303, height: 96,
    sobre: 'Incorporadora paulistana fundada em 1987, com mais de 184 empreendimentos lançados, referência na Zona Leste de São Paulo.' },
  { src: '/img/parceiros/porte.png', alt: 'Porte Engenharia e Urbanismo', left: 519, top: 635, width: 236, height: 118,
    sobre: 'Há 35 anos transformando a Zona Leste de São Paulo; responsável pelo Platina 220, o prédio mais alto da cidade.' },
  { src: '/img/parceiros/ginco.svg', alt: 'Ginco Urbanismo', left: 940, top: 668, width: 266, height: 51,
    sobre: 'Urbanizadora de Cuiabá (MT) especializada em condomínios horizontais fechados de alto padrão, como o Florais e o Ginco Zurique.' },
];

export default function Parceiros() {
  const rootRef = useRef(null);
  const countRef = useRef(null);
  const [ativo, setAtivo] = useState(null);

  // toque fora de um logo fecha o balão (telas touch)
  useEffect(() => {
    const fechar = () => setAtivo(null);
    window.addEventListener('click', fechar);
    return () => window.removeEventListener('click', fechar);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // guarda o elemento: no ctx.revert() (ao sair da tela) o onUpdate roda de novo e o ref já é null
      const el = countRef.current;
      const counter = { v: 0 };
      el.textContent = '+0';

      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from('[data-anim="kicker"]', { opacity: 0, y: 16, duration: 0.6 }, 0.1)
        .from('[data-anim="big"]',    { opacity: 0, x: -20, duration: 0.6 }, 0.25)
        .from('[data-anim="script"]', { opacity: 0, x: 40, duration: 0.9 }, 0.35)
        .from('[data-anim="grid-v"]', { scaleY: 0, transformOrigin: 'top center', duration: 0.8, stagger: 0.1 }, 0.4)
        .from('[data-anim="grid-h"]', { scaleX: 0, transformOrigin: 'left center', duration: 1 }, 0.5)
        .from('[data-anim="logo"]',   { opacity: 0, y: 20, duration: 0.6, stagger: 0.1 }, 0.7)
        .from('[data-anim="count"]',  { opacity: 0, y: 20, duration: 0.6 }, 1.1)
        .to(counter, {
          v: 170, duration: 1.6, ease: 'power2.out',
          onUpdate: () => { el.textContent = `+${Math.round(counter.v)}`; },
        }, 1.15);
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef}>
      {/* textura granulada em "multiply" a 34% sobre o degradê da seção */}
      <StageImage src="/img/parceiros/bg.png" x={0} y={-100} width={1920} height={1280}
        style={{ mixBlendMode: 'multiply', opacity: 0.34 }} />

      <p className={styles.kicker} data-anim="kicker">Não queremos clientes,</p>
      <p className={styles.big} data-anim="big">Queremos</p>
      <p className={styles.script} data-anim="script">parceiros</p>

      {[420, 855, 1290].map(left => (
        <div key={left} className={styles.lineV} style={{ left }} data-anim="grid-v" />
      ))}
      <div className={styles.lineH} data-anim="grid-h" />

      {LOGOS.map((l, i) => (
        <div key={l.src} className={`${styles.logoBox} ${ativo === i ? styles.logoAtivo : ''}`}
          style={{ left: l.left, top: l.top, width: l.width, height: l.height }}
          onPointerEnter={e => e.pointerType === 'mouse' && setAtivo(i)}
          onPointerLeave={e => e.pointerType === 'mouse' && setAtivo(null)}
          onClick={e => { e.stopPropagation(); setAtivo(a => (a === i ? null : i)); }}
          data-anim="logo">
          <img src={l.src} alt={l.alt} className={styles.logo} draggable={false} />
          <div className={styles.balao} role="tooltip" aria-hidden={ativo !== i}>
            <p className={styles.balaoNome}>{l.alt}</p>
            <p className={styles.balaoTexto}>{l.sobre}</p>
          </div>
        </div>
      ))}

      <p className={styles.count} data-anim="count">
        <span ref={countRef} className={styles.countNumber}>+170</span>{' '}
        incorporadoras atendidas
      </p>
    </div>
  );
}
