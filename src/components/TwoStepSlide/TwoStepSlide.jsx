import { useEffect, useLayoutEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { useTransition } from '../../context/TransitionContext';
import { SLIDES, findItem } from '../../data/sections';
import styles from './TwoStepSlide.module.css';

/**
 * Tela de dois passos (sub-tela com `steps` em data/sections.js):
 *  - passo 1: o título (`title`) ocupa o centro;
 *  - passo 2 (rota contendo `stepSuffix`): o título encolhe e vai para a esquerda
 *    (`to`: deslocamento/escala a partir de `origin`) e um painel de vidro entra pela direita
 *    com a lista `items`. A troca de passo anima no lugar, sem a transição de fade.
 *
 * `revealOneByOne`: no passo 2 os itens aparecem um de cada vez. Cada item é um passo
 * (`<stepSuffix>/1`, `/2`…), então a seta "próximo" revela o seguinte e a "anterior" esconde;
 * um toque/clique na tela também avança — sempre dentro da mesma tela.
 *
 * Marcações de animação dentro de `title`: data-anim="title-in" (entram em sequência)
 * e data-anim="line" (linha que cresce da esquerda). `background` usa data-anim="bg".
 */
export default function TwoStepSlide({
  stepSuffix, origin, to, background, title,
  items, list, divider, panelHeight, revealOneByOne = false,
}) {
  const { pathname } = useLocation();
  const { startTransition } = useTransition();
  const step = pathname.includes(stepSuffix) ? 2 : 1;
  const n = Number(pathname.match(/\/(\d+)$/)?.[1]);
  const revealed = step === 1 ? 0 : (revealOneByOne && n ? Math.min(n, items.length) : items.length);

  const rootRef = useRef(null);
  const ctxRef = useRef(null);
  const firstStep = useRef(step);
  const prevRevealed = useRef(revealed);

  // entrada da tela (no passo em que ela foi aberta)
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const s2 = firstStep.current === 2;
      gsap.set('[data-anim="group"]', s2 ? to : { x: 0, y: 0, scale: 1 });
      gsap.set('[data-anim="panel"]', { autoAlpha: s2 ? 1 : 0, x: s2 ? 0 : 160 });
      const itemEls = gsap.utils.toArray('[data-anim="item"]', rootRef.current);
      gsap.set(itemEls.slice(revealed), { autoAlpha: 0 });

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from('[data-anim="bg"]',       { opacity: 0, duration: 1.4, ease: 'power2.out' }, 0)
        .from('[data-anim="title-in"]', { opacity: 0, y: 30, duration: 0.8, stagger: 0.2 }, 0.2)
        .from('[data-anim="line"]',     { scaleX: 0, transformOrigin: 'left center', duration: 0.8 }, 0.8);
      if (s2 && revealed) tl.from(itemEls.slice(0, revealed), { opacity: 0, x: 40, duration: 0.6, stagger: 0.12 }, 0.6);
    }, rootRef);
    ctxRef.current = ctx;
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // troca de passo pelas setas: anima no lugar
  useEffect(() => {
    const ctx = ctxRef.current;
    if (!ctx || (step === firstStep.current && !ctx.changed)) return;
    ctx.changed = true;

    ctx.add(() => {
      const ease = 'power3.inOut';
      if (step === 2) {
        gsap.to('[data-anim="group"]', { ...to, duration: 0.9, ease });
        gsap.to('[data-anim="panel"]', { autoAlpha: 1, x: 0, duration: 0.8, ease: 'power3.out', delay: 0.15 });
      } else {
        gsap.to('[data-anim="panel"]', { autoAlpha: 0, x: 160, duration: 0.6, ease });
        gsap.to('[data-anim="group"]', { x: 0, y: 0, scale: 1, duration: 0.9, ease, delay: 0.1 });
      }
    });
  }, [step, to]);

  // itens revelados: entram os novos, saem os que deixaram de estar visíveis
  useEffect(() => {
    const ctx = ctxRef.current;
    const prev = prevRevealed.current;
    prevRevealed.current = revealed;
    if (!ctx || prev === revealed) return;

    ctx.add(() => {
      const itemEls = gsap.utils.toArray('[data-anim="item"]', rootRef.current);
      if (revealed > prev) {
        // vindo do passo 1 o painel ainda está entrando: espera um pouco
        const delay = prev === 0 ? 0.35 : 0;
        gsap.fromTo(itemEls.slice(prev, revealed), { autoAlpha: 0, x: 40 },
          { autoAlpha: 1, x: 0, duration: 0.6, stagger: 0.12, ease: 'power3.out', delay, overwrite: true });
      } else {
        gsap.to(itemEls.slice(revealed, prev), { autoAlpha: 0, x: 40, duration: 0.35, ease: 'power2.in', overwrite: true });
      }
    });
  }, [revealed]);

  // toque/clique na tela: avança para o próximo passo desta mesma tela (se houver)
  const onTap = () => {
    if (!revealOneByOne) return;
    const next = SLIDES[SLIDES.indexOf(pathname) + 1];
    if (next && findItem(next) === findItem(pathname)) startTransition(next);
  };

  return (
    <div ref={rootRef} className={styles.root} onClick={onTap}>
      {background}

      {/* painel de vidro à direita (continua além do Canvas em telas largas) */}
      <div className={styles.panel} style={{ height: panelHeight }} data-anim="panel">
        <ul className={styles.list} style={{ left: list.left - 1102, top: list.top, width: list.width }}>
          {items.map((it, i) => (
            <li key={i} data-anim="item">
              {i > 0 && <img src={divider.src} alt="" width={divider.width} height="1" className={styles.divider} />}
              <div className={styles.item}>
                {/* ícone nítido por cima da versão desfocada (brilho), como no Figma */}
                <span className={styles.icon} style={{ width: it.icon.size, height: it.icon.size, margin: -it.icon.bleed }}>
                  <img src={it.icon.glow} alt="" width={it.icon.size} height={it.icon.size} />
                  <img src={it.icon.sharp} alt="" width={it.icon.size} height={it.icon.size} />
                </span>
                <div className={styles.text}>
                  <p className={styles.itemTitle} style={{ width: it.titleW, lineHeight: it.titleLH ?? 1 }}>{it.title}</p>
                  <p className={styles.itemDesc} style={{ width: it.descW }}>{it.text}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* bloco do título por cima do painel (como no Figma); escala a partir de `origin` */}
      <div className={styles.group} style={{ transformOrigin: `${origin[0]}px ${origin[1]}px` }} data-anim="group">
        {title}
      </div>
    </div>
  );
}
