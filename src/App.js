import './App.css';
import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import AnimatedCursor from "react-animated-cursor";
import { ErrorBoundary } from 'react-error-boundary';
import Loader from './pages/Loader';

// Error boundary fallback component
// Regularly imported components (non-lazy)
import DepartmentSIP from './components/Department_sip.js';
import SummerInternInstr from './components/SummerInternInstr';
import SummerInternship from './components/SummerInternship.js';
import TermsAndConditions from './components/TermsandCondition.js';
import PrivacyPolicy from './components/Privacypolicy.js';
// import FaqStudents from './pages/FaqStudents';
// import Roadmap from './components/Roadmap';
// import Preptips from './components/Preptips';
// import Footer from './components/Footer';
// import Navbar from './components/Navbar';
const SipTable=lazy(()=> import('./components/SipTable.js'))
const Footer = lazy(() => import('./components/Footer'));
const FaqStudents = lazy(() => import('./pages/FaqStudents'));
const Navbar = lazy(() => import('./components/Navbar'));
const Roadmap = lazy(() => import('./components/Roadmap'));
const Preptips = lazy(() => import('./components/Preptips'));
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
const Results = lazy(() => import('./components/Results'));
const Temp2 = lazy(() => import('./components/Temp2'));
const MentorFilter = lazy(() => import('./components/MentorFilter'));

function ErrorFallback({ error }) {
  return (
    <div role="alert" className="error-fallback">
      <h2>Something went wrong</h2>
      <pre>{error.message}</pre>
      <button onClick={() => window.location.reload()}>Try again</button>
    </div>
  );
}


function App() {
  const { pathname } = useLocation();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [hashMap, setHashMap] = useState({});

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

  // List of routes where Navbar and Footer should NOT be shown
  const noNavFooterRoutes = [
    '/professor_dashboard',
    '/CandidatePreferences',
    '/candidatePreferences',
    '/candidatepreferences',
    '/candidate_profile',
    '/Candidatedashboard',
    '/candidatedashboard',
    '/department_sip',
    '/generate_id',
    '/admin_sip',
    "/download_documents",
    "/candidate_projectreport",
  ];
  const hideNavFooter = noNavFooterRoutes.includes(pathname);

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

      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<AboutRoute />} />
          <Route path='/placement' element={<PlacementStatics />} />
          <Route path='/recruiter' element={<ForRecruiter />} />
          <Route path='/forstudents' element={<ForStudent isDarkMode={isDarkMode} onToggleTheme={handleToggleTheme} />}>
            <Route index element={<Roadmap isDarkMode={isDarkMode} onToggleTheme={handleToggleTheme} />}/>
            <Route path='internships' element={<Intern />} />
            <Route path='placements' element={<Placement />} />
            <Route path='faqdata' element={<FaqStudents />} />
            <Route path='roadmap' element={<Roadmap isDarkMode={isDarkMode} onToggleTheme={handleToggleTheme} />} />
            <Route path='preptips' element={<Preptips/>} />
          </Route>
          {/* <Route path='/internshipalert' element={<InternshipAlert />} /> */}
          <Route path='/internshipinstructions' element={<SummerInternInstr/>} />
          <Route path='/2025SummerInternshipSIP' element={<SummerInternship/>} />
          <Route path='/login' element={<Login />} />
          <Route path='/admin@CCD_nitc123' element={<Admin />} />
          <Route path='*' element={<NotFound />} />
          {/* <Route path='/' element={<Temp/>} /> */}
          <Route path='/dashboard' element={<Temp2/>} />
          <Route path='/results' element={<SipTable/>} />
          <Route path='sipresults' element={<Results/>} />
          <Route path='/sip' element={<MentorFilter />} />
          <Route path='/termsandconditions' element={<TermsAndConditions />} />
          <Route path='/privacypolicy' element={<PrivacyPolicy />} />
        </Routes>
      </Suspense>
      <Footer />
    </div>
  );
}

export default App;