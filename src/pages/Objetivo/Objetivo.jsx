import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Canvas } from '../../components/ScaleWrapper/ScaleWrapper';
import StageImage from '../../components/StageImage/StageImage';
import OutlineGlow from '../../components/OutlineGlow/OutlineGlow';
import BottomNav from '../../components/BottomNav/BottomNav';
import styles from './Objetivo.module.css';

export default function Objetivo() {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from('[data-anim="video"]',   { opacity: 0, scale: 1.05, duration: 1.6, ease: 'power2.out' }, 0)
        .from('[data-anim="outline"]', { opacity: 0, duration: 1.4 }, 0.2)
        .from('[data-anim="kicker"]',  { opacity: 0, y: 16, duration: 0.6 }, 0.3)
        .from('[data-anim="title"]',   { opacity: 0, y: 30, duration: 0.9 }, 0.45)
        .from('[data-anim="script"]',  { opacity: 0, x: 40, duration: 0.9 }, 0.7)
        .from('[data-anim="body"]',    { opacity: 0, y: 16, duration: 0.7 }, 0.9);
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.root} ref={rootRef}>
      <Canvas>
        {/* vídeo do Figma ("video2" em x=238, alinhado à esquerda, altura 1080): enquanto
            public/videos/objetivo.mp4 não existir, mostra o quadro do design.
            O lado esquerdo fica sob o degradê preto, então não precisa cobrir até a borda. */}
        <StageImage
          src="/img/objetivo/video-poster.jpg"
          video="/videos/objetivo.mp4"
          x={238} y={0} width={1942.4} height={1080}
          coverLeft={false}
          data-anim="video"
        />

        <div className={styles.shade} />

        <OutlineGlow
          src="/img/objetivo/outline.svg" sharpSrc="/img/objetivo/outline-sharp.svg"
          left={409.2} top={-183.8} width={783.6} height={775.6}
          data-anim="outline"
        />

        <p className={styles.kicker} data-anim="kicker">Nossa missão é clara:</p>
        <h2 className={styles.title} data-anim="title">
          Substituir o improviso por<br />Inteligência
        </h2>
        <p className={styles.script} data-anim="script">aplicada</p>
        <p className={styles.body} data-anim="body">
          Transformamos lançamentos imobiliários em operações de alta performance, onde o resultado
          é garantido por método, dados e domínio do negócio.
        </p>

        <BottomNav />
      </Canvas>
    </section>
  );
}
