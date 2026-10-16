import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import FormulaBackground from '../../../components/FormulaBackground/FormulaBackground';
import Experiencia from './Experiencia';
import Criativo from './Criativo';
import CriativoBonito from './CriativoBonito';
import VideoConceito from './VideoConceito';
import Aida from './Aida';
import Tecnologia from './Tecnologia';
import Criativos from './Criativos';
import SemDados from './SemDados';
import Dashboards from './Dashboards';
import Funil from './Funil';
import EntregaveisPerformance from './EntregaveisPerformance';
import styles from './Performance.module.css';

const ITENS = [
  'Estratégia de mídia',
  'Criativos orientados à conversão',
  'Análise de dados trabalhando juntos para transformar investimento em demanda para o empreendimento.',
];

/** Passo 1 (Figma "Tela 23"): título, chamada e os três pilares da performance. */
function Intro() {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from('[data-anim="title"]', { opacity: 0, y: 24, duration: 0.8 }, 0.2)
        .from('[data-anim="faixa"]', { scaleX: 0, duration: 0.8, ease: 'power3.inOut' }, 0.5)
        .from('[data-anim="frase"]', { opacity: 0, x: -20, duration: 0.7 }, 0.6)
        .from('[data-anim="item"]',  { opacity: 0, x: 20, duration: 0.6, stagger: 0.12 }, 0.8);
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef}>
      <div className={styles.bloco}>
        <h1 className={styles.title} data-anim="title">Performance<br />digital</h1>
        <div className={styles.frase} data-anim="frase">
          <p>Não basta aparecer para o público certo.<br />É preciso chamar a atenção dele.</p>
        </div>
      </div>

      <div className={styles.faixa} data-anim="faixa" />

      <ul className={styles.lista}>
        {ITENS.map(item => (
          <li key={item} className={styles.item} data-anim="item">
            <img src="/img/marketing/performance/check.svg" alt="" width="33" height="34" className={styles.check} />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Marketing · Performance em passos (sem fade entre eles, cada passo anima a própria entrada):
 *  1. título e pilares;
 *  2. (/marketing/performance/experiencia) os números da experiência em mídia;
 *  3. (/marketing/performance/criativo) o criativo como diferencial, por perfil de público;
 *  4. (/marketing/performance/criativo-bonito) "criativo bonito não é necessariamente criativo que performa";
 *  5. (/marketing/performance/video-conceito) vídeo conceito × criativos de performance;
 *  6. (/marketing/performance/aida) o método AIDA;
 *  7. (/marketing/performance/tecnologia) criatividade potencializada por tecnologia (IA);
 *  8. (/marketing/performance/criativos) carrossel de criativos em vídeo;
 *  9. (/marketing/performance/dados) "a geração de leads não é nada sem dados";
 * 10. (/marketing/performance/dashboards) dashboard de resultados de cada projeto;
 * 11. (/marketing/performance/funil) funil do incorporador, de leads a vendas;
 * 12. (/marketing/performance/entregaveis) lista dos entregáveis.
 */
const PASSOS = {
  experiencia: Experiencia,
  criativo: Criativo,
  'criativo-bonito': CriativoBonito,
  'video-conceito': VideoConceito,
  aida: Aida,
  tecnologia: Tecnologia,
  criativos: Criativos,
  dados: SemDados,
  dashboards: Dashboards,
  funil: Funil,
  entregaveis: EntregaveisPerformance,
};

export default function Performance() {
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
