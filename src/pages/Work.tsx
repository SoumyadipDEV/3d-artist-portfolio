import Gallery from "@/components/Gallery";
import Navbar from "@/components/Navbar";

const WorkPage = () => {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="pt-20">
        <Gallery />
      </div>
    </main>
  );
};

export default WorkPage;
