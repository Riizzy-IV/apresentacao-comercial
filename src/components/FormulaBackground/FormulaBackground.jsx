import StageImage from '../StageImage/StageImage';
import styles from './FormulaBackground.module.css';

/**
 * Fundo das telas da Fórmula Vértice: foto colorida desfocada + ondas em "overlay" a 50%
 * e escurecimento na parte de baixo. `anim` = data-anim do bloco das fotos (para a entrada).
 */
export default function FormulaBackground({ anim = 'bg' }) {
  return (
    <>
      <div data-anim={anim}>
        <StageImage src="/img/formula/wallpaper.jpg" x={0} y={-152} width={1920} height={1282} />
        <StageImage src="/img/formula/waves.jpg" x={0} y={-2} width={1920} height={1083}
          style={{ mixBlendMode: 'overlay', opacity: 0.5 }} />
      </div>
      <div className={styles.shade} />
    </>
  );
}
