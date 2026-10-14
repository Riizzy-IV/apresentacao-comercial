import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import BottomNav from '../../components/BottomNav/BottomNav';
import { Canvas } from '../../components/ScaleWrapper/ScaleWrapper';
import styles from './Home.module.css';

const FACES = [
  { src: '/img/home/face-1.png', name: 'Porte' },
  { src: '/img/home/face-2.png', name: 'INC Empreendimentos' },
  { src: '/img/home/face-3.png', name: 'Diálogo Engenharia' },
];

export default function Home() {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from('[data-anim="logo"]',    { opacity: 0, x: 80, scale: 0.94, duration: 1.4 }, 0)
        .from('[data-anim="outline"]', { opacity: 0, duration: 1.6 }, 0.2)
        .from('[data-anim="bar"]',     { scaleX: 0, transformOrigin: 'left center', duration: 0.8 }, 0.3)
        .from('[data-anim="heading"]', { opacity: 0, y: 30, duration: 0.9 }, 0.45)
        .from('[data-anim="face"]',    { opacity: 0, x: -20, duration: 0.6, stagger: 0.1 }, 0.8)
        .from('[data-anim="stat"]',    { opacity: 0, y: 12, duration: 0.6 }, 1.0)
        .from('[data-anim="nav"]',     { opacity: 0, y: 20, duration: 0.7 }, 0.9);

      // flutuação contínua da logo 3D — durações diferentes em cada eixo
      // para o movimento não parecer um loop mecânico
      const float = { ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 1.4 };
      gsap.to('[data-anim="logo"]', { y: -26,       duration: 3.2, ...float });
      gsap.to('[data-anim="logo"]', { x: 10,        duration: 4.6, ...float });
      gsap.to('[data-anim="logo"]', { rotation: 1.2, duration: 5.8, ...float });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.root} ref={rootRef}>
      <img src="/img/home/bg-waves.jpg" alt="" className={styles.waves} />

      <Canvas>
      <div className={styles.outline} data-anim="outline">
        <img src="/img/home/outline-sharp.svg" alt="" width="1453.6" height="1438.6" className={styles.outlineSharp} />
        <img src="/img/home/outline.svg" alt="" width="1453.6" height="1438.6" className={styles.outlineBlur} />
      </div>

      <img
        src="/img/home/logo-3d.jpg"
        alt=""
        className={styles.logo}
        data-anim="logo"
      />

      <div className={styles.bar} data-anim="bar" />

      <div className={styles.content}>
        <h1 className={styles.heading} data-anim="heading">
          <strong>Nós somos o maior </strong>
          Hub de soluções imobiliárias do Brasil
        </h1>

        <div className={styles.proof}>
          <div className={styles.faces}>
            {FACES.map(({ src, name }) => (
              <span key={src} className={styles.face} data-anim="face" tabIndex={-1}>
                <img src={src} alt={name} width="92.677" height="92.677" />
                <span className={styles.tooltip} role="tooltip">{name}</span>
              </span>
            ))}
          </div>

          <p className={styles.stat} data-anim="stat">
            <span className={styles.statHighlight}>+150 projetos</span> entregues
            <br />
            para incorporadoras e construtoras
          </p>
        </div>
      </div>

      <div data-anim="nav">
        <BottomNav />
      </div>
      </Canvas>
    </section>
  );
}
