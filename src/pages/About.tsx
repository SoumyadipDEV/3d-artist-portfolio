import AboutMe from "@/components/AboutMe";
import Navbar from "@/components/Navbar";

const AboutPage = () => {
  return (
    <main className="page-shell bg-background text-foreground">
      <Navbar />
      <div className="pt-24 xs:pt-28 sm:pt-32">
        <AboutMe />
      </div>
    </main>
  );
};

export default AboutPage;
