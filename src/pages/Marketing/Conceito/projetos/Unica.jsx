import { at, Pagina, Foto, styles } from './Brandbook';
import un from './Unica.module.css';

const IMG = '/img/marketing/unica';

// pesos das duas larguras da Proxima Nova (Figma: "03 semibold" da Wide está em Bold)
const PESOS_REGULAR = [['01 light', 300], ['02 regular', 400], ['03 semibold', 600], ['04 bold', 700]];
const PESOS_WIDE = [['01 light', 300], ['02 regular', 400], ['03 semibold', 700], ['04 bold', 700]];

const CORES = [
  { nome: 'Verde Floresta', hex: '#004C45', w: 459 },
  { nome: 'Dourado',        hex: '#AC905C', w: 460 },
  { nome: 'Cinza chumbo',   hex: '#969696', w: 459 },
];

const APLICACOES = [
  { src: 'aplicacao-1', top: 4904, alt: 'Aplicação: aviso de porta' },
  { src: 'aplicacao-2', top: 6060, alt: 'Aplicação: logotipo em relevo' },
  { src: 'aplicacao-3', top: 7216, alt: 'Aplicação: caneca' },
];

const Alfabeto = ({ className }) => (
  <p className={className}>aAbBcCdDeEfgGhH<br />iIjJkKlLmMnN<br />0123456789</p>
);

/**
 * Brandbook da Unica (Figma "Logotipo - Unica", 1920×8372).
 * O conteúdo do frame no Figma é o do Forêt Gramado (texto, logo e aplicações).
 * Fontes do Figma indisponíveis: Proxima Nova → fonte principal; Proxima Nova Wide → Zalando Sans Expanded;
 * Aktiv Grotesk → fonte principal.
 */
export default function Unica() {
  return (
    <Pagina altura={8372}>
      <Foto src={`${IMG}/capa.jpg`} alt="" caixa={at(0, 0, { width: 1920, height: 1000 })} />
      <p className={un.chamada}>Entre a natureza, <br />a tradição e um novo padrão de morar.</p>
      <img src={`${IMG}/linha-188.svg`} alt="" width="188" height="3" className={styles.abs} style={at(605, 639)} />
      <Foto src={`${IMG}/faixa-dourada.jpg`} caixa={at(0, 131, { width: 37, height: 739 })} />

      <div className={un.conceito}>
        <p><strong>A natureza como inspiração. A sofisticação como essência.</strong></p>
        <p>
          <strong>Forêt Gramado</strong> traduz a união entre a tradição do bairro Floresta, a elegância europeia
          presente em seu nome e um novo olhar sobre o morar contemporâneo.
        </p>
        <p>
          Seu conceito nasce do <strong>encontro entre arquitetura, natureza e bem-estar, </strong>criando uma
          identidade elegante, discreta e profundamente conectada ao espírito de Gramado.
        </p>
        <p>
          Uma marca pensada para representar não apenas um empreendimento, mas uma experiência de viver marcada pelo
          design, pela exclusividade e pela harmonia entre conforto e paisagem.
        </p>
      </div>

      {/* família tipográfica: Proxima Nova nas larguras regular e wide */}
      <img src={`${IMG}/linha-1441.svg`} alt="" width="1441" height="1" className={styles.abs} style={at(239, 1646)} />
      <p className={un.rotulo} style={at(513.06, 1783)}>regular</p>
      <p className={un.rotulo} style={at(785.94, 1783)}>wide</p>
      <div className={un.tipografia}>
        <div className={un.tipoTitulo}>
          <p className={un.rotuloFixo}>Família tipografia</p>
          <p className={un.nomeFamilia}>Próxima nova</p>
        </div>
        <div className={un.pesos}>
          <div className={un.colunaPesos} style={{ width: 237 }}>
            {PESOS_REGULAR.map(([r, p]) => <p key={r} style={{ fontWeight: p }}>{r}</p>)}
          </div>
          <div className={`${un.colunaPesos} ${un.wide}`} style={{ width: 287 }}>
            {PESOS_WIDE.map(([r, p], i) => <p key={i} style={{ fontWeight: p }}>{r}</p>)}
          </div>
        </div>
        <span className={un.linhaVertical} />
        <div className={un.alfabetos}>
          <Alfabeto />
          <Alfabeto className={un.wide} />
        </div>
      </div>
      <img src={`${IMG}/linha-1441.svg`} alt="" width="1441" height="1" className={styles.abs} style={at(239, 2194)} />

      <div className={un.paleta}>
        <p className={un.rotuloFixo}>Paleta de cores</p>
        <div className={un.amostras}>
          {CORES.map(c => (
            <div key={c.hex} className={un.cor} style={{ width: c.w }}>
              <div className={un.amostra} style={{ background: c.hex }} />
              <div className={un.legenda}>
                <p>{c.nome}</p>
                <p className={un.hex}>{c.hex}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className={un.secao} style={{ top: 4076 }}><strong>Logotipo</strong> | Versões</p>
      <p className={un.secao} style={{ top: 4820 }}><strong>Aplicações</strong></p>

      <img src={`${IMG}/logo-1.svg`} alt="Logotipo" width="397" height="102" className={styles.abs} style={at(240, 4272)} draggable={false} />
      <img src={`${IMG}/logo-2.svg`} alt="Logotipo, versão monocromática" width="397" height="102" className={styles.abs}
        style={at(761.94, 4272)} draggable={false} />
      <img src={`${IMG}/logo-negativo.svg`} alt="Logotipo, versão negativa" width="485" height="214" className={styles.abs}
        style={at(1240.06, 4216)} draggable={false} />

      <Foto src={`${IMG}/abertura-logo.jpg`} alt="Logotipo sobre a folhagem" caixa={at(0, 2842, { width: 1920, height: 1080 })} />
      {APLICACOES.map(a => (
        <Foto key={a.src} src={`${IMG}/${a.src}.jpg`} alt={a.alt} caixa={at(0, a.top, { width: 1920, height: 1156 })} lazy />
      ))}
    </Pagina>
  );
}
