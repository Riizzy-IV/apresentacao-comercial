import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import StageImage from '../../../components/StageImage/StageImage';
import styles from './Balzani.module.css';

const fmtInt = v => Math.round(v).toLocaleString('pt-BR');

// Coordenadas do Figma (Canvas). num: caixa que recorta o número; numRight: borda direita do texto dentro dela.
const STATS = [
  {
    value: 70, format: fmtInt,
    card: { left: 1187.96, top: 36, width: 614.417 },
    num: { left: 1187.54, top: 117.79, width: 322, height: 129 }, numRight: 322.22, numTop: 13.36,
    plus: { left: 1167, top: 131.15 },
    label: { left: 1531.46, top: 148.08 }, text: <>Lançamentos<br />de sucesso</>,
  },
  {
    value: 5, format: fmtInt,
    card: { left: 938.96, top: 272, width: 614.417 },
    num: { left: 938.54, top: 353.79, width: 322, height: 129 }, numRight: 199.46, numTop: 13.36,
    plus: { left: 918, top: 367.15 },
    label: { left: 1167, top: 384, width: 252, lineHeight: 1.2, whiteSpace: 'normal' }, text: 'Anos de atuação no mercado',
  },
  {
    value: 3.1, format: v => `R$ ${v.toFixed(1)}`,
    card: { left: 683.96, top: 510, width: 832.93 },
    num: { left: 750.08, top: 592.25, width: 503.145, height: 129.011 }, numRight: 503, numTop: 12.9,
    plus: { left: 663, top: 605.15 },
    label: { left: 1278.22, top: 622.08 }, text: <>Bilhões<br />de VGV</>,
  },
  {
    value: 3600, format: fmtInt,
    card: { left: 411.96, top: 740.61, width: 832.93 },
    num: { left: 491.79, top: 822.85, width: 539.429, height: 129.011 }, numRight: 539, numTop: 12.9,
    plus: { left: 391, top: 835.75 },
    label: { left: 1051.38, top: 852.69 }, text: <>Unidades<br />vendidas</>,
  },
];

export default function Balzani() {
  const rootRef = useRef(null);
  const numRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from('[data-anim="bg"]',      { opacity: 0, scale: 1.05, duration: 1.6, ease: 'power2.out' }, 0)
        .from('[data-anim="heading"]', { opacity: 0, y: 20, duration: 0.7, stagger: 0.15 }, 0.15);

      // cada card entra e o número conta de 0 até o valor final
      STATS.forEach((s, i) => {
        const t = 0.4 + i * 0.22;
        const el = numRefs.current[i];
        const counter = { v: 0 };
        el.textContent = s.format(0);

        tl.from(`[data-anim="stat-${i}"]`, { opacity: 0, y: 40, duration: 0.8, stagger: 0.05 }, t)
          .to(counter, {
            v: s.value,
            duration: 1.6,
            ease: 'power2.out',
            onUpdate: () => { el.textContent = s.format(counter.v); },
          }, t + 0.15);
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef}>
      <StageImage src="/img/balzani/bg-chart.jpg" x={0} y={-121} width={1920} height={1313}
        style={{ opacity: 0.6 }} data-anim="bg" />

      <p className={styles.kicker} data-anim="heading">Do planejamento<br />Ao sucesso do seu</p>
      <p className={styles.big} data-anim="heading">Lançamento</p>

      {STATS.map((s, i) => (
        <div key={i} className={styles.layer}>
          <div className={styles.card} style={s.card} data-anim={`stat-${i}`} />
          <div className={styles.numBox} style={s.num} data-anim={`stat-${i}`}>
            <p
              ref={el => { numRefs.current[i] = el; }}
              className={styles.num}
              style={{ right: s.num.width - s.numRight, top: s.numTop }}
            >
              {s.format(s.value)}
            </p>
          </div>
          <img src="/img/balzani/plus.svg" alt="" width="87.083" height="90.566"
            className={styles.plus} style={s.plus} data-anim={`stat-${i}`} />
          <p className={styles.label} style={s.label} data-anim={`stat-${i}`}>{s.text}</p>
        </div>
      ))}
    </div>
  );
}
