import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import FormulaBackground from '../../../components/FormulaBackground/FormulaBackground';
import styles from './ClienteOculto.module.css';

const IMG = '/img/comercial/cliente-oculto';

// imobiliárias avaliadas no cliente oculto: relatório (páginas do PDF emendadas numa imagem só).
// `imagem: null` = relatório ainda sem material ("Em breve")
const IMOBILIARIAS = [
  { nome: 'ACF Lucas',           imagem: `${IMG}/acf-lucas.jpg`,           w: 1400, h: 5842 },
  { nome: 'INC Empreendimentos', imagem: `${IMG}/inc-empreendimentos.jpg`, w: 1400, h: 5867 },
  { nome: 'Investir com Elas',   imagem: `${IMG}/investir-com-elas.jpg`,   w: 1400, h: 6882 },
];

/**
 * Comercial · Cliente oculto (Figma "Tela 54"): o relatório de diagnóstico de cada imobiliária,
 * rolando dentro do painel; os botões à direita do título trocam de imobiliária.
 */
export default function ClienteOculto() {
  const [atual, setAtual] = useState(0);
  const rootRef = useRef(null);
  const painelRef = useRef(null);
  const first = useRef(true);
  const { nome, imagem, w, h } = IMOBILIARIAS[atual];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from('[data-anim="bg"]',    { opacity: 0, duration: 1.4, ease: 'power2.out' }, 0)
        .from('[data-anim="title"]', { opacity: 0, x: -20, duration: 0.6, stagger: 0.1 }, 0.2)
        .from('[data-anim="aba"]',   { opacity: 0, y: -12, duration: 0.5, stagger: 0.06 }, 0.3);
    }, rootRef);
    return () => ctx.revert();
  }, []);

  // entrada do painel (na abertura e a cada troca); volta ao topo do relatório
  useLayoutEffect(() => {
    painelRef.current.scrollTop = 0;
    const delay = first.current ? 0.35 : 0;
    first.current = false;
    const ctx = gsap.context(() => {
      gsap.from(painelRef.current, { opacity: 0, y: 30, duration: 0.8, ease: 'power3.out', delay });
    }, rootRef);
    return () => ctx.revert();
  }, [atual]);

  return (
    <div ref={rootRef}>
      <FormulaBackground />

      <div className={styles.titulo}>
        <h1 data-anim="title">Cliente oculto</h1>
        <p data-anim="title">Luxor Engenharia</p>
      </div>

      <nav className={styles.abas}>
        {IMOBILIARIAS.map((im, i) => (
          <button key={im.nome} className={`${styles.aba} ${i === atual ? styles.abaAtiva : ''}`}
            onClick={() => setAtual(i)} data-anim="aba">
            {im.nome}
          </button>
        ))}
      </nav>

      <div ref={painelRef} className={styles.painel}>
        {imagem
          ? <img src={imagem} alt={`Diagnóstico Cliente Oculto: ${nome}`} width={w} height={h} draggable={false} />
          : <p className={styles.emBreve}>Em breve</p>}
      </div>
    </div>
  );
}
