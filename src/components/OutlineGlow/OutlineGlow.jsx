import styles from './OutlineGlow.module.css';

/**
 * Contorno da logo ao fundo. No Figma ele tem blur progressivo (nítido no topo,
 * desfocado embaixo); o SVG exportado só traz blur uniforme, então sobrepomos a
 * versão nítida e a desfocada com máscaras opostas.
 * Posição/tamanho em coordenadas do Canvas (já incluindo a margem do filtro do SVG).
 */
export default function OutlineGlow({
  src = '/img/quem-somos/outline.svg',
  sharpSrc = '/img/quem-somos/outline-sharp.svg',
  left, top, width = 962.6, height = 952.6,
  ...rest
}) {
  return (
    <div className={styles.root} style={{ left, top, width, height }} {...rest}>
      <img src={sharpSrc} alt="" width={width} height={height} className={styles.sharp} />
      <img src={src} alt="" width={width} height={height} className={styles.blur} />
    </div>
  );
}
