import { at, Pagina, Foto, Secao, Paleta, LogoGrupos, Obrigado, styles } from './Brandbook';

const IMG = '/img/marketing/bela-vista';

const CORES = [
  { nome: 'Verde Escuro', hex: '#223504' },
  { nome: 'Marrom',       hex: '#722E00' },
  { nome: 'Ocre',         hex: '#C68952' },
  { nome: 'Bege',         hex: '#FFF4D7', escuro: '#223504' },
];

/** Brandbook do Bela Vista (Figma "Proposta de logotipo - Bela Vistas - Opção 01", 1920×5837). */
export default function BelaVista() {
  return (
    <Pagina altura={5837}>
      <Paleta top={2726.81} cores={CORES} />
      <Obrigado top={5219} img={IMG} />
      <Secao top={4441.63}>Logotipo Alternativo (opção 2)</Secao>

      <img src={`${IMG}/logo-principal.svg`} alt="Bela Vista" width="950" height="325" className={styles.abs}
        style={at(485, 1202.77)} draggable={false} />
      {/* logotipo aplicado na faixa abaixo do portal */}
      <LogoGrupos style={at(485, 2452, { width: 950, height: 233 })} grupos={[
        { src: `${IMG}/logo-grupo-1.svg`, inset: '85.01% 22.9% 2.93% 22.91%' },
        { src: `${IMG}/logo-grupo-2.svg`, inset: '0 5.33% 85.76% 5.33%' },
        { src: `${IMG}/logo-grupo-3.svg`, inset: '24.43% 0 0 0' },
      ]} />
      <img src={`${IMG}/linha-1055.svg`} alt="" width="1055.647" height="1" className={styles.abs} style={at(432.18, 2212)} />
      <Foto src={`${IMG}/portal.jpg`} alt="Portal do condomínio com o logotipo"
        caixa={at(0, 1649.39, { width: 1921.99, height: 579.35 })} />
      <img src={`${IMG}/logo-alternativo.svg`} alt="Bela Vista: logotipo alternativo" width="650" height="371"
        className={styles.abs} style={at(635, 4645.63)} draggable={false} />
      <Foto src={`${IMG}/capa.jpg`} alt="Bela Vista: seu refúgio, sua melhor vista" caixa={at(0, 1.14, { width: 1920, height: 1080 })} />
    </Pagina>
  );
}
