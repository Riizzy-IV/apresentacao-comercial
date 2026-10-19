import { useLocation } from 'react-router-dom';
import { useTransition } from '../../context/TransitionContext';
import { SECTIONS } from '../../data/sections';
import styles from './GroupChips.module.css';

/**
 * Atalhos no topo das telas de um grupo do menu da Fórmula Vértice (linha pontilhada +
 * um botão por tela). `group` = rótulo do grupo em data/sections.js. O botão da tela atual
 * (ou de um passo dela) fica marcado.
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
        {items.map(it => {
          const ativo = it.route === pathname || it.steps?.includes(pathname);
          return (
            <button key={it.route} className={`${styles.chip} ${ativo ? styles.ativo : ''}`}
              aria-current={ativo ? 'page' : undefined}
              onClick={() => it.route !== pathname && startTransition(it.route)}>
              {it.label}
            </button>
          );
        })}
      </nav>
    </>
  );
}
