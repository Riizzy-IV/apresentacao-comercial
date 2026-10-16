import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import styles from './Tecnologia.module.css';

const FERRAMENTAS = ['Higgsfield', 'Magnific', 'Seedance', 'Kling', 'Runway', 'Veo'];

// logos espalhados à direita. `caixa` = fundo do ícone (sem caixa: a imagem ocupa o card todo);
// `tam` = lado do card; `img` = lado da imagem dentro da caixa
const LOGOS = [
  { nome: 'Seedance',   left: 976,  top: 83,  tam: 124, raio: 25.114, caixa: '#fff', img: 108.304 },
  { nome: 'Magnific',   left: 1201, top: 132, tam: 200, raio: 32 },
  { nome: 'ChatGPT',    left: 1502, top: 202, tam: 124, raio: 19.84,  caixa: '#fff', img: 89.9 },
  { nome: 'Higgsfield', left: 1453, top: 419, tam: 200, raio: 32 },
  { nome: 'Gemini',     left: 1416, top: 709, tam: 124, raio: 19.84,  caixa: '#fff', img: 83.08, espelhado: true },
  { nome: 'Kling',      left: 897,  top: 729, tam: 125, raio: 20,     caixa: '#000', img: 65 },
  { nome: 'Claude',     left: 1111, top: 759, tam: 200, raio: 32,     caixa: '#fff' },
];

/** Marketing · Performance, passo 7 (Figma "Tela 48"): criatividade potencializada por tecnologia (IA). */
export default function Tecnologia() {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from('[data-anim="tag"]',   { opacity: 0, y: -10, duration: 0.5 }, 0.1)
        .from('[data-anim="title"]', { opacity: 0, y: 24, duration: 0.8 }, 0.2)
        .from('[data-anim="texto"]', { opacity: 0, y: 16, duration: 0.7 }, 0.45)
        .from('[data-anim="chip"]',  { opacity: 0, scale: 0.85, duration: 0.4, stagger: 0.05 }, 0.65)
        .from('[data-anim="logo"]',  { opacity: 0, scale: 0.6, duration: 0.7, stagger: 0.08, ease: 'back.out(1.6)' }, 0.3);
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef}>
      <span className={styles.tag} data-anim="tag">Mais um diferencial:</span>
      <h1 className={styles.title} data-anim="title">Criatividade potencializada por tecnologia.</h1>
      <p className={styles.texto} data-anim="texto">
        Utilizamos ferramentas de Inteligência Artificial e as <strong>principais tecnologias de edição para
        acelerar testes</strong>, ampliar possibilidades criativas e elevar a qualidade das campanhas.
      </p>

      <ul className={styles.chips}>
        {FERRAMENTAS.map(f => <li key={f} className={styles.chip} data-anim="chip">{f}</li>)}
        <li className={`${styles.chip} ${styles.chipMais}`} data-anim="chip">muito mais</li>
      </ul>

      {LOGOS.map(l => (
        <div key={l.nome} className={styles.logo} data-anim="logo"
          style={{ left: l.left, top: l.top, width: l.tam, height: l.tam, borderRadius: l.raio, background: l.caixa }}>
          <img src={`/img/marketing/performance/ia/${l.nome.toLowerCase()}.png`} alt={l.nome} draggable={false}
            className={l.espelhado ? styles.espelhado : undefined}
            style={l.img ? { width: l.img, height: l.img } : { width: '100%', height: '100%' }} />
        </div>
      ))}
    </div>
  );
}
