import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import FormulaBackground from '../../../components/FormulaBackground/FormulaBackground';
import GroupChips from '../../../components/GroupChips/GroupChips';
import styles from './Atuacao.module.css';

// ícones 1–4, 7 e 8 já vêm com a caixa; 5 e 6 só o desenho (a caixa é feita no CSS)
// `w` = largura do texto no Figma (define as quebras de linha)
const ETAPAS = [
  { icon: 'icon-1.svg', text: 'Definição do Objetivo do Lançamento' },
  { icon: 'icon-2.svg', w: 464, text: 'Planejamento de etapas, ações, e principais marcos' },
  { icon: 'icon-3.svg', w: 451, text: 'Elaboração de um cronograma estratégico (5 etapas do lançamento)' },
  { icon: 'icon-4.svg', w: 486, text: 'Definição de uma estratégia de posicionamento e comunicação' },
  { icon: 'icon-5.svg', w: 366, text: 'Definição da Estratégia Comercial', boxed: 36 },
  { icon: 'icon-6.svg', w: 501, text: 'Definição da Estrutura Comercial ideal (Sdr + House interna + Força de Vendas Externa)', boxed: 34 },
  { icon: 'icon-7.svg', w: 501, text: 'Planejamento de comissão, bonificação e premiação' },
  { icon: 'icon-8.svg', w: 501, text: 'Estratégia de relacionamento com imobiliárias' },
];

/** Estratégia · Atuação (Figma "Tela 4"): Enzo + as etapas da estratégia. */
export default function Atuacao() {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from('[data-anim="bg"]',    { opacity: 0, duration: 1.4, ease: 'power2.out' }, 0)
        .from('[data-anim="card"]',  { opacity: 0, y: 30, duration: 0.9 }, 0.15)
        .from('[data-anim="name"]',  { opacity: 0, x: -20, duration: 0.6, stagger: 0.1 }, 0.6)
        .from('[data-anim="title"]', { opacity: 0, y: 20, duration: 0.7 }, 0.4)
        .from('[data-anim="etapa"]', { opacity: 0, x: 30, duration: 0.5, stagger: 0.07 }, 0.6)
        .from('[data-anim="tag"]',   { xPercent: 100, duration: 0.6 }, 1.0)
        .from('[data-anim="chips"]', { opacity: 0, duration: 0.6 }, 0.8);
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef}>
      <FormulaBackground />

      {/* atalhos para as telas da Estratégia, no topo */}
      <GroupChips group="Estratégia" />

      {/* card com a foto */}
      <div className={styles.card} data-anim="card">
        <img src="/img/estrategia/enzo.jpg" alt="Enzo Mirizzi" className={styles.photo} draggable={false} />
        <div className={styles.photoShade} />

        <div className={styles.cardBody}>
          <div className={styles.nameBlock}>
            <p className={styles.name} data-anim="name">Enzo Mirizzi</p>
            <p className={styles.role} data-anim="name">Diretor Operacional</p>
          </div>
          <span className={styles.bar} />
          <div className={styles.bio}>
            <p>
              Especialista em marketing imobiliário, Diretor Operacional da Balzani e Atta, unindo estratégia,
              marketing e tecnologia para potencializar lançamentos imobiliários.
            </p>
            <p>
              Principal responsável pelo onboarding e roadmap das etapas de entregas da parceira entre
              Balzani e cliente.
            </p>
          </div>
        </div>
      </div>

      {/* etapas da estratégia */}
      <div className={styles.etapas}>
        <h2 className={styles.title} data-anim="title">Áreas de atuação</h2>
        <ul className={styles.list}>
          {ETAPAS.map(e => (
            <li key={e.icon} className={styles.etapa} data-anim="etapa">
              {e.boxed
                ? <span className={styles.iconBox}>
                    <img src={`/img/estrategia/${e.icon}`} alt="" width={e.boxed} height={e.boxed} />
                  </span>
                : <img src={`/img/estrategia/${e.icon}`} alt="" width="64" height="64" className={styles.icon} />}
              <p className={styles.etapaText} style={{ width: e.w }}>{e.text}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.tag} data-anim="tag">
        <p>Tópicos a serem definidos em reunião</p>
      </div>
    </div>
  );
}
