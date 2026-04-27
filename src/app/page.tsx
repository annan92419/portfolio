import { About } from "@/components/about";
import { Awards } from "@/components/awards";
import { Contact } from "@/components/contact";
import { Experience } from "@/components/experience";
import { Hero } from "@/components/hero";
import { Nav } from "@/components/nav";
import { Projects } from "@/components/projects";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Projects />
        <Experience />
        <Awards />
        <About />
        <Contact />
        <footer className="border-t border-zinc-900 px-6 py-8 text-center text-xs text-zinc-700">
          © {new Date().getFullYear()} Jesse Annan
        </footer>
      </main>
    </>
  );
}
