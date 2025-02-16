import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";
import CreateEventDrawer from "@/components/create-event";

export const metadata: Metadata = {
  title: "Mitraverse",
  description: "Mitraverse is a smart and seamless scheduling platform with automation, integrations, and effortless calendar management",
  
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
        <link
  rel="icon"
  href="/icon.png"
  type="image/<generated>"
  sizes="<generated>"
/>
        </head>
        <body className={inter.className}>
          {/* Header */}
          <Header />
          <main className="min-h-screen bg-gradient-to-b from- bg-green-50 to-white">
            {children}
          </main>
          {/* Footer */}
          <footer className="bg-gradient-to-r from-green-600 to-green-700 dark:from-green-800 dark:to-green-900 text-white py-12 mt-10 shadow-lg">
            <div className="container mx-auto px-6 text-center">
              <div className="space-y-4">
                <p className="text-sm md:text-base font-medium tracking-wide animate-fade-in">
                  Crafted with <span className="animate-pulse">💚</span> by{" "}
                  <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-green-200 hover:scale-105 transition-transform duration-300">
                    Ecocee
                  </span>
                </p>
                <p className="text-xs text-green-100 opacity-75">
                  © 2025-2026 Ecocee. All rights reserved.
                </p>
              </div>
            </div>
          </footer>

          <CreateEventDrawer />
        </body>
      </html>
    </ClerkProvider>
  );
}
