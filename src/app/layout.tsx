import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "next-cloudinary/dist/cld-video-player.css";
import "./globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="h-screen flex flex-col">
            <div className="flex-1">{children}</div> <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
