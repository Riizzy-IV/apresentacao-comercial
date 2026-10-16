import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import styles from './Socios.module.css';

// sócios lado a lado (Figma "Quem Somos - Tela 15"). Posições: foto, nome, sobrenome, cargo, linha e bio.
// `fotoClass` = recorte da foto igual ao do Figma; `trimBio` = bio recortada na altura das letras.
const SOCIOS = [
  {
    id: 'guilherme', nome: 'Guilherme', sobrenome: 'Zimerman', cargo: 'CEO & Founder',
    foto: '/img/quem-somos/guilherme.jpg', fotoClass: styles.guilhermeFoto, fotoPos: [409, 76],
    nomePos: [417, 507], sobrenomePos: [450, 526], col: 457, linha: 450, bioWidth: 276,
    bio: (
      <>
        <span className={styles.bioHighlight}><strong>Ceo &amp; Founder da Balzani Company</strong>,</span>
        {' '}especialista em marketing para o mercado imobiliário, com mais de 5 anos de atuação no setor.
        Iniciou a carreira como corretor de imóveis e, atualmente, além da Balzani, atua como incorporador.
        É formado em Administração de Empresas pela FGV – EAESP.
      </>
    ),
  },
  {
    id: 'enzo', nome: 'Enzo', sobrenome: 'Mirizzi', cargo: 'COO & Founder',
    foto: '/img/quem-somos/enzo.jpg', fotoClass: styles.enzoFoto, fotoPos: [950, 73],
    nomePos: [961, 490], sobrenomePos: [988, 526], col: 1005, linha: 1006, bioLeft: 1006, bioWidth: 321, trimBio: true,
    bio: (
      <>
        Especialista em marketing imobiliário e bacharel em Administração de Empresas pela FGV EAESP.
        Iniciou sua carreira como correspondente bancário, com certificação CA-600 da ABECIP.
        Atualmente, atua como Diretor Operacional e de Marketing da Balzani e da Atta, unindo estratégia,
        marketing e tecnologia para potencializar lançamentos imobiliários.
      </>
    ),
  },
  {
    id: 'carlos', nome: 'Carlos', sobrenome: 'Bunicki', cargo: 'CTO',
    foto: '/img/quem-somos/carlos.jpg', fotoClass: styles.carlosFoto, fotoPos: [1481, 73],
    nomePos: [1492, 490], sobrenomePos: [1519, 526], col: 1536, linha: 1537, bioLeft: 1537, bioWidth: 294, trimBio: true,
    bio: (
      <>
        Com formação técnica em Automação e Informática pela UFPR, especialização em Tecnologia Visual para
        Lançamentos Imobiliários pela MasterViz e formação MasterMind em PNL, possui experiência de mais de
        nove anos no desenvolvimento de soluções visuais e tecnológicas para o mercado imobiliário, com
        trajetória profissional que inclui cinco anos nas Forças Armadas.
      </>
    ),
  },
];

export default function Socios() {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // cada sócio entra em sequência: foto → nome → sobrenome → linha → cargo → texto
      SOCIOS.forEach(({ id }, i) => {
        const t = 0.1 + i * 0.35;
        const q = s => `[data-anim="${id}-${s}"]`;
        tl.from(q('photo'),   { opacity: 0, y: 40, duration: 0.9 }, t)
          .from(q('name'),    { opacity: 0, x: -20, duration: 0.6 }, t + 0.3)
          .from(q('surname'), { opacity: 0, x: 40, duration: 0.9 }, t + 0.4)
          .from(q('line'),    { scaleX: 0, transformOrigin: 'left center', duration: 0.7 }, t + 0.55)
          .from(q('role'),    { opacity: 0, y: 12, duration: 0.6 }, t + 0.55)
          .from(q('bio'),     { opacity: 0, y: 12, duration: 0.6 }, t + 0.65);
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef}>
      {SOCIOS.map(s => (
        <div key={s.id}>
          <div className={`${styles.photo} ${s.fotoClass}`} style={{ left: s.fotoPos[0], top: s.fotoPos[1] }}
            data-anim={`${s.id}-photo`}>
            <img src={s.foto} alt={`${s.nome} ${s.sobrenome}`} />
          </div>
          <p className={styles.name} style={{ left: s.nomePos[0], top: s.nomePos[1] }} data-anim={`${s.id}-name`}>
            {s.nome}
          </p>
          <p className={styles.surname} style={{ left: s.sobrenomePos[0], top: s.sobrenomePos[1] }}
            data-anim={`${s.id}-surname`}>
            {s.sobrenome}
          </p>
          <p className={styles.role} style={{ left: s.col }} data-anim={`${s.id}-role`}>{s.cargo}</p>
          <div className={styles.gradientLine} style={{ left: s.linha }} data-anim={`${s.id}-line`} />
          <p className={`${styles.bio} ${s.trimBio ? styles.bioTrim : ''}`}
            style={{ left: s.bioLeft ?? s.col, width: s.bioWidth }} data-anim={`${s.id}-bio`}>
            {s.bio}
          </p>
        </div>
      ))}
    </div>
  );
}
