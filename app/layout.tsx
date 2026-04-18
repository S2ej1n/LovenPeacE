import { Noto_Sans_KR } from 'next/font/google';
import { ReactNode } from 'react';
import './globals.css';
import styles from './layout.module.css';
import Image from 'next/image';

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
      </body>
    </html>
  );
}