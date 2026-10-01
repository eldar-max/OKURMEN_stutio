import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import AboutUs from '../components/AboutUs';
import WhyUs from '../components/WhyUs';
import TechStack from '../components/TechStack';
import Courses from '../components/Courses';
import Team from '../components/Team';
import Founders from '../components/Founders';
import OurClassrooms from '../components/OurClassrooms';
import Students from '../components/Students';
import Graduates from '../components/Graduates';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';
import AIChat from '../components/AIChat';

function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Navbar />
      <Hero />
      <AboutUs />
      <WhyUs />
      <TechStack />
      <Courses />
      <Team />
      <Founders />
      <OurClassrooms />
      <Students />
      <Graduates />
      <Testimonials />
      <Footer />
      <AIChat />
    </div>
  );
}

export default LandingPage;
