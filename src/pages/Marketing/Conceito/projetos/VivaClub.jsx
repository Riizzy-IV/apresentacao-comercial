import styles from './VivaClub.module.css';

const IMG = '/img/marketing/vivaclub';

// posição absoluta dentro da página (coordenadas do Figma, frame "Home" de 1479px)
const at = (left, top, extra) => ({ left, top, ...extra });

/** Linha fina (SVG de 0,77px de altura): o Figma desloca a linha meio traço para cima. */
function Linha({ src, x, y, w }) {
  return <img src={src} alt="" width={w} height="0.770312" className={styles.abs} style={at(x, y - 0.77)} />;
}

/** Linha vertical da grade do logotipo (SVG horizontal girado 90°). */
function LinhaV({ x, y }) {
  return (
    <div className={styles.abs} style={at(x, y, { width: 0, height: 727.568 })}>
      <img src={`${IMG}/linha-v.svg`} alt="" width="727.568" height="0.770312" className={styles.linhaV} />
    </div>
  );
}

function Topico({ y, children }) {
  return (
    <div className={`${styles.abs} ${styles.topico}`} style={at(234.18, y)}>
      <img src={`${IMG}/bolinha.svg`} alt="" width="13.3636" height="13.3636" />
      <p>{children}</p>
    </div>
  );
}

const DESAFIOS = [
  { w: 320.45, texto: 'Resolver o desafio de comunicação do empreendimento de uso misto' },
  { w: 269.609, texto: 'Comunicar assertivamente para o público que compra para morar e o que compra para investir' },
  { w: 320.45, texto: 'Trazer uma direção de arte efetiva para ambas as necessidades sem que pareçam dois empreendimentos diferentes' },
];

// paleta: amostras + nome + especificações (alinhadas à direita)
const CORES = [
  { x: 234.18, y: 2249.25, w: 497.101, h: 213.217, bg: '#127881' },
  { x: 234.18, y: 2477.09, w: 329.573, h: 125.494, bg: '#0c1f2f' },
  { x: 234.18, y: 2617.2, w: 497.101, h: 125.494,
    bg: 'linear-gradient(90deg, #5cc2c1 0%, #b6a897 40.385%, #dd8b7e 64.904%, #8b1d1c 100%)' },
  { x: 747.72, y: 2617.2, w: 497.101, h: 125.494,
    bg: 'linear-gradient(90deg, #071f30 0%, #083655 31.25%, #0f7881 71.635%, #5fc6c6 100%)' },
  { x: 575.93, y: 2477.09, w: 333.837, h: 125.494, bg: '#083655' },
  { x: 921.34, y: 2477.09, w: 323.481, h: 125.494, bg: '#b64929' },
  { x: 747.72, y: 2249.25, w: 497.101, h: 213.217, bg: '#5fc6c6' },
];
const NOMES_CORES = [
  ['Verde Azulado', 259.15, 2421.65], ['Azul Escuro', 259.15, 2561.16], ['Gradiente Aurora', 259.15, 2701.27],
  ['Gradiente Verde-Azul', 767.83, 2701.27], ['Azul Royal', 590.55, 2561.16], ['Terracota', 936.57, 2561.16],
  ['Verde Água', 767.83, 2421.65],
];
const SPECS = [
  { x: 589.95, y: 2373.52, w: 121.838, linhas: ['cmyk: 68/37/44/17', 'rgb: 18/120/129', <>hex: #<span className={styles.regular}>127881</span></>] },
  { x: 1111.41, y: 2373.52, w: 109.655, linhas: ['cmyk: 58/0/25/0', 'rgb: 95/198/198', 'hex: #5FC6C6'] },
  { x: 424.24, y: 2512.42, w: 124.884, linhas: ['cmyk: 90/75/54/65', 'rgb: 12/31/47', 'hex: #0C1F2F'] },
  { x: 759.91, y: 2512.42, w: 131.586, linhas: ['cmyk: 100/78/42/35', 'rgb: 8/54/85', 'hex: #083655'] },
  { x: 1097.4, y: 2512.42, w: 123.666, linhas: ['cmyk: 20/83/98/10', 'rgb: 182/72/41', '#B64929'] },
];

// grade de construção do logotipo
const LINHAS_V = [
  [192.23, 2891.27], [240.66, 2891.27], [498.63, 2890.33], [451.43, 2890.09], [533.02, 2890.33], [580.47, 2891.27],
  [614.93, 2891.27], [663.51, 2891.27], [874.69, 2891.27], [921.7, 2891.27], [1252.26, 2891.27], [1300.85, 2891.27],
];
const LINHAS_H = [3373.23, 3365.34, 3413.18, 3437.67];

// famílias tipográficas: amostras "Aa" e alfabetos (pesos em colunas)
// (os rótulos dos pesos são todos em Figtree: Bold, Semibold e Regular — inclusive o "Medium" da Menda)
const PESOS = [
  { x: 753.37, mendaX: 753.37, alfaR: 874.3, figtree: 700, menda: 700, rotulo: 'Bold', rotuloX: 811.63, rotuloMenda: 'Bold', rotuloMendaX: 811.63 },
  { x: 939.4, mendaX: 939.78, alfaR: 1060.34, figtree: 600, menda: 600, rotulo: 'Semibold', rotuloX: 930.3, rotuloMenda: 'Semibold', rotuloMendaX: 930.3 },
  { x: 1125.43, mendaX: 1125.43, alfaR: 1247.5, figtree: 400, menda: 500, rotulo: 'Regular', rotuloX: 1142.1, rotuloMenda: 'Medium', rotuloMendaX: 1136.02 },
];
const ALFABETO = 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPp0123456789';

// versões do logotipo sobre fundos
const VERSOES = [
  { x: 369.75, y: 5096.32, bg: '#b64929', logo: 'versao-1', lx: 425.95, ly: 5147.8 },
  { x: 751.05, y: 5096.32, bg: '#000', logo: 'versao-2', lx: 807.2, ly: 5147.8 },
  { x: 369.75, y: 5411.38, bg: 'linear-gradient(90deg, #071f30 0%, #083655 31.25%, #0f7881 71.635%, #5fc6c6 100%)', logo: 'versao-3', lx: 425.95, ly: 5462.7 },
  { x: 751.05, y: 5411.38, bg: '#fff', borda: true, logo: 'versao-4', lx: 807.2, ly: 5462.7 },
];

/** Brandbook do VivaClub (Figma "Tela 11", frame "Home" dentro do painel com rolagem). */
export default function VivaClub() {
  return (
    <div className={styles.page}>
      {/* fundos */}
      <img src={`${IMG}/grade-logo.svg`} alt="" width="1181.36" height="467.759" className={styles.abs} style={at(190.56, 3364.73)} />
      <div className={styles.abs} style={at(0, 1451.98, { width: 1479, height: 594.691, background: '#d9d9d9', opacity: 0.2 })} />
      <div className={styles.abs} style={at(0, 7076.94, { width: 1479, height: 1938.887, background: '#b4b4b4', opacity: 0.2 })} />

      {/* hero */}
      <div className={`${styles.abs} ${styles.hero}`} />
      <img src={`${IMG}/hero-linhas.svg`} alt="" width="856.588" height="569.261" className={styles.abs} style={at(622.41, -0.06)} />
      <div className={styles.abs} style={at(-775.47, 389.64, { width: 1155.941, height: 2.311, background: '#dc5f26' })} />
      <p className={`${styles.abs} ${styles.heroSub}`} style={at(233.6, 429.84, { width: 345.674 })}>
        Viva em uma das áreas de lazer <b>mais completas</b> da região
      </p>
      <p className={`${styles.abs} ${styles.marca}`} style={at(233.5, 37.76)}>BALZANI</p>
      <p className={`${styles.abs} ${styles.marca}`} style={at(1185.3, 37.76)}>VIVACLUB</p>
      <div className={`${styles.abs} ${styles.heroTitle}`} style={at(233.6, 149.64, { width: 384.111 })}>
        <p>SEU</p>
        <p>NOVO <b>CLUBE</b></p>
        <p><b>PESSOAL</b></p>
        <p>TODOS OS DIAS</p>
      </div>
      <img src={`${IMG}/logo-hero.svg`} alt="VivaClub" width="482.216" height="190.974" className={styles.abs} style={at(830, 190)} />

      {/* sobre o projeto */}
      <Topico y={657.48}>Sobre o projeto</Topico>
      <p className={`${styles.abs} ${styles.texto}`} style={at(234.18, 723.73, { width: 836.873, lineHeight: 1.4 })}>
        Essa apresentação visa apresentar o logotipo do VivaClub, trazendo conceitos criados com base na reunião de
        briefing, a fim de assimilar todas as necessidades gráficas, conceituais e textuais do empreendimento.
      </p>
      <Linha src={`${IMG}/linha.svg`} x={234.18} y={885.08} w={1010.813} />

      <div className={`${styles.abs} ${styles.bloco}`} style={at(234.18, 982.86)}>
        <p className={styles.secao}>Desafio</p>
        <div className={styles.desafios}>
          {DESAFIOS.map(d => (
            <div key={d.texto} className={styles.desafio} style={{ width: d.w }}>
              <img src={`${IMG}/icone-desafio.svg`} alt="" width="38.5156" height="37.7453" />
              <p className={styles.textoMenor}>{d.texto}</p>
            </div>
          ))}
        </div>
      </div>

      <div className={`${styles.abs} ${styles.bloco}`} style={at(234.18, 1228.22)}>
        <p className={styles.secao}>Solução</p>
        <p className={styles.textoMenor}>
          Para sanar todas as possíveis dificuldades e divergência, optamos por utilizar uma paleta de cores distinta e
          contrastante, trazendo o foco de cada uma delas para um determinado público (comprador morador ou comprador
          investidor) a fim de criar uma associação subliminar do público com o suas cores, tonalidades e
          características de imagem
        </p>
      </div>

      {/* conceito */}
      <Topico y={1571.24}>Conceito</Topico>
      <div className={`${styles.abs} ${styles.texto} ${styles.conceito}`} style={at(234.18, 1664.5, { width: 1010.65 })}>
        <p>
          <b>Vivaclub Residence nasce da união entre localização, qualidade de vida e novas possibilidades.</b> Um
          empreendimento contemporâneo, pensado tanto para quem busca evoluir para um novo padrão de moradia quanto
          para quem enxerga no imóvel uma oportunidade de investimento em uma região valorizada e próxima ao polo
          universitário.
        </p>
        <p>
          Com localização estratégica e uma das áreas de lazer mais completas da região, a marca traduz uma forma mais
          dinâmica, moderna e conveniente de viver. Seu conceito visual parte dessa ideia de <b>ascensão, movimento e
          experiência</b>, construindo uma identidade atual, sofisticada e capaz de comunicar valor sem recorrer aos
          clichês tradicionais do mercado imobiliário.
        </p>
      </div>

      {/* paleta de cores */}
      <p className={`${styles.abs} ${styles.secao}`} style={at(234.18, 2164.18, { width: 1010.65 })}>paleta de cores</p>
      {CORES.map(c => (
        <div key={`${c.x}-${c.y}`} className={`${styles.abs} ${styles.cor}`}
          style={at(c.x, c.y, { width: c.w, height: c.h, background: c.bg })} />
      ))}
      {NOMES_CORES.map(([nome, x, y]) => (
        <p key={nome} className={`${styles.abs} ${styles.corNome}`} style={at(x, y)}>{nome}</p>
      ))}
      {SPECS.map(s => (
        <div key={`${s.x}-${s.y}`} className={`${styles.abs} ${styles.corSpecs}`} style={at(s.x, s.y, { width: s.w })}>
          {s.linhas.map((l, i) => <p key={i}>{l}</p>)}
        </div>
      ))}
      <Linha src={`${IMG}/linha.svg`} x={234.18} y={2834.67} w={1010.813} />

      {/* frase + grade de construção do logotipo */}
      {LINHAS_V.map(([x, y]) => <LinhaV key={x} x={x} y={y} />)}
      {LINHAS_H.map(y => <Linha key={y} src={`${IMG}/linha-h.svg`} x={92.05} y={y} w={1265.693} />)}
      <div className={`${styles.abs} ${styles.frase}`} style={at(448.01, 2963.02, { width: 582.972 })}>
        <img src={`${IMG}/aspas.svg`} alt="" width="44.6781" height="35.5066" />
        <p>Design é o primeiro estágio da paixão entre seu consumidor e sua marca.</p>
      </div>
      <div className={styles.abs} style={at(1089.05, 3597.24, { width: 3.344, height: 3.344, background: '#c5c5c5' })} />
      <img src={`${IMG}/logo-mockup.jpg`} alt="" className={`${styles.abs} ${styles.mockup}`} style={at(121.26, 3687.04)} />

      {/* logotipo */}
      <p className={`${styles.abs} ${styles.secao}`} style={at(676.72, 4610.34)}>Logotipo</p>
      <img src={`${IMG}/logo.svg`} alt="VivaClub" width="482.216" height="190.974" className={styles.abs} style={at(498.4, 4695.7)} />
      <Linha src={`${IMG}/linha.svg`} x={234.18} y={5009.36} w={1010.813} />
      {VERSOES.map(v => (
        <div key={v.logo}>
          <div className={`${styles.abs} ${styles.versao}`}
            style={at(v.x, v.y, { background: v.bg, border: v.borda ? '0.77px solid #c0c0c0' : 'none' })} />
          <img src={`${IMG}/${v.logo}.svg`} alt="" width="245.828" height="97.357" className={styles.abs} style={at(v.lx, v.ly)} />
        </div>
      ))}
      <p className={`${styles.abs} ${styles.legenda}`} style={at(234.18, 5330.9)}>Versões alternativas</p>
      <p className={`${styles.abs} ${styles.legenda}`} style={at(234.18, 5641.71)}>Versões negativas</p>
      <Linha src={`${IMG}/linha.svg`} x={234.18} y={5751.18} w={1010.813} />

      {/* famílias tipográficas */}
      <p className={`${styles.abs} ${styles.secao}`} style={at(235.71, 5871.02, { width: 1010.65 })}>famílias tipográficas</p>
      <p className={`${styles.abs} ${styles.pill}`} style={at(235.71, 5946.33)}>Tipografia primária</p>
      <p className={`${styles.abs} ${styles.pill}`} style={at(235.71, 6526.94)}>Tipografia display</p>
      <p className={`${styles.abs} ${styles.familia}`} style={at(234.18, 5974.06)}>Figtree</p>
      <p className={`${styles.abs} ${styles.familia} ${styles.menda}`} style={at(234.18, 6554.67, { fontSize: 92.438 })}>Menda</p>
      <p className={`${styles.abs} ${styles.descricao}`} style={at(235.71, 6226.05, { width: 431.375 })}>
        Figtree é uma fonte geométrica sans serif limpa e amigável, ideal para uso em projetos arquitetônicos. Ela
        transmite leveza e nitidez em textos corridos, mas ainda mantém um toque de impacto em maiúsculas – perfeita
        para rótulos, call to actions e destaques. As versões mais grossas têm um caráter distintamente mais amigável,
        ótimas para títulos de marcas com um toque mais moderno.
      </p>
      <p className={`${styles.abs} ${styles.descricao}`} style={at(235.71, 6710.27, { width: 471.485 })}>
        A família de fontes expandidas Menda é uma fonte versátil e moderna que combina formas geométricas e pesos
        espessos para criar uma presença visual ousada e impactante. A fonte apresenta linhas simples e curvas
        elegantes que mantêm a legibilidade em tamanhos grandes, tornando-a perfeita para manchetes, pôsteres e
        materiais de marca. Com sua ampla variedade de pesos e estilos, a família de fontes expandidas Menda é adequada
        para designs digitais e impressos, adicionando uma sensação de profissionalismo e sofisticação
      </p>
      {PESOS.map(p => (
        <div key={p.x}>
          <p className={`${styles.abs} ${styles.peso}`} style={at(p.rotuloX, 5922.38, { fontWeight: p.figtree })}>{p.rotulo}</p>
          <p className={`${styles.abs} ${styles.peso}`} style={at(p.rotuloMendaX, 6502.99, { fontWeight: p.figtree })}>{p.rotuloMenda}</p>
          <div className={`${styles.abs} ${styles.aa}`} style={at(p.x, 5973.86, { height: 221.85 })}>
            <p style={{ fontWeight: p.figtree }}>Aa</p>
          </div>
          <div className={`${styles.abs} ${styles.aa}`} style={at(p.mendaX, 6554.68, { height: 186.416 })}>
            <p className={styles.menda} style={{ fontSize: 92.438, fontWeight: p.menda }}>Aa</p>
          </div>
          <p className={`${styles.abs} ${styles.alfabeto}`} style={at(p.alfaR - 120.939, 6226.05, { fontWeight: p.figtree })}>{ALFABETO}</p>
          <p className={`${styles.abs} ${styles.alfabeto} ${styles.menda}`}
            style={at(p.alfaR - 120.939, 6752.64, { fontSize: 12.325, fontWeight: p.menda })}>{ALFABETO}</p>
        </div>
      ))}

      {/* aplicações */}
      <p className={`${styles.abs} ${styles.secao}`} style={at(234.18, 7194.92)}>aplicações</p>
      <img src={`${IMG}/aplicacao-1.jpg`} alt="" className={`${styles.abs} ${styles.foto}`} style={at(32.53, 7295.37, { width: 867.194, height: 506.812 })} />
      <img src={`${IMG}/aplicacao-apple.jpg`} alt="" className={`${styles.abs} ${styles.foto}`}
        style={at(924.38, 7295.37, { width: 521.427, height: 506.812, border: '0.77px solid #e5e5e5' })} />
      <div className={`${styles.abs} ${styles.recorte}`} style={at(30.81, 7831.01, { width: 1417.375, height: 676.288 })}>
        <img src={`${IMG}/aplicacao-2.jpg`} alt="" style={{ left: 0, top: '-2.36%', width: '100%', height: '117.89%' }} />
      </div>
      <img src={`${IMG}/aplicacao-3.jpg`} alt="" className={`${styles.abs} ${styles.foto}`}
        style={at(1010.65, 8449.63, { width: 293.582, height: 293.582, boxShadow: '0 15.406px 61.625px rgba(0, 0, 0, 0.15)' })} />
      <img src={`${IMG}/aplicacao-4.jpg`} alt="" className={`${styles.abs} ${styles.foto}`} style={at(30.81, 8531.55, { width: 955.188, height: 553.087 })} />
      <img src={`${IMG}/aplicacao-5.jpg`} alt="" className={`${styles.abs} ${styles.foto}`} style={at(30.81, 9108.88, { width: 696.362, height: 553.087 })} />
      <img src={`${IMG}/aplicacao-6.jpg`} alt="" className={`${styles.abs} ${styles.foto}`} style={at(751.82, 9108.88, { width: 696.362, height: 553.087 })} />
      <div className={`${styles.abs} ${styles.recorte}`} style={at(1010.65, 8768.12, { width: 293.582, height: 316.517 })}>
        <img src={`${IMG}/aplicacao-7.jpg`} alt="" style={{ left: '-57.13%', top: '-32.3%', width: '218.28%', height: '134.99%' }} />
      </div>

      {/* encerramento */}
      <div className={styles.abs} style={at(30.81, 9690.64, { width: 1417.375, height: 781.373, background: '#103655', borderRadius: 15.406 })} />
      <img src={`${IMG}/logo-rodape.svg`} alt="VivaClub" width="404.882" height="79.4005" className={styles.abs} style={at(537.06, 9975.88)} />
      <p className={`${styles.abs} ${styles.obrigado}`} style={at(635.89, 10090.48)}>Obrigado</p>
    </div>
  );
}
