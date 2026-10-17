import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import VivaClub from './projetos/VivaClub';
import BelaVista from './projetos/BelaVista';
import OliveGarden from './projetos/OliveGarden';
import SolarDoCais from './projetos/SolarDoCais';
import Unica from './projetos/Unica';
import styles from './Projetos.module.css';

// projetos de conceito (abas). `Conteudo: null` = ainda sem layout no Figma
const PROJETOS = [
  { nome: 'Unica',         Conteudo: Unica },
  { nome: 'Bela Vista',    Conteudo: BelaVista },
  { nome: 'Olive Garden',  Conteudo: OliveGarden },
  { nome: 'Solar do Cais', Conteudo: SolarDoCais },
  { nome: 'VivaClub', cliente: 'Luiz Targa Engenharia', Conteudo: VivaClub },
];
/**
 * Marketing · Conceito, passo 2 (Figma "Tela 11"): abas com os projetos e, para cada um,
 * o brandbook num painel branco com rolagem. As setas laterais trocam de projeto.
 * Também usado no Enxoval e na Performance (`projetos` = outra lista; `classes` = ajustes de
 * estilo por tela, somados às classes padrão: `abas`, `painel`, `nome`, `cliente`).
 * Cada item pode ter `aba` = texto do botão, quando for diferente do nome mostrado no título,
 * e `opcoes` = vários projetos na mesma aba ({ nome, cliente, Conteudo }), escolhidos por botões
 * na linha do título. As opções carregam todas juntas (escondidas) para a troca ser instantânea.
 */
export default function Projetos({ projetos = PROJETOS, classes = {} }) {
  // abre no primeiro projeto com layout
  const [atual, setAtual] = useState(() => Math.max(0, projetos.findIndex(p => p.Conteudo || p.opcoes)));
  const [opcao, setOpcao] = useState(0);
  // versão de cada opção: a que sai de cena é recriada escondida (para vídeo tocando, volta ao topo)
  const [versoes, setVersoes] = useState({});
  const rootRef = useRef(null);
  const contentRef = useRef(null);
  const painelRef = useRef(null);
  const first = useRef(true);
  const { opcoes } = projetos[atual];
  const { nome, cliente, Conteudo } = opcoes ? opcoes[opcao] : projetos[atual];

  const trocar = i => { setAtual(i); setOpcao(0); setVersoes({}); };
  const ir = delta => trocar((atual + delta + projetos.length) % projetos.length);
  const escolher = i => {
    if (i === opcao) return;
    setVersoes(v => ({ ...v, [opcao]: (v[opcao] ?? 0) + 1 }));
    setOpcao(i);
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from('[data-anim="aba"]',  { opacity: 0, y: -12, duration: 0.5, stagger: 0.06 }, 0.1)
        .from('[data-anim="seta"]', { opacity: 0, scale: 0.8, duration: 0.5 }, 0.5);
    }, rootRef);
    return () => ctx.revert();
  }, []);

  // entrada do conteúdo (na abertura e a cada troca de projeto); o painel volta ao topo
  useLayoutEffect(() => {
    if (painelRef.current) painelRef.current.scrollTop = 0;
    const delay = first.current ? 0.2 : 0;
    first.current = false;
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: 'power3.out' }, delay })
        .from('[data-anim="titulo"]', { opacity: 0, x: -20, duration: 0.6 }, 0)
        .from('[data-anim="painel"]', { opacity: 0, y: 30, duration: 0.8 }, 0.1);
    }, contentRef);
    return () => ctx.revert();
  }, [atual, opcao]);

  return (
    <div ref={rootRef}>
      <img src="/img/estrategia/linha-topo.svg" alt="" width="1569" height="2" className={styles.linhaTopo} />

      <nav className={`${styles.abas} ${classes.abas ?? ''}`}>
        {projetos.map((p, i) => (
          <button key={i} className={`${styles.aba} ${i === atual ? styles.abaAtiva : ''}`}
            onClick={() => trocar(i)} data-anim="aba">
            {p.aba ?? p.nome}
          </button>
        ))}
      </nav>

      {opcoes && (
        <nav className={styles.opcoes}>
          {opcoes.map((o, i) => (
            <button key={i} className={`${styles.aba} ${i === opcao ? styles.abaAtiva : ''}`}
              onClick={() => escolher(i)}>
              {o.nome}
            </button>
          ))}
        </nav>
      )}

      <div ref={contentRef} key={atual}>
        <div className={styles.titulo} data-anim="titulo" key={opcao}>
          <p className={`${styles.nome} ${classes.nome ?? ''}`}>{nome}</p>
          {cliente && <p className={`${styles.cliente} ${classes.cliente ?? ''}`}>{cliente}</p>}
        </div>

        <div ref={painelRef} className={`${styles.painel} ${classes.painel ?? ''}`} data-anim="painel">
          {opcoes
            ? opcoes.map((o, i) => (
              <div key={`${i}-${versoes[i] ?? 0}`} className={styles.opcao} hidden={i !== opcao}>
                {o.Conteudo ? <o.Conteudo /> : <p className={styles.emBreve}>Em breve</p>}
              </div>
            ))
            : Conteudo ? <Conteudo /> : <p className={styles.emBreve}>Em breve</p>}
        </div>
      </div>

      {[[-1, 366, 'Projeto anterior'], [1, 1845, 'Próximo projeto']].map(([delta, left, label]) => (
        <button key={delta} className={`${styles.seta} ${delta > 0 ? styles.setaProxima : ''}`} style={{ left }}
          onClick={() => ir(delta)} aria-label={label} data-anim="seta">
          <img src="/img/marketing/seta-circulo.svg" alt="" width="58" height="58" className={styles.circulo} />
          <img src="/img/marketing/seta.svg" alt="" width="8.59753" height="17.34" className={styles.chevron} />
        </button>
      ))}
    </div>
  );
}
