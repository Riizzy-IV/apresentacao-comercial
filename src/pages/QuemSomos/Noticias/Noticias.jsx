import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import styles from './Noticias.module.css';

const QUOTES = [
  {
    text: 'De corretor de imóveis à empresário do mercado imobiliário',
    card: { left: 621, top: 369.34, height: 129.385 }, angle: 132.14, stop: 50.825, center: true,
    aspas: { left: 827.56, top: 337 },
  },
  {
    text: 'Hub imobiliário destaca com método exclusivo',
    card: { left: 1596, top: 446.83, height: 122.391 }, angle: 130, stop: 36.959, center: false,
    aspas: { left: 1806.12, top: 415 },
  },
];

export default function Noticias() {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from('[data-anim="title"]',  { opacity: 0, y: 24, duration: 0.8 }, 0.1)
        .from('[data-anim="script"]', { opacity: 0, x: 40, duration: 0.9 }, 0.3)
        .from('[data-anim="main"]',   { opacity: 0, y: 40, duration: 0.9 }, 0.35)
        .from('[data-anim="side"]',   { opacity: 0, y: 40, duration: 0.9 }, 0.55)
        .from('[data-anim="brand"]',  { opacity: 0, scale: 0.8, duration: 0.7, stagger: 0.12, ease: 'back.out(1.6)' }, 0.7)
        .from('[data-anim="quote"]',  { opacity: 0, scale: 0.9, duration: 0.7, stagger: 0.15, ease: 'back.out(1.4)' }, 0.9);

      // flutuação leve e contínua dos balões de citação (fora de fase entre si)
      gsap.utils.toArray('[data-anim="quote"]').forEach((el, i) => {
        gsap.to(el, { y: -10, duration: 2.6 + i * 0.5, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 1.6 + i * 0.4 });
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef}>
      <h2 className={styles.title} data-anim="title">Nosso grupo<br />na</h2>
      <p className={styles.script} data-anim="script">mídia</p>

      {/* logo do Valor Econômico no lugar do UOL (centralizada onde estava: 1464.7, 152).
          Aparece assim que o arquivo existir em public/img/noticias/valor.png */}
      <img src="/img/noticias/valor.png" alt="Valor Econômico" className={styles.brandLogo}
        onError={e => { e.currentTarget.style.display = 'none'; }} data-anim="brand" />

      <img src="/img/noticias/materia-valor.jpg" alt="Matéria no Valor: Tecnologia dos games revoluciona o mercado imobiliário"
        className={`${styles.abs} ${styles.shot}`}
        style={{ left: 897, top: 249, width: 868, height: 640 }} data-anim="main" />

      <img src="/img/noticias/r7.png" alt="R7" className={styles.abs}
        style={{ left: 503, top: 525, width: 152.188, height: 130.197 }} data-anim="brand" />

      <img src="/img/noticias/materia-consultoria.jpg" alt="Matéria: Consultoria especializada em marketing e vendas para construtoras e incorporadoras já impactou 80 empresas"
        className={`${styles.abs} ${styles.shot} ${styles.shadow}`}
        style={{ left: 598, top: 660, width: 468.561, height: 207.201 }} data-anim="side" />

      {QUOTES.map(q => (
        <div key={q.text} className={styles.layer} data-anim="quote">
          <div
            className={`${styles.card} ${q.center ? styles.cardCenter : ''}`}
            style={{
              ...q.card,
              backgroundImage: `linear-gradient(${q.angle}deg, #ff611b ${q.stop}%, rgba(255, 97, 27, 0) 100%)`,
            }}
          >
            <p>{q.text}</p>
          </div>
          <img src="/img/noticias/aspas.svg" alt="" width="57.699" height="48.957"
            className={`${styles.abs} ${styles.aspas}`} style={q.aspas} />
        </div>
      ))}
    </div>
  );
}
