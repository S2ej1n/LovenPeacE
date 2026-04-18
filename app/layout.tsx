import { Noto_Sans_KR } from 'next/font/google';
import { ReactNode } from 'react';
import './globals.css';
import styles from './layout.module.css';
import Image from 'next/image';
import { NavProvider } from '@/components/NavBar/NavContext';
import NavBar from '@/components/NavBar/NavBar';

const notoSansKR = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['300', '400'],
  variable: '--font-noto',
  display: 'swap',
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko" className={notoSansKR.variable}>
      <body>
        <NavProvider>
          <NavBar />
          {children}
          {/* 배경 orbit */}
          <Image
            className={styles.orbitImg}
            src="/orbit.png"
            alt="orbit"
            width={1200}
            height={800}
            priority
          />
        </NavProvider>
      </body>
    </html>
  );
}