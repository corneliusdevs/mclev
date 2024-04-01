import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Tools from "@/components/Tools";
import Footer from "@/components/footer/Footer";
import { Provider } from "@/lib/reactQuery-provider";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "McLev cleaning company: Always Here To Help, We Know You Are Busy",
  description:
    "We know you are busy, We are here to take care of your home, restaurant, office, event centre and community. We offer a wide range of cleaning services from commercial toclient in London and South East London.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className} >
        <Provider>
          <Navbar />
          {children}
          <Tools />
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
