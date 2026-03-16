import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/index.css";
import "@/App.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Providers } from "@/components/Providers";
import { ThemeProvider } from "next-themes";
import { ThemeToggle } from "@/components/ThemeToggle"; // Import ThemeToggle

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sistema de Análise da Vitimização Criminal",
  description: "Plataforma de análise da vitimização criminal e percepção de segurança no Município da Samba- Luanda, Angola. Conhecimento e tecnologia pela segurança nacional.",
  keywords: "vitimização criminal, segurança pública, Angola, Luanda, criminologia",
  openGraph: {
    title: "Sistema de Análise da Vitimização Criminal",
    description: "Conhecimento e Tecnologia pela Segurança de Angola - Sistema de análise de vitimização criminal e percepção de segurança",
    type: "website",
    images: ["https://lovable.dev/opengraph-image-p98pqg.png"],
  },
  twitter: {
    card: "summary_large_image",
    site: "@Lovable",
    images: ["https://lovable.dev/opengraph-image-p98pqg.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>
            {children}
            <Toaster />
            <Sonner />
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
