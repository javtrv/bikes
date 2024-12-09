import localFont from "next/font/local";
import { SidebarProvider } from "@/components/ui/sidebar"
import AppSidebar from "@/components/app-sidebar";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

// TODO: Quitar estas fuentes de aqui

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SidebarProvider>
        <AppSidebar />
        <main className="w-full p-4 flex">
          {children}
        </main>
        <Toaster />
        </SidebarProvider>
      </body>
    </html>
  );
}


