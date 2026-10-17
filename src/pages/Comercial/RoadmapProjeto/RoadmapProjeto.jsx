import { Fragment, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import FormulaBackground from '../../../components/FormulaBackground/FormulaBackground';
import styles from './RoadmapProjeto.module.css';

const IMG = '/img/comercial/roadmap';

// marcos da linha do tempo (x = centro do marco, w = largura da etiqueta). `final` = marco vazado (o lançamento)
// `trilho` = trechos [y inicial, y final] da linha vertical: ela não passa por trás dos cards
// (o vidro desfocado a esconde; desenhada antes de o card entrar, ela aparecia e sumia)
const CARD_PERFORMANCE = [[185, 212], [831, 867], [971, 998]];
const MARCOS = [
  { x: 439,  w: 138, label: 'Assinatura',     trilho: [[185, 998]] },
  { x: 1224, w: 175, label: 'Pré-lançamento', trilho: CARD_PERFORMANCE },
  { x: 1492, w: 175, label: 'Lançamento', final: true, trilho: CARD_PERFORMANCE },
];

// cards dos entregáveis por fase. Posições em px da tela (Figma "Tela 55").
const CARDS = [
  {
    caixa: { left: 438, top: 212, width: 335, height: 396 },
    titulo: 'Conceito', tituloLeft: 469,
    linha: { src: 'linha-263', width: 263, left: 474 },
    listas: [{
      left: 474, top: 326, divisor: { src: 'divisor-263', width: 263 },
      itens: ['Branding', 'Logotipo', 'Manual de identidade', 'Key Visual', 'Paleta de cores', 'Tipografia',
        'Elementos gráficos', 'Regras de uso e aplicações'],
    }],
  },
  {
    caixa: { left: 816, top: 212, width: 366, height: 514 },
    titulo: 'Enxoval', tituloLeft: 847,
    linha: { src: 'linha-263', width: 263, left: 852 },
    listas: [{
      left: 847, top: 326, divisor: { src: 'divisor-enxoval', width: 306.643 },
      itens: ['1 landing page', '2 layouts para outdoor', '1 layout de folder', '1 vídeo conceito de até 120 segundos',
        '1 layout de book para impressão', '1 layout de book digital', '1 layout de lona para fachada ou tapume',
        '1 layout para windbanner', '1 layout para cavalete',
        <>Criação de 30 artes para instagram<br />(20 estáticas / 10 vídeos)</>, 'Capas de destaque e bio'],
    }],
  },
  {
    caixa: { left: 1224, top: 212, width: 567, height: 619 },
    titulo: 'Performance + Ass. Comercial', tituloLeft: 1255,
    linha: { src: 'linha-510', width: 510, left: 1255 },
    listas: [
      {
        subtitulo: 'Performance', subtituloTop: 308,
        left: 1255, top: 342, divisor: { src: 'divisor-452', width: 452 },
        itens: ['Desenvolvimento de criativos (vídeo e estático)', 'Criação e gestão de campanhas do Meta e Google Ads',
          'Estratégias focadas em geração de leads e autoridade digital', 'Relatórios com insights e análises',
          'Reuniões mensais de acompanhamento de resultados',
          'Acompanhamento diário das métricas relacionadas aos anúncios e campanhas'],
      },
      {
        subtitulo: 'Assessoria Comercial', subtituloTop: 560,
        left: 1255, top: 589, divisor: { src: 'divisor-514', width: 514 },
        itens: ['Desenvolvimento e estruturação da área comercial', 'Cliente oculto', 'Implementação de CRM',
          'Treinamento e acompanhamento semanal com especialista comercial', 'Diagnóstico da operação comercial atual',
          'Definição de metas e indicadores de performance', 'Estruturação do processo de atendimento do lead'],
      },
    ],
  },
];

const Marcador = () => (
  <img src="/img/marketing/marcador-lista.svg" alt="" width="14.0007" height="7.64251" className={styles.marcador} />
);

/** Comercial · Roadmap (Figma "Tela 55"): linha do tempo da assinatura ao lançamento, com os entregáveis de cada fase. */
export default function RoadmapProjeto() {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from('[data-anim="bg"]',    { opacity: 0, duration: 1.4, ease: 'power2.out' }, 0)
        .from('[data-anim="linha"]', { scaleX: 0, duration: 1, ease: 'power3.inOut' }, 0.15)
        .from('[data-anim="marco"]', { opacity: 0, y: -16, duration: 0.6, stagger: 0.15 }, 0.5)
        .from('[data-anim="trilho"]', { scaleY: 0, duration: 1, ease: 'power3.inOut', stagger: 0.15 }, 0.6)
        .from('[data-anim="card"]',  { opacity: 0, y: 30, duration: 0.8, stagger: 0.15 }, 0.8)
        .from('[data-anim="seta"]',  { opacity: 0, x: -12, duration: 0.6 }, 1.2);
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef}>
      <FormulaBackground />

      {/* linha do tempo: pontilhado horizontal, marcos com etiqueta e trilhos verticais descendo até a barra inferior.
          As linhas de 1px são bordas (não imagens): com a tela reduzida, imagem de 1px some em alguns pontos */}
      <div className={styles.linhaTempo} data-anim="linha" />
      {MARCOS.map(m => (
        <Fragment key={m.label}>
          {m.trilho.map(([y0, y1]) => (
            <div key={y0} className={styles.trilho} style={{ left: m.x, top: y0, height: y1 - y0 }} data-anim="trilho" />
          ))}
          <div className={styles.marco} style={{ left: m.x }} data-anim="marco">
            <span className={styles.etiqueta} style={{ width: m.w }}>{m.label}</span>
            <span className={styles.haste} />
            {m.final
              ? <img src={`${IMG}/marco-lancamento.svg`} alt="" width="29" height="29" className={styles.anel} />
              : (
                <>
                  <img src={`${IMG}/ponto-anel.svg`} alt="" width="29" height="29" className={styles.anel} />
                  <img src={`${IMG}/ponto.svg`} alt="" width="13" height="13" className={styles.ponto} />
                </>
              )}
          </div>
        </Fragment>
      ))}
      <img src="/img/comercial/assessoria/seta-circulo.svg" alt="" width="54.2333" height="54.2333"
        className={styles.seta} data-anim="seta" />

      {CARDS.map(c => (
        <div key={c.titulo} className={styles.grupo} data-anim="card">
          <div className={styles.card} style={c.caixa} />
          <p className={styles.titulo} style={{ left: c.tituloLeft }}>{c.titulo}</p>
          <img src={`${IMG}/${c.linha.src}.svg`} alt="" width={c.linha.width} height="1" className={styles.linhaTitulo}
            style={{ left: c.linha.left }} />
          {c.listas.map(l => (
            <Fragment key={l.top}>
              {l.subtitulo && <p className={styles.subtitulo} style={{ left: l.left, top: l.subtituloTop }}>{l.subtitulo}</p>}
              <ul className={styles.lista} style={{ left: l.left, top: l.top, width: l.divisor.width }}>
                {l.itens.map((item, i) => (
                  <Fragment key={i}>
                    {i > 0 && (
                      <li aria-hidden>
                        <img src={`${IMG}/${l.divisor.src}.svg`} alt="" width={l.divisor.width} height="1" />
                      </li>
                    )}
                    <li className={styles.item}><Marcador /><span>{item}</span></li>
                  </Fragment>
                ))}
              </ul>
            </Fragment>
          ))}
        </div>
      ))}

      {/* estratégia: acompanha todas as fases */}
      <div className={styles.estrategia} data-anim="card">
        <p>Estratégia</p>
        <div className={styles.item}>
          <Marcador />
          <span>Reuniões de alinhamento via meeting com o diretor de operações</span>
        </div>
      </div>
    </div>
  );
}
