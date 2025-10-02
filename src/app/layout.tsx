import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TopNavigation } from "@/components/top-navigation";
import { ChatWidget } from "@/components/chat-widget";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GarageHub - Auto Mechanic Management System",
  description: "Complete SaaS solution for auto mechanics and garage management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50">
          <TopNavigation />
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
          <ChatWidget />
        </div>
      </body>
    </html>
  );
}