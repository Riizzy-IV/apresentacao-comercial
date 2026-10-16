import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ESTADOS, MAP_POS } from '../../../data/mapaBrasil';
import { PARCEIROS_POR_ESTADO } from '../../../data/parceirosPorEstado';
import styles from './OndeAtuamos.module.css';

// anéis concêntricos do fundo (PNG branco em "overlay"); posição já inclui a margem do traço
const RINGS = [
  { src: '/img/onde-atuamos/ring-1515.png', left: 753.67,  top: -335.43, size: 1539.334 },
  { src: '/img/onde-atuamos/ring-1076.png', left: 976.92,  top: -112.18, size: 1092.833 },
  { src: '/img/onde-atuamos/ring-795.png',  left: 1121.68, top: 32.59,   size: 803.304 },
  { src: '/img/onde-atuamos/ring-572.png',  left: 1235.3,  top: 146.2,   size: 576.068 },
  { src: '/img/onde-atuamos/ring-393.png',  left: 1326.59, top: 237.49,  size: 393.495 },
];

const DOTS = [
  { src: '/img/onde-atuamos/dot-a.svg', left: 1582.95, top: 616.6,  size: 6.883 },
  { src: '/img/onde-atuamos/dot-a.svg', left: 1323.95, top: 425.9,  size: 6.883 },
  { src: '/img/onde-atuamos/dot-b.svg', left: 1231.46, top: 401.24, size: 14.883 },
  { src: '/img/onde-atuamos/dot-b.svg', left: 1483.35, top: 710.93, size: 14.883 },
  { src: '/img/onde-atuamos/dot-c.svg', left: 1122,    top: 350.06, size: 22.723 },
];

// marcadores do mapa: [x, y, tamanho do anel]
const MARKERS = [
  [1497.46, 304.02, 44.809], [1644.57, 312.47, 44.809], [1757.41, 337.52, 22.487], [1802.67, 337.83, 22.487],
  [1822.96, 363.2, 22.487],  [1780.39, 388.35, 22.487], [1816.2, 412.23, 22.487],  [1306.39, 433.37, 38.891],
  [1709.67, 463.81, 41.427], [1445.89, 467.19, 38.045], [1562.56, 522.14, 44.809], [1634.43, 572.02, 54.954],
  [1736.73, 610.92, 22.487], [1472.1, 614.3, 22.487],   [1589.62, 655.72, 44.809], [1693, 658.68, 22.487],
  [1524.52, 677.71, 44.809], [1565.05, 749.59, 22.487], [1507.61, 798.61, 44.809],
];

export default function OndeAtuamos() {
  const rootRef = useRef(null);
  const countRef = useRef(null);
  const [active, setActive] = useState(null);

  // toque fora de um estado fecha o card (telas touch)
  useEffect(() => {
    const close = () => setActive(null);
    window.addEventListener('click', close);
    return () => window.removeEventListener('click', close);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // guarda o elemento: no ctx.revert() (ao sair da tela) o onUpdate roda de novo e o ref já é null
      const el = countRef.current;
      const counter = { v: 0 };
      el.textContent = '0';

      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from('[data-anim="ring"]',   { opacity: 0, scale: 0.85, duration: 1.4, stagger: 0.08, transformOrigin: 'center' }, 0)
        .from('[data-anim="big"]',    { opacity: 0, x: -20, duration: 0.6 }, 0.1)
        .from('[data-anim="script"]', { opacity: 0, x: 40, duration: 0.9 }, 0.2)
        .from('[data-anim="map"]',    { opacity: 0, x: 40, duration: 1 }, 0.3)
        .from('[data-anim="marker"]', { opacity: 0, scale: 0, duration: 0.5, stagger: 0.04, ease: 'back.out(2)' }, 0.8)
        .from('[data-anim="box"]',    { opacity: 0, x: -30, duration: 0.8 }, 0.5)
        .from('[data-anim="text"]',   { opacity: 0, y: 16, duration: 0.6 }, 0.8)
        .to(counter, {
          v: 170, duration: 1.6, ease: 'power2.out',
          onUpdate: () => { el.textContent = Math.round(counter.v); },
        }, 0.75);
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef}>
      {RINGS.map(r => (
        <img key={r.src} src={r.src} alt="" className={styles.overlay}
          style={{ left: r.left, top: r.top, width: r.size, height: r.size }} data-anim="ring" />
      ))}
      {DOTS.map((d, i) => (
        <img key={i} src={d.src} alt="" className={styles.overlay}
          style={{ left: d.left, top: d.top, width: d.size, height: d.size }} data-anim="ring" />
      ))}

      <p className={styles.big} data-anim="big">Onde estamos</p>
      <p className={styles.script} data-anim="script">localizados</p>

      <svg
        className={styles.map}
        style={{ left: MAP_POS.x, top: MAP_POS.y }}
        width={MAP_POS.width} height={MAP_POS.height} viewBox={`0 0 ${MAP_POS.width} ${MAP_POS.height}`}
        role="img" aria-label="Mapa do Brasil com os estados onde atuamos"
        data-anim="map"
      >
        {ESTADOS.map(e => {
          const interactive = !!PARCEIROS_POR_ESTADO[e.uf];
          return (
            <path
              key={e.uf}
              d={e.d}
              fill={e.ativo ? '#2F79A8' : '#EDEDED'}
              className={`${interactive ? styles.stateInteractive : ''} ${active === e.uf ? styles.stateActive : ''}`}
              onPointerEnter={interactive ? ev => ev.pointerType === 'mouse' && setActive(e.uf) : undefined}
              onPointerLeave={interactive ? ev => ev.pointerType === 'mouse' && setActive(null) : undefined}
              onClick={interactive ? ev => { ev.stopPropagation(); setActive(a => (a === e.uf ? null : e.uf)); } : undefined}
            >
              <title>{e.nome}</title>
            </path>
          );
        })}
      </svg>

      {MARKERS.map(([x, y, s], i) => (
        <span key={i} className={styles.marker}
          style={{ left: x, top: y, width: s, height: s, '--delay': `${(i % 7) * 0.45}s` }}
          data-anim="marker" />
      ))}

      <div data-anim="box" className={styles.passThrough}>
        <div className={styles.box} />
        <div className={styles.boxBar} />
        <img src="/img/onde-atuamos/plus.svg" alt="" width="192" height="194.88" className={styles.plus} />
      </div>

      <p className={styles.count} data-anim="text"><span ref={countRef}>170</span></p>
      <p className={styles.caption} data-anim="text">Loteadores e Incorporadores parceiros</p>

      {ESTADOS.filter(e => PARCEIROS_POR_ESTADO[e.uf]).map(e => (
        <PartnerCard key={e.uf} estado={e} dados={PARCEIROS_POR_ESTADO[e.uf]} visible={active === e.uf} />
      ))}
    </div>
  );
}

const CARD_W = 500;

/** Card laranja ancorado acima do marcador do estado (mantido dentro do Canvas). */
function PartnerCard({ estado, dados, visible }) {
  const [x, y] = estado.anchor;
  const left = Math.min(Math.max(x, 24 + CARD_W / 2), 1920 - 24 - CARD_W / 2);

  return (
    <div
      className={`${styles.card} ${visible ? styles.cardVisible : ''}`}
      style={{ left, top: y - 34, width: CARD_W }}
      aria-hidden={!visible}
    >
      <p className={styles.cardTitle}>
        <span className={styles.cardPlus}>+</span> {dados.total} {dados.total === 1 ? 'parceiro' : 'parceiros'}
      </p>
      <ul className={styles.chips}>
        {dados.clientes.map(c => <li key={c}>{c}</li>)}
        {dados.maisClientes && <li>e muito mais</li>}
      </ul>
    </div>
  );
}
