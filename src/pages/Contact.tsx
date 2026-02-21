import ContactSection from "@/components/ContactSection";
import Navbar from "@/components/Navbar";

const ContactPage = () => {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="pt-20">
        <ContactSection />
      </div>
    </main>
  );
};

export default ContactPage;
