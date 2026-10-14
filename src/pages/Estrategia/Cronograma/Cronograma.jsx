import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import FormulaBackground from '../../../components/FormulaBackground/FormulaBackground';
import GroupChips from '../../../components/GroupChips/GroupChips';
import { MESES, ETAPAS, BARRAS, SEMANAS_X } from './dados';
import styles from './Cronograma.module.css';

const RESP = { cliente: 'Cliente', ambos: 'Ambas', balzani: 'Balzani' };

/** Estratégia · Cronograma (Figma "Tela 5"): gráfico de Gantt das 5 etapas do lançamento. */
export default function Cronograma() {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from('[data-anim="bg"]',     { opacity: 0, duration: 1.4, ease: 'power2.out' }, 0)
        .from('[data-anim="chips"]',  { opacity: 0, duration: 0.6 }, 0.3)
        .from('[data-anim="head"]',   { opacity: 0, y: -12, duration: 0.5, stagger: 0.08 }, 0.15)
        .from('[data-anim="row"]',    { opacity: 0, x: -20, duration: 0.5, stagger: 0.08 }, 0.3)
        .from('[data-anim="weeks"]',  { opacity: 0, duration: 0.6 }, 0.6)
        .from('[data-anim="bar"]',    { scaleX: 0, transformOrigin: 'left center', duration: 0.6,
          ease: 'power2.out', stagger: 0.025 }, 0.7);
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef}>
      <FormulaBackground />
      <GroupChips group="Estratégia" />

      {/* cabeçalho */}
      <div className={`${styles.head} ${styles.headEtapa}`} data-anim="head">Etapa</div>
      <div className={`${styles.head} ${styles.headAtividade}`} data-anim="head">
        <span>Atividade</span><span>Responsável</span>
      </div>
      <div className={`${styles.head} ${styles.headMeses}`} data-anim="head">
        {MESES.map(m => (
          <div key={m} className={styles.mes}>
            <p>{m}</p>
            <div className={styles.semanas}>
              {['S1', 'S2', 'S3', 'S4'].map(s => <span key={s}>{s}</span>)}
            </div>
          </div>
        ))}
      </div>

      {/* etapas: caixa laranja + atividades + área do gráfico */}
      {ETAPAS.map(e => (
        <div key={e.nome} data-anim="row">
          <div className={styles.stage} style={{ top: e.stage[0], height: e.stage[1] }}>
            <p className={styles.stageName}>{e.nome}</p>
            <p className={styles.stagePrazo}>{e.prazo}</p>
          </div>
          <ul className={styles.list} style={{ top: e.list[0], height: e.list[1] }}>
            {e.atividades.map(([nome, resp], i) => (
              <li key={i} className={styles.atividade}>
                <span className={styles.atividadeNome}>{nome}</span>
                <span className={`${styles.resp} ${styles[resp]}`}>{RESP[resp]}</span>
              </li>
            ))}
          </ul>
          <div className={styles.chart} style={{ top: e.chart[0], height: e.chart[1] }} />
        </div>
      ))}

      {/* linhas das semanas (recortadas em cada área do gráfico) */}
      <div data-anim="weeks">
        {ETAPAS.map(e => SEMANAS_X.map(x => (
          <span key={`${e.nome}-${x}`} className={styles.semana}
            style={{ left: x, top: e.chart[0], height: e.chart[1] }} />
        )))}
      </div>

      {BARRAS.map(([left, top, width, height], i) => (
        <span key={i} className={styles.bar} style={{ left, top, width, height }} data-anim="bar" />
      ))}
    </div>
  );
}
