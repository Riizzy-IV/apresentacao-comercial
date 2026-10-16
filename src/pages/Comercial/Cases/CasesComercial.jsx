import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import FormulaBackground from '../../../components/FormulaBackground/FormulaBackground';
import base from '../../Estrategia/Cases/Cases.module.css'; // card, textos e caixas: mesmos dos cases da Estratégia
import styles from './CasesComercial.module.css';

/* ===== Incorp Construtora (Figma "Tela 36") ===== */

function CaseIncorp() {
  return (
    <>
      <div className={`${base.card} ${base.cardShadow}`} data-anim="card">
        <img src="/img/comercial/cases/incorp.jpg" alt="" className={base.cardFoto} />
      </div>

      <div className={base.titleBlock} data-anim="item">
        <p className={base.nome}>Incorp Construtora</p>
        <p className={base.empresa}>Luxor Engenharia</p>
      </div>

      <p className={base.pill} style={{ top: 324 }} data-anim="item">Nosso desafio</p>
      <p className={base.texto} style={{ top: 374, width: 667 }} data-anim="item">
        Junto com o lançamento do cliente, iriam acontecer outros dois lançamentos na cidade, na mesma época e
        para o mesmo público-alvo
      </p>
      <p className={base.texto} style={{ top: 433, width: 715 }} data-anim="item">
        <b className={base.orange}>Tendo isso em vista</b>, sabíamos que para conseguir cumprir a meta mínima de
        vendas para o lançamento, <b>precisaríamos fazer com que o corretor comprasse a ideia do produto:</b>
      </p>

      <div className={base.acao} style={{ left: 881, top: 508, width: 471, height: 181 }} data-anim="item">
        <div style={{ width: 383 }}>
          <p>Ajudamos na melhor definição de comissionamento, bonificação e premiação.</p>
          <p>Auxílio na definição do cronograma do Meeting do empreendimento na cidade</p>
        </div>
      </div>
      <div className={base.acao} style={{ left: 1371, top: 508, width: 465, height: 84 }} data-anim="item">
        <div style={{ width: 426 }}>
          <p>Proximidade no auxílio da rotina do stand de vendas:</p>
        </div>
      </div>
      <div className={base.acao} style={{ left: 1371, top: 605, width: 465, height: 84 }} data-anim="item">
        <div style={{ width: 426 }}>
          <p>Insights de novas ideias de eventos, como:</p>
          <p><b>corujão dos corretores</b></p>
        </div>
      </div>

      <p className={base.resultadosTitle} data-anim="item">Alguns resultados:</p>
      {[['Evento do Meeting:', '25/08'], ['abertura das vendas:', '01/09']].map(([label, data], i) => (
        <div key={label} className={base.data} style={{ left: 881 + i * 188 }} data-anim="item">
          <p className={base.dataLabel}>{label}</p>
          <img src="/img/estrategia/cases/calendario.svg" alt="" width="39" height="39" className={base.dataIcon} />
          <p className={base.dataValor}>{data}</p>
        </div>
      ))}
      <span className={base.divisor} data-anim="item" />
      <p className={base.objetivo} data-anim="item">Objetivo mínimo: <b>60 vendas em 60 dias</b></p>
      <p className={base.resultado} data-anim="item">Resultado: <b>mais de 31 vendas em 20 dias</b></p>
    </>
  );
}

// cases (abas). `Conteudo: null` = ainda sem layout no Figma
const CASES = [
  { aba: 'Incorp Construtora',    Conteudo: CaseIncorp },
  { aba: 'Prime Empreendimentos', Conteudo: null },
  { aba: 'Nexus Empreendimentos', Conteudo: null },
];

/** Comercial · Cases: abas com os cases comerciais (cada case tem o seu layout). */
export default function CasesComercial() {
  const rootRef = useRef(null);
  const contentRef = useRef(null);
  const [tab, setTab] = useState(0);
  const first = useRef(true);
  const { Conteudo } = CASES[tab];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from('[data-anim="bg"]',  { opacity: 0, duration: 1.4, ease: 'power2.out' }, 0)
        .from('[data-anim="tab"]', { opacity: 0, y: -12, duration: 0.5, stagger: 0.08 }, 0.15);
    }, rootRef);
    return () => ctx.revert();
  }, []);

  // entrada do conteúdo (na abertura e a cada troca de aba)
  useLayoutEffect(() => {
    const delay = first.current ? 0.3 : 0;
    first.current = false;
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: 'power3.out' }, delay })
        .from('[data-anim="card"]', { opacity: 0, y: 24, duration: 0.8 }, 0)
        .from('[data-anim="item"]', { opacity: 0, y: 16, duration: 0.5, stagger: 0.06 }, 0.15);
    }, contentRef);
    return () => ctx.revert();
  }, [tab]);

  return (
    <div ref={rootRef}>
      <FormulaBackground />

      <div className={styles.tabs}>
        {CASES.map((cs, i) => (
          <button key={cs.aba} className={`${base.tab} ${i === tab ? base.tabActive : ''}`}
            onClick={() => setTab(i)} data-anim="tab">
            {cs.aba}
          </button>
        ))}
      </div>

      <div ref={contentRef} key={tab}>
        {Conteudo ? <Conteudo /> : <p className={base.emBreve} data-anim="card">Case em breve</p>}
      </div>
    </div>
  );
}
