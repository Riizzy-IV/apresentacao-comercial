import { useLocation } from 'react-router-dom';
import { useTransition } from '../../context/TransitionContext';
import { SECTIONS } from '../../data/sections';
import styles from './GroupChips.module.css';

/**
 * Atalhos no topo das telas de um grupo do menu da Fórmula Vértice (linha pontilhada +
 * um botão por tela). `group` = rótulo do grupo em data/sections.js.
 */
export default function GroupChips({ group, anim = 'chips' }) {
  const { pathname } = useLocation();
  const { startTransition } = useTransition();
  const items = SECTIONS.find(s => s.route === '/formula').groups
    .find(g => g.label === group).items.filter(it => !it.hidden);

  return (
    <>
      <img src="/img/estrategia/linha-topo.svg" alt="" width="1569" height="2" className={styles.line} />
      <nav className={styles.chips} data-anim={anim}>
        {items.map(it => (
          <button key={it.route} className={styles.chip}
            onClick={() => it.route !== pathname && startTransition(it.route)}>
            {it.label}
          </button>
        ))}
      </nav>
    </>
  );
}
