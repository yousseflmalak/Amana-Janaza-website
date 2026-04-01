import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Al Amanah Janaza | Admin",
  description: "Espace d'administration sécurisé — Al Amanah Janaza",
  icons: { icon: "/favicon.png", apple: "/favicon.png" },
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
