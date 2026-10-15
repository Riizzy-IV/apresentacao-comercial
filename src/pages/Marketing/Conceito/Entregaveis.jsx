import { Fragment, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import styles from './Entregaveis.module.css';

const ITENS = [
  'Branding', 'Logotipo', 'Manual de identidade', 'Key Visual',
  'Paleta de cores', 'Tipografia', 'Elementos gráficos', 'Regras de uso e aplicações',
];

/** Marketing · Conceito, passo 3 (Figma "Tela 49"): lista dos entregáveis + mockup da papelaria. */
export default function Entregaveis() {
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

      <img src="/img/marketing/entregaveis-mockup.png" alt="" className={styles.mockup} data-anim="mockup" draggable={false} />

      <div className={styles.titleBlock}>
        <p className={styles.nome} data-anim="title">Entregáveis</p>
        <p className={styles.sub} data-anim="title">Conceito</p>
      </div>

      <ul className={styles.lista}>
        {ITENS.map((item, i) => (
          <Fragment key={item}>
            {i > 0 && <li aria-hidden data-anim="item"><img src="/img/marketing/linha-lista.svg" alt="" width="451" height="1" /></li>}
            <li className={styles.item} data-anim="item">
              <img src="/img/marketing/marcador-lista.svg" alt="" width="14.0007" height="7.64251" className={styles.marcador} />
              {item}
            </li>
          </Fragment>
        ))}
      </ul>
    </div>
  );
}
