import { useEffect, useLayoutEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { Canvas } from '../../components/ScaleWrapper/ScaleWrapper';
import StageImage from '../../components/StageImage/StageImage';
import BottomNav from '../../components/BottomNav/BottomNav';
import styles from './Formula.module.css';

// cantos do quadro central (marcadores azuis)
const DOTS = [[674, 368], [1242, 368], [674, 606], [1242, 606]];

// passo 2 (Figma "Tela 2"): os três pilares
const PILARES = [
  { n: '01', nLeft: 835, nTop: 279, label: 'Estratégia', top: 314 },
  { n: '02', nLeft: 824, nTop: 432, label: 'Marketing',  top: 464 },
  { n: '03', nLeft: 824, nTop: 587, label: 'Comercial',  top: 623 },
];

// logo: centro (960.5, 489) no passo 1 → centro (409, 489) e 80,4% do tamanho no passo 2
const LOGO_STEP2 = { x: 409 - 960.5, y: 0, scale: 456 / 567 };

/**
 * Abertura da Fórmula Vértice em dois passos (sem fade entre eles, anima no lugar):
 *  1. logo no centro, com a grade de linhas e faixas de vidro;
 *  2. (/formula/pilares) a logo vai para a esquerda e entra o painel 01 Estratégia,
 *     02 Marketing, 03 Comercial.
 */
export default function Formula() {
  const { pathname } = useLocation();
  const step = pathname.endsWith('/pilares') ? 2 : 1;
  const rootRef = useRef(null);
  const ctxRef = useRef(null);
  const firstStep = useRef(step);

  // entrada da tela (no passo em que ela foi aberta)
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const s2 = firstStep.current === 2;
      gsap.set('[data-anim="logo-move"]', s2 ? LOGO_STEP2 : { x: 0, y: 0, scale: 1 });
      gsap.set('[data-anim="grid1"]', { autoAlpha: s2 ? 0 : 1 });
      gsap.set('[data-anim="pilares"]', { autoAlpha: s2 ? 1 : 0 });

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from('[data-anim="bg"]', { opacity: 0, scale: 1.05, duration: 1.8, ease: 'power2.out' }, 0)
        .from('[data-anim="logo"]', { opacity: 0, y: 20, scale: 0.96, duration: 1 }, s2 ? 0.3 : 1.0);
      if (s2) {
        tl.from('[data-anim="pilar"]', { opacity: 0, x: 40, duration: 0.7, stagger: 0.15 }, 0.5);
      } else {
        tl.from('[data-anim="h"]',     { scaleX: 0, duration: 1.2, ease: 'power3.inOut' }, 0.2)
          .from('[data-anim="v"]',     { scaleY: 0, duration: 1.2, ease: 'power3.inOut' }, 0.35)
          .from('[data-anim="diag"]',  { opacity: 0, duration: 1.2 }, 0.5)
          .from('[data-anim="glass"]', { opacity: 0, duration: 1 }, 0.4)
          .from('[data-anim="dot"]',   { scale: 0, duration: 0.4, stagger: 0.08, ease: 'back.out(3)' }, 0.9);
      }
    }, rootRef);
    ctxRef.current = ctx;
    return () => ctx.revert();
  }, []);

  // troca de passo pelas setas: anima no lugar
  useEffect(() => {
    const ctx = ctxRef.current;
    if (!ctx || (step === firstStep.current && !ctx.changed)) return;
    ctx.changed = true;

    ctx.add(() => {
      const ease = 'power3.inOut';
      if (step === 2) {
        gsap.to('[data-anim="grid1"]', { autoAlpha: 0, duration: 0.5, ease, overwrite: true });
        gsap.to('[data-anim="logo-move"]', { ...LOGO_STEP2, duration: 1, ease, overwrite: true });
        gsap.to('[data-anim="pilares"]', { autoAlpha: 1, duration: 0.6, delay: 0.25, overwrite: true });
        gsap.fromTo('[data-anim="pilar"]', { opacity: 0, x: 40 },
          { opacity: 1, x: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out', delay: 0.45, overwrite: true });
      } else {
        gsap.to('[data-anim="pilares"]', { autoAlpha: 0, duration: 0.4, ease, overwrite: true });
        gsap.to('[data-anim="logo-move"]', { x: 0, y: 0, scale: 1, duration: 1, ease, overwrite: true });
        gsap.to('[data-anim="grid1"]', { autoAlpha: 1, duration: 0.6, delay: 0.3, overwrite: true });
      }
    });
  }, [step]);

  return (
    <section className={styles.root} ref={rootRef}>
      <Canvas>
        <div data-anim="bg">
          {/* foto colorida desfocada + ondas em "overlay" a 50% (a mesclagem fica no próprio elemento) */}
          <StageImage src="/img/formula/wallpaper.jpg" x={0} y={-152} width={1920} height={1282} />
          <StageImage src="/img/formula/waves.jpg" x={0} y={-2} width={1920} height={1083}
            style={{ mixBlendMode: 'overlay', opacity: 0.5 }} />
        </div>
        <div className={styles.shade} />

        {/* passo 1: grade em volta da logo */}
        <div className={styles.layer} data-anim="grid1">
          {/* faixas de vidro: coluna central e banda horizontal */}
          <div className={styles.column} data-anim="glass" />
          <div className={styles.band} data-anim="glass" />

          <img src="/img/formula/diagonal.svg" alt="" width="2058.79" height="1" className={styles.diagonal} data-anim="diag" />

          <div className={styles.lineH} style={{ top: 370 }} data-anim="h" />
          <div className={styles.lineH} style={{ top: 608 }} data-anim="h" />
          <div className={styles.lineV} style={{ left: 676 }} data-anim="v" />
          <div className={styles.lineV} style={{ left: 1243 }} data-anim="v" />

          {DOTS.map(([x, y]) => (
            <span key={`${x}-${y}`} className={styles.dot} style={{ left: x, top: y }} data-anim="dot" />
          ))}
        </div>

        {/* passo 2: os três pilares (os números ficam atrás do painel de vidro, como no Figma) */}
        <div className={styles.layer} data-anim="pilares">
          {PILARES.map(p => (
            <p key={p.n} className={styles.pilarNum} style={{ left: p.nLeft, top: p.nTop }} data-anim="pilar">{p.n}</p>
          ))}
          <div className={styles.panel} />
          <div className={styles.panelLineV} />
          {[252, 413, 561, 722].map(top => (
            <div key={top} className={styles.panelLineH} style={{ top }} />
          ))}
          {PILARES.map(p => (
            <p key={p.label} className={styles.pilarLabel} style={{ top: p.top }} data-anim="pilar">{p.label}</p>
          ))}
        </div>

        {/* logo: escala a partir do próprio centro */}
        <div className={styles.logoMove} data-anim="logo-move">
          <img src="/img/formula/logo-formula.svg" alt="Fórmula Vértice Balzani" width="567" height="238"
            className={styles.logo} data-anim="logo" />
        </div>

        <BottomNav />
      </Canvas>
    </section>
  );
}
