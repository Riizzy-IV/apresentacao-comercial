import { Fragment, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import FormulaBackground from '../../../components/FormulaBackground/FormulaBackground';
import Projetos from './Projetos';
import Entregaveis from './Entregaveis';
import styles from './Conceito.module.css';

const PILARES = [
  { nome: 'Propósito e Valores', texto: 'A razão de ser do produto, sua essência e seus princípios fundamentais.' },
  { nome: 'Posicionamento', texto: 'O lugar único que a marca ocupa na mente do público e como ela se diferencia da concorrência.' },
  { nome: 'Identidade Visual', texto: 'Elementos gráficos como logotipo, paleta de cores, tipografia e Key Visual (peça gráfica central e conceitual que resume a essência de uma campanha de marketing).' },
  { nome: 'Experiência do Cliente', texto: <>O comportamento, o entendimento,<br />a cultura e a entrega real do produto ou serviço.</> },
];

/**
 * Texto + quatro pilares, foto à direita. Usado no passo 1 do Conceito (Figma "Tela 42")
 * e na abertura do Enxoval (Figma "Tela 51").
 */
export function PilaresIntro({ titulo, foto }) {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from('[data-anim="photo"]',  { opacity: 0, x: 40, duration: 1 }, 0.2)
        .from('[data-anim="title"]',  { opacity: 0, y: 20, duration: 0.7 }, 0.3)
        .from('[data-anim="intro"]',  { opacity: 0, y: 16, duration: 0.7 }, 0.45)
        .from('[data-anim="faixa"]',  { scaleX: 0, duration: 0.8, ease: 'power3.inOut' }, 0.6)
        .from('[data-anim="pilar"]',  { opacity: 0, x: -20, duration: 0.6, stagger: 0.12 }, 0.8);
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef}>
      <img src="/img/estrategia/linha-topo.svg" alt="" width="1569" height="2" className={styles.linhaTopo} />

      <h1 className={styles.title} data-anim="title">{titulo}</h1>

      <div className={styles.content}>
        <p className={styles.intro} data-anim="intro">
          É a construção estratégica de uma marca em cada detalhe — da sua essência à forma como se
          posiciona e se comunica. Um processo que fortalece sua gestão e cria uma percepção positiva e
          memorável junto ao público, sustentado por quatro pilares fundamentais.
        </p>

        <div className={styles.faixa} data-anim="faixa" />

        <div className={styles.pilares}>
          {PILARES.map((p, i) => (
            <Fragment key={p.nome}>
              {i > 0 && <img src="/img/marketing/divisor.svg" alt="" width="542" height="1" data-anim="pilar" />}
              <p className={styles.pilar} data-anim="pilar">
                <strong>{p.nome}:</strong> {p.texto}
              </p>
            </Fragment>
          ))}
        </div>
      </div>

      <div className={styles.photo} data-anim="photo">
        <img src={foto} alt="" draggable={false} />
      </div>
    </div>
  );
}

const Intro = () => <PilaresIntro titulo="Conceito" foto="/img/marketing/conceito.jpg" />;

/**
 * Marketing · Conceito em passos (sem fade entre eles, cada passo anima a própria entrada):
 *  1. texto com os quatro pilares;
 *  2. (/marketing/conceito/projetos) os projetos, com o brandbook de cada um;
 *  3. (/marketing/conceito/entregaveis) a lista de entregáveis.
 */
const PASSOS = { projetos: Projetos, entregaveis: Entregaveis };

export default function Conceito() {
  const { pathname } = useLocation();
  const rootRef = useRef(null);
  const Passo = PASSOS[pathname.split('/')[3]] ?? Intro;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-anim="bg"]', { opacity: 0, duration: 1.4, ease: 'power2.out' });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef}>
      <FormulaBackground />
      <Passo key={pathname} />
    </div>
  );
}
