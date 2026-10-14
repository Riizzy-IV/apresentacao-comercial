import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useTransition } from '../../context/TransitionContext';
import styles from './SectionSidebar.module.css';

/**
 * Menu lateral de uma seção: título (ou `logo`) e um ou mais grupos recolhíveis com as sub-telas.
 * `groups`: [{ label, items }] — o grupo da tela atual começa aberto, os outros fechados.
 * (atalho para um grupo só: `group` + `items`)
 */
export default function SectionSidebar({ title, logo, groups, group, items }) {
  const list = groups ?? [{ label: group, items }];
  const { pathname } = useLocation();
  const { startTransition } = useTransition();

  const isActive = item => item.route === pathname || !!item.steps?.includes(pathname);
  const [open, setOpen] = useState(() => {
    const current = list.findIndex(g => g.items.some(isActive));
    return new Set([current === -1 ? 0 : current]);
  });
  const toggle = i => setOpen(prev => {
    const next = new Set(prev);
    next.has(i) ? next.delete(i) : next.add(i);
    return next;
  });

  return (
    <aside className={styles.root}>
      {logo
        ? <img src={logo} alt={title} width="171" height="72" className={styles.logo} />
        : <p className={styles.title}>{title}</p>}
      <img src="/img/icons/sidebar-line.svg" alt="" width="353" height="1" className={styles.line} />

      <div className={styles.groups}>
        {list.map((g, i) => {
          const isOpen = open.has(i);
          const visible = g.items.filter(it => !it.intro && !it.hidden);
          return (
            <div key={g.label} className={`${styles.groupBlock} ${isOpen && visible.length ? styles.groupBlockOpen : ''}`}>
              <div className={styles.group}>
                <button className={styles.groupHeader} onClick={() => toggle(i)} aria-expanded={isOpen}>
                  <span className={styles.groupLabel}>{g.label}</span>
                  <span className={`${styles.groupIcon} ${isOpen ? styles.groupIconOpen : ''}`}>
                    <img src="/img/icons/accordion.svg" alt="" width="19.99" height="20" />
                  </span>
                </button>
                <img src="/img/icons/sidebar-divider.svg" alt="" width="234" height="1" />
              </div>

              {isOpen && visible.length > 0 && (
                <ul className={styles.list}>
                  {visible.map(item => {
                    // ativo também nos passos extras da tela; tocar nele num passo volta ao primeiro
                    const active = isActive(item);
                    return (
                      <li key={item.route}>
                        <button
                          className={`${styles.item} ${active ? styles.itemActive : ''}`}
                          onClick={() => item.route !== pathname && startTransition(item.route)}
                          aria-current={active ? 'page' : undefined}
                        >
                          <span className={styles.dot} />
                          {item.label}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
}
