import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import StageImage from '../../../components/StageImage/StageImage';
import styles from './Atta3D.module.css';

// cards de vidro dos produtos (Figma: coluna de 410px em x=439, y=422, espaço de 16px)
const PRODUCTS = [
  { src: '/img/atta3d/atta-web.svg',   alt: 'Atta Web',   width: 172, height: 63 },
  { src: '/img/atta3d/atta-touch.svg', alt: 'Atta Touch', width: 208, height: 82 },
  { src: '/img/atta3d/atta-ultra.svg', alt: 'Atta Ultra', width: 213, height: 54 },
];

export default function Atta3D() {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from('[data-anim="bg"]',      { opacity: 0, duration: 1.4, ease: 'power2.out' }, 0)
        .from('[data-anim="title"]',   { opacity: 0, y: 30, duration: 0.9 }, 0.2)
        .from('[data-anim="lead"]',    { opacity: 0, y: 16, duration: 0.7 }, 0.45)
        .from('[data-anim="logo"]',    { opacity: 0, y: -12, duration: 0.8 }, 0.5)
        .from('[data-anim="photo"]',   { opacity: 0, x: 60, duration: 1 }, 0.55)
        .from('[data-anim="product"]', { opacity: 0, x: -24, duration: 0.6, stagger: 0.15 }, 0.8)
        .from('[data-anim="closing"]', { opacity: 0, y: 12, duration: 0.7 }, 1.2);
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef}>
      <div data-anim="bg">
        {/* degradê desfocado (2100x2100 recortado no frame) + foto em "overlay" por cima */}
        <StageImage src="/img/atta3d/bg-gradient.jpg" x={0} y={-264} width={1920} height={1920} />
        <StageImage src="/img/atta3d/bg-overlay.jpg" x={-573} y={-373} width={2580} height={1440}
          style={{ mixBlendMode: 'overlay' }} />
      </div>

      <h2 className={styles.title} data-anim="title">
        Realidade imersiva<br />como você nunca viu
      </h2>
      <p className={styles.lead} data-anim="lead">
        Soluções imersivas e inovadoras que tangibilizam o empreendimento com alto nível de detalhe,
        iluminação e composição estratégia.
      </p>

      <img src="/img/logos/atta3d.svg" alt="Atta3D by Balzani" width="317" height="61"
        className={styles.abs} style={{ left: 1498, top: 56 }} data-anim="logo" />

      <div className={styles.products}>
        {PRODUCTS.map(p => (
          <div key={p.src} className={styles.card} data-anim="product">
            <img src={p.src} alt={p.alt} width={p.width} height={p.height} />
            {/* seta circular: nítida por cima da versão desfocada (brilho) */}
            <span className={styles.cardIcon}>
              <img src="/img/atta3d/card-seta.svg" alt="" width="54.233" height="54.233" />
              <img src="/img/atta3d/card-seta-sharp.svg" alt="" width="54.233" height="54.233" />
            </span>
          </div>
        ))}
      </div>

      <div className={styles.photo} data-anim="photo">
        <img src="/img/atta3d/sala-imersiva.jpg" alt="Sala imersiva Atta Ultra" />
        <p className={styles.caption}>Sala imersiva - Atta Ultra</p>
      </div>

      <p className={styles.closing} data-anim="closing">
        Nosso trabalho é definido por pensamento cuidadoso, precisão técnica e atenção ao detalhe.
      </p>
    </div>
  );
}
