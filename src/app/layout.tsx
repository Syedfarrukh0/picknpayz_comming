// app/layout.tsx
'use client'; // Mark this as a Client Component

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { useEffect } from "react"; // Import useEffect

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Use useEffect to remove problematic attributes added by browser extensions
  useEffect(() => {
    const body = document.body;
    if (body && body.getAttribute("cz-shortcut-listen") === "true") {
      body.removeAttribute("cz-shortcut-listen");
    }
  }, []);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}












// 'use client'; // Mark this as a Client Component

// import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";
// import { useEffect } from "react"; // Import useEffect

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export const metadata: Metadata = {
//   title:
//     "🛒 PicknPayz - Best Online Shopping Store in Pakistan | Fast Delivery & Great Deals",
//   description: `Shop online at PicknPayz, Pakistan's top eCommerce store! Get the best deals on electronics, fashion, home essentials, and more. Enjoy fast delivery, secure payments, and top-quality products at unbeatable prices. 🛍️✨`,
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   // Use useEffect to remove problematic attributes added by browser extensions
//   useEffect(() => {
//     const body = document.body;
//     if (body && body.getAttribute("cz-shortcut-listen") === "true") {
//       body.removeAttribute("cz-shortcut-listen");
//     }
//   }, []);

//   return (
//     <html lang="en">
//       <body
//         className={`${geistSans.variable} ${geistMono.variable} antialiased`}
//       >
//         {children}
//       </body>
//     </html>
//   );
// }














// import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export const metadata: Metadata = {
//   title:
//     "🛒 PicknPayz - Best Online Shopping Store in Pakistan | Fast Delivery & Great Deals",
//   description: `Shop online at PicknPayz, Pakistan's top eCommerce store! Get the best deals on electronics, fashion, home essentials, and more. Enjoy fast delivery, secure payments, and top-quality products at unbeatable prices. 🛍️✨`,
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body
//         className={`${geistSans.variable} ${geistMono.variable} antialiased`}
//       >
//         {children}
//       </body>
//     </html>
//   );
// }
