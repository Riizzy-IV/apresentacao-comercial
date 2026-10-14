import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import StageImage from '../../../components/StageImage/StageImage';
import OutlineGlow from '../../../components/OutlineGlow/OutlineGlow';
import styles from './Resultados.module.css';

export default function Resultados() {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from('[data-anim="bg"]',      { opacity: 0, scale: 1.05, duration: 1.6, ease: 'power2.out' }, 0)
        .from('[data-anim="outline"]', { opacity: 0, duration: 1.4 }, 0.3)
        .from('[data-anim="big"]',     { opacity: 0, y: 24, duration: 0.8 }, 0.4)
        .from('[data-anim="script"]',  { opacity: 0, x: 40, duration: 0.9 }, 0.6)
        .from('[data-anim="line"]',    { scaleX: 0, transformOrigin: 'left center', duration: 0.8 }, 0.85);
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef}>
      {/* export do Figma já com os ajustes de cor da foto aplicados */}
      <div data-anim="bg">
        <StageImage src="/img/objetivo/resultados-bg.jpg" x={0} y={0} width={1920} height={1080} />
      </div>

      <OutlineGlow
        src="/img/objetivo/resultados-outline.svg" sharpSrc="/img/objetivo/resultados-outline-sharp.svg"
        left={364.1} top={-215.8} width={1395.6} height={1380.6}
        data-anim="outline"
      />

      <p className={styles.big} data-anim="big">Resultado em</p>
      <p className={styles.script} data-anim="script">números</p>
      <div className={styles.line} data-anim="line" />
    </div>
  );
}
