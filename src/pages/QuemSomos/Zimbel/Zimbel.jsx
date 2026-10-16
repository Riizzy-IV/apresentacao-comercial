import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import StageImage from '../../../components/StageImage/StageImage';
import styles from './Zimbel.module.css';

const PROJECTS = [
  { logo: '/img/zimbel/esperanca.png', logoH: 48, name: 'Esperança Prime',   status: '100% vendido', top: 400, width: 330,
    unidades: '29 unidades', vgv: 'R$ 9 milhões' },
  { logo: '/img/zimbel/evolution.png', logoH: 49, name: 'Evolution Tatuapé', status: '90% vendido',  top: 590, width: 330,
    unidades: '40 unidades', vgv: 'R$ 17 milhões' },
];

export default function Zimbel() {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from('[data-anim="bg"]',      { scale: 1.06, opacity: 0, duration: 1.6, ease: 'power2.out' }, 0)
        .from('[data-anim="title"]',   { opacity: 0, y: 30, duration: 0.9 }, 0.2)
        .from('[data-anim="text"]',    { opacity: 0, y: 16, duration: 0.7, stagger: 0.12 }, 0.45)
        .from('[data-anim="logo"]',    { opacity: 0, y: 20, duration: 0.8 }, 0.75)
        .from('[data-anim="vertice"]', { opacity: 0, y: -12, duration: 0.8 }, 0.6)
        .from('[data-anim="panel"]',   { opacity: 0, x: 80, duration: 0.9 }, 0.7)
        .from('[data-anim="project"]', { opacity: 0, x: 30, duration: 0.7, stagger: 0.15 }, 1.0)
        .from('[data-anim="housi"]',   { opacity: 0, y: 12, duration: 0.7 }, 1.1);
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef}>
      {/* foto 3168x1344 em "cover" no frame do Figma (2313x1080 em x=-5) */}
      <StageImage src="/img/zimbel/bg.jpg" x={-121.4} y={0} width={2545.7} height={1080} data-anim="bg" />

      <h2 className={styles.title} data-anim="title">
        Incorporação<br />na prática
      </h2>
      <p className={styles.lead} data-anim="text">Não somos uma agência de marketing,</p>
      <p className={styles.claim} data-anim="text">somos incorporadores ajudando incorporadores!</p>

      <img src="/img/zimbel/zimbel-logo.svg" alt="Zimbel Incorporadora" width="427" height="77"
        className={styles.abs} style={{ left: 409, top: 523 }} data-anim="logo" />

      <img src="/img/logos/vertice-housi.svg" alt="Vértice Anália Franco — powered by Housi" width="396" height="65"
        className={styles.abs} style={{ left: 1457, top: 77 }} data-anim="vertice" />

      <div data-anim="housi">
        <p className={styles.powered}>Powered by</p>
        <img src="/img/logos/housi.svg" alt="Housi" width="287" height="28"
          className={styles.abs} style={{ left: 416, top: 921 }} />
      </div>

      <div className={styles.panel} data-anim="panel" />

      <div className={styles.panelHeader} data-anim="project">
        <p>Mais empreendimentos Zimbel</p>
        <img src="/img/icons/panel-line.svg" alt="" width="379" height="1" />
      </div>

      {PROJECTS.map(p => (
        <div key={p.name} className={styles.project} style={{ top: p.top, width: p.width }} data-anim="project">
          <img src={p.logo} alt={p.name} width="141" height={p.logoH} className={styles.projectLogo} />
          <div>
            <p className={styles.projectStatus}>{p.status}</p>
            <p className={styles.projectInfo}>
              <span>{p.unidades}</span>
              <span className={styles.projectSep} />
              <span><b>{p.vgv}</b> de VGV</span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
