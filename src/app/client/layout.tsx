import Footer from "@/app/client/_components/Footer";
import Header from "@/app/client/_components/Header";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={`${poppins.variable} font-sans text-[18px]`}>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};
export default ClientLayout;
