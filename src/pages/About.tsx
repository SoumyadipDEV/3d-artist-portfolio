import AboutMe from "@/components/AboutMe";
import Navbar from "@/components/Navbar";

const AboutPage = () => {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="pt-20">
        <AboutMe />
      </div>
    </main>
  );
};

export default AboutPage;
