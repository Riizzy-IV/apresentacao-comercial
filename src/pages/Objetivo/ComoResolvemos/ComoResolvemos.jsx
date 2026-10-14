import StageImage from '../../../components/StageImage/StageImage';
import TwoStepSlide from '../../../components/TwoStepSlide/TwoStepSlide';
import styles from './ComoResolvemos.module.css';

const CHECK_ICON = { glow: '/img/objetivo/check-circle.svg', sharp: '/img/objetivo/check-circle-sharp.svg', size: 87.6, bleed: 8.8 };

const DIFERENCIAIS = [
  { title: <>Não somos <em>apenas uma agência</em></>, titleLH: 1.3, descW: 576,
    text: 'Somos uma lançadora especializada no mercado imobiliário, vivendo lançamentos todos os dias há mais de 5 anos.' },
  { title: <>De incorporador para <em>incorporador</em></>, titleW: 494, titleLH: 1.3, descW: 576,
    text: 'Não falamos apenas de teoria. Também incorporamos e conhecemos, do outro lado da mesa, os riscos e as decisões de um lançamento.' },
  { title: <>Estratégia antes da <em>execução</em></>, titleW: 579, descW: 579,
    text: 'Ajudamos o incorporador a estruturar o lançamento antes de colocar Marketing e Comercial em operação.' },
  { title: 'Marketing e Comercial conectados', titleW: 575, descW: 575,
    text: 'Não paramos na geração de leads. Ajudamos a estruturar House, SDR, corretores, imobiliárias, Meeting, incentivos e o processo comercial.' },
].map(d => ({ ...d, icon: CHECK_ICON }));

// Passo 2 (Figma "Tela 4"): o bloco do título encolhe para 72,95% e vai de (740, 279) para (475, 293)
const ORIGIN = [740, 279];
const TO = { x: 475 - 740, y: 293 - 279, scale: 56 / 76.769 };

export default function ComoResolvemos() {
  return (
    <TwoStepSlide
      stepSuffix="/diferenciais"
      revealOneByOne
      origin={ORIGIN}
      to={TO}
      background={
        /* vídeo da obra em "overlay" a 50% sobre o azul (conferido contra o export do Figma).
           A animação fica no próprio vídeo: um wrapper com opacidade isolaria a mesclagem. */
        <StageImage
          src="/img/objetivo/como-resolvemos-poster.jpg"
          video="/videos/como-resolvemos.mp4"
          x={1} y={-1} width={1920} height={1080}
          style={{ opacity: 0.5, mixBlendMode: 'overlay' }}
          data-anim="bg"
        />
      }
      title={<>
        <p className={styles.top} data-anim="title-in">O que muda quando a</p>
        <p className={styles.script} data-anim="title-in">Balzani</p>
        <p className={styles.bottom} data-anim="title-in">Entra em um lançamento?</p>
        <div className={styles.line} data-anim="line" />
      </>}
      panelHeight={999}
      list={{ left: 1179, top: 109, width: 671 }}
      divider={{ src: '/img/objetivo/divider-2.svg', width: 671 }}
      items={DIFERENCIAIS}
    />
  );
}
