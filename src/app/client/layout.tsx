import Footer from "@/app/client/_components/Footer";
import Header from "@/app/client/_components/Header";
import Chatbot from "@/app/client/chatbot/Chatbot";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className={`${poppins.variable} font-sans text-[18px] relative min-h-screen`}
    >
      <Header />
      <main>{children}</main>
      <Footer />

      {/* Chatbot sẽ luôn nổi trên các thành phần khác */}
      <Chatbot />
    </div>
  );
};
export default ClientLayout;
