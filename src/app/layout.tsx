import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Preloader from "@/components/Preloader";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://divyascakes.com"),
  title: "Zel Bakes by Divya | Custom Celebration Cakes in Kettering",
  description: "Homemade, fully customised celebration cakes baked with love by Divya in Kettering, Northamptonshire. Design your cake and get an instant price online.",
  keywords: ["Zel Bakes", "Zel Bakes by Divya", "custom cakes Kettering", "birthday cakes Kettering", "themed cakes Northamptonshire", "homemade cakes Kettering", "cake price calculator"],
  authors: [{ name: "Divya" }],
  openGraph: {
    title: "Zel Bakes by Divya | Custom Celebration Cakes",
    description: "Homemade, customised cakes baked with love in Kettering. Design yours and get an instant price.",
    url: "https://divyascakes.com",
    siteName: "Zel Bakes",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Zel Bakes by Divya — Baked with love, homemade, customised",
      },
    ],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zel Bakes by Divya | Custom Celebration Cakes",
    description: "Homemade, customised cakes baked with love in Kettering.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#fdf7f3",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
      <head>
        {/* Skip the loading screen on repeat views in the same session (runs before first paint). */}
        <script
          dangerouslySetInnerHTML={{
            __html: "try{if(sessionStorage.getItem('zb-seen'))document.documentElement.classList.add('zb-skip')}catch(e){}",
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Bakery",
              "name": "Zel Bakes by Divya",
              "image": "https://divyascakes.com/img/logo-1200.jpg",
              "@id": "https://divyascakes.com",
              "url": "https://divyascakes.com",
              "telephone": "+447767123456",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Kettering",
                "addressLocality": "Kettering",
                "addressRegion": "Northamptonshire",
                "postalCode": "NN15",
                "addressCountry": "GB"
              },
              "priceRange": "££",
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday"
                ],
                "opens": "09:00",
                "closes": "18:00"
              }
            })
          }}
        />
      </head>
      <body
        className="antialiased selection:bg-rose/30"
      >
        <Preloader />
        {children}
      </body>
    </html>
  );
}
