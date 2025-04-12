'use client';

import Header from '@/components/layout/header';
import Navigation from '@/components/layout/navigation';
import React from 'react';
import { cn } from '../utils/helper';

export default function LayoutProvider({ children }) {
  return (
    <React.Fragment>
      <div className={cn(['relative flex h-[100svh] w-full flex-col bg-blue-50'])}>
        <Header />
        <main className={cn(['mx-auto h-[calc(100svh-4rem)] w-full max-w-6xl overflow-y-auto px-4 py-2 xl:max-w-7xl'])}>
          {children}

          <div className={cn(['h-16 w-full bg-transparent lg:h-8'])} />
        </main>
        <Navigation />
      </div>
    </React.Fragment>
  );
}
