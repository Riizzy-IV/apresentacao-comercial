import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import styles from './Aida.module.css';

const ICONES = '/img/marketing/performance';

// `left`/`width` = coluna no Figma; `icone` = [arquivo, largura, altura, deslocamento x para
// reproduzir a posição do ícone dentro da moldura de 24px do Figma]; `textoWidth` = largura do texto
const ETAPAS = [
  { letra: 'A', nome: 'Atenção',   left: 411,  width: 270, icone: ['icone-atencao',   21.9995, 21.9995, 0],
    titulo: 'Pare o scroll.',
    texto: 'Os primeiros segundos precisam romper o padrão e fazer o público perceber que aquele conteúdo é para ele.' },
  { letra: 'I', nome: 'Interesse', left: 799,  width: 278, icone: ['icone-interesse', 19.9975, 18.5015, 0],
    titulo: 'Faça ele continuar assistindo.',
    texto: 'Apresente rapidamente uma oportunidade, problema ou desejo relevante.' },
  { letra: 'D', nome: 'Desejo',    left: 1188, width: 284, icone: ['icone-desejo',    20.1,    19.9999, 0],
    titulo: 'Mostre por que aquele produto importa.',
    texto: 'Transforme características do empreendimento em benefícios para aquele público.' },
  { letra: 'A', nome: 'Ação',      left: 1585, width: 276, icone: ['icone-acao',      16.8616, 17.9587, 2.86],
    titulo: 'Conduza para o próximo passo.',
    texto: 'Cadastro, WhatsApp, visita, simulação ou contato comercial.', textoWidth: 196 },
];

/** Marketing · Performance, passo 6 (Figma "Tela 46"): o método AIDA aplicado aos criativos. */
export default function Aida() {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from('[data-anim="linha"]',    { opacity: 0, duration: 0.8 }, 0)
        .from('[data-anim="letra"]',    { opacity: 0, y: 40, duration: 0.8, stagger: 0.12 }, 0.1)
        .from('[data-anim="rotulo"]',   { opacity: 0, y: 12, duration: 0.5, stagger: 0.12 }, 0.4)
        .from('[data-anim="conector"]', { scaleY: 0, duration: 0.6, stagger: 0.12 }, 0.6)
        .from('[data-anim="texto"]',    { opacity: 0, y: 16, duration: 0.6, stagger: 0.12 }, 0.9);
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef}>
      {/* grade pontilhada: três verticais entre as colunas e uma horizontal embaixo */}
      {[743, 1135, 1527].map(left => (
        <div key={left} className={styles.linhaVertical} style={{ left }} data-anim="linha">
          <img src={`${ICONES}/linha-812.svg`} alt="" width="812" height="2" />
        </div>
      ))}
      <img src={`${ICONES}/linha-1489.svg`} alt="" width="1489" height="2" className={styles.linhaHorizontal} data-anim="linha" />

      {ETAPAS.map(e => {
        const [arquivo, w, h, dx] = e.icone;
        return (
          <div key={e.nome} className={styles.coluna} style={{ left: e.left, width: e.width }}>
            <div className={styles.cabecalho}>
              <p className={styles.letra} data-anim="letra">{e.letra}</p>
              <div className={styles.rotulo} data-anim="rotulo">
                <span className={styles.icone}>
                  <img src={`${ICONES}/${arquivo}.svg`} alt="" width={w} height={h} style={{ marginLeft: dx }} />
                </span>
                {e.nome}
              </div>
            </div>

            <img src={`${ICONES}/conector.svg`} alt="" width="9" height="159" className={styles.conector} data-anim="conector" />

            <div className={styles.textos} data-anim="texto">
              <p className={styles.titulo}>{e.titulo}</p>
              <p className={styles.texto} style={{ width: e.textoWidth }}>{e.texto}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
