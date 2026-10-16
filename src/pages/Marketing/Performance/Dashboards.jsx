import Projetos from '../Conceito/Projetos';
import styles from './Dashboards.module.css';

// print do dashboard do projeto, rolando dentro do painel
const print = src => () => <img src={src} alt="" className={styles.print} draggable={false} />;

// dashboards de mídia por projeto (abas). No Figma as quatro abas ainda repetem o mesmo projeto
const PROJETOS = [1, 2, 3, 4].map(() => ({
  nome: 'Recanto Tatuamunha', cliente: 'ACF Lucas',
  Conteudo: print('/img/marketing/performance/dashboard-recanto.jpg'),
}));

/** Marketing · Performance, passo 10 (Figma "Tela 17"): dashboard de resultados de cada projeto. */
export default function Dashboards() {
  return <Projetos projetos={PROJETOS} classes={{ abas: styles.abas, painel: styles.painel, nome: styles.nome }} />;
}
