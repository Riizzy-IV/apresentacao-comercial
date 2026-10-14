import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import StageImage from '../../../components/StageImage/StageImage';
import styles from './Reputacao.module.css';

export default function Reputacao() {
  const rootRef = useRef(null);
  const countRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // guarda o elemento: no ctx.revert() (ao sair da tela) o onUpdate roda de novo e o ref já é null
      const el = countRef.current;
      const counter = { v: 0 };
      el.textContent = '0';

      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from('[data-anim="bg"]',     { opacity: 0, duration: 1.2, ease: 'power2.out' }, 0)
        .from('[data-anim="big"]',    { opacity: 0, x: -20, duration: 0.6 }, 0.1)
        .from('[data-anim="script"]', { opacity: 0, x: 40, duration: 0.9 }, 0.2)
        .from('[data-anim="tablet"]', { opacity: 0, y: 80, duration: 1.2 }, 0.3)
        .from('[data-anim="stat"]',   { opacity: 0, y: 16, duration: 0.7 }, 0.9)
        .to(counter, {
          v: 75, duration: 1.4, ease: 'power2.out',
          onUpdate: () => { el.textContent = Math.round(counter.v); },
        }, 0.95)
        .from('[data-anim="note"]',   { opacity: 0, duration: 0.6 }, 1.2);

      // flutuação leve e contínua do tablet
      gsap.to('[data-anim="float"]', { y: -12, duration: 3.4, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 1.5 });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef}>
      {/* grade em perspectiva já composta sobre o azul (export do Figma, recortado no frame) */}
      <StageImage src="/img/reputacao/grid.webp" x={0} y={0} width={1920} height={1062} data-anim="bg" />

      <img src="/img/reputacao/glow-top.svg" alt="" width="1655.2" height="1655.2"
        className={styles.abs} style={{ left: 972.4, top: -816.6 }} />

      <div data-anim="tablet">
        <img src="/img/reputacao/tablet.webp" alt="Tablet mostrando 93% de aprovação entre nossos clientes"
          className={styles.tablet} data-anim="float" />
      </div>

      <img src="/img/reputacao/glow-bottom.svg" alt="" width="2051.2" height="1544.2"
        className={styles.abs} style={{ left: -388.6, top: 200.4 }} />

      <p className={styles.big} data-anim="big">Nosso trabalho</p>
      <p className={styles.script} data-anim="script">fala por nós</p>

      <div data-anim="stat">
        {/* ícone nítido por cima da versão desfocada (brilho), como no Figma */}
        <img src="/img/reputacao/plus-circle.svg" alt="" width="82.567" height="82.567"
          className={styles.abs} style={{ left: 1060.8, top: 833.8 }} />
        <img src="/img/reputacao/plus-circle-sharp.svg" alt="" width="82.567" height="82.567"
          className={styles.abs} style={{ left: 1060.8, top: 833.8 }} />
        <p className={styles.stat}><span ref={countRef}>75</span> de avaliações positivas</p>
      </div>

      <p className={styles.note} data-anim="note">*Pesquisa realizada trimestralmente</p>
    </div>
  );
}
