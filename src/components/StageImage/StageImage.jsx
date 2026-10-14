import { DESIGN_W, DESIGN_H, useStage } from '../ScaleWrapper/ScaleWrapper';

/**
 * Imagem de fundo de página inteira, para usar dentro de <Canvas>.
 * Fica na posição do Figma (x, y, width, height em coordenadas do Canvas) e, se a
 * janela não for 16:9, amplia a partir do centro só o necessário para cobrir o palco
 * todo — assim o fundo nunca deixa faixas e continua alinhado com o conteúdo.
 */
export default function StageImage({ src, video, x, y, width, height, coverLeft = true, style, ...rest }) {
  const stage = useStage();
  const cx = DESIGN_W / 2;
  const cy = DESIGN_H / 2;

  // distância do centro do Canvas até as bordas da imagem (escala 1)
  const left = cx - x;
  const right = x + width - cx;
  const top = cy - y;
  const bottom = y + height - cy;

  const halfW = stage.width / 2;
  const halfH = stage.height / 2;
  // coverLeft=false: o lado esquerdo não precisa ser coberto (ex.: fica sob um degradê)
  const s = Math.max(1, coverLeft ? halfW / left : 0, halfW / right, halfH / top, halfH / bottom);

  const box = {
    position: 'absolute',
    left: cx - left * s,
    top: cy - top * s,
    width: width * s,
    height: height * s,
    maxWidth: 'none',
    pointerEvents: 'none',
    objectFit: 'cover',
    ...style,
  };

  // com `video`: toca o vídeo em loop, mudo; `src` vira a capa (aparece enquanto carrega
  // ou se o arquivo de vídeo ainda não existir)
  if (video) {
    return <video src={video} poster={src} autoPlay muted loop playsInline style={box} {...rest} />;
  }

  return <img src={src} alt="" draggable={false} style={box} {...rest} />;
}
