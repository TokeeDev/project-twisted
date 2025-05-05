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
    <html lang="en" data-oid="h3w04kc">
      <head data-oid="vxdstsb">
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
          data-oid="m_xa0cy"
        />

        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
          data-oid="dpnn3tv"
        />
      </head>
      <body
        className="top-auto right-auto bottom-auto left-auto sticky"
        data-oid="7ehihav"
      >
        <Navbar data-oid="_tvvy28" />
        {children}
      </body>
    </html>
  );
}
