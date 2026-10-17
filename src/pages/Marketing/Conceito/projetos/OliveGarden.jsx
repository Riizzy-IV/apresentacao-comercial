import { at, FONTES, Pagina, Foto, Secao, Rotulo, Paleta, Tipografia, Regras, LogoGrupos } from './Brandbook';
import og from './OliveGarden.module.css';

const IMG = '/img/marketing/olive-garden';

// no Figma a amostra "Areia" tem fundo #EFCC90, mas o texto diz #ebe4da
const CORES = [
  { nome: 'Verde Oliva Escuro', hex: '#44563C' },
  { nome: 'Verde Oliveira',     hex: '#969636' },
  { nome: 'Ouro',               hex: '#c5a338' },
  { nome: 'Areia',              hex: '#ebe4da', bg: '#efcc90', escuro: '#333' },
];

// famílias do Figma: Area e Chonza Bularoi (indisponíveis → fonte principal e serifada)
const FAMILIAS = [
  { nome: 'Area', fonteNome: FONTES.figtree, pesoNome: 700, fonte: FONTES.area, tamanho: 48, aparar: { nome: true, pesos: true },
    pesos: [['01 light', 400], ['02 regular', 400], ['03 semibold', 600], ['04 bold', 700]] },
  { nome: 'Chonza', fonteNome: FONTES.serifa, fonte: FONTES.serifa, tamanho: 56, pesos: [['01 regular', 400]] },
];

// logotipo: mesmos três grupos nas duas versões (sobre fundo claro e sobre o verde)
const grupos = versao => [
  { src: `${IMG}/logo-${versao}-1.svg`, inset: '1.32% 0 19.55% 38.44%' },
  { src: `${IMG}/logo-${versao}-2.svg`, inset: '94.56% 1.19% -0.01% 38.59%' },
  { src: `${IMG}/logo-${versao}-3.svg`, inset: '-0.02% 64.67% -0.02% 0' },
];

const AVISOS = [
  { texto: 'Não aplicar efeitos pesados sobre a marca', pos: at(282, 6495.5) },
  { texto: 'Não alterar as cores da marca',            pos: at(961, 6495.5), centro: true },
  { texto: 'Não rotacionar a marca',                   pos: at(1333.27, 6495.5) },
  { texto: 'Não distorcer a marca',                    pos: at(357.5, 6819.5) },
  { texto: 'Não remover elementos da marca',           pos: at(961, 6819.5), centro: true },
  { texto: 'Não alterar as proporções da marca',       pos: at(1286.77, 6819.5) },
];
const LOGOS_ERRADOS = [
  { src: `${IMG}/regra-efeitos.svg`,    caixa: at(331, 6341.98, { width: 277.994, height: 108.047 }), inset: '0 -1.44% -7.4% -1.44%' },
  { src: `${IMG}/regra-distorcer.svg`,  caixa: at(331, 6728.19, { width: 277.994, height: 46.082 }) },
  { src: `${IMG}/regra-cores.svg`,      caixa: at(820.94, 6341.98, { width: 277.994, height: 108.047 }) },
  { src: `${IMG}/regra-remover.svg`,    caixa: at(820.94, 6666.23, { width: 277.994, height: 108.047 }) },
  { src: `${IMG}/regra-rotacionar.svg`, caixa: at(1302.46, 6301.24, { width: 297.837, height: 189.526 }),
    girar: { w: 277.994, h: 108.047, graus: -18.21 } },
  { src: `${IMG}/regra-proporcoes.svg`, caixa: at(1312.32, 6666.23, { width: 212.068, height: 108.047 }) },
];

const APLICACOES = [
  { src: 'aplicacao-1', top: 7275.5,  h: 1148.896, alt: 'Aplicação: aviso de porta' },
  { src: 'aplicacao-2', top: 8424.4,  h: 1280.156, alt: 'Aplicação: caneca' },
  { src: 'aplicacao-3', top: 9704.55, h: 1280.156, alt: 'Aplicação: chaveiro' },
];

/** Brandbook do Olive Garden (Figma "Logotipo - Olive Garden", 1920×10985). */
export default function OliveGarden() {
  return (
    <Pagina altura={10985}>
      {/* versão principal, sobre fundo claro */}
      <div className={og.faixaLogo} style={at(0, 3613, { background: '#f4f4f4' })}>
        <LogoGrupos className={og.logo} grupos={grupos('claro')} />
      </div>

      {/* abertura: texto do conceito sobre o verde com textura */}
      <div className={og.abertura}>
        <img src={`${IMG}/textura.jpg`} alt="" className={og.textura} draggable={false} />
        <div className={og.aberturaTexto}>
          <div className={og.conceito}>
            <p>
              Como um símbolo ligado à paz, à harmonia, à prosperidade e à fertilidade, o ramo de oliveira, nas mãos
              da padroeira, inspirou a concepção do Olive Garden, trazendo em sua essência a valorização de nossas
              histórias, raízes e cultura. Assim, a sabedoria e a longevidade, a que nos remete a frondosa árvore, estão
              ligadas à idealização de um empreendimento que traduz em seus espaços os conceitos que inspiraram sua criação.
            </p>
            <p>
              Dessa forma, o alto padrão se manifesta nos tons de verde oliva e amarelo e nas fontes decorativas e
              sofisticadas, com espaçamentos largos, refletindo o refinamento da marca e a origem histórica que permeia o projeto.
            </p>
          </div>
          <p className={og.frase}>Mais do que um empreendimento, Olive Garden representa sofisticação e qualidade.</p>
        </div>
      </div>

      <Tipografia top={786} familias={FAMILIAS} />
      <Paleta top={1822} cores={CORES} />
      <Rotulo top={3720.75}>Versão principal</Rotulo>

      {/* versão sobre o verde */}
      <div className={og.faixaLogo} style={at(0, 4733, { background: '#44563c' })}>
        <LogoGrupos className={og.logo} grupos={grupos('escuro')} />
      </div>

      <Secao top={3318}>Logotipo</Secao>
      <Secao top={6046}>Regras e proibições</Secao>
      <Secao top={7006.5}>Aplicações</Secao>

      {APLICACOES.map(a => (
        <Foto key={a.src} src={`${IMG}/${a.src}.jpg`} alt={a.alt} caixa={at(0, a.top, { width: 1920, height: a.h })} lazy />
      ))}

      <Regras avisos={AVISOS} logos={LOGOS_ERRADOS} />
    </Pagina>
  );
}
