import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import AboutUs from '../components/AboutUs';
import Courses from '../components/Courses';
import Team from '../components/Team';
import Students from '../components/Students';
import Graduates from '../components/Graduates';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';

function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Navbar />
      <Hero />
      <AboutUs />
      <Courses />
      <Team />
      <Students />
      <Graduates />
      <Testimonials />
      <Footer />
    </div>
  );
}

export default LandingPage;
