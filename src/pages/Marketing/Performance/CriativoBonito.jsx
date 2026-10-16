import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import styles from './CriativoBonito.module.css';

/**
 * Marketing · Performance, passo 4 (Figma "Tela 26"): frase sobre vidros quebrados.
 * No Figma a frase faz parte da própria imagem (PNG transparente), não é uma camada de texto.
 */
export default function CriativoBonito() {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-anim="arte"]', { opacity: 0, scale: 1.06, duration: 1.2, ease: 'power3.out', delay: 0.1 });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef}>
      <img src="/img/marketing/performance/criativo-bonito.webp" className={styles.arte} data-anim="arte" draggable={false}
        alt="Criativo bonito não é necessariamente criativo que performa." />
    </div>
  );
}
