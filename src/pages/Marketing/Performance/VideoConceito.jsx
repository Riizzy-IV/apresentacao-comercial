import { Fragment, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import styles from './VideoConceito.module.css';

const BLOCOS = [
  {
    titulo: 'Vídeo conceito',
    texto: 'Seu objetivo é despertar o desejo, criar conexão com o público e fortalecer a percepção de valor do produto imobiliário.',
  },
  {
    titulo: 'Criativos',
    texto: 'Os criativos seguem estruturas e abordagens validadas pela Balzani, combinando argumentos de venda, diferenciais do produto, ofertas e chamadas para ação com foco em performance e geração de resultados reais para nossos clientes.',
  },
];

/** Marketing · Performance, passo 5 (Figma "Tela 28"): vídeo conceito × criativos de performance. */
export default function VideoConceito() {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from('[data-anim="title"]', { opacity: 0, y: 24, duration: 0.8 }, 0.15)
        .from('[data-anim="bloco"]', { opacity: 0, x: 20, duration: 0.7, stagger: 0.15 }, 0.4);
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className={styles.conteudo}>
      <h1 className={styles.title} data-anim="title">Vídeo conceito é diferente de performance</h1>

      <div className={styles.blocos}>
        {BLOCOS.map((b, i) => (
          <Fragment key={b.titulo}>
            {i > 0 && <img src="/img/marketing/performance/linha-625.svg" alt="" width="625" height="2" data-anim="bloco" />}
            <div className={styles.bloco} data-anim="bloco">
              <p className={styles.blocoTitulo}>{b.titulo}</p>
              <p className={styles.blocoTexto}>{b.texto}</p>
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
