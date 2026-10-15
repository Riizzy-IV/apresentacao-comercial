import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import FormulaBackground from '../../components/FormulaBackground/FormulaBackground';
import { useTransition } from '../../context/TransitionContext';
import styles from './Marketing.module.css';

// os três pilares do marketing; cada card abre a sua tela
const CARDS = [
  { route: '/marketing/conceito',    left: 392,  width: 483, img: 'conceito',    linhas: ['Con', 'ceito'],
    tint: 'linear-gradient(142.86deg, rgba(255, 97, 27, 0) 6.76%, #ff611b 124.83%)' },
  { route: '/marketing/enxoval',     left: 890,  width: 482, img: 'enxoval',     linhas: ['Enxo', 'val'],
    tint: 'linear-gradient(167.11deg, rgba(255, 97, 27, 0) 0%, #ff611b 132.57%), rgba(0, 0, 0, 0.2)' },
  { route: '/marketing/performance', left: 1392, width: 482, img: 'performance', linhas: ['Perfor', 'mance'],
    tint: 'linear-gradient(161.93deg, rgba(255, 97, 27, 0) 8.9%, #ff611b 139.43%)' },
];

/** Marketing · abertura (Figma "Tela 10"): cards Conceito, Enxoval e Performance. */
export default function Marketing() {
  const rootRef = useRef(null);
  const { startTransition } = useTransition();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from('[data-anim="bg"]',   { opacity: 0, duration: 1.4, ease: 'power2.out' }, 0)
        .from('[data-anim="card"]', { opacity: 0, y: 40, duration: 0.9, stagger: 0.15 }, 0.2)
        .from('[data-anim="bar"]',  { scaleX: 0, duration: 0.5, stagger: 0.15 }, 0.8)
        .from('[data-anim="nome"]', { opacity: 0, y: 16, duration: 0.6, stagger: 0.15 }, 0.85);
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef}>
      <FormulaBackground />

      {CARDS.map(c => (
        <button key={c.route} className={styles.card} style={{ left: c.left, width: c.width }}
          onClick={() => startTransition(c.route)} data-anim="card">
          <img src={`/img/marketing/${c.img}.jpg`} alt="" className={styles.photo} draggable={false} />
          <span className={styles.tint} style={{ background: c.tint }} />
          <span className={styles.bar} data-anim="bar" />
          <span className={styles.nome} data-anim="nome">
            {c.linhas.map(l => <span key={l}>{l}</span>)}
          </span>
        </button>
      ))}
    </div>
  );
}
