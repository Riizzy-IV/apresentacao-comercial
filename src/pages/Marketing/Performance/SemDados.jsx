import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import styles from './SemDados.module.css';

/** Marketing · Performance, passo 9 (Figma "Tela 50"): "a geração de leads não é nada sem dados". */
export default function SemDados() {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-anim="linha"]', { opacity: 0, y: 40, duration: 0.8, stagger: 0.15, ease: 'power3.out', delay: 0.15 });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  // quebras fixas: a fonte substituta é mais larga e quebraria em outros pontos
  return (
    <h1 ref={rootRef} className={styles.frase}>
      <span data-anim="linha">A geração de</span>
      <span data-anim="linha">leads <em>não é</em></span>
      <span data-anim="linha"><em>nada</em> sem dados</span>
    </h1>
  );
}
