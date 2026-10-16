import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Кварта — свежая обжарка кофе в Минске",
  description: "Небольшая кофейная мастерская. Обжариваем по четвергам — доставляем свежим по Минску.",
  openGraph: {
    title: "Кварта — кофе, который не залеживается",
    description: "Свежая обжарка небольшими партиями. Доставка по Минску.",
    images: ["/og-coffee.jpg"],
    type: "website"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ru"><body>{children}</body></html>;
}
