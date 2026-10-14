import { useLocation } from 'react-router-dom';
import BottomNav from '../../components/BottomNav/BottomNav';
import { Canvas } from '../../components/ScaleWrapper/ScaleWrapper';
import { findLabel } from '../../data/sections';

// Placeholder para telas ainda não implementadas a partir do Figma.
// `embedded`: usado dentro de um layout de seção (que já tem fundo, menu e navegação).
export default function EmBreve({ embedded = false }) {
  const { pathname } = useLocation();
  const label = (
    <p style={{
      position: 'absolute',
      left: embedded ? 350 : 0,
      right: 0,
      top: 0,
      bottom: 82,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 48,
      fontWeight: 700,
      textTransform: 'uppercase',
      opacity: 0.5,
    }}>
      {findLabel(pathname) ?? 'Seção'} — em breve
    </p>
  );

  if (embedded) return label;

  return (
    <section style={{
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(to bottom, var(--color-navy-800), var(--color-navy-900))',
    }}>
      <Canvas>
        {label}
        <BottomNav />
      </Canvas>
    </section>
  );
}
