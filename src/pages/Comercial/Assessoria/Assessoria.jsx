import { Fragment, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import FormulaBackground from '../../../components/FormulaBackground/FormulaBackground';
import styles from './Assessoria.module.css';

const IMG = '/img/comercial/assessoria';

const RESULTADOS = [
  { cliente: 'Incorp', texto: 'Multiplicamos por 5 o volume de visitas presenciais, saltando de 3 para 15 visitas realizadas/mês.' },
  { cliente: 'Nexus',  texto: 'Performance acelerada no pré-lançamento com 7 vendas em apenas 45 dias antes do lançamento oficial.' },
  { cliente: 'Prime',  texto: 'Consistência e escala comercial, atingindo 8 vendas no último mês.', width: 419 },
];

/** Comercial · Assessoria comercial (Figma "Tela 34"): o serviço, resultados e prints do diagnóstico. */
export default function Assessoria() {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from('[data-anim="bg"]',        { opacity: 0, duration: 1.4, ease: 'power2.out' }, 0)
        .from('[data-anim="title"]',     { opacity: 0, y: 20, duration: 0.7, stagger: 0.12 }, 0.2)
        .from('[data-anim="print"]',     { opacity: 0, y: 40, duration: 0.8, stagger: 0.15 }, 0.35)
        .from('[data-anim="resultado"]', { opacity: 0, x: -20, duration: 0.6, stagger: 0.1 }, 0.7);
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef}>
      <FormulaBackground />

      <div className={styles.cabecalho}>
        <div className={styles.chamada} data-anim="title">
          <span>Nosso Serviço</span>
          <img src={`${IMG}/seta-circulo.svg`} alt="" width="54.2333" height="54.2333" className={styles.setaCirculo} />
          <span className={styles.trim}>ASSESSORIA COMERCIAL</span>
        </div>
        {/* quebras fixas: a fonte substituta é mais larga e quebraria em outros pontos */}
        <h1 className={styles.title} data-anim="title">
          <span>Estruturamos</span>
          <span>a operação.</span>
          <span className={styles.claro}>O seu time</span>
          <span className={styles.claro}>executa:</span>
        </h1>
      </div>

      <ul className={styles.resultados}>
        {RESULTADOS.map((r, i) => (
          <Fragment key={r.cliente}>
            {i > 0 && (
              <li aria-hidden data-anim="resultado">
                <img src={`${IMG}/linha-472.svg`} alt="" width="472" height="2" className={styles.linha} />
              </li>
            )}
            <li className={styles.resultado} data-anim="resultado">
              <img src={`${IMG}/marcador.svg`} alt="" width="23" height="65" />
              <p style={{ width: r.width }}>
                <strong>{r.cliente}:</strong>
                {r.texto}
              </p>
            </li>
          </Fragment>
        ))}
      </ul>

      {/* prints sobrepostos: diagnóstico (topo), detalhe com rolagem (direita) e conversa no WhatsApp */}
      <div className={styles.diagnostico} data-anim="print">
        <img src={`${IMG}/diagnostico.jpg`} alt="Diagnóstico Cliente Oculto WA" draggable={false} />
      </div>
      <div className={styles.detalheSombra} data-anim="print">
        <div className={styles.detalhe}>
          <img src={`${IMG}/diagnostico-detalhe.jpg`} alt="Diagnóstico Cliente Oculto WA: nota geral e mapa operacional" draggable={false} />
        </div>
      </div>
      <div className={styles.whatsapp} data-anim="print">
        <img src={`${IMG}/whatsapp.jpg`} alt="Atendimento pelo WhatsApp" draggable={false} />
      </div>
    </div>
  );
}
