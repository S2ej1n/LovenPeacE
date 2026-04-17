'use client';

import Image from 'next/image';
import styles from './HeroSection.module.css';
import NavBar from '../NavBar/NavBar';

interface HeartConfig {
  id: number;
  styleClass: string;
  width: number;
  height: number;
}

const HEARTS: HeartConfig[] = [
  // 1-더블하트 2-왼쪽아래 3-쪼글 4-맨오른쪽 위 하트 5-오른쪽보는 하트 6-내부 이중하트 7-이중하트
  { id: 1, styleClass: styles.h1, width: 140, height: 140 },
  { id: 2, styleClass: styles.h2, width: 130,  height: 130  },
  { id: 3, styleClass: styles.h3, width: 90,  height: 70  },
  { id: 4, styleClass: styles.h4, width: 130,  height: 120  },
  { id: 5, styleClass: styles.h5, width: 120, height: 110 },
  { id: 6, styleClass: styles.h6, width: 150,  height: 100  },
  { id: 7, styleClass: styles.h7, width: 130,  height: 55  },
];

export default function HeroSection() {
  return (
    <main className={styles.scene}>
      {/* Orbit ellipse image - 맨 뒤 레이어 */}
      <Image
        className={styles.orbitImg}
        src="/orbit.png"
        alt="orbit"
        width={1200}
        height={800}
        priority
      />

      {/* Navigation */}
      <NavBar />

      {/* Title */}
      <section className={styles.titleWrap}>
        <div className={styles.logoWrap}>
          <Image
              src="/logo/lovenpeace.png"
              alt="Love and Peace"
              width={600}
              height={300}
              className={styles.titleFloat}
          />

          {/* Hearts */}
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
    </main>
  );
}