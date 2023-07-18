import './App.css';
import React, {lazy, Suspense} from 'react';

import Footer from './components/Footer';
import Navbar from './components/Navbar'
// import Home from './components/Home';
// import PlacementStatics from './components/PlacementStatics';
// import Form from './components/Form';
// import Login from './components/Login';
// import NewAbout from './components/NewAbout';
// import ForStudent from './components/ForStudent';
// import Admin from './pages/Admin';
// import Placement from './pages/Placement';
// import Intern from './pages/Intern'
import { Routes, Route } from 'react-router-dom';
import AnimatedCursor from "react-animated-cursor"
import Loader from './pages/Loader';

const Home = lazy(() => import('./components/Home'));
const NewAbout = lazy(() => import('./components/NewAbout'));
const PlacementStatics = lazy(() => import('./components/PlacementStatics'));
const Form = lazy(() =>  import('./components/Form'))
const ForStudent = lazy(() =>import('./components/ForStudent'))
const Placement = lazy(() => import('./pages/Placement'))
const Intern = lazy(() => import('./pages/Intern'))
const Login = lazy(() => import('./components/Login'))
const Admin = lazy(() => import('./pages/Admin') )
const NotFound = lazy(() => import('./pages/NotFound'))


function App() {
  return (
    <div className='Home'>
        <AnimatedCursor
        trailingSpeed={8}
        outerSize = {36}
        innerSize = {20}
        innerScale ={0.8      }
        outerScale={1}
        innerStyle = {{
          backgroundColor: 'white',
          mixBlendMode:"difference"
          
        }}
        outerStyle={{
          border: '2px solid white',
          backgroundColor:'transperant',
          mixBlendMode:"difference"
        }}
      />
      <Navbar/>
      <Suspense fallback={<Loader/>} >
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/about' element={<NewAbout/>} />
          <Route path='/placement' element={<PlacementStatics/>} />
          <Route path='/recruiter' element={<Form/>} />
          <Route path='/forstudents' element={<ForStudent/>} >
            <Route index element={<Intern/>} />
            <Route  path='internships' element={<Intern/>} />
            <Route path='placements' element={<Placement/>} />
          </Route>
          <Route path='/login' element={<Login/>} />
          <Route path='/admin@nitc' element={<Admin/>} />
          <Route path='*' element={<NotFound/>} />
      </Routes>
      </Suspense>
      <Footer/>
    </div>
  );
}

export default App;
