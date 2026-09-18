import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import WelcomeVerse from "@/components/WelcomeVerse";
import ServiceTimes from "@/components/ServiceTimes";
import Ministries from "@/components/Ministries";
import BibleSeminar from "@/components/BibleSeminar";
import LocationSection from "@/components/LocationSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <WelcomeVerse />
        <ServiceTimes />
        <Ministries />
        <BibleSeminar />
        <LocationSection />
      </main>
      <Footer />
    </>
  );
}
