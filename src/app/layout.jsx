import LayoutProvider from '@/lib/providers/LayoutProvider';
import QueryProvider from '@/lib/providers/QueryProvider';

import '@/styles/globals.css';
import { Geist, Geist_Mono } from 'next/font/google';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata = {
  title: 'Tada: Tangkap Dia!',
  description:
    'Temukan Pokémon, lihat detailnya, dan tangkap yang kamu suka! Simpan Pokémon favoritmu dan buat koleksi keren ala trainer sejati.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <QueryProvider>
          <LayoutProvider>{children}</LayoutProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
