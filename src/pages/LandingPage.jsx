import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import AboutUs from '../components/AboutUs';
import WhyUs from '../components/WhyUs';
import Features from '../components/Features';
import Stats from '../components/Stats';
import HowItWorks from '../components/HowItWorks';
import TechStack from '../components/TechStack';
import Pricing from '../components/Pricing';
import Courses from '../components/Courses';
import Team from '../components/Team';
import Founders from '../components/Founders';
import Partners from '../components/Partners';
import OurClassrooms from '../components/OurClassrooms';
import Students from '../components/Students';
import Graduates from '../components/Graduates';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';
import AIChat from '../components/AIChat';

function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Navbar />
      <Hero />
      <AboutUs />
      <WhyUs />
      <Features />
      <Stats />
      <HowItWorks />
      <TechStack />
      <Pricing />
      <Courses />
      <Team />
      <Founders />
      <Partners />
      <OurClassrooms />
      <Students />
      <Graduates />
      <Testimonials />
      <FAQ />
      <Footer />
      <AIChat />
    </div>
  );
}

export default LandingPage;
