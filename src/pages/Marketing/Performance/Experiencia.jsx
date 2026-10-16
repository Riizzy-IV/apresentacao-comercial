import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import styles from './Experiencia.module.css';

// `width` = largura do texto de apoio (no Figma "atuando com performance…" quebra em 2 linhas)
const NUMEROS = [
  { valor: '+5 anos',         texto: 'atuando com performance no mercado imobiliário', width: 321 },
  { valor: 'Quase 200',       texto: 'incorporadoras atendidas' },
  { valor: '+ R$ 30 milhões', texto: 'gerenciados em mídia para nossos clientes' },
  { valor: <>Meta Ads +<br />Google Ads</>, texto: 'aplicados a lançamentos imobiliários' },
];

/** Marketing · Performance, passo 2 (Figma "Tela 24"): frase + números da experiência em mídia. */
export default function Experiencia() {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from('[data-anim="title"]',  { opacity: 0, y: 24, duration: 0.8 }, 0.15)
        .from('[data-anim="linha"]',  { scaleY: 0, duration: 0.8, ease: 'power3.inOut' }, 0.35)
        .from('[data-anim="numero"]', { opacity: 0, x: 20, duration: 0.6, stagger: 0.12 }, 0.5)
        .from('[data-anim="rodape"]', { opacity: 0, y: 20, duration: 0.7 }, 1);
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef}>
      <div className={styles.conteudo}>
        <h1 className={styles.title} data-anim="title">
          Performance <span>não se aprende</span> apenas na teoria.
        </h1>

        <div className={styles.linha} data-anim="linha">
          <img src="/img/marketing/performance/linha-vertical.svg" alt="" width="486" height="2" />
        </div>

        <div className={styles.numeros}>
          {NUMEROS.map(n => (
            <div key={n.texto} className={styles.numero} data-anim="numero">
              <p className={styles.valor}>{n.valor}</p>
              <p className={styles.texto} style={{ width: n.width }}>{n.texto}</p>
            </div>
          ))}
        </div>
      </div>

      <img src="/img/estrategia/linha-topo.svg" alt="" width="1569" height="2" className={styles.linhaRodape} />
      <div className={styles.rodape} data-anim="rodape">
        <p>Milhões investidos nos deram algo mais valioso do que mídia: dados, aprendizado e experiência.</p>
      </div>
    </div>
  );
}
