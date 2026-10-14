import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import FormulaBackground from '../../../components/FormulaBackground/FormulaBackground';
import GroupChips from '../../../components/GroupChips/GroupChips';
import styles from './Cases.module.css';

const IMG = '/img/estrategia/cases';

/* ===== partes comuns dos cases ===== */

function Titulo({ nome, empresa }) {
  return (
    <div className={styles.titleBlock} data-anim="item">
      <p className={styles.nome}>{nome}</p>
      <p className={styles.empresa}>{empresa}</p>
    </div>
  );
}

function Pill({ top, children }) {
  return <p className={styles.pill} style={{ top }} data-anim="item">{children}</p>;
}

/* ===== Luxor – Bella Vida Graminha (Figma "Tela 7") ===== */

function CaseLuxor() {
  return (
    <>
      {/* card verde com linhas em "overlay" e a logo */}
      <div className={styles.card} style={{ background: '#1b542c' }} data-anim="card">
        <img src={`${IMG}/linhas-1.svg`} alt="" className={styles.cardLines} style={{ left: -112, top: -70 }} />
        <img src={`${IMG}/linhas-2.svg`} alt="" className={styles.cardLines} style={{ left: 81, top: 438, rotate: '180deg' }} />
        <img src={`${IMG}/linhas-3.svg`} alt="" className={styles.cardLines} style={{ left: -142, top: -90 }} />
        <img src={`${IMG}/linhas-4.svg`} alt="" className={styles.cardLines} style={{ left: 111, top: 398, rotate: '180deg' }} />
        <img src={`${IMG}/logo-bella-vida.svg`} alt="Bella Vida Graminha" width="296" height="95"
          className={styles.cardArt} style={{ left: 73, top: 307 }} />
      </div>

      <Titulo nome="Bella Vida Graminha" empresa="Luxor Engenharia" />

      <Pill top={324}>Nosso desafio</Pill>
      <p className={styles.texto} style={{ top: 374, width: 667 }} data-anim="item">
        Junto com o lançamento do cliente, iriam acontecer outros dois lançamentos na cidade, na mesma época e
        para o mesmo público-alvo
      </p>
      <p className={styles.texto} style={{ top: 433, width: 715 }} data-anim="item">
        <b className={styles.orange}>Tendo isso em vista</b>, sabíamos que para conseguir cumprir a meta mínima de
        vendas para o lançamento, <b>precisaríamos fazer com que o corretor comprasse a ideia do produto:</b>
      </p>

      <div className={styles.acao} style={{ left: 881, top: 508, width: 471, height: 181 }} data-anim="item">
        <div style={{ width: 383 }}>
          <p>Ajudamos na melhor definição de comissionamento, bonificação e premiação.</p>
          <p>Auxílio na definição do cronograma do Meeting do empreendimento na cidade</p>
        </div>
      </div>
      <div className={styles.acao} style={{ left: 1371, top: 508, width: 465, height: 84 }} data-anim="item">
        <div style={{ width: 426 }}>
          <p>Proximidade no auxílio da rotina do stand de vendas:</p>
        </div>
      </div>
      <div className={styles.acao} style={{ left: 1371, top: 605, width: 465, height: 84 }} data-anim="item">
        <div style={{ width: 426 }}>
          <p>Insights de novas ideias de eventos, como:</p>
          <p><b>corujão dos corretores</b></p>
        </div>
      </div>

      <p className={styles.resultadosTitle} data-anim="item">Alguns resultados:</p>
      {[['Evento do Meeting:', '25/08'], ['abertura das vendas:', '01/09']].map(([label, data], i) => (
        <div key={label} className={styles.data} style={{ left: 881 + i * 188 }} data-anim="item">
          <p className={styles.dataLabel}>{label}</p>
          <img src={`${IMG}/calendario.svg`} alt="" width="39" height="39" className={styles.dataIcon} />
          <p className={styles.dataValor}>{data}</p>
        </div>
      ))}
      <span className={styles.divisor} data-anim="item" />
      <p className={styles.objetivo} data-anim="item">Objetivo mínimo: <b>60 vendas em 60 dias</b></p>
      <p className={styles.resultado} data-anim="item">Resultado: <b>mais de 31 vendas em 20 dias</b></p>
    </>
  );
}

/* ===== Abou Hala – Zahra Residence (Figma "Tela 9") ===== */

function CaseZahra() {
  return (
    <>
      {/* card creme com a logo e a flor (cortada pela borda do card) */}
      <div className={`${styles.card} ${styles.cardShadow}`} style={{ background: '#fff8ef' }} data-anim="card">
        <img src={`${IMG}/logo-zahra.svg`} alt="Zahra Residence" width="253" height="198"
          className={styles.cardArt} style={{ left: 110, top: 189 }} />
        <div className={styles.cardArt} style={{ left: 36, top: 413, width: 367, height: 271, overflow: 'hidden' }}>
          <img src={`${IMG}/flor-zahra.svg`} alt="" width="367" height="366" style={{ display: 'block' }} />
        </div>
      </div>

      <Titulo nome="Zahra Residence" empresa="Abou Hala" />

      <Pill top={324}>Nosso desafio</Pill>
      <p className={styles.texto} style={{ top: 374, width: 833 }} data-anim="item">
        Os serviços foram contratados pelo dono da imobiliária, onde os tios são os incorporadores. Em tese o
        incorporador pagaia 6% do VGV para a imobiliária, com valor do marketing reduzido do comissionamento.
      </p>
      <p className={styles.texto} style={{ top: 433, width: 845 }} data-anim="item">
        Em um primeiro momento, a imobiliária iria cuidar de 100% das vendas sem abrir para o mercado, porém, o
        risco seria muito alto.
      </p>

      <Pill top={525}>Papel essencial da Balzani</Pill>
      <div className={styles.acao} style={{ left: 879, top: 576, width: 471, height: 143 }} data-anim="item">
        <div style={{ width: 383 }}>
          <p><b>Planejar a Estrutura Interna:</b> SDR + House + Plantão de Vendas no Stand de Vendas</p>
        </div>
      </div>
      <div className={styles.acao} style={{ left: 1372, top: 576, width: 471, height: 143 }} data-anim="item">
        <div style={{ width: 366 }}>
          <p className={styles.regular}>
            <b>Estrutura Externa:</b> estabelecer um relacionamento com as principais imobiliárias da cidade,
            estabelecendo um boa política de comissionamento e bonificação
          </p>
        </div>
      </div>

      <div className={styles.destaque} data-anim="item">
        <p>
          Além dos serviços prestados, a Balzani fez o papel de consultoria para aconselhar que o empreendimento
          fosse aberto para o mercado, inclusivo inserindo outras imobiliárias no plantão de vendas, mas com o
          Corretor atuando como um Coordenador Comercial.
        </p>
        <p>
          Para isso, junto ao time, revemos os custos de marketing do projeto, para que a comissão do Coordenador
          ser o suficiente
        </p>
      </div>
    </>
  );
}

/* ===== Nexus Empreendimentos – Mônaco Residencial (Figma "Tela 8") ===== */

function CaseMonaco() {
  return (
    <>
      {/* card com a textura creme e a logo */}
      <div className={`${styles.card} ${styles.cardShadow}`} data-anim="card">
        <img src={`${IMG}/monaco-fundo.jpg`} alt="" className={styles.cardFoto} />
        <img src={`${IMG}/logo-monaco.svg`} alt="Mônaco Residencial" width="285" height="70"
          className={styles.cardArt} style={{ left: 79, top: 298 }} />
      </div>

      <Titulo nome="Mônaco Residencial" empresa="Nexus Empreendimentos" />

      <Pill top={324}>Nosso desafio</Pill>
      <p className={styles.texto} style={{ top: 374, width: 784 }} data-anim="item">
        Antes de abrir para mercado, o cliente precisava <b>angariar recursos para custear 100% da obra.</b>
      </p>

      <Pill top={446}>Papel essencial da Balzani</Pill>
      <p className={styles.texto} style={{ top: 496, width: 849 }} data-anim="item">
        A Balzani entrou com um plano para ela lançar a mercado uma campanha para investidor, onde o fluxo de
        pagamento seria em no máximo 12 meses e ele comercializava a uma preço do m² mais com menor valor
      </p>

      <span className={styles.linhaResultado} data-anim="item" />
      <p className={styles.resultadosTitle} style={{ top: 641 }} data-anim="item">Resultado</p>
      <span className={styles.iconeResultado} data-anim="item">
        <img src={`${IMG}/icone-resultado.svg`} alt="" width="20" height="20" />
      </span>
      <p className={styles.texto} style={{ left: 943, top: 702, width: 781 }} data-anim="item">
        Além de desenvolver toda a campanha onde ele precisava comercializar 12 unidades para financiar o
        projeto, <b>graças ao nosso plano de ação, conseguimos vender 15 unidades em apenas 45 dias</b>
      </p>
    </>
  );
}

// cases (abas). `Conteudo: null` = ainda sem layout no Figma
const CASES = [
  { aba: 'Luxor - Bella Vida Graminha', Conteudo: CaseLuxor },
  { aba: 'Abou Hala - Zahra Residence', Conteudo: CaseZahra },
  { aba: 'Nexus Empreendimentos - Mônaco Residencial', Conteudo: CaseMonaco },
];

/** Estratégia · Cases: abas com os cases de lançamento (cada case tem o seu layout). */
export default function Cases() {
  const rootRef = useRef(null);
  const contentRef = useRef(null);
  const [tab, setTab] = useState(0);
  const first = useRef(true);
  const { Conteudo } = CASES[tab];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from('[data-anim="bg"]',    { opacity: 0, duration: 1.4, ease: 'power2.out' }, 0)
        .from('[data-anim="chips"]', { opacity: 0, duration: 0.6 }, 0.3)
        .from('[data-anim="tab"]',   { opacity: 0, y: -12, duration: 0.5, stagger: 0.08 }, 0.15);
    }, rootRef);
    return () => ctx.revert();
  }, []);

  // entrada do conteúdo (na abertura e a cada troca de aba)
  useLayoutEffect(() => {
    const delay = first.current ? 0.3 : 0;
    first.current = false;
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: 'power3.out' }, delay })
        .from('[data-anim="card"]', { opacity: 0, y: 24, duration: 0.8 }, 0)
        .from('[data-anim="item"]', { opacity: 0, y: 16, duration: 0.5, stagger: 0.06 }, 0.15);
    }, contentRef);
    return () => ctx.revert();
  }, [tab]);

  return (
    <div ref={rootRef}>
      <FormulaBackground />
      <GroupChips group="Estratégia" />

      <div className={styles.tabs}>
        {CASES.map((cs, i) => (
          <button key={cs.aba} className={`${styles.tab} ${i === tab ? styles.tabActive : ''}`}
            onClick={() => setTab(i)} data-anim="tab">
            {cs.aba}
          </button>
        ))}
      </div>

      <div ref={contentRef} key={tab}>
        {Conteudo ? <Conteudo /> : <p className={styles.emBreve} data-anim="card">Case em breve</p>}
      </div>
    </div>
  );
}
