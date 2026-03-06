import ContactSection from "@/components/ContactSection";
import Navbar from "@/components/Navbar";

const ContactPage = () => {
  return (
    <main className="page-shell bg-background text-foreground">
      <Navbar />
      <div className="pt-24 xs:pt-28 sm:pt-32">
        <ContactSection />
      </div>
    </main>
  );
};

export default ContactPage;
