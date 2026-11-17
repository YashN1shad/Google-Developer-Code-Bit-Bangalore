import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Yash Nishad | Portfolio",
  description: "Personal portfolio of Yash Nishad - CS student & full-stack web developer.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-background text-slate-100 antialiased selection:bg-cyan-500 selection:text-slate-950">
        {children}
      </body>
    </html>
  );
}
