import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import styles from './Criativos.module.css';

const CAPAS = '/img/marketing/performance/criativos';

// criativos em vídeo. `video` = arquivo em /public (null = ainda sem o arquivo; mostra só a capa)
const CRIATIVOS = [1, 2, 3, 4].map(n => ({
  nome: 'Léman View', cliente: 'Construtora Fenícia', capa: `${CAPAS}/capa-${n}.jpg`, video: null,
}));

const PASSO = 426;      // largura do card (394) + espaço entre cards (32)
const VISIVEIS = 3;     // cards inteiros na área visível
const MAX = Math.max(0, CRIATIVOS.length - VISIVEIS);

/**
 * Marketing · Performance, passo 8 (Figma "Tela 19"): carrossel de criativos em vídeo.
 * As setas e as abas deslizam a fileira; clicar no card toca/pausa o vídeo.
 */
export default function Criativos() {
  const rootRef = useRef(null);
  const videosRef = useRef([]);
  const [inicio, setInicio] = useState(0);
  const [tocando, setTocando] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from('[data-anim="aba"]',   { opacity: 0, y: -12, duration: 0.5, stagger: 0.06 }, 0.1)
        .from('[data-anim="title"]', { opacity: 0, x: -20, duration: 0.6 }, 0.2)
        .from('[data-anim="card"]',  { opacity: 0, y: 40, duration: 0.8, stagger: 0.1 }, 0.3)
        // clearProps: a opacidade das setas volta a vir do CSS (setas desativadas ficam apagadas)
        .from('[data-anim="seta"]',  { opacity: 0, scale: 0.8, duration: 0.5, clearProps: 'opacity,transform' }, 0.6);
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const ir = i => setInicio(Math.min(MAX, Math.max(0, i)));

  const alternar = i => {
    const v = videosRef.current[i];
    if (!v) return;
    videosRef.current.forEach((outro, j) => j !== i && outro?.pause());
    if (v.paused) { v.play(); setTocando(i); } else { v.pause(); setTocando(null); }
  };

  return (
    <div ref={rootRef}>
      <img src="/img/estrategia/linha-topo.svg" alt="" width="1569" height="2" className={styles.linhaTopo} />
      <nav className={styles.abas}>
        {CRIATIVOS.map((c, i) => (
          <button key={i} className={styles.aba} onClick={() => ir(i)} data-anim="aba">
            {c.nome}
          </button>
        ))}
      </nav>

      <h1 className={styles.title} data-anim="title">Criativos</h1>

      <div className={styles.janela}>
        <div className={styles.fileira} style={{ transform: `translateX(${-inicio * PASSO}px)` }}>
          {CRIATIVOS.map((c, i) => (
            <figure key={i} className={styles.item} data-anim="card">
              <button className={styles.card} onClick={() => alternar(i)}
                aria-label={c.video ? `${tocando === i ? 'Pausar' : 'Tocar'} vídeo ${i + 1}` : `Criativo ${i + 1}`}>
                {c.video
                  ? <video ref={el => (videosRef.current[i] = el)} src={c.video} poster={c.capa} playsInline loop
                      onEnded={() => setTocando(null)} />
                  : <img src={c.capa} alt="" draggable={false} />}
              </button>
              <figcaption className={styles.legenda}>
                <span className={styles.nome}>{c.nome}</span>
                <span className={styles.cliente}>{c.cliente}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      {[[-1, 366, 'Anteriores'], [1, 1845, 'Próximos']].map(([delta, left, label]) => (
        <button key={delta} className={`${styles.seta} ${delta > 0 ? styles.setaProxima : ''}`} style={{ left }}
          onClick={() => ir(inicio + delta)} disabled={delta < 0 ? inicio === 0 : inicio === MAX}
          aria-label={label} data-anim="seta">
          <img src="/img/marketing/seta-circulo.svg" alt="" width="58" height="58" className={styles.circulo} />
          <img src="/img/marketing/seta.svg" alt="" width="8.59753" height="17.34" className={styles.chevron} />
        </button>
      ))}
    </div>
  );
}
