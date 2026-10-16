import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import styles from './Criativos.module.css';

const CAPAS = '/img/marketing/performance/criativos';
const VIDEOS = '/videos/criativos';

// criativos em vídeo (vertical 1080×1920). `id` = nome dos arquivos de vídeo e capa
const CRIATIVOS = [
  { id: 'leman-1', nome: 'Léman View',         cliente: 'Construtora Fenícia' },
  { id: 'leman-2', nome: 'Léman View',         cliente: 'Construtora Fenícia' },
  { id: 'like',    nome: 'Like Premium',       cliente: 'Like Premium' },
  { id: 'monaco',  nome: 'Mônaco Residencial', cliente: 'Nexus Empreendimentos' },
  { id: 'nexus',   nome: 'Nexus',              cliente: 'VSG Construtora' },
].map(c => ({ ...c, capa: `${CAPAS}/capa-${c.id}.jpg`, video: `${VIDEOS}/${c.id}.mp4` }));

const PASSO = 426;      // largura do card (394) + espaço entre cards (32)
const VISIVEIS = 3;     // cards inteiros na área visível
const MAX = Math.max(0, CRIATIVOS.length - VISIVEIS);

/**
 * Marketing · Performance, passo 8 (Figma "Tela 19"): carrossel de criativos em vídeo.
 * As setas, as abas e o arraste (mouse ou toque) deslizam a fileira; clicar no card toca/pausa o vídeo.
 */
export default function Criativos() {
  const rootRef = useRef(null);
  const janelaRef = useRef(null);
  const videosRef = useRef([]);
  const arraste = useRef(null);     // { x, escala, moveu } enquanto o ponteiro está pressionado
  const [inicio, setInicio] = useState(0);
  const [tocando, setTocando] = useState(null);
  const [deslocamento, setDeslocamento] = useState(0); // px (no palco) do arraste em andamento

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

  // arraste: a fileira segue o ponteiro; ao soltar, encaixa no card mais próximo.
  // Movimento menor que 8px conta como clique (toca/pausa o vídeo).
  const iniciarArraste = e => {
    if (e.button !== undefined && e.button !== 0) return;
    // o palco é escalado: converte pixels da tela para pixels do palco (1529 = largura da janela)
    const escala = janelaRef.current.getBoundingClientRect().width / 1529;
    arraste.current = { x: e.clientX, escala, moveu: false };
  };

  const moverArraste = e => {
    const a = arraste.current;
    if (!a) return;
    let dx = (e.clientX - a.x) / a.escala;
    if (!a.moveu && Math.abs(dx) < 8) return;
    if (!a.moveu) { a.moveu = true; janelaRef.current.setPointerCapture?.(e.pointerId); }
    // resistência nas pontas: além do primeiro/último card, a fileira anda só 30% do arraste
    const pos = inicio * PASSO - dx;
    const limite = MAX * PASSO;
    if (pos < 0) dx = inicio * PASSO - pos * 0.3;
    else if (pos > limite) dx = inicio * PASSO - (limite + (pos - limite) * 0.3);
    a.dx = dx;
    setDeslocamento(dx);
  };

  const soltarArraste = () => {
    const a = arraste.current;
    arraste.current = null;
    setDeslocamento(0);
    if (!a || !a.moveu) return;
    ir(inicio + Math.round(-(a.dx ?? 0) / PASSO));
    ultimoArraste.current = Date.now(); // o clique que vem logo após soltar não toca o vídeo
  };

  const ultimoArraste = useRef(0);

  const alternar = i => {
    if (Date.now() - ultimoArraste.current < 250) return;
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

      <div ref={janelaRef} className={`${styles.janela} ${deslocamento ? styles.arrastando : ''}`}
        onPointerDown={iniciarArraste} onPointerMove={moverArraste}
        onPointerUp={soltarArraste} onPointerCancel={soltarArraste} onPointerLeave={soltarArraste}
        onDragStart={e => e.preventDefault()}>
        <div className={styles.fileira} style={{ transform: `translateX(${-inicio * PASSO + deslocamento}px)` }}>
          {CRIATIVOS.map((c, i) => (
            <figure key={i} className={styles.item} data-anim="card">
              <button className={styles.card} onClick={() => alternar(i)}
                aria-label={c.video ? `${tocando === i ? 'Pausar' : 'Tocar'} vídeo ${i + 1}` : `Criativo ${i + 1}`}>
                {c.video
                  ? <video ref={el => (videosRef.current[i] = el)} src={c.video} poster={c.capa} preload="metadata" playsInline loop
                      onEnded={() => setTocando(null)} onPause={() => setTocando(t => (t === i ? null : t))} />
                  : <img src={c.capa} alt="" draggable={false} />}
                {/* botão de play no centro; some enquanto o vídeo toca e volta ao pausar */}
                {c.video && (
                  <span className={`${styles.play} ${tocando === i ? styles.playOculto : ''}`} aria-hidden>
                    <svg width="34" height="34" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.14v13.72a1 1 0 0 0 1.52.85l10.92-6.86a1 1 0 0 0 0-1.7L9.52 4.29A1 1 0 0 0 8 5.14z" /></svg>
                  </span>
                )}
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
