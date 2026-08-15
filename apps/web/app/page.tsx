import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Introduction } from "@/components/sections/Introduction";
import { DecisionLayer } from "@/components/sections/DecisionLayer";
import { Exploration } from "@/components/sections/Exploration";
import { Future } from "@/components/sections/Future";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <Introduction />
        <DecisionLayer />
        <Exploration />
        <Future />
      </main>
      <Footer />
    </>
  );
}
