import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ABAS } from '../../../data/cases';
import styles from './ResultadosNumeros.module.css';

// grade dos cards dentro da área de rolagem (que começa em x=397, y=131 no Canvas)
const COL_STEP = 458;
const ROW_STEP = 401;
const CARD_W = 435;

// posição das abas no Figma
const TAB_LEFT = { loteamentos: 1283, verticais: 1508, horizontais: 1695 };

function Card({ c, left, top }) {
  return (
    <article className={styles.card} style={{ left, top }} data-anim="card">
      <div className={styles.photo}>
        <img src={c.foto} alt={c.nome} />
        <span className={styles.tag}>{c.tipo}</span>
      </div>
      {c.selo100 && (
        <div className={styles.seal}>
          <strong>100%</strong>
          <span>Vendido</span>
        </div>
      )}
      <p className={styles.name}>{c.nome}</p>
      {c.local && (
        <p className={styles.local}>
          <img src="/img/objetivo/cases/pin.svg" alt="" width="17.4" height="20" />
          {c.local}
        </p>
      )}
      <img src="/img/objetivo/cases/linha.svg" alt="" width="412" height="1" className={styles.line} />
      <p className={styles.qty}>{c.quantidade}</p>
      <p className={styles.value}>{c.valor}</p>
      {c.status && <>
        <p className={styles.statusMain}>
          {c.alta && <img src="/img/objetivo/cases/alta.svg" alt="" width="21.5" height="21.5" className={styles.alta} />}
          {c.status.destaque}
        </p>
        <p className={styles.statusSub}>{c.status.detalhe}</p>
      </>}
      {c.statusSimples && (
        // texto (string) = 1 linha; JSX com <br /> = 2 linhas
        <div className={`${styles.statusSimpleRow} ${typeof c.statusSimples === 'string' ? '' : styles.statusSimpleTwoLines}`}>
          {c.alta && <img src="/img/objetivo/cases/alta.svg" alt="" width="21.5" height="21.5" className={styles.alta} />}
          <p className={styles.statusSimple}>{c.statusSimples}</p>
        </div>
      )}
    </article>
  );
}

/**
 * Área de cards com rolagem horizontal (arrastar com o dedo/mouse ou roda do mouse),
 * com a barra de rolagem personalizada do Figma. Até 6 cards: grade 3x2 sem rolagem.
 */
function CardsArea({ cards, tabKey }) {
  const scrollRef = useRef(null);
  const [bar, setBar] = useState({ left: 0, width: 1, show: false });
  const cols = cards.length > 6 ? Math.ceil(cards.length / 2) : 3;
  const contentW = (cols - 1) * COL_STEP + CARD_W;

  const updateBar = () => {
    const el = scrollRef.current;
    if (!el) return;
    const ratio = el.clientWidth / el.scrollWidth;
    const maxScroll = el.scrollWidth - el.clientWidth;
    const width = ratio * TRACK_W;
    setBar({
      width,
      left: maxScroll > 0 ? (el.scrollLeft / maxScroll) * (TRACK_W - width) : 0,
      show: maxScroll > 1,
    });
  };

  useEffect(() => {
    const el = scrollRef.current;
    el.scrollLeft = 0;
    updateBar();
    // roda do mouse rola na horizontal
    const onWheel = e => {
      if (el.scrollWidth <= el.clientWidth) return;
      e.preventDefault();
      el.scrollLeft += e.deltaY + e.deltaX;
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [tabKey]);

  // arrastar para rolar (mouse); no touch a rolagem nativa já funciona
  const drag = useRef(null);
  const onPointerDown = e => {
    if (e.pointerType !== 'mouse') return;
    drag.current = { x: e.clientX, left: scrollRef.current.scrollLeft, moved: false };
  };
  const onPointerMove = e => {
    if (!drag.current) return;
    const scale = scrollRef.current.getBoundingClientRect().width / scrollRef.current.offsetWidth;
    const dx = (e.clientX - drag.current.x) / scale;
    if (Math.abs(dx) > 3) drag.current.moved = true;
    scrollRef.current.scrollLeft = drag.current.left - dx;
  };
  const endDrag = () => { drag.current = null; };

  return (
    <>
      <div
        ref={scrollRef}
        className={styles.scroller}
        onScroll={updateBar}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
      >
        <div className={styles.track} style={{ width: contentW }}>
          {cards.map((c, i) => (
            <Card key={`${tabKey}-${i}`} c={c} left={(i % cols) * COL_STEP} top={Math.floor(i / cols) * ROW_STEP} />
          ))}
        </div>
      </div>

      {bar.show && (
        <div className={styles.scrollbar}>
          <div className={styles.scrollThumb} style={{ width: bar.width, transform: `translateX(${bar.left}px)` }} />
        </div>
      )}
    </>
  );
}

const TRACK_W = 1353;

export default function ResultadosNumeros() {
  const rootRef = useRef(null);
  const [sel, setSel] = useState({ aba: 'verticais', sub: 'alto-padrao' });
  const [open, setOpen] = useState(null); // id da aba com o menu aberto
  const aba = ABAS.find(a => a.id === sel.aba);
  const sub = aba.subs.find(s => s.id === sel.sub);
  const tab = `${sel.aba}/${sel.sub}`;
  const first = useRef(true);

  // toque fora fecha o menu
  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(null);
    window.addEventListener('click', close);
    return () => window.removeEventListener('click', close);
  }, [open]);

  const choose = (abaId, subId) => {
    setSel({ aba: abaId, sub: subId });
    setOpen(null);
  };

  // entrada da tela
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from('[data-anim="tab"]',   { opacity: 0, y: -12, duration: 0.5, stagger: 0.08 }, 0.1)
        .from('[data-anim="title"]', { opacity: 0, x: -20, duration: 0.6 }, 0.15)
        .from('[data-anim="card"]',  { opacity: 0, y: 30, duration: 0.7, stagger: 0.08 }, 0.3);
    }, rootRef);
    return () => ctx.revert();
  }, []);

  // troca de aba: título e cards entram de novo
  useEffect(() => {
    if (first.current) { first.current = false; return; }
    // fromTo com o estado final explícito: um "from" capturaria como destino a opacidade 0
    // deixada por outra animação em andamento (ex.: a de entrada) e ficaria invisível
    const ctx = gsap.context(() => {
      gsap.fromTo('[data-anim="title"]', { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.5, ease: 'power3.out', overwrite: true });
      gsap.fromTo('[data-anim="card"], [data-anim="empty"]', { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.55, stagger: 0.06, ease: 'power3.out', overwrite: true });
    }, rootRef);
    return () => ctx.revert();
  }, [tab]);

  return (
    <div ref={rootRef}>
      <h2 className={styles.title} data-anim="title">{sub.titulo ?? `${aba.label} ${sub.label}`}</h2>

      {/* abas: cada uma abre um menu com as subcategorias */}
      {ABAS.map(a => {
        const isOpen = open === a.id;
        const isActive = a.id === sel.aba;
        return (
          <div
            key={a.id}
            className={`${styles.tab} ${isActive && !isOpen ? styles.tabActive : ''} ${isOpen ? styles.tabOpen : ''}`}
            style={{ left: TAB_LEFT[a.id] }}
            onClick={e => e.stopPropagation()}
            data-anim="tab"
          >
            <button
              className={styles.tabHead}
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : a.id)}
            >
              <span className={styles.tabLabel}>{a.label}</span>
              <img src="/img/objetivo/cases/tab-icon.svg" alt="" width="24" height="24" className={styles.tabIcon} />
            </button>
            {isOpen && (
              <ul className={styles.options}>
                {a.subs.map(s => (
                  <li key={s.id}>
                    <button
                      className={isActive && s.id === sel.sub ? styles.optionActive : ''}
                      onClick={() => choose(a.id, s.id)}
                    >
                      {s.label}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      })}

      {sub.cards.length === 0 && (
        <p className={styles.empty} data-anim="empty">{aba.label} {sub.label} — em breve</p>
      )}

      {sub.cards.length > 0 && <CardsArea cards={sub.cards} tabKey={tab} />}
    </div>
  );
}
