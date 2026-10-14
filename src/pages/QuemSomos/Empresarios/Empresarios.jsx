import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import styles from './Empresarios.module.css';

// box: posição do card no Canvas · img: recorte da foto dentro do card (igual ao Figma) · tag: y da etiqueta no card
const PHOTOS = [
  { name: 'João Appolinário', src: '/img/empresarios/joao-appolinario.jpg',
    box: { left: 410, top: 280, width: 333, height: 255 }, img: { left: -37.3, top: -0.5, width: 434.4, height: 325.8 }, tag: 24 },
  { name: 'Luiza Trajano', src: '/img/empresarios/luiza-trajano.jpg',
    box: { left: 757, top: 280, width: 333, height: 255 }, img: { left: 0, top: -78.3, width: 333, height: 333 }, tag: 28 },
  { name: 'Semenzato', src: '/img/empresarios/semenzato.jpg',
    box: { left: 1097, top: 280, width: 333, height: 255 }, img: { left: 0, top: -39, width: 333, height: 333 }, tag: 28 },
  { name: 'Sergio Zimerman', src: '/img/empresarios/sergio-zimerman.jpg',
    box: { left: 1437, top: 280, width: 437, height: 673 }, img: { left: -2.1, top: -67.6, width: 442.2, height: 792.5 }, tag: 605 },
  { name: 'G4 Educação', src: '/img/empresarios/g4-educacao.jpg',
    box: { left: 410, top: 540, width: 1020, height: 413 }, img: { left: 0, top: 0, width: 1020, height: 413 }, tag: 345 },
];

export default function Empresarios() {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from('[data-anim="kicker"]',  { opacity: 0, y: 16, duration: 0.6 }, 0.1)
        .from('[data-anim="big"]',     { opacity: 0, x: -20, duration: 0.6 }, 0.25)
        .from('[data-anim="script"]',  { opacity: 0, x: 40, duration: 0.9 }, 0.35)
        .from('[data-anim="intro"]',   { opacity: 0, y: 16, duration: 0.7 }, 0.45)
        .from('[data-anim="photo"]',   { opacity: 0, y: 30, scale: 0.97, duration: 0.8, stagger: 0.1 }, 0.55);
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef}>
      <p className={styles.kicker} data-anim="kicker">Ao lado de</p>
      <p className={styles.big} data-anim="big">Grandes</p>
      <p className={styles.script} data-anim="script">empresários</p>

      <p className={styles.intro} data-anim="intro">
        Estamos conectados aos <strong>maiores e mais influentes empresários do mercado</strong>, trazendo
        a cultura de excelência das grandes empresas para impulsionar os resultados dos nossos <strong>clientes.</strong>
      </p>

      {PHOTOS.map(p => (
        <figure key={p.name} className={styles.card} style={p.box} data-anim="photo" tabIndex={-1}>
          <img src={p.src} alt={p.name} className={styles.photo} style={p.img} />
          <figcaption className={styles.tag} style={{ top: p.tag }}>{p.name}</figcaption>
        </figure>
      ))}
    </div>
  );
}
