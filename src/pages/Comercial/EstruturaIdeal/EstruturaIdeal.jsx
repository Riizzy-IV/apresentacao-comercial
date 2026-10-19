import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import FormulaBackground from '../../../components/FormulaBackground/FormulaBackground';
import styles from './EstruturaIdeal.module.css';

/** Comercial · Estrutura ideal (Figma "Tela 33"): estrutura comercial para um lançamento (SDR + corretor). */
export default function EstruturaIdeal() {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from('[data-anim="bg"]',    { opacity: 0, duration: 1.4, ease: 'power2.out' }, 0)
        .from('[data-anim="foto"]',  { opacity: 0, x: 60, duration: 1 }, 0.15)
        .from('[data-anim="linha"]', { opacity: 0, y: 24, duration: 0.7, stagger: 0.1 }, 0.3)
        .from('[data-anim="faixa"]', { scaleX: 0, duration: 0.8, ease: 'power3.inOut' }, 0.8)
        .from('[data-anim="house"]', { opacity: 0, y: 16, duration: 0.7 }, 0.9);
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef}>
      <FormulaBackground />

      <div className={styles.foto} data-anim="foto">
        <img src="/img/comercial/house-interna.jpg" alt="" draggable={false} />
      </div>

      {/* quebras fixas: a fonte substituta é mais larga e quebraria em outros pontos */}
      <h1 className={styles.title}>
        <span data-anim="linha">Estrutura</span>
        <span data-anim="linha">comercial</span>
        <span data-anim="linha">ideal para um</span>
        <span data-anim="linha">lançamento</span>
      </h1>

      <img src="/img/comercial/faixa-degrade.png" alt="" width="598" height="19" className={styles.faixa} data-anim="faixa" />

      <div className={styles.house} data-anim="house">
        <p className={styles.houseTitulo}>SDR + Corretor</p>
      </div>
    </div>
  );
}
