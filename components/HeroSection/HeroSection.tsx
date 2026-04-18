'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './HeroSection.module.css';
import NavBar from '../NavBar/NavBar';
import InfoIntro from '../InfoIntro/InfoIntro';
import InfoSection from '../InfoSection/InfoSection';
import FormSection from '../FormSection/FormSection';

interface HeartConfig {
  id: number;
  styleClass: string;
  width: number;
  height: number;
}

const HEARTS: HeartConfig[] = [
  { id: 1, styleClass: styles.h1, width: 140, height: 140 },
  { id: 2, styleClass: styles.h2, width: 130,  height: 130  },
  { id: 3, styleClass: styles.h3, width: 90,  height: 70  },
  { id: 4, styleClass: styles.h4, width: 130,  height: 120  },
  { id: 5, styleClass: styles.h5, width: 120, height: 110 },
  { id: 6, styleClass: styles.h6, width: 150,  height: 100  },
  { id: 7, styleClass: styles.h7, width: 130,  height: 55  },
];

export type Section = 'hero' | 'intro' | 'info' | 'form';
const SECTIONS: Section[] = ['hero', 'intro', 'info', 'form'];

function getLayerClass(layer: Section, current: Section, s: Record<string, string>) {
  const li = SECTIONS.indexOf(layer);
  const ci = SECTIONS.indexOf(current);
  if (li === ci) return s.layerVisible;
  if (li < ci)  return s.layerHiddenUp;
  return s.layerHiddenDown;
}

export default function HeroSection() {
  const [currentSection, setCurrentSection] = useState<Section>('hero');
  const currentSectionRef = useRef<Section>(currentSection);
  const infoLayerRef = useRef<HTMLDivElement>(null);
  const formLayerRef = useRef<HTMLDivElement>(null);

  const getActiveScrollable = (): HTMLElement | null => {
    const section = currentSectionRef.current;
    const layerEl =
      section === 'info' ? infoLayerRef.current :
      section === 'form' ? formLayerRef.current : null;
    return layerEl ? (layerEl.firstElementChild as HTMLElement) : null;
  };

  useEffect(() => {
    currentSectionRef.current = currentSection;
  }, [currentSection]);

  useEffect(() => {
    let cooldown = false;
    let touchStartY = 0;

    const go = (dir: 1 | -1) => {
      if (cooldown) return;
      cooldown = true;
      setTimeout(() => { cooldown = false; }, 900);

      const idx = SECTIONS.indexOf(currentSectionRef.current);
      const next = SECTIONS[idx + dir];
      if (next) setCurrentSection(next);
    };

    const handleWheel = (e: WheelEvent) => {
      const scrollable = getActiveScrollable();
      if (scrollable) {
        const { scrollTop, scrollHeight, clientHeight } = scrollable;
        if (e.deltaY > 0 && scrollTop + clientHeight < scrollHeight - 2) return;
        if (e.deltaY < 0 && scrollTop > 2) return;
      }
      go(e.deltaY > 0 ? 1 : -1);
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const handleTouchEnd = (e: TouchEvent) => {
      const diff = touchStartY - e.changedTouches[0].clientY;
      if (Math.abs(diff) < 50) return;
      const scrollable = getActiveScrollable();
      if (scrollable) {
        const { scrollTop, scrollHeight, clientHeight } = scrollable;
        if (diff > 0 && scrollTop + clientHeight < scrollHeight - 2) return;
        if (diff < 0 && scrollTop > 2) return;
      }
      go(diff > 0 ? 1 : -1);
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  const handleNavClick = (item: string) => {
    if (item === '공연소개') setCurrentSection('hero');
    if (item === '참가신청') setCurrentSection('form');
  };

  const layerClass = (layer: Section) =>
    `${styles.layer} ${getLayerClass(layer, currentSection, styles)}`;

  return (
    <main className={styles.scene}>
      {/* 배경 orbit */}
      {/* <Image
        className={styles.orbitImg}
        src="/orbit.png"
        alt="orbit"
        width={1200}
        height={800}
        priority
      />
       */}
      {/* Navigation */}
      <NavBar currentSection={currentSection} onNavClick={handleNavClick} />

      {/* Hero Layer */}
      <div className={layerClass('hero')}>
        <section className={styles.titleWrap}>
          <div className={styles.logoWrap}>
            <Image
              src="/logo/lovenpeace.png"
              alt="Love and Peace"
              width={600}
              height={300}
              className={styles.titleFloat}
            />
            {HEARTS.map(({ id, styleClass, width, height }: HeartConfig) => (
              <Image
                key={id}
                className={`${styles.heart} ${styleClass}`}
                src={`/hearts/heart${id}.png`}
                alt={`heart ${id}`}
                width={width}
                height={height}
              />
            ))}
          </div>
        </section>
      </div>

      {/* Intro Layer */}
      <div className={layerClass('intro')}>
        <InfoIntro isActive={currentSection === 'intro'} />
      </div>

      {/* Info Layer */}
      <div ref={infoLayerRef} className={layerClass('info')}>
        <InfoSection isActive={currentSection === 'info'} />
      </div>

      {/* Form Layer */}
      <div ref={formLayerRef} className={layerClass('form')}>
        <FormSection />
      </div>
    </main>
  );
}
