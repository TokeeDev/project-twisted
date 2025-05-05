import type { Metadata } from 'next';
import Navbar from '../components/ui/Navbar';
import './globals.css';
export const metadata: Metadata = {
  title: 'Twisted Cantina | Mexican-inspired Cocktails & Nightlife in Pilsen',
  description: 'Twisted Cantina is a 21+ Mexican-inspired cocktail bar and dance club in Chicago\'s Pilsen neighborhood. Join us for creative cocktails, tacos & vibrant nightlife.'
};
export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="">
      <Navbar />
        {children}
      </body>
    </html>;
}