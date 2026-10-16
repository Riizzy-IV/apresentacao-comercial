import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Canvas } from '../../components/ScaleWrapper/ScaleWrapper';
import StageImage from '../../components/StageImage/StageImage';
import BottomNav from '../../components/BottomNav/BottomNav';
import styles from './Encerramento.module.css';

/** Encerramento (Figma "Menu", slide final): logo 3D e "Lead não paga o VGV. Venda paga." — tela cheia, sem menu. */
export default function Encerramento() {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from('[data-anim="fundo"]', { opacity: 0, duration: 1.4, ease: 'power2.out' }, 0)
        .from('[data-anim="logo"]',  { opacity: 0, scale: 0.85, rotate: -6, duration: 1.2 }, 0.15)
        .from('[data-anim="linha"]', { opacity: 0, y: 24, duration: 0.7, stagger: 0.1 }, 0.5)
        .from('[data-anim="faixa"]', { scaleX: 0, duration: 0.8, ease: 'power3.inOut' }, 1.1);
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.root} ref={rootRef}>
      <Canvas>
        <div data-anim="fundo">
          {/* ondas do Figma (PNG com transparência) em "overlay" sobre o fundo azul-marinho */}
          <StageImage src="/img/encerramento/ondas.png" x={0} y={-2} width={1920} height={1083}
            style={{ mixBlendMode: 'overlay' }} />
          <img src="/img/encerramento/contorno.svg" alt="" width="1453.6" height="1438.6" className={styles.contorno} />
        </div>

        {/* logo 3D sobre fundo preto: o "lighten" some com o preto, como no Figma */}
        <img src="/img/encerramento/logo-3d.jpg" alt="Balzani" width="762" height="762" className={styles.logo} data-anim="logo" />

        {/* quebras fixas: a fonte substituta é mais larga e quebraria em outros pontos */}
        <p className={styles.kicker}>
          <span data-anim="linha">Nosso trabalho</span>
          <span data-anim="linha">não termina quando</span>
          <span data-anim="linha">o lead é gerado.</span>
        </p>
        <h1 className={styles.title}>
          <span data-anim="linha">Lead não paga o</span>
          <span data-anim="linha">VGV. Venda paga.</span>
        </h1>
        <img src="/img/comercial/faixa-degrade.png" alt="" width="598" height="19" className={styles.faixa} data-anim="faixa" />

        <BottomNav />
      </Canvas>
    </section>
  );
}
