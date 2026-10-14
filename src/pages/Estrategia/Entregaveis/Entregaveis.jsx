import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import FormulaBackground from '../../../components/FormulaBackground/FormulaBackground';
import GroupChips from '../../../components/GroupChips/GroupChips';
import styles from './Entregaveis.module.css';

const ENTREGAVEIS = [
  { texto: 'Reuniões de alinhamento via meeting com o diretor de operações', tag: '40~60 min de duração' },
];

/** Estratégia · Entregáveis (Figma "Tela 45"). */
export default function Entregaveis() {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from('[data-anim="bg"]',    { opacity: 0, duration: 1.4, ease: 'power2.out' }, 0)
        .from('[data-anim="chips"]', { opacity: 0, duration: 0.6 }, 0.3)
        .from('[data-anim="title"]', { opacity: 0, y: 20, duration: 0.7, stagger: 0.1 }, 0.2)
        .from('[data-anim="card"]',  { opacity: 0, x: -30, duration: 0.8 }, 0.6)
        .from('[data-anim="mark"]',  { scaleY: 0, duration: 0.5 }, 0.9);
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef}>
      <FormulaBackground />
      <GroupChips group="Estratégia" />

      <div className={styles.titleBlock}>
        <p className={styles.nome} data-anim="title">Entregáveis</p>
        <p className={styles.sub} data-anim="title">Estratégia</p>
      </div>

      {ENTREGAVEIS.map((e, i) => (
        <div key={i} className={styles.item} style={{ top: 585 + i * 210 }}>
          <div className={styles.card} data-anim="card">
            <p className={styles.texto}>{e.texto}</p>
            <span className={styles.tag}>{e.tag}</span>
          </div>
          <img src="/img/estrategia/marcador-entregavel.svg" alt="" width="27.64" height="104"
            className={styles.mark} data-anim="mark" />
        </div>
      ))}
    </div>
  );
}
