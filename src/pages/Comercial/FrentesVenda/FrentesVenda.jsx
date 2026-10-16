import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import FormulaBackground from '../../../components/FormulaBackground/FormulaBackground';
import styles from './FrentesVenda.module.css';

const IMG = '/img/comercial';

// as duas frentes: etapas em sequência, cada uma precedida de uma seta (a 1ª com a linha mais longa)
const FRENTES = [
  { tag: 'Pré-venda', top: 338, tagTop: 323, etapas: ['Lead', 'Atendimento', 'Qualificação', 'Follow-up', 'Agendamento'] },
  { tag: 'Venda',     top: 522, tagTop: 509, etapas: ['Visita', 'Apresentação', 'Negociação', 'Proposta', 'Venda'] },
];

/** Comercial · Frentes da venda (Figma "Tela 41"): pré-venda (SDR) e venda (corretor). */
export default function FrentesVenda() {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from('[data-anim="bg"]',     { opacity: 0, duration: 1.4, ease: 'power2.out' }, 0)
        .from('[data-anim="title"]',  { opacity: 0, y: 20, duration: 0.7, stagger: 0.1 }, 0.15)
        .from('[data-anim="faixa"]',  { opacity: 0, x: 60, duration: 0.8, stagger: 0.15 }, 0.35)
        .from('[data-anim="etapa"]',  { opacity: 0, x: -12, duration: 0.4, stagger: 0.05 }, 0.6)
        .from('[data-anim="papel"]',  { opacity: 0, y: 20, duration: 0.7, stagger: 0.12 }, 1.1);
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef}>
      <FormulaBackground />

      <div className={styles.cabecalho}>
        <p className={styles.chamada} data-anim="title">As duas frentes da venda</p>
        {/* quebra fixa: a fonte substituta é mais larga e quebraria em outro ponto */}
        <h1 className={styles.title} data-anim="title">
          <span>A venda começa muito</span>
          <span>antes da negociação.</span>
        </h1>
      </div>

      {FRENTES.map(f => (
        <div key={f.tag} data-anim="faixa">
          <div className={styles.faixa} style={{ top: f.top }}>
            {f.etapas.map((e, i) => (
              <div key={e} className={styles.etapa} data-anim="etapa">
                {i === 0
                  ? <img src={`${IMG}/etapa-inicio.svg`} alt="" width="119.033" height="54.2333" className={styles.setaInicio} />
                  : <img src={`${IMG}/etapa.svg`} alt="" width="79.8673" height="54.2333" className={styles.seta} />}
                <span>{e}</span>
              </div>
            ))}
          </div>
          <span className={styles.tag} style={{ top: f.tagTop }}>{f.tag}</span>
        </div>
      ))}

      <p className={styles.visao} data-anim="papel">
        Na nossa visão, são funções diferentes e precisam de profissionais diferentes.
      </p>

      <div data-anim="papel">
        <div className={styles.atuacao}><span>Atuação da Balzani</span></div>
        <p className={styles.papel} style={{ left: 439 }}>Pré-venda = SDR</p>
        <p className={styles.papelTexto} style={{ left: 441 }}>
          Responsável por trabalhar o lead até gerar uma oportunidade comercial real.
        </p>
        <p className={styles.papelNota}>
          Utilizamos a inteligência artificial como ferramenta de apoio ao SDR, assim garantindo maior taxa de
          assertividade do profissional.
        </p>
      </div>

      <div data-anim="papel">
        <div className={styles.barra}>
          <img src={`${IMG}/barra.png`} alt="" width="99" height="11" />
        </div>
        <p className={styles.papel} style={{ left: 1078 }}>Venda = Corretor</p>
        <p className={styles.papelTexto} style={{ left: 1080 }}>
          Responsável por receber o cliente, apresentar o produto, negociar e fechar.
        </p>
      </div>
    </div>
  );
}
