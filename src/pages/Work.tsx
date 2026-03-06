import Gallery from "@/components/Gallery";
import Navbar from "@/components/Navbar";

const WorkPage = () => {
  return (
    <main className="page-shell bg-background text-foreground">
      <Navbar />
      <div className="pt-24 xs:pt-28 sm:pt-32">
        <Gallery />
      </div>
    </main>
  );
};

export default WorkPage;
