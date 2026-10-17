import Projetos from '../Conceito/Projetos';
import styles from './Dashboards.module.css';

// print do dashboard do projeto, rolando dentro do painel
const print = src => () => <img src={src} alt="" className={styles.print} draggable={false} />;

// dashboards de mídia, uma aba por canal (cada print é de um projeto; o título acompanha a aba)
const PROJETOS = [
  { aba: 'Meta Ads',   nome: 'Recanto Tatuamunha', cliente: 'ACF Lucas',
    Conteudo: print('/img/marketing/performance/dashboard-meta-ads.jpg') },
  { aba: 'Google Ads', nome: 'Toca dos Meros',     cliente: 'PGG Engenharia e Incorporações',
    Conteudo: print('/img/marketing/performance/dashboard-google-ads.jpg') },
];

/** Marketing · Performance, passo 10 (Figma "Tela 17"): dashboard de resultados de cada projeto. */
export default function Dashboards() {
  return <Projetos projetos={PROJETOS} classes={{ abas: styles.abas, painel: styles.painel, nome: styles.nome }} />;
}
