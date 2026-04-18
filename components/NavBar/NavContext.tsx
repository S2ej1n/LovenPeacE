'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

export type Section = 'hero' | 'intro' | 'info' | 'form';

interface NavContextType {
  currentSection: Section;
  setCurrentSection: (s: Section) => void;
}

const NavContext = createContext<NavContextType>({
  currentSection: 'hero',
  setCurrentSection: () => {},
});

export function NavProvider({ children }: { children: ReactNode }) {
  const [currentSection, setCurrentSection] = useState<Section>('hero');
  return (
    <NavContext.Provider value={{ currentSection, setCurrentSection }}>
      {children}
    </NavContext.Provider>
  );
}

export const useNavContext = () => useContext(NavContext);
