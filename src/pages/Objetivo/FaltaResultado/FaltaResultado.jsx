import StageImage from '../../../components/StageImage/StageImage';
import TwoStepSlide from '../../../components/TwoStepSlide/TwoStepSlide';
import styles from './FaltaResultado.module.css';

const X_ICON = { glow: '/img/objetivo/x-circle.svg', sharp: '/img/objetivo/x-circle-sharp.svg', size: 82.567, bleed: 6.2 };

const CAUSAS = [
  { title: <>Estratégia construída<br /><em>tarde demais</em></>, titleW: 519, descW: 498,
    text: 'O lançamento começa a ser planejado quando a abertura das vendas já está próxima.' },
  { title: <>Marketing e Comercial<br /><em>trabalhando separados</em></>, titleW: 503, descW: 519,
    text: 'Gera-se demanda sem uma operação preparada para transformar leads em visitas e vendas.' },
  { title: <>Dependência excessiva<br /><em>da força de vendas</em></>, titleW: 529, descW: 529,
    text: 'O incorporador entrega o resultado nas mãos de poucos corretores ou imobiliárias, sem estratégia de engajamento e distribuição.' },
  { title: <>Decisões baseadas<br /><em>em achismo</em></>, titleW: 352, descW: 528,
    text: 'Verba de mídia, estrutura comercial, incentivos e ações são definidos sem olhar o funil e as metas do lançamento' },
].map(c => ({ ...c, icon: X_ICON }));

// Passo 2 (Figma "Tela 2"): o bloco do título encolhe para 87,82% e vai de (578, 310) para (395, 381)
const ORIGIN = [578, 310];
const TO = { x: 395 - 578, y: 381 - 310, scale: 56 / 63.77 };

export default function FaltaResultado() {
  return (
    <TwoStepSlide
      stepSuffix="/causas"
      revealOneByOne
      origin={ORIGIN}
      to={TO}
      background={
        <div data-anim="bg">
          <StageImage src="/img/objetivo/falta-resultado.jpg" x={-5} y={-1} width={1925} height={1082}
            style={{ opacity: 0.2 }} />
        </div>
      }
      title={<>
        <h2 className={styles.title} data-anim="title-in">
          Por que alguns incorporadores não conseguem ter sucesso em seus
        </h2>
        <p className={styles.script} data-anim="title-in">lançamentos?</p>
        <div className={styles.line} data-anim="line" />
      </>}
      panelHeight={977}
      list={{ left: 1251, top: 86 }}
      divider={{ src: '/img/objetivo/divider.svg', width: 623.167 }}
      items={CAUSAS}
    />
  );
}
