'use client';

import { useRouter, usePathname } from 'next/navigation';
import styles from './NavBar.module.css';
import { useNavContext } from './NavContext';
import type { Section } from './NavContext';

const NAV_ITEMS: string[] = ['공연소개', '참가신청', '기획팀'];

export default function NavBar() {
  const router = useRouter();
  const pathname = usePathname();
  const { currentSection, setCurrentSection } = useNavContext();

  const active =
    pathname === '/planning-team' ? '기획팀' :
    currentSection === 'form' ? '참가신청' : '공연소개';

  const handleNavClick = (item: string) => {
    if (item === '기획팀') {
      router.push('/planning-team');
    } else {
      const section: Section = item === '참가신청' ? 'form' : 'hero';
      setCurrentSection(section);
      if (pathname !== '/') router.push('/');
    }
  };

  return (
    <nav className={styles.nav}>
      {NAV_ITEMS.map((item: string, index: number) => (
        <div key={item} className={styles.navItemWrap}>
          {index !== 0 && <span className={styles.divider} />}

          <div className={styles.navItem} onClick={() => handleNavClick(item)}>
            <span className={`${styles.navLink} ${active === item ? styles.active : ''}`}>
              {item}
            </span>
            {active === item && <span className={styles.activeDot} />}
          </div>
        </div>
      ))}
    </nav>
  );
}
