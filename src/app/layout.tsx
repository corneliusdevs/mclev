import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Tools from "@/components/Tools";
import Footer from "@/components/footer/Footer";
import { Provider } from "@/lib/reactQuery-provider";
import ToastNotifProvider from "@/components/ToastNotifProvider";
import DesktopNavbar from "@/components/navbar/DesktopNavbar";

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
      <body className={inter.className}>
        <Provider>
          <ToastNotifProvider>
            <div className="relative">
              <div className="">
                <DesktopNavbar />
                <Navbar />
                {children}
                <Tools />
                <Footer />
              </div>
              <div id="userchat-portal-root" className="fixed top-0 w-[100fr] h-full z-[40] md:top-[60px] md:right-0 "></div>
            </div>
          </ToastNotifProvider>
        </Provider>
      </body>
    </html>
  );
}
