import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import OutlineGlow from '../../../components/OutlineGlow/OutlineGlow';
import styles from './Socios.module.css';

export default function Socios() {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from('[data-anim="outline"]', { opacity: 0, duration: 1.4 }, 0);

      // cada sócio entra em sequência: foto → barra → nome → sobrenome → cargo → texto
      ['guilherme', 'enzo'].forEach((who, i) => {
        const t = 0.15 + i * 0.45;
        const q = s => `[data-anim="${who}-${s}"]`;
        tl.from(q('photo'),   { opacity: 0, y: 40, duration: 0.9 }, t)
          .from(q('bar'),     { scaleY: 0, transformOrigin: 'top center', duration: 0.6 }, t + 0.25)
          .from(q('name'),    { opacity: 0, x: -20, duration: 0.6 }, t + 0.35)
          .from(q('surname'), { opacity: 0, x: 40, duration: 0.9 }, t + 0.45)
          .from(q('line'),    { scaleX: 0, transformOrigin: 'left center', duration: 0.8 }, t + 0.6)
          .from(q('role'),    { opacity: 0, y: 12, duration: 0.6 }, t + 0.6)
          .from(q('bio'),     { opacity: 0, y: 12, duration: 0.6 }, t + 0.7);
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef}>
      <OutlineGlow left={309.2} top={593.2} data-anim="outline" />

      {/* Guilherme */}
      <div className={`${styles.photo} ${styles.guilhermePhoto}`} data-anim="guilherme-photo">
        <img src="/img/quem-somos/guilherme.jpg" alt="Guilherme Zimerman" />
      </div>
      <div className={styles.bar} style={{ left: 756, top: 130 }} data-anim="guilherme-bar" />
      <p className={styles.name} style={{ left: 814, top: 134 }} data-anim="guilherme-name">Guilherme</p>
      <p className={styles.surname} style={{ left: 807, top: 154 }} data-anim="guilherme-surname">Zimerman</p>
      <div className={styles.gradientLine} style={{ left: 1283, top: 229 }} data-anim="guilherme-line" />
      <p className={styles.role} style={{ left: 814, top: 267, width: 207 }} data-anim="guilherme-role">CEO &amp;Founder</p>
      <p className={styles.bio} style={{ left: 814, top: 346, width: 276 }} data-anim="guilherme-bio">
        <span className={styles.bioHighlight}><strong>Ceo &amp; Founder da Balzani Company</strong>,</span>
        {' '}especialista em marketing para o mercado imobiliário, com mais de 5 anos de atuação no setor.
        Iniciou a carreira como corretor de imóveis e, atualmente, além da Balzani, atua como incorporador.
        É formado em Administração de Empresas pela FGV – EAESP.
      </p>

      {/* Enzo */}
      <div className={`${styles.photo} ${styles.enzoPhoto}`} data-anim="enzo-photo">
        <img src="/img/quem-somos/enzo.jpg" alt="Enzo Mirizzi" />
      </div>
      <div className={styles.bar} style={{ left: 1489, top: 455 }} data-anim="enzo-bar" />
      <p className={styles.name} style={{ left: 1548, top: 459 }} data-anim="enzo-name">Enzo</p>
      <p className={styles.surname} style={{ left: 1535, top: 483 }} data-anim="enzo-surname">Mirizzi</p>
      <div className={styles.gradientLine} style={{ left: 1854, top: 558 }} data-anim="enzo-line" />
      <p className={styles.role} style={{ left: 1552, top: 593, width: 226 }} data-anim="enzo-role">COO &amp; Founder</p>
      <p className={styles.bio} style={{ left: 1553, top: 665, width: 321 }} data-anim="enzo-bio">
        Especialista em marketing imobiliário e bacharel em Administração de Empresas pela FGV EAESP.
        Iniciou sua carreira como correspondente bancário, com certificação CA-600 da ABECIP.
        Atualmente, atua como Diretor Operacional e de Marketing da Balzani e da Atta, unindo estratégia,
        marketing e tecnologia para potencializar lançamentos imobiliários.
      </p>
    </div>
  );
}
