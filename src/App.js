import './App.css';
import React, { lazy, Suspense, useEffect, useState } from 'react';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import { Routes, Route, useLocation } from 'react-router-dom';
import AnimatedCursor from "react-animated-cursor";
import Loader from './pages/Loader';
import FaqStudents from './pages/FaqStudents';
import Roadmap from './components/Roadmap';
const Home = lazy(() => import('./components/Home'));
const AboutRoute = lazy(() => import('./components/AboutRoute'));
const PlacementStatics = lazy(() => import('./components/PlacementStatics'));
const ForStudent = lazy(() => import('./components/ForStudent'));
const Placement = lazy(() => import('./pages/Placement'));
const Intern = lazy(() => import('./pages/Intern'));
const Login = lazy(() => import('./components/Login'));
const Admin = lazy(() => import('./pages/Admin'));
const ForRecruiter = lazy(() => import('./components/ForRecruiter'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  const { pathname } = useLocation();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      setIsDarkMode(true);
      document.querySelector("body").setAttribute("data-theme", "dark");
    } else {
      setIsDarkMode(false);
      document.querySelector("body").setAttribute("data-theme", "light");
    }
  }, [pathname]);

  const handleToggleTheme = (isDarkMode) => {
    setIsDarkMode(isDarkMode);
    if (isDarkMode) {
      document.querySelector("body").setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.querySelector("body").setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <div className={`App ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <AnimatedCursor
        trailingSpeed={8}
        outerSize={36}
        innerSize={20}
        innerScale={0.8}
        outerScale={1}
        innerStyle={{
          backgroundColor: 'rgba(1,89,170,255)'
        }}
        outerStyle={{
          border: '2px solid white',
          backgroundColor: 'transparent',
          mixBlendMode: "difference"
        }}
      />
      <Navbar isDarkMode={isDarkMode} onToggleTheme={handleToggleTheme} />

      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<AboutRoute />} />
          <Route path='/placement' element={<PlacementStatics />} />
          <Route path='/recruiter' element={<ForRecruiter />} />
          <Route path='/forstudents' element={<ForStudent isDarkMode={isDarkMode} onToggleTheme={handleToggleTheme} />}>
            <Route index element={<Roadmap isDarkMode={isDarkMode} onToggleTheme={handleToggleTheme} />}/>
            <Route path='internships' element={<Intern />} />
            {/* <Route path='placements' element={<Placement />} /> */}
            <Route path='faqdata' element={<FaqStudents />} />
            <Route path='roadmap' element={<Roadmap isDarkMode={isDarkMode} onToggleTheme={handleToggleTheme} />} />
          </Route>
          <Route path='/login' element={<Login />} />
          <Route path='/admin@CCD_nitc123' element={<Admin />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Suspense>
      <Footer />
    </div>
  );
}

export default App;
