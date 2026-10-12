import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TrackTrash",
  description: "Plataforma de gestión de residuos.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-PE">
      <body>{children}</body>
    </html>
  );
}
