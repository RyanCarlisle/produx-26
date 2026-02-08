import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import Loader from './components/Loader';
import Events from './components/Events';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import SponsorsPage from './components/SponsorsPage';
import TeamPage from './components/TeamPage';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function Home() {
  return (
    <main>
      <Hero />
    </main>
  );
}

function AppContent() {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const isEventsPage = location.pathname === '/events';

  return (
    <>
      <ScrollToTop />
      {/* <CustomCursor /> */}
      
      <AnimatePresence mode="wait">
        {isLoading && (
          <Loader 
            key="loader" 
            onComplete={() => setIsLoading(false)} 
          />
        )}
      </AnimatePresence>

      {!isLoading && (
        <div className="relative bg-[#0a0a0a] text-white overflow-x-hidden min-h-screen flex flex-col">
          {!isEventsPage && <Navbar />}
          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/events" element={<Events />} />
            <Route path="/sponsors" element={<SponsorsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/team" element={<TeamPage />} />
          </Routes>
          
          {!isEventsPage && <Footer />}
        </div>
      )}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
