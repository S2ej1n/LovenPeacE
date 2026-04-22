import { Noto_Sans_KR } from 'next/font/google';
import { ReactNode } from 'react';
import './globals.css';
import { Metadata } from 'next';
import styles from './layout.module.css';
import Image from 'next/image';
import { NavProvider } from '@/components/NavBar/NavContext';
import NavBar from '@/components/NavBar/NavBar';
import { Analytics } from '@vercel/analytics/next';

const notoSansKR = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['300', '400'],
  variable: '--font-noto',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'L♡vE and PeacE',
  description: 'ProJect LovE and PeacE 공식 홈페이지입니다.',
  openGraph: {
    title: 'L♡vE and PeacE',
    description: 'ProJect LovE and PeacE 공식 홈페이지입니다.',
    images: ['/opengraph.png'],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko" className={notoSansKR.variable}>
      <body>
        <NavProvider>
          <NavBar />
          {children}
          <Analytics />
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