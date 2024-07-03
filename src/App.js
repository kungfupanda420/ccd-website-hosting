import './App.css';
import React, {lazy, Suspense, useEffect} from 'react';
import Footer from './components/Footer';
import Navbar from './components/Navbar'
import { Routes, Route, useLocation } from 'react-router-dom';
import AnimatedCursor from "react-animated-cursor"
import Loader from './pages/Loader';
import FaqStudents from './pages/FaqStudents';
// import DarkMode from './DarkMode/DarkMode';
const Home = lazy(() => import('./components/Home'));
const AboutRoute = lazy(() => import('./components/AboutRoute'))
const PlacementStatics = lazy(() => import('./components/PlacementStatics'));
const ForStudent = lazy(() =>import('./components/ForStudent'))
const Placement = lazy(() => import('./pages/Placement'))
const Intern = lazy(() => import('./pages/Intern'))
const Login = lazy(() => import('./components/Login'))
const Admin = lazy(() => import('./pages/Admin') )
const ForRecruiter = lazy( ()=> import('./components/ForRecruiter'))
const NotFound = lazy (() => import('./pages/NotFound'))
const Roadmap = lazy(() => import('./components/Roadmap'))

function App() {
  const {pathname} = useLocation();
  useEffect(() => {
    window.scrollTo({top:0, behavior:"smooth"})
  }, [pathname])
  
  return (
    <div className='Home'> 
        <AnimatedCursor
        trailingSpeed={8}
        outerSize = {36}
        innerSize = {20}
        innerScale ={0.8      }
        outerScale={1}
        innerStyle = {{
          backgroundColor: 'blue',
          mixBlendMode:"exclusion"
          
        }}
        outerStyle={{
          border: '2px solid white',
          backgroundColor:'transperant',
          mixBlendMode:"difference"
        }}
      />
      {/* <DarkMode/> */}
      <Navbar/>
      
      <Suspense fallback={<Loader/>} >
        <Routes>
          
          <Route path='/' element={<Home/>} />
          
          <Route path='/about' element={<AboutRoute/>} />
          <Route path='/placement' element={<PlacementStatics/>} />
          <Route path='/recruiter' element={<ForRecruiter/>} />
          <Route path='/forstudents' element={<ForStudent/>} >
            <Route index element={<Intern/>} />
            <Route path='internships' element={<Intern/>} />
            <Route path='placements' element={<Placement/>} />
            <Route path='faqdata' element={<FaqStudents/>} />

          </Route>
          <Route path='/login' element={<Login/>} />
          <Route path='/admin@CCD_nitc123' element={<Admin/>} />
         <Route path='*' element={<NotFound/>} />
         
      </Routes>
      </Suspense>
      <Footer/>
    </div>
  );
}

export default App;










// import Home from './components/Home';
// import PlacementStatics from './components/PlacementStatics';
// import Form from './components/Form';
// import Login from './components/Login';
// import NewAbout from './components/NewAbout';
// import ForStudent from './components/ForStudent';
// import Admin from './pages/Admin';
// import Placement from './pages/Placement';
// import Intern from './pages/Intern'