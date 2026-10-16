import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import FormulaBackground from '../../../components/FormulaBackground/FormulaBackground';
import styles from './Importancia.module.css';

/** Comercial · A importância (Figma "Tela 30"): o comercial como o maior gargalo do mercado imobiliário. */
export default function Importancia() {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from('[data-anim="bg"]',    { opacity: 0, duration: 1.4, ease: 'power2.out' }, 0)
        .from('[data-anim="tag"]',   { opacity: 0, y: -12, duration: 0.6 }, 0.2)
        .from('[data-anim="linha"]', { opacity: 0, y: 30, duration: 0.8, stagger: 0.12 }, 0.3)
        .from('[data-anim="frase"]', { opacity: 0, x: -20, duration: 0.7 }, 0.7);
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef}>
      <FormulaBackground />

      <p className={styles.tag} data-anim="tag">O maior gargalo do mercado imobiliário</p>

      {/* quebra fixa: a fonte substituta é mais larga e quebraria em outro ponto */}
      <h1 className={styles.title}>
        <span data-anim="linha">A importância</span>
        <span data-anim="linha">do comercial</span>
      </h1>

      <div className={styles.frase} data-anim="frase">
        <p>Não adianta gerar demanda se a operação não estiver preparada para vender</p>
        <p>Marketing coloca o cliente no funil. Comercial leva esse cliente até a venda.</p>
      </div>
    </div>
  );
}
