import Header from "../../components/feature/Header";
import Footer from "../../components/feature/Footer";
import HeroSection from "./components/HeroSection";
import CategorySection from "./components/CategorySection";
import BestsellerSection from "./components/BestsellerSection";
import FeaturesSection from "./components/FeaturesSection";
import NewarrivalSection from "./components/NewarrivalSection";
import WideCard from "../../components/base/WideCard";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />
        {/* <CategorySection /> */}
        <BestsellerSection />
        <NewarrivalSection />
        <WideCard
          image="https://images.unsplash.com/photo-1542925554-2ec208930b5b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          text="Sample Text"
        />
        <NewarrivalSection headerText="Hoodies"/>
        {/* <FeaturesSection /> */}
      </main>
      <Footer />
    </div>
  );
}
