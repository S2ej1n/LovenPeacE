'use client';

import styles from './NavBar.module.css';

const NAV_ITEMS: string[] = ['공연소개', '참가신청', '기획팀'];

interface NavBarProps {
  currentSection: 'hero' | 'form';
  onNavClick?: (item: string) => void;
}

export default function NavBar({ currentSection, onNavClick }: NavBarProps) {
  const active = currentSection === 'form' ? '참가신청' : '공연소개';

  return (
    <nav className={styles.nav}>
      {NAV_ITEMS.map((item: string, index: number) => (
        <div key={item} className={styles.navItemWrap}>
          {index !== 0 && <span className={styles.divider} />}

          <div className={styles.navItem} onClick={() => onNavClick?.(item)}>
            <a className={`${styles.navLink} ${active === item ? styles.active : ''}`} href="#">
              {item}
            </a>
            {active === item && <span className={styles.activeDot} />}
          </div>
        </div>
      ))}
    </nav>
  );
}
