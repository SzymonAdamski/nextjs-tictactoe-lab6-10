import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/lib/AuthContext";
import Navigation from "@/components/Navigation";

export const metadata: Metadata = {
  title: "Kółko i krzyżyk - Next.js",
  description: "Gra w kółko i krzyżyk - Laboratorium 6, Temat 5",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body>
        <AuthProvider>
          <Navigation />
          <main className="container">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
