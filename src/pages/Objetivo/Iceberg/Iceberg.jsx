import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import StageImage from '../../../components/StageImage/StageImage';
import styles from './Iceberg.module.css';

// a "ponta do iceberg": o que as agências entregam
const AGENCIAS = [
  'Logo e Identidade Visual',
  'Materiais de Marketing',
  'Tráfego Pago',
  'Social Media',
  'Acompanhamento comercial',
];

// a parte submersa: o que diferencia a Balzani
const BALZANI = [
  'Conhecimento prático na incorporação imobiliária',
  'Metodologia própria para lançamentos',
  'Estratégia, marketing e comercial centralizados em um único player',
  'Inteligência de dados em todo funil',
];

function List({ items, arrow, divider, className, anim }) {
  return (
    <ul className={className}>
      {items.map((t, i) => (
        <li key={i} data-anim={anim}>
          {i > 0 && <img src={divider} alt="" className={styles.divider} />}
          <p className={styles.row}>
            <img src={arrow} alt="" width="14.001" height="7.643" className={styles.arrow} />
            {t}
          </p>
        </li>
      ))}
    </ul>
  );
}

export default function Iceberg() {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from('[data-anim="bg"]',       { opacity: 0, duration: 1.4, ease: 'power2.out' }, 0)
        .from('[data-anim="a-title"]',  { opacity: 0, y: 16, duration: 0.6 }, 0.15)
        .from('[data-anim="a-item"]',   { opacity: 0, x: -16, duration: 0.5, stagger: 0.08 }, 0.3)
        .from('[data-anim="highlight"]',{ scaleX: 0, transformOrigin: 'left center', duration: 0.9 }, 0.8)
        .from('[data-anim="b-title"]',  { opacity: 0, x: -24, duration: 0.7 }, 1.0)
        .from('[data-anim="b-item"]',   { opacity: 0, x: -20, duration: 0.55, stagger: 0.1 }, 1.2)
        .from('[data-anim="quote"]',    { opacity: 0, y: 20, duration: 0.8 }, 1.4);
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef}>
      {/* iceberg em "overlay" a 60% sobre o azul (foto 4096x1790 em cover no frame).
          A animação fica no próprio elemento: um wrapper com opacidade isolaria a mesclagem. */}
      <StageImage src="/img/objetivo/iceberg/bg.jpg" x={-275.7} y={0} width={2471.4} height={1080}
        style={{ opacity: 0.6, mixBlendMode: 'overlay' }} data-anim="bg" />

      {/* o que as agências entregam (esmaecido) */}
      <div className={styles.agencias}>
        <p className={styles.agenciasTitle} data-anim="a-title">O que as agências de marketing entregam:</p>
        <List items={AGENCIAS} arrow="/img/objetivo/iceberg/seta-cinza.svg" divider="/img/objetivo/iceberg/linha-cinza.svg"
          className={styles.agenciasList} anim="a-item" />
      </div>

      {/* faixa de destaque atrás do título */}
      <div className={styles.highlight} data-anim="highlight">
        <div className={styles.highlightBar} />
        <div className={styles.highlightAccent} />
      </div>

      {/* o que diferencia a Balzani */}
      <div className={styles.balzani}>
        <p className={styles.balzaniTitle} data-anim="b-title">O que diferencia a BALZANI:</p>
        <List items={BALZANI} arrow="/img/objetivo/iceberg/seta-laranja.svg" divider="/img/objetivo/iceberg/linha-azul.svg"
          className={styles.balzaniList} anim="b-item" />
      </div>

      <div className={styles.quote} data-anim="quote">
        <img src="/img/objetivo/iceberg/aspas.svg" alt="" width="97" height="73" />
        <p>Fazer marketing, muitas empresas fazem, mas um lançamento exige muito mais…</p>
        <img src="/img/objetivo/iceberg/linha-citacao.svg" alt="" width="109" height="3" className={styles.quoteLine} />
      </div>
    </div>
  );
}
