import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import Welcome from "@/components/home/Welcome";
import HomeFaq from "@/components/home/HomeFaq";
import Cta from "@/components/home/Cta";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Welcome />
      <HomeFaq />
      <Cta />
    </>
  );
}
