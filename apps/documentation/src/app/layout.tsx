/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import './globals.css';
import '@/style.config';
import '@/locales';
import type { Metadata } from 'next';
import { NavBar } from '@/components/NavBar';
import { PropsWithChildren, Suspense } from 'react';
import { Footer } from '@/components/Footer';
import { CrossedUIProvider } from '@crossed/ui';
import { Registry } from '@crossed/styled';
import { createStyles } from '@crossed/styled';
import { Roboto } from 'next/font/google';
import { ScrollView } from '@/components/ScrollView';
import { className, rnw } from '@crossed/styled';

const roboto = Roboto({
  variable: '--font-inter',
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

// toto
const styleSheet = createStyles((t) => ({
  root: {
    base: {
      height: '100%',
      display: 'flex',
      flexShrink: 1,
      flexGrow: 1,
      flexDirection: 'column',
    },
  },
  body: {
    base: {
      backgroundColor: t.colors.background.secondary,
      minHeight: '100%',
      display: 'flex',
    },
  },
}));
export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang={'en'} className={`${Registry.themeName} ${roboto.className}`}>
      <head />
      <body {...className(styleSheet.body)}>
        <CrossedUIProvider>
          <Suspense>
            <ScrollView
              stickyHeaderIndices={[0]}
              {...rnw(styleSheet.root)}
              contentContainerStyle={{ minHeight: '100%' }}
            >
              <NavBar />
              {/* {children} */}
              {/* <Footer /> */}
            </ScrollView>
          </Suspense>
        </CrossedUIProvider>
      </body>
    </html>
  );
}
