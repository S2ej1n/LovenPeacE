// 메인페이지
import HeroSection from '@/components/HeroSection/HeroSection';
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Love and Peace',
  description: 'Love and Peace concert',
};

export default function Home() {
  return (
    <main>
      <HeroSection />
    </main>
  );
}
