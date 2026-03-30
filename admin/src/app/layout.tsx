import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Amana-Janaza | Admin Dashboard",
  description: "Espace d'administration sécurisé — Amana-Janaza",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
