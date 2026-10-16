import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import FormulaBackground from '../../../components/FormulaBackground/FormulaBackground';
import Entregaveis from '../../Marketing/Conceito/Entregaveis';

const COLUNAS = [{
  left: 464,
  linha: { src: '/img/comercial/linha-lista-1003.svg', width: 1003 },
  itens: [
    'Desenvolvimento e estruturação da área comercial',
    'Cliente oculto',
    'Implementação de CRM',
    'Treinamento e acompanhamento semanal com especialista comercial',
    'Diagnóstico da operação comercial atual',
    'Definição de metas e indicadores de performance',
    'Estruturação do processo de atendimento do lead',
  ],
}];

/** Comercial · Roadmap (Figma "Tela 35"): entregáveis da assessoria comercial. */
export default function Roadmap() {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-anim="bg"]', { opacity: 0, duration: 1.4, ease: 'power2.out' });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef}>
      <FormulaBackground />
      <Entregaveis sub="Assessoria comercial" colunas={COLUNAS} mockup={null} />
    </div>
  );
}
