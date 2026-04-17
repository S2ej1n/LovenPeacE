'use client';

import { useState } from 'react';
import styles from './NavBar.module.css';

const NAV_ITEMS: string[] = ['공연소개', '참가신청', '기획팀'];

export default function NavBar() {
  const [active, setActive] = useState<string>('공연소개');

  return (
    <nav className={styles.nav}>
      {NAV_ITEMS.map((item: string, index: number) => (
        <div key={item} className={styles.navItemWrap}>
          {/* 구분자 점 */}
          {index !== 0 && <span className={styles.divider} />}

          <div className={styles.navItem} onClick={() => setActive(item)}>
            <a className={`${styles.navLink} ${active === item ? styles.active : ''}`} href="#">
              {item}
            </a>
            {/* 활성 아래 점 */}
            {active === item && <span className={styles.activeDot} />}
          </div>
        </div>
      ))}
    </nav>
  );
}