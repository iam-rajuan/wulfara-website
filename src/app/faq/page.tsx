import Navbar from "@/components/shared/Navbar";
import Faq from "@/components/home/Faq";
import Footer from "@/components/shared/Footer";

export default function FaqPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Faq />
      </main>
      <Footer />
    </div>
  );
}
