import { useState, useEffect, createContext, useContext } from 'react';

export const DESIGN_W = 1920;
export const DESIGN_H = 1080;

const StageContext = createContext({ width: DESIGN_W, height: DESIGN_H, scale: 1 });

/** Tamanho atual do palco (em px de design) — maior que 1920x1080 quando a janela não é 16:9. */
export function useStage() {
  return useContext(StageContext);
}

function getStage() {
  const w = window.innerWidth;
  const h = window.innerHeight;
  const scale = Math.min(w / DESIGN_W, h / DESIGN_H);
  // o palco ocupa a janela inteira: no eixo que "sobra", ele cresce além de 1920x1080
  return { scale, width: w / scale, height: h / scale };
}

/**
 * Escala o layout de 1920x1080 para caber na janela, sem faixas nas bordas.
 * O palco sempre preenche a viewport; as páginas desenham o fundo no palco inteiro
 * e posicionam o conteúdo dentro de <Canvas> (1920x1080 centralizado).
 */
export default function ScaleWrapper({ children }) {
  const [stage, setStage] = useState(getStage);

  useEffect(() => {
    const update = () => setStage(getStage());
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
      background: 'var(--color-navy-900)',
    }}>
      <div style={{
        width: stage.width,
        height: stage.height,
        position: 'relative',
        overflow: 'hidden',
        transformOrigin: 'top left',
        transform: `scale(${stage.scale})`,
      }}>
        <StageContext.Provider value={stage}>
          {children}
        </StageContext.Provider>
      </div>
    </div>
  );
}

/** Área de 1920x1080 centralizada no palco — coordenadas iguais às do Figma. */
export function Canvas({ children, className, style }) {
  return (
    <div className={className} style={{
      position: 'absolute',
      left: '50%',
      top: '50%',
      width: DESIGN_W,
      height: DESIGN_H,
      marginLeft: -DESIGN_W / 2,
      marginTop: -DESIGN_H / 2,
      ...style,
    }}>
      {children}
    </div>
  );
}
