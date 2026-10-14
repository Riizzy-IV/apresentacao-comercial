import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTransition } from '../../context/TransitionContext';
import { SECTIONS, SLIDES, findSection } from '../../data/sections';
import styles from './BottomNav.module.css';

export default function BottomNav() {
  const { pathname } = useLocation();
  const { startTransition } = useTransition();

  const current = findSection(pathname);
  const slide = SLIDES.indexOf(pathname);
  const prev = SLIDES[slide - 1];
  const next = SLIDES[slide + 1];

  const go = (route) => {
    if (route && route !== pathname) startTransition(route);
  };

  // teclado: setas → / ← e Page Down / Page Up (teclas dos passadores de slide)
  useEffect(() => {
    const onKey = (e) => {
      if (e.altKey || e.ctrlKey || e.metaKey || e.repeat) return;
      if (e.key === 'ArrowRight' || e.key === 'PageDown') { e.preventDefault(); go(next); }
      if (e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); go(prev); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  return (
    <nav className={styles.root}>
      <img src="/img/icons/line.svg" alt="" width="1827" height="1" className={styles.line} />

      <div className={styles.row}>
        <button
          className={styles.arrow}
          onClick={() => go(prev)}
          disabled={!prev}
          aria-label="Anterior"
        >
          <img src="/img/icons/chevron.svg" alt="" width="8.6" height="17.34" />
        </button>

        {SECTIONS.map(s => {
          // na Home o botão "Início" não fica destacado (igual ao Figma)
          const active = s === current && s.route !== '/';
          return (
            <button
              key={s.route}
              className={`${styles.btn} ${active ? styles.active : ''}`}
              onClick={() => go(s.entry ?? s.route)}
              aria-current={s === current ? 'page' : undefined}
            >
              <span className={styles.icon}>
                <img src={active && s.iconActive ? s.iconActive : s.icon} alt="" width={s.iconW} height={s.iconH} />
              </span>
              <span className={styles.label}>{s.label}</span>
            </button>
          );
        })}

        <button
          className={`${styles.arrow} ${styles.arrowNext}`}
          onClick={() => go(next)}
          disabled={!next}
          aria-label="Próximo"
        >
          <img src="/img/icons/chevron.svg" alt="" width="8.6" height="17.34" />
        </button>
      </div>
    </nav>
  );
}
