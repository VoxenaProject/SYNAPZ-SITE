import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Problem from "@/components/sections/Problem";
import Offer from "@/components/sections/Offer";
import Process from "@/components/sections/Process";
import ROICalculator from "@/components/sections/ROICalculator";
import Comparison from "@/components/sections/Comparison";
import Team from "@/components/sections/Team";
import FAQ from "@/components/sections/FAQ";
import CTAFinal from "@/components/sections/CTAFinal";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <Offer />
        <Process />
        <ROICalculator />
        <Comparison />
        <Team />
        <FAQ />
        <CTAFinal />
      </main>
      <Footer />
    </>
  );
}
