import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import FormulaBackground from '../../../components/FormulaBackground/FormulaBackground';
import styles from './OperacaoPreVendas.module.css';

/** Comercial · Operação pré-vendas (Figma "Tela 39"): a Balzani assume a pré-venda do empreendimento. */
export default function OperacaoPreVendas() {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from('[data-anim="bg"]',    { opacity: 0, duration: 1.4, ease: 'power2.out' }, 0)
        .from('[data-anim="foto"]',  { opacity: 0, y: -30, duration: 1 }, 0.1)
        .from('[data-anim="card"]',  { opacity: 0, y: 40, duration: 0.8 }, 0.5)
        .from('[data-anim="barra"]', { scaleX: 0, duration: 0.7, ease: 'power3.inOut' }, 0.9)
        .from('[data-anim="linha"]', { opacity: 0, y: 24, duration: 0.7, stagger: 0.12 }, 0.6);
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef}>
      <FormulaBackground />

      <div className={styles.foto} data-anim="foto">
        <img src="/img/comercial/operacao-pre-vendas.jpg" alt="" draggable={false} />
      </div>

      {/* card em degradê sobre a foto, com a barra branca e o texto */}
      <div className={styles.card} data-anim="card" />
      <span className={styles.barra} data-anim="barra" />
      <p className={styles.texto} data-anim="card">
        Para projetos selecionados, a Balzani assume diretamente a operação de pré-vendas do empreendimento.
      </p>

      {/* quebras fixas: a fonte substituta é mais larga e quebraria em outros pontos */}
      <h1 className={styles.title}>
        <span data-anim="linha">Nós não apenas</span>
        <span data-anim="linha">estruturamos.</span>
        <span data-anim="linha" className={styles.claro}>Nós operamos.</span>
      </h1>
    </div>
  );
}
