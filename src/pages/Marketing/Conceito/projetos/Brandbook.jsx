import { Fragment } from 'react';
import styles from './Brandbook.module.css';

/**
 * Peças comuns dos brandbooks desenhados em 1920px no Figma (Bela Vista, Olive Garden, Solar do Cais).
 * A página é montada em 1920px com as coordenadas do Figma e reduzida para a largura do painel (1479px).
 */

const COMUM = '/img/marketing/brandbook';

// posição absoluta (coordenadas do Figma, frame de 1920px)
export const at = (left, top, extra) => ({ left, top, ...extra });

// fontes do Figma indisponíveis no app: substitutas
export const FONTES = {
  area: styles.fonteArea,     // Area Normal → fonte principal
  serifa: styles.fonteSerifa, // Chonza, Batusa, Argue → serifada
  figtree: styles.fonteFigtree,
};

export function Pagina({ altura, children }) {
  return <div className={styles.pagina} style={{ height: altura }}>{children}</div>;
}

/** Foto ocupando a caixa do Figma (object-fit: cover). */
export function Foto({ src, alt = '', caixa, lazy }) {
  return <img src={src} alt={alt} className={styles.foto} style={caixa} loading={lazy ? 'lazy' : undefined} draggable={false} />;
}

/** Título de seção entre duas linhas cinza (1194px). `top` = posição absoluta; sem `top` fica no fluxo. */
export function Secao({ top, fonte = FONTES.area, children }) {
  const abs = top !== undefined;
  return (
    <div className={`${styles.secao} ${abs ? styles.secaoAbs : ''}`} style={abs ? { top } : undefined}>
      <img src={`${COMUM}/linha-1194.svg`} alt="" width="1194" height="1" />
      <p className={fonte}>{children}</p>
      <img src={`${COMUM}/linha-1194.svg`} alt="" width="1194" height="1" />
    </div>
  );
}

/** Rótulo pequeno em caixa alta (ex.: "Versão principal"). `x` = centro do texto. */
export function Rotulo({ x = 960, top, fonte = FONTES.area, children }) {
  return <p className={`${styles.rotulo} ${fonte}`} style={{ left: x, top }}>{children}</p>;
}

/**
 * Paleta de cores: uma amostra larga em cima, três embaixo e, opcional, uma faixa de cor de apoio.
 * Cor = { nome, hex, bg, escuro } (bg = cor da amostra, se diferente do hex; escuro = cor do texto).
 */
export function Paleta({ top, fonte, cores, apoio }) {
  const [principal, ...demais] = cores;
  const Amostra = ({ c, classe }) => (
    <div className={classe} style={{ background: c.bg ?? c.hex }}>
      <p style={c.escuro ? { color: c.escuro } : undefined}>
        <span>{c.nome}</span>
        <strong>{c.hex}</strong>
      </p>
    </div>
  );
  return (
    <div className={styles.paleta} style={{ top }}>
      <Secao fonte={fonte}>Paleta de cores</Secao>
      <div className={styles.amostras}>
        <Amostra c={principal} classe={styles.amostraGrande} />
        <div className={styles.linhaAmostras}>
          {demais.map(c => <Amostra key={c.nome} c={c} classe={styles.amostra} />)}
        </div>
        {apoio && <Amostra c={apoio} classe={styles.amostraApoio} />}
      </div>
    </div>
  );
}

/**
 * Família tipográfica (faixa cinza). Cada família = { nome, fonteNome, pesoNome, fonte, tamanho, pesos: [[rótulo, peso]],
 * aparar: { nome, pesos, alfabeto } } — "aparar" = recorte da caixa do texto, como no Figma.
 */
export function Tipografia({ top, fonte, familias }) {
  return (
    <div className={styles.tipografia} style={{ top }}>
      <div className={styles.tipografiaConteudo}>
        <Secao fonte={fonte}>Família tipográfica</Secao>
        <div className={styles.familias}>
          {familias.map((f, i) => (
            <Fragment key={f.nome}>
              {i > 0 && <img src={`${COMUM}/linha-1441.svg`} alt="" width="1441" height="1" className={styles.divisor} />}
              <div className={styles.familia}>
                <p className={`${styles.nomeFamilia} ${f.fonteNome} ${f.aparar?.nome ? styles.aparar : ''}`}
                  style={f.pesoNome ? { fontWeight: f.pesoNome } : undefined}>{f.nome}</p>
                <div className={`${styles.pesos} ${f.fonte}`} style={{ fontSize: f.tamanho, letterSpacing: f.tamanho * 0.02 }}>
                  {f.pesos.map(([rotulo, peso]) => (
                    <span key={rotulo} className={f.aparar?.pesos ? styles.aparar : ''} style={{ fontWeight: peso }}>{rotulo}</span>
                  ))}
                </div>
                <span className={styles.linhaVertical} />
                <p className={`${styles.alfabeto} ${f.fonte} ${f.aparar?.alfabeto ? styles.aparar : ''}`}>
                  aAbBcCdDeEfgGhH<br />iIjJkKlLmMnN<br />0123456789
                </p>
              </div>
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Regras e proibições: avisos (ícone vermelho + texto) e os logos "errados", cada um na caixa do Figma.
 * Aviso = { texto, pos, centro }. Logo = { src, caixa, inset, girar: { w, h, graus } }. `peso` = peso do texto dos avisos.
 */
export function Regras({ fonte = FONTES.area, peso = 600, avisos, logos }) {
  return (
    <>
      {avisos.map(a => (
        <div key={a.texto} className={`${styles.aviso} ${a.centro ? styles.centro : ''}`} style={a.pos}>
          <img src={`${COMUM}/proibido.svg`} alt="" width="39.9458" height="39.9458" />
          <p className={fonte} style={{ fontWeight: peso }}>{a.texto}</p>
        </div>
      ))}
      {logos.map(l => (
        <div key={l.src} className={styles.regra} style={l.caixa}>
          <div className={`${styles.regraImg} ${l.girar ? styles.girada : ''}`}
            style={l.girar ? { width: l.girar.w, height: l.girar.h, '--graus': `${l.girar.graus}deg` } : { inset: l.inset }}>
            <img src={l.src} alt="" draggable={false} />
          </div>
        </div>
      ))}
    </>
  );
}

/** Logotipo em vários grupos (SVGs separados), cada um posicionado por `inset` em % como no Figma. */
export function LogoGrupos({ style, className, grupos }) {
  return (
    <div className={`${styles.logoGrupos} ${className ?? ''}`} style={style}>
      {grupos.map(g => (
        <div key={g.src} className={styles.grupo} style={{ inset: g.inset }}>
          <img src={g.src} alt="" draggable={false} />
        </div>
      ))}
    </div>
  );
}

/** Rodapé azul com "Obrigado" e a logo da Balzani. */
export function Obrigado({ top, img }) {
  return (
    <div className={styles.obrigado} style={{ top }}>
      <p>Obrigado</p>
      <img src={`${img}/linha-58.svg`} alt="" width="58" height="1" />
      <img src={`${img}/balzani.svg`} alt="Balzani" width="217" height="40" />
    </div>
  );
}

export { styles };
