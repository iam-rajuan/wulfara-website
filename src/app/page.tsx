import Navbar from "@/components/shared/Navbar";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import Welcome from "@/components/home/Welcome";
import Cta from "@/components/home/Cta";
import Footer from "@/components/shared/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Features />
        <Welcome />
        <Cta />
      </main>
      <Footer />
    </div>
  );
}
