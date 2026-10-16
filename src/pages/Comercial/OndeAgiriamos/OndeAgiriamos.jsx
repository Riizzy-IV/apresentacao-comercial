import { Fragment, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import FormulaBackground from '../../../components/FormulaBackground/FormulaBackground';
import styles from './OndeAgiriamos.module.css';

const ETAPAS = [
  'Velocidade de atendimento', 'Contato', 'Qualificação', 'Follow-up', 'Agendamento',
  'Confirmação', 'Recuperação de leads', 'Gestão do CRM', 'Análise do funil',
];

/** Comercial · Onde agiríamos (Figma "Tela 40"): a operação de pré-vendas, do lead até a visita. */
export default function OndeAgiriamos() {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from('[data-anim="bg"]',    { opacity: 0, duration: 1.4, ease: 'power2.out' }, 0)
        .from('[data-anim="title"]', { opacity: 0, y: 20, duration: 0.7, stagger: 0.12 }, 0.15)
        .from('[data-anim="foto"]',  { opacity: 0, y: 40, duration: 0.9 }, 0.3)
        .from('[data-anim="barra"]', { scaleY: 0, duration: 0.8, ease: 'power3.inOut' }, 0.6)
        .from('[data-anim="item"]',  { opacity: 0, x: 20, duration: 0.45, stagger: 0.05 }, 0.7);
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef}>
      <FormulaBackground />

      <div className={styles.cabecalho}>
        <p className={styles.chamada} data-anim="title">Onde agiríamos</p>
        <h1 className={styles.title} data-anim="title">
          <span>Do lead</span>
          <span>até a visita.</span>
        </h1>
      </div>

      <div className={styles.foto} data-anim="foto">
        <img src="/img/comercial/onde-agiriamos.jpg" alt="" draggable={false} />
      </div>
      <img src="/img/comercial/barra-vertical.png" alt="" width="20" height="510" className={styles.barra} data-anim="barra" />

      <ul className={styles.lista}>
        {ETAPAS.map((etapa, i) => (
          <Fragment key={etapa}>
            {i > 0 && <li aria-hidden data-anim="item"><img src="/img/marketing/linha-lista.svg" alt="" width="451" height="1" /></li>}
            <li className={styles.item} data-anim="item">
              <img src="/img/marketing/marcador-lista.svg" alt="" width="14.0007" height="7.64251" className={styles.marcador} />
              <span>{etapa}</span>
            </li>
          </Fragment>
        ))}
      </ul>
    </div>
  );
}
