import { Fragment, useEffect, useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import StageImage from '../../../components/StageImage/StageImage';
import styles from './AttaPopup.module.css';

const IMG = '/img/atta3d/popup';

// fundo do painel do Figma: dois degradês radiais (brilho claro + roxo escuro). `w` = largura do painel
const fundoPainel = w => {
  const k = w / 1390;
  const grad = (op, m, stops) =>
    `url("data:image/svg+xml;utf8,<svg viewBox='0 0 ${w} 591' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='${op}'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='${m}'>${stops}</radialGradient></defs></svg>")`;
  const brilho = grad(1, `matrix(${-71.45 * k} -61.8 ${40.69 * k} -47.044 ${1750 * k} 913)`,
    "<stop stop-color='rgba(255,255,255,1)' offset='0'/><stop stop-color='rgba(201,186,214,0.86538)' offset='0.20913'/><stop stop-color='rgba(147,117,173,0.73077)' offset='0.41827'/><stop stop-color='rgba(147,117,173,0)' offset='1'/>");
  const roxo = grad(0.2, `matrix(${-59.45 * k} -45.55 ${45.55 * k} -59.45 ${995.5 * k} 591)`,
    "<stop stop-color='rgba(147,117,173,1)' offset='0'/><stop stop-color='rgba(110,88,130,1)' offset='0.25'/><stop stop-color='rgba(74,59,87,1)' offset='0.5'/><stop stop-color='rgba(55,44,65,1)' offset='0.625'/><stop stop-color='rgba(37,29,43,1)' offset='0.75'/><stop stop-color='rgba(18,15,22,1)' offset='0.875'/><stop stop-color='rgba(9,7,11,1)' offset='0.9375'/><stop stop-color='rgba(0,0,0,1)' offset='1'/>");
  return `${brilho}, ${roxo}`;
};

// conteúdo de cada produto (Figma "Quem Somos - Tela 10/13/14"). Posições em coordenadas do palco 1920×1080.
// `largura2` = largura do texto dos itens da 2ª coluna quando eles quebram em duas linhas;
// `fecharLeft` = posição do × (SVG com a margem do desfoque).
export const ATTA_POPUPS = {
  web: {
    nome: 'Atta Web', logo: { src: '/img/atta3d/atta-web.svg', w: 172, h: 63, left: 631, top: 238 },
    texto: 'Leve a apresentação para o ambiente digital e permita que o cliente explore o projeto de qualquer dispositivo',
    textoLeft: 632, textoW: 575, col1: 632, col2: 1040, painelW: 1390, fecharLeft: 1653.8,
    itens1: ['Modelagem do edifício', 'Plantas humanizadas e implantação', 'Imagens e vídeos 3D', 'Visualizações 360°'],
    itens2: ['Localização do projeto', 'Book digital', 'Vídeo conceito', 'Espelho de Venda com integração do CRM via API'],
    imagem: { src: `${IMG}/celular.webp`, left: 218, top: 384, w: 357, h: 526, className: styles.celular },
  },
  touch: {
    nome: 'Atta Touch', logo: { src: '/img/atta3d/atta-touch.svg', w: 208, h: 82, left: 631, top: 238 },
    texto: 'Transforme o projeto em uma experiência digital de alta performance.',
    textoLeft: 632, textoW: 575, col1: 632, col2: 1040, painelW: 1390, fecharLeft: 1653.8,
    // itens repetidos conforme o Figma
    itens1: ['Arquitetura e modelagem', 'Organização e conversão dos arquivos', 'Ajustes e modelagens adicionais',
      'Ajustes e modelagens adicionais', 'Humanização interna e externa'],
    itens2: ['Humanização interna e externa', 'Programação da experiência',
      'Espelho de Venda com integração do CRM via API', 'Passeio 3d nas áreas comuns e decorado'],
    imagem: { src: `${IMG}/totem.webp`, left: 78, top: 304, w: 585, h: 556 },
  },
  ultra: {
    nome: 'Atta Ultra', logo: { src: '/img/atta3d/atta-ultra.svg', w: 213, h: 54, left: 707, top: 242 },
    texto: 'Uma experiência presencial de alto impacto que transforma a apresentação do lançamento em algo mais envolvente e memorável.',
    textoLeft: 703, textoW: 704, col1: 703, col2: 1184, painelW: 1432, fecharLeft: 1690.9, largura2: 446,
    itens1: ['Projeção imersiva em grande escala', 'Sonorização integrada à experiência', 'Conteúdos 3D de alto impacto',
      'Maior sensação de presença dentro do projeto'],
    itens2: ['Apresentação envolvente de ambientes e perspectivas',
      'Experiência audiovisual para potencializar a percepção do produto',
      'Aplicação em stands e espaços de vendas', 'Mais impacto e conexão durante a apresentação comercial'],
    imagem: { src: `${IMG}/sala.webp`, left: 83, top: 259, w: 575, h: 388, className: styles.sala },
  },
};

function Coluna({ left, itens, linha, largura }) {
  return (
    <ul className={styles.lista} style={{ left }}>
      {itens.map((item, i) => (
        <Fragment key={i}>
          {i > 0 && <li aria-hidden data-anim="item"><img src={linha} alt="" width={linha.includes('471') ? 471 : 363} height="1" /></li>}
          <li className={styles.item} data-anim="item">
            <img src={`${IMG}/marcador.svg`} alt="" width="14.0007" height="7.64251" className={styles.marcador} />
            <span style={largura ? { width: largura, whiteSpace: 'normal' } : undefined}>{item}</span>
          </li>
        </Fragment>
      ))}
    </ul>
  );
}

/**
 * Pop-up de um produto Atta (tela cheia, por cima do menu e da barra inferior).
 * Fecha pelo ×, pela tecla Esc ou clicando fora do painel.
 */
export default function AttaPopup({ produto, onClose }) {
  const rootRef = useRef(null);
  const fechando = useRef(false);
  const p = ATTA_POPUPS[produto];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from(rootRef.current, { opacity: 0, duration: 0.35, ease: 'power2.out' }, 0)
        .from('[data-anim="painel"]', { opacity: 0, scale: 0.96, duration: 0.5 }, 0.05)
        .from('[data-anim="imagem"]', { opacity: 0, x: -40, duration: 0.7 }, 0.15)
        .from('[data-anim="texto"]',  { opacity: 0, y: 16, duration: 0.5, stagger: 0.08 }, 0.2)
        .from('[data-anim="item"]',   { opacity: 0, x: -12, duration: 0.35, stagger: 0.03 }, 0.35);
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const fechar = () => {
    if (fechando.current) return;
    fechando.current = true;
    gsap.to(rootRef.current, { opacity: 0, duration: 0.25, ease: 'power2.in', onComplete: onClose });
  };

  useEffect(() => {
    const tecla = e => e.key === 'Escape' && fechar();
    window.addEventListener('keydown', tecla);
    return () => window.removeEventListener('keydown', tecla);
  });

  return (
    <div ref={rootRef} className={styles.overlay} role="dialog" aria-modal="true" aria-label={p.nome}
      onClick={fechar}>
      {/* mesmo fundo da página */}
      <StageImage src="/img/atta3d/bg-gradient.jpg" x={0} y={-264} width={1920} height={1920} />
      <StageImage src="/img/atta3d/bg-overlay.jpg" x={-573} y={-373} width={2580} height={1440}
        style={{ mixBlendMode: 'overlay' }} />
      <img src={`${IMG}/brilho.svg`} alt="" width="725.6" height="725.6" className={styles.brilho} />

      {/* o conteúdo não fecha ao clicar; só o fundo */}
      <div onClick={e => e.stopPropagation()}>
        <div className={styles.painel} style={{ width: p.painelW, backgroundImage: fundoPainel(p.painelW) }}
          data-anim="painel" />

        <button className={styles.fechar} style={{ left: p.fecharLeft }} onClick={fechar} aria-label="Fechar">
          <img src={`${IMG}/fechar.svg`} alt="" width="48.4" height="48.4" />
        </button>

        <img src={p.logo.src} alt={p.nome} width={p.logo.w} height={p.logo.h} className={styles.abs}
          style={{ left: p.logo.left, top: p.logo.top }} data-anim="texto" />
        <p className={styles.texto} style={{ left: p.textoLeft, width: p.textoW }} data-anim="texto">{p.texto}</p>

        <Coluna left={p.col1} itens={p.itens1} linha={`${IMG}/linha-363.svg`} />
        <Coluna left={p.col2} itens={p.itens2} linha={`${IMG}/linha-471.svg`} largura={p.largura2} />

        <img src={p.imagem.src} alt="" className={`${styles.imagem} ${p.imagem.className ?? ''}`}
          style={{ left: p.imagem.left, top: p.imagem.top, width: p.imagem.w, height: p.imagem.h }}
          data-anim="imagem" draggable={false} />
      </div>
    </div>
  );
}
