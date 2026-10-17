import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import FormulaBackground from '../../../components/FormulaBackground/FormulaBackground';
import styles from './Assessoria.module.css';

const IMG = '/img/comercial/assessoria';

/** Comercial · Assessoria comercial (Figma "Tela 34"): chamada do serviço e título. */
export default function Assessoria() {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from('[data-anim="bg"]',    { opacity: 0, duration: 1.4, ease: 'power2.out' }, 0)
        .from('[data-anim="title"]', { opacity: 0, y: 20, duration: 0.7, stagger: 0.12 }, 0.2);
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef}>
      <FormulaBackground />

      <div className={styles.cabecalho}>
        <div className={styles.chamada} data-anim="title">
          <span>Nosso Serviço</span>
          <img src={`${IMG}/seta-circulo.svg`} alt="" width="54.2333" height="54.2333" className={styles.setaCirculo} />
          <span className={styles.trim}>ASSESSORIA COMERCIAL</span>
        </div>
        {/* quebra fixa: a fonte substituta é mais larga e quebraria em outro ponto */}
        <h1 className={styles.title} data-anim="title">
          <span>Estruturamos a operação.</span>
          <span className={styles.claro}>O seu time executa:</span>
        </h1>
      </div>
    </div>
  );
}
