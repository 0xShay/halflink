import type { Metadata } from "next";
import "./globals.css";

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
      <body className="nova-oval-regular">
        {children}
      </body>
    </html>
  );
}
