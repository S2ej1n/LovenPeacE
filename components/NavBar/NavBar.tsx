'use client';

import styles from './NavBar.module.css';

const NAV_ITEMS: string[] = ['공연정보', '참가신청', '기획팀'];

export default function NavBar() {
  return (
    <nav className={styles.nav}>
      {NAV_ITEMS.map((item: string) => (
        <a key={item} className={styles.navLink} href="#">
          {item}
        </a>
      ))}
    </nav>
  );
}