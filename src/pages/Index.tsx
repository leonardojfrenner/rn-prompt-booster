import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import BenefitsSection from "@/components/BenefitsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import ChatSupport from "@/components/ChatSupport";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <BenefitsSection />
        <CTASection />
      </main>
      <Footer />
      <ChatSupport />
    </div>
  );
};

export default Index;
