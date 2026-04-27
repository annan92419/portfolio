import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { Hero } from "@/components/hero";
import { Projects } from "@/components/projects";

export default function Home() {
  return (
    <main>
      <Hero />
      <Projects />
      <About />
      <Contact />
      <footer className="border-t border-zinc-900 px-6 py-8 text-center text-xs text-zinc-700">
        © {new Date().getFullYear()} Jesse Annan
      </footer>
    </main>
  );
}
