import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import StageImage from '../../../components/StageImage/StageImage';
import styles from './Parceiros.module.css';

const LOGOS = [
  // ECO NJR no lugar da TOM, centralizada no mesmo ponto (625.8, 479.5)
  { src: '/img/logos/eco-njr-branco.png', alt: 'ECO NJR',                  left: 485.8,   top: 444.3, width: 280, height: 70.4 },
  { src: '/img/parceiros/inc.png',     alt: 'INC Empreendimentos',         left: 969,     top: 438, width: 214, height: 89 },
  { src: '/img/parceiros/dialogo.png', alt: 'Diálogo Engenharia',          left: 1374.29, top: 432, width: 303, height: 96 },
  { src: '/img/parceiros/porte.png',   alt: 'Porte Engenharia e Urbanismo', left: 519,    top: 635, width: 236, height: 118 },
  { src: '/img/parceiros/ginco.svg',   alt: 'GINCO',                       left: 940,     top: 668, width: 266, height: 51 },
];

export default function Parceiros() {
  const rootRef = useRef(null);
  const countRef = useRef(null);

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

      {LOGOS.map(l => (
        <img key={l.src} src={l.src} alt={l.alt} className={styles.logo}
          style={{ left: l.left, top: l.top, width: l.width, height: l.height }} data-anim="logo" />
      ))}

      <p className={styles.count} data-anim="count">
        <span ref={countRef} className={styles.countNumber}>+170</span>{' '}
        incorporadoras atendidas
      </p>
    </div>
  );
}
