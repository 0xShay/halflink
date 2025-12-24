import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Halflink",
  description: "Shorten links with the click of a button.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="">
        <div className="bg-stone-300 flex min-h-screen flex-col items-center justify-center py-2 text-center">
          <Link className="cursor-pointer" href="/">
            <h1 className="text-3xl font-bold text-red-950">halflink</h1>
            <p className="text-black">Shorten a link with ease.</p>
          </Link>
          {children}
        </div>
      </body>
    </html>
  );
}
