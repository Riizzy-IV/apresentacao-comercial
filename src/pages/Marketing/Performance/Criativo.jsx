import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import styles from './Criativo.module.css';

// perfis de público; `fotoClass` = enquadramento específico da foto (o padrão é cobrir o card)
const PERFIS = [
  { tag: 'Investidor',        foto: 'investidor', itens: ['Valorização', 'Rentabilidade', 'Localização', 'Potencial de locação', 'Liquidez'] },
  { tag: 'Moradia principal', foto: 'moradia',    itens: ['Qualidade de vida', 'Planta', 'Lazer', 'Mobilidade', 'Conforto para a família'] },
  { tag: 'Segunda moradia',   foto: 'segunda',    itens: ['Desejo', 'Experiência', 'Exclusividade', 'Lazer', 'Estilo de vida'], fotoClass: styles.fotoSegunda },
];

/** Marketing · Performance, passo 3 (Figma "Tela 25"): o criativo como diferencial, um card por perfil de público. */
export default function Criativo() {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from('[data-anim="title"]', { opacity: 0, y: 24, duration: 0.8 }, 0.15)
        .from('[data-anim="frase"]', { opacity: 0, x: -20, duration: 0.7 }, 0.4)
        .from('[data-anim="card"]',  { opacity: 0, x: 60, duration: 0.8, stagger: 0.15 }, 0.3);
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef}>
      <div className={styles.bloco}>
        <h1 className={styles.title} data-anim="title">O grande diferencial: <span>criativo</span></h1>
        <div className={styles.frase} data-anim="frase">
          <p>Desenvolvemos criativos específicos para o público, momento e objetivo de cada campanha.</p>
        </div>
      </div>

      {PERFIS.map((p, i) => (
        <div key={p.tag} className={styles.card} style={{ top: [87, 369, 653][i] }} data-anim="card">
          <div className={styles.fundo} aria-hidden>
            <img src={`/img/marketing/performance/${p.foto}.jpg`} alt="" className={p.fotoClass ?? styles.foto} draggable={false} />
          </div>
          <div className={styles.conteudo}>
            <span className={styles.tag}>{p.tag}</span>
            <p className={styles.itens}>
              {p.itens.map((it, j) => <span key={it}>{j > 0 && <br />}{it}</span>)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
