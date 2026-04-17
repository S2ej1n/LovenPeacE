'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './HeroSection.module.css';
import NavBar from '../NavBar/NavBar';
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

export default function HeroSection() {
  const [currentSection, setCurrentSection] = useState<'hero' | 'form'>('hero');
  const currentSectionRef = useRef(currentSection);

  useEffect(() => {
    currentSectionRef.current = currentSection;
  }, [currentSection]);

  useEffect(() => {
    let cooldown = false;
    let touchStartY = 0;

    const handleWheel = (e: WheelEvent) => {
      if (cooldown) return;
      cooldown = true;
      setTimeout(() => { cooldown = false; }, 900);

      if (e.deltaY > 0 && currentSectionRef.current === 'hero') {
        setCurrentSection('form');
      } else if (e.deltaY < 0 && currentSectionRef.current === 'form') {
        setCurrentSection('hero');
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (cooldown) return;
      const diff = touchStartY - e.changedTouches[0].clientY;
      if (Math.abs(diff) < 50) return;
      cooldown = true;
      setTimeout(() => { cooldown = false; }, 900);

      if (diff > 0 && currentSectionRef.current === 'hero') {
        setCurrentSection('form');
      } else if (diff < 0 && currentSectionRef.current === 'form') {
        setCurrentSection('hero');
      }
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
    if (item === '참가신청') setCurrentSection('form');
    else if (item === '공연소개') setCurrentSection('hero');
  };

  return (
    <main className={styles.scene}>
      {/* 배경 orbit - 맨 뒤 레이어 */}
      <Image
        className={styles.orbitImg}
        src="/orbit.png"
        alt="orbit"
        width={1200}
        height={800}
        priority
      />

      {/* Navigation - 항상 표시 */}
      <NavBar currentSection={currentSection} onNavClick={handleNavClick} />

      {/* Hero Layer */}
      <div className={`${styles.layer} ${currentSection === 'hero' ? styles.layerVisible : styles.layerHiddenUp}`}>
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

      {/* Form Layer */}
      <div className={`${styles.layer} ${currentSection === 'form' ? styles.layerVisible : styles.layerHiddenDown}`}>
        <FormSection />
      </div>
    </main>
  );
}
