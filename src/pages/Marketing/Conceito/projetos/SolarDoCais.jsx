import { at, FONTES, Pagina, Foto, Rotulo, Paleta, Tipografia, Regras, styles } from './Brandbook';
import sc from './SolarDoCais.module.css';

const IMG = '/img/marketing/solar-do-cais';

// no Figma a amostra "Ouro" tem fundo #AC8136, mas o texto diz #b2a054
const CORES = [
  { nome: 'Cinza Asfalto', hex: '#333333' },
  { nome: 'Cinza Claro',   hex: '#999999' },
  { nome: 'Ouro',          hex: '#b2a054', bg: '#ac8136' },
  { nome: 'Bege',          hex: '#EFCC90', escuro: '#333' },
];
const APOIO = { nome: 'Vermelho Real (apoio)', hex: '#A90000' };

// famílias do Figma: Figtree e Argue (Argue indisponível → serifada)
const FAMILIAS = [
  { nome: 'Figtree', fonteNome: FONTES.figtree, pesoNome: 700, fonte: FONTES.figtree, tamanho: 56, aparar: { nome: true, pesos: true },
    pesos: [['01 light', 300], ['02 regular', 400], ['03 semibold', 600], ['04 bold', 700]] },
  { nome: 'Argue', fonteNome: FONTES.serifa, fonte: FONTES.serifa, tamanho: 56, aparar: { nome: true, pesos: true, alfabeto: true },
    pesos: [['01 regular', 400]] },
];

const AVISOS = [
  { texto: 'Não aplicar efeitos pesados sobre a marca', pos: at(240, 7103) },
  { texto: 'Não alterar as cores da marca',            pos: at(959.73, 7103), centro: true },
  { texto: 'Não rotacionar a marca',                   pos: at(1456.94, 7103) },
  { texto: 'Não distorcer a marca',                    pos: at(240, 7427) },
  { texto: 'Não remover elementos da marca',           pos: at(960.23, 7427), centro: true },
  { texto: 'Não alterar as proporções da marca',       pos: at(1371, 7427) },
];
const LOGOS_ERRADOS = [
  { src: `${IMG}/regra-efeitos.svg`,    caixa: at(235, 6960, { width: 339, height: 82 }), inset: '0 -1.18% -9.76% -1.18%' },
  { src: `${IMG}/regra-distorcer.svg`,  caixa: at(234.94, 7290, { width: 218, height: 82 }) },
  { src: `${IMG}/regra-cores.svg`,      caixa: at(782, 6960, { width: 339, height: 82 }) },
  { src: `${IMG}/regra-remover.svg`,    caixa: at(782, 7296.48, { width: 339, height: 75.102 }) },
  { src: `${IMG}/regra-rotacionar.svg`, caixa: at(1336.51, 6911.03, { width: 347.985, height: 179.931 }),
    girar: { w: 339, h: 82, graus: -17.46 } },
  { src: `${IMG}/regra-proporcoes.svg`, caixa: at(1341, 7290, { width: 373.232, height: 89 }) },
];

const APLICACOES = [
  { src: 'letreiro', caixa: at(-1, 7996, { width: 1920, height: 1072 }), alt: 'Aplicação: letreiro na fachada' },
  { src: 'mockup-2', caixa: at(0, 9068, { width: 1919, height: 1072 }),  alt: 'Aplicação: logotipo em relevo' },
  { src: 'mockup-1', caixa: at(0, 10140, { width: 1919, height: 1072 }), alt: 'Aplicação: papelaria' },
  { src: 'chaveiro', caixa: at(0, 11212, { width: 1920, height: 1072 }), alt: 'Aplicação: chaveiro' },
];

/**
 * Brandbook do Solar do Cais (Figma "Logotipo - Solar do Cais", 1920×12284).
 * O conteúdo do frame no Figma é o do Mônaco Residencial (texto, logo e aplicações).
 */
export default function SolarDoCais() {
  return (
    <Pagina altura={12284}>
      <img src={`${IMG}/linha-1441-cinza.svg`} alt="" width="1441" height="1" className={styles.abs} style={at(240, 7693)} />
      <Regras avisos={AVISOS} logos={[]} peso={500} />
      <p className={sc.aplicacoes}>Aplicações</p>

      {/* abertura: texto do conceito */}
      <div className={sc.abertura}>
        <div className={sc.aberturaTexto}>
          <p className={sc.conceito}>
            O <strong>Mônaco Residencial </strong>nasce inspirado em um dos circuitos mais icônicos do automobilismo
            mundial: uma pista reconhecida por sua <strong>elegância, precisão e prestígio</strong>. Assim como no traçado
            de Mônaco, onde cada curva exige equilíbrio entre desempenho e sofisticação, o empreendimento traduz essa mesma
            essência em uma proposta <strong>residencial contemporânea, urbana e funcional</strong>.
          </p>
          <p className={sc.frase}>Mais do que um nome, Mônaco representa movimento, conquista e sofisticação na medida certa.</p>
        </div>
      </div>

      <Tipografia top={1901} fonte={FONTES.serifa} familias={FAMILIAS} />
      <Paleta top={2920} fonte={FONTES.serifa} cores={CORES} apoio={APOIO} />

      <Foto src={`${IMG}/capa.jpg`} alt="Invista no extraordinário: 46 a 65 m², 2 dorms, 1 suíte" caixa={at(0, 0, { width: 1920, height: 1080 })} />
      <Foto src={`${IMG}/fachada.jpg`} alt="Fachada do empreendimento" caixa={at(-1, 4686, { width: 1921, height: 1080 })} />

      <img src={`${IMG}/logo-principal.svg`} alt="Logotipo, versão principal" width="704" height="172" className={styles.abs}
        style={at(608, 5981)} draggable={false} />
      <Regras avisos={[]} logos={LOGOS_ERRADOS} />
      <img src={`${IMG}/logo-monocromatica.svg`} alt="Logotipo, versão monocromática" width="376" height="92.018"
        className={styles.abs} style={at(390, 6475)} draggable={false} />
      <img src={`${IMG}/logo-negativa.svg`} alt="Logotipo, versão negativa" width="520" height="220.018"
        className={styles.abs} style={at(1067, 6411)} draggable={false} />

      <Rotulo top={5974} fonte={FONTES.figtree}>Versão principal</Rotulo>
      <Rotulo x={960.5} top={6840} fonte={FONTES.figtree}>Regras e proibições</Rotulo>
      <Rotulo x={574.94} top={6355} fonte={FONTES.figtree}>Monocromática</Rotulo>
      <Rotulo x={1326.5} top={6355} fonte={FONTES.figtree}>Negativa</Rotulo>

      {APLICACOES.map(a => <Foto key={a.src} src={`${IMG}/${a.src}.jpg`} alt={a.alt} caixa={a.caixa} lazy />)}
    </Pagina>
  );
}
