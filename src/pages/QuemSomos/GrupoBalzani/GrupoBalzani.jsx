import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import OutlineGlow from '../../../components/OutlineGlow/OutlineGlow';
import styles from './GrupoBalzani.module.css';

const LOGOS = [
  { src: '/img/logos/balzani.svg', alt: 'Balzani',                left: 562,  top: 676, width: 332, height: 65 },
  { src: '/img/logos/zimbel.svg',  alt: 'Zimbel Incorporadora',   left: 985,  top: 672, width: 381, height: 69 },
  { src: '/img/logos/atta3d.svg',  alt: 'Atta3D by Balzani',      left: 1457, top: 680, width: 317, height: 61 },
];

export default function GrupoBalzani() {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from('[data-anim="outline"]',  { opacity: 0, duration: 1.4 }, 0)
        .from('[data-anim="eyebrow"]',  { opacity: 0, y: 16, duration: 0.6 }, 0.15)
        .from('[data-anim="headline"]', { opacity: 0, y: 30, duration: 0.9 }, 0.3)
        .from('[data-anim="line"]',     { scaleX: 0, transformOrigin: 'left center', duration: 0.8 }, 0.7)
        .from('[data-anim="logo"]',     { opacity: 0, y: 24, duration: 0.7, stagger: 0.15 }, 0.9);
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef}>
      <OutlineGlow left={1007.2} top={-269.8} data-anim="outline" />

      <div className={styles.text}>
        <p className={styles.eyebrow} data-anim="eyebrow">Não somos uma simples agência de marketing</p>
        <h2 className={styles.headline} data-anim="headline">
          Somos o maior hub de soluções para o mercado imobiliário do Brasil
        </h2>
      </div>

      <div className={styles.gradientLine} data-anim="line" />

      {LOGOS.map(l => (
        <img
          key={l.src}
          src={l.src}
          alt={l.alt}
          width={l.width}
          height={l.height}
          className={styles.logo}
          style={{ left: l.left, top: l.top }}
          data-anim="logo"
        />
      ))}
    </div>
  );
}
