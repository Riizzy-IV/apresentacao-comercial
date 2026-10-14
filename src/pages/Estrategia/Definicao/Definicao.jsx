import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import FormulaBackground from '../../../components/FormulaBackground/FormulaBackground';
import styles from './Definicao.module.css';

/** Estratégia · Definição (Figma "Tela 43"): "Visão estratégica" sobre a foto do olho. */
export default function Definicao() {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from('[data-anim="bg"]',    { opacity: 0, duration: 1.4, ease: 'power2.out' }, 0)
        .from('[data-anim="photo"]', { opacity: 0, scale: 1.04, duration: 1.6, ease: 'power2.out' }, 0.1)
        .from('[data-anim="lines"]', { opacity: 0, duration: 1.6 }, 0.5)
        .from('[data-anim="bar"]',   { scaleY: 0, duration: 0.6 }, 0.5)
        .from('[data-anim="band"]',  { scaleX: 0, duration: 0.9, ease: 'power3.inOut' }, 0.6)
        .from('[data-anim="title"]', { opacity: 0, x: -40, duration: 0.8, stagger: 0.12 }, 0.85)
        .from('[data-anim="text"]',  { opacity: 0, y: 16, duration: 0.7 }, 1.3);
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef}>
      <FormulaBackground />

      {/* foto do olho com degradê laranja na diagonal */}
      <div className={styles.photo} data-anim="photo">
        <img src="/img/estrategia/olho.jpg" alt="" draggable={false} />
        <div className={styles.photoTint} />
      </div>

      {/* desenho da marca em linhas (desfocado, 20%) */}
      <img src="/img/estrategia/linhas.svg" alt="" width="1330.6" height="1316.6"
        className={styles.lines} data-anim="lines" />

      {/* faixa escura atrás do título + barra laranja */}
      <div className={styles.band} data-anim="band" />
      <div className={styles.bar} data-anim="bar" />

      <h1 className={styles.title}>
        <span className={styles.titleLight} data-anim="title">Visão</span>
        <span className={styles.titleOrange} data-anim="title">estratégica</span>
      </h1>

      <p className={styles.text} data-anim="text">
        Nosso objetivo é transformar o lançamento em um plano estruturado e não em uma sequência
        de ações isoladas
      </p>
    </div>
  );
}
