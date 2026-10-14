import { createContext, useContext, useRef, useState, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { findItem } from '../data/sections';

const TransitionContext = createContext(null);

export function TransitionProvider({ children, overlayColor = '#021c2d' }) {
  const navigate   = useNavigate();
  const { pathname } = useLocation();
  const overlayRef = useRef(null);
  const busyRef    = useRef(false);
  const [visible, setVisible] = useState(false);

  const startTransition = useCallback((route) => {
    if (busyRef.current) return;

    // passos da mesma tela: troca direto, a própria tela anima a mudança
    const from = findItem(pathname);
    if (from && from === findItem(route)) {
      navigate(route);
      return;
    }

    busyRef.current = true;
    setVisible(true);

    requestAnimationFrame(() => {
      const el = overlayRef.current;
      if (!el) return;

      gsap.fromTo(el, { opacity: 0 }, {
        opacity: 1,
        duration: 0.4,
        ease: 'power2.inOut',
        onComplete: () => {
          navigate(route);
          gsap.to(el, {
            opacity: 0,
            duration: 0.5,
            delay: 0.15,
            ease: 'power2.inOut',
            onComplete: () => {
              busyRef.current = false;
              setVisible(false);
            },
          });
        },
      });
    });
  }, [navigate, pathname]);

  return (
    <TransitionContext.Provider value={{ startTransition }}>
      {children}
      {visible && (
        <div ref={overlayRef} style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9000,
          background: overlayColor,
          opacity: 0,
        }} />
      )}
    </TransitionContext.Provider>
  );
}

export function useTransition() {
  return useContext(TransitionContext);
}
