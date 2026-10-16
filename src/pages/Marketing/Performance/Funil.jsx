import { Fragment, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import styles from './Funil.module.css';

const SVG = '/img/marketing/performance/funil';

// etapas do funil; `conector` = largura da linha pontilhada com seta abaixo da etapa
const ETAPAS = [
  { nome: 'Leads',        valor: '50%', conector: 774 },
  { nome: 'Atendimento',  valor: '30%', conector: 656 },
  { nome: 'Agendamentos', valor: '70%', conector: 554 },
  { nome: 'Realizadas',   valor: '30%', conector: 464 },
  { nome: 'Pastas',       valor: '30%', conector: 334 },
];

/** Marketing · Performance, passo 11 (Figma "Tela 29"): funil do incorporador, de leads a vendas. */
export default function Funil() {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from('[data-anim="title"]', { opacity: 0, x: -24, duration: 0.8 }, 0.15)
        .from('[data-anim="fundo"]', { opacity: 0, duration: 1 }, 0.1)
        .from('[data-anim="cone"]',  { opacity: 0, scaleY: 0, transformOrigin: 'top center', duration: 0.9 }, 0.25)
        .from('[data-anim="etapa"]', { opacity: 0, y: -12, duration: 0.45, stagger: 0.09 }, 0.55)
        .from('[data-anim="vendas"]', { opacity: 0, scale: 0.85, duration: 0.6, ease: 'back.out(1.6)' }, 1.4);
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef}>
      <h1 className={styles.title} data-anim="title">
        <span>Vamos</span><span>analisar</span><span>juntos</span>
      </h1>
      <p className={styles.incorporador} data-anim="title">Incorporador</p>

      {/* camadas do funil (posições do Figma) */}
      <img src={`${SVG}/triangulo-externo.svg`} alt="" width="744.305" height="738.559" className={styles.trianguloExterno} data-anim="cone" />
      <img src={`${SVG}/grade.svg`} alt="" width="831.786" height="845.801" className={styles.grade} data-anim="fundo" />
      <img src={`${SVG}/triangulo-interno.svg`} alt="" width="617.482" height="619.341" className={styles.trianguloInterno} data-anim="cone" />

      <div className={styles.coluna}>
        <img src={`${SVG}/linha-topo.svg`} alt="" width="864" height="2" className={styles.linhaTopo} data-anim="fundo" />

        {ETAPAS.map(e => (
          <Fragment key={e.nome}>
            <div className={styles.etapa} data-anim="etapa">
              <p className={styles.nome}>{e.nome}</p>
              <p className={styles.valor}>{e.valor}</p>
            </div>
            <img src={`${SVG}/conector-${e.conector}.svg`} alt="" width={e.conector} height="35.0049"
              className={styles.conector} data-anim="etapa" />
          </Fragment>
        ))}

        <p className={styles.vendas} data-anim="vendas">Vendas</p>
      </div>
    </div>
  );
}
