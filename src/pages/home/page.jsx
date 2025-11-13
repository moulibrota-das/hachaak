
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';
import HeroSection from './components/HeroSection';
import CategorySection from './components/CategorySection';
import BestsellerSection from './components/BestsellerSection';
import FeaturesSection from './components/FeaturesSection';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />
        <CategorySection />
        <BestsellerSection />
        <FeaturesSection />
      </main>
      <Footer />
    </div>
  );
}
