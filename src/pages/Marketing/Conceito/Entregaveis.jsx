import { Fragment, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import styles from './Entregaveis.module.css';

const COLUNAS = [{
  left: 464,
  linha: { src: '/img/marketing/linha-lista.svg', width: 451 },
  itens: [
    'Branding', 'Logotipo', 'Manual de identidade', 'Key Visual',
    'Paleta de cores', 'Tipografia', 'Elementos gráficos', 'Regras de uso e aplicações',
  ],
}];

/**
 * Marketing · Conceito, passo 3 (Figma "Tela 49"): lista dos entregáveis + mockup da papelaria.
 * Também usado no Enxoval: `sub` = subtítulo, `colunas` = listas lado a lado (posição, divisor
 * e itens), `mockup` = imagem à direita (opcional).
 */
export default function Entregaveis({ sub = 'Conceito', colunas = COLUNAS, mockup = '/img/marketing/entregaveis-mockup.png' }) {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from('[data-anim="mockup"]', { opacity: 0, x: 60, duration: 1.1 }, 0.15)
        .from('[data-anim="title"]',  { opacity: 0, y: 20, duration: 0.7, stagger: 0.1 }, 0.2)
        .from('[data-anim="item"]',   { opacity: 0, x: -20, duration: 0.5, stagger: 0.07 }, 0.5);
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef}>
      <img src="/img/estrategia/linha-topo.svg" alt="" width="1569" height="2" className={styles.linhaTopo} />

      {mockup && <img src={mockup} alt="" className={styles.mockup} data-anim="mockup" draggable={false} />}

      <div className={styles.titleBlock}>
        <p className={styles.nome} data-anim="title">Entregáveis</p>
        <p className={styles.sub} data-anim="title">{sub}</p>
      </div>

      {colunas.map(({ left, linha, itens }) => (
        <ul key={left} className={styles.lista} style={{ left, width: linha.width }}>
          {itens.map((item, i) => (
            <Fragment key={i}>
              {i > 0 && <li aria-hidden data-anim="item"><img src={linha.src} alt="" width={linha.width} height="1" /></li>}
              <li className={styles.item} data-anim="item">
                <img src="/img/marketing/marcador-lista.svg" alt="" width="14.0007" height="7.64251" className={styles.marcador} />
                <span>{item}</span>
              </li>
            </Fragment>
          ))}
        </ul>
      ))}
    </div>
  );
}
