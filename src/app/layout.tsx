import type { Metadata } from "next";
import Navbar from "../components/ui/Navbar";
import "./globals.css";
export const metadata: Metadata = {
  title: "Twisted Cantina | Mexican-inspired Cocktails & Nightlife in Pilsen",
  description:
    "Twisted Cantina is a 21+ Mexican-inspired cocktail bar and dance club in Chicago's Pilsen neighborhood. Join us for creative cocktails, tacos & vibrant nightlife.",
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-oid="pehwgr3">
      <head data-oid="62.c_:a">
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
          data-oid="e8qa.dd"
        />

        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
          data-oid="0ydxpyp"
        />
      </head>
      <body
        className="top-auto right-auto bottom-auto left-auto sticky"
        data-oid="35qx.dn"
      >
        <Navbar data-oid="fldiqt9" />
        {children}
      </body>
    </html>
  );
}
