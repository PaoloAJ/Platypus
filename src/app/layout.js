import { Sora } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  weight: ["400", "600", "700"],
});

export const metadata = {
  title: "Platypus Outdoor Solutions",
  description: "Eco-friendly waterfront restoration and exterior cleaning in Central Florida.",
};

// Footer + Navbar read from the DB on every request, so nothing can
// be safely prerendered. CMS-driven sites are dynamic by design.
export const dynamic = "force-dynamic";

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: "#00BCD4",
          colorBackground: "#0B132B",
          colorText: "#EDEDED",
        },
      }}
    >
      <html lang="en">
        <body
          className={`${sora.variable} bg-[#0B132B] antialiased min-h-screen hide-scrollbar overflow-x-hidden`}
        >
          <Navbar />
          <main className="relative">{children}</main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
