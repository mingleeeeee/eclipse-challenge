import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";

// Load the Inter font with Latin subset
const inter = Inter({ subsets: ["latin"] });

// Define the metadata for the application
export const metadata: Metadata = {
  title: "Monad AI POC", // Title of the application
  description: "AI agent", // Description of the application
};

// Define the RootLayout component
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode; // Children nodes to be rendered inside the layout
}>) {
  return (
    <html lang="en">
      {" "}
      {/* Set the language of the document to English */}
      <body className={inter.className}>{children}</body>{" "}
      {/* Apply the Inter font and render children */}
    </html>
  );
}
