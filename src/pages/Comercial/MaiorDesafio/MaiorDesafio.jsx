import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import FormulaBackground from '../../../components/FormulaBackground/FormulaBackground';
import styles from './MaiorDesafio.module.css';

/** Comercial · O maior desafio (Figma "Tela 32"): transformar lead em visita. */
export default function MaiorDesafio() {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from('[data-anim="bg"]',    { opacity: 0, duration: 1.4, ease: 'power2.out' }, 0)
        .from('[data-anim="title"]', { opacity: 0, y: 20, duration: 0.7, stagger: 0.12 }, 0.2)
        .from('[data-anim="texto"]', { opacity: 0, x: -20, duration: 0.7 }, 0.6)
        .from('[data-anim="nota"]',  { y: -120, duration: 0.8, ease: 'back.out(1.2)' }, 0.9);
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef}>
      <FormulaBackground />

      <div className={styles.cabecalho}>
        <p className={styles.chamada} data-anim="title">Gerar lead não é o maior desafio.</p>
        {/* quebra fixa: a fonte substituta é mais larga e quebraria em outro ponto */}
        <h1 className={styles.title} data-anim="title">
          <span>Transformar</span>
          <span>lead em visita é.</span>
        </h1>
      </div>

      <div className={styles.explicacao} data-anim="texto">
        <img src="/img/comercial/seta-desafio.svg" alt="" width="210.042" height="94.8968" className={styles.seta} />
        <p>
          É muito comum a incorporadora investir dezenas de milhares de reais em mídia, entregar esses leads
          diretamente aos corretores e depois dizer que o tráfego não funciona. Só que muitas vezes o problema
          não está na geração. Está no processo de atendimento.
        </p>
      </div>

      {/* nota pendurada no topo da tela */}
      <aside className={styles.nota} data-anim="nota">
        <span className={styles.iconeCaixa}>
          <span className={styles.icone}>
            <img src="/img/comercial/icone-alerta.svg" alt="" width="25.2169" height="23.9502" />
          </span>
        </span>
        <p>
          A inteligência artificial deve ser utilizada como apoio para o time comercial, manter o foco no time
          humano é imprescindível para garantir a eficiência nas vendas
        </p>
      </aside>
    </div>
  );
}
