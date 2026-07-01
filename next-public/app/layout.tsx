import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import styles from "./layout.module.css";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gestión de Cursos e Inscripciones",
  description: "Portal público de la oferta académica del ISIL",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <div className={styles.page}>
          <header className={styles.header}>
            <div className={styles.headerInner}>
              <Link href="/" className={styles.logo}>
                ISIL
              </Link>
              <nav>
                <Link href="/courses" className={styles.navLink}>
                  Ver cursos
                </Link>
              </nav>
            </div>
          </header>

          {children}

          <footer className={styles.footer}>Programación Web II — Proyecto PA4</footer>
        </div>
      </body>
    </html>
  );
}
