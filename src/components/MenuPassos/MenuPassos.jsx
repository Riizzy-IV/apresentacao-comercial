import { useLocation } from 'react-router-dom';
import { useTransition } from '../../context/TransitionContext';
import styles from './MenuPassos.module.css';

/**
 * Menu dos passos de uma tela, no canto superior direito (visual das abas dos Cases da Estratégia).
 * `itens`: [{ rota, label }]. O passo atual fica em laranja; trocar de passo não faz fade.
 * `compacto`: botões menores, para telas com muitos passos (cabe acima da linha pontilhada do topo).
 */
export default function MenuPassos({ itens, compacto = false }) {
  const { pathname } = useLocation();
  const { startTransition } = useTransition();

  return (
    <nav className={`${styles.menu} ${compacto ? styles.compacto : ''}`}>
      {itens.map(m => (
        <button key={m.rota} className={`${styles.item} ${m.rota === pathname ? styles.ativo : ''}`}
          onClick={() => m.rota !== pathname && startTransition(m.rota)}>
          {m.label}
        </button>
      ))}
    </nav>
  );
}
