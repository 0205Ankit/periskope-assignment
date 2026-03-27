import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/sidebar";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Periskope - WhatsApp Group Management",
  description:
    "WhatsApp group management interface for managing groups linked to a phone number",
  icons: {
    icon: "/periskope.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.className} h-full antialiased light`} style={{ colorScheme: "light" }}>
      <body className="flex h-full">
        <Sidebar />
        <main className="flex-1 flex flex-col overflow-hidden">{children}</main>
      </body>
    </html>
  );
}
