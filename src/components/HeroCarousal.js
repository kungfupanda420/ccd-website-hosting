// import React, { useState, useEffect, useRef } from 'react';

import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import '../css/HeroCarousal.css';

const AutoplaySlider = withAutoplay(AwesomeSlider);
export default function HeroCarousal() {

  return (
    <>
      <AutoplaySlider
        play={true}
        cancelOnInteraction={false}
        interval={4000}
        bullets={false}
      >
        <div style={{height:'100vh'}} data-src="images/aboutpage/aerounwiredTwo.png" />
        <div style={{height:'100vh'}} data-src="images/aboutpage/aerounwiredOne.png" />
        <div style={{height:'100vh'}} data-src="images/aboutpage/aerounwiredTwo.png" />
      </AutoplaySlider>

    </>
  );
}



// const [slideIndex, setSlideIndex] = useState(1);
// const slidesRef = useRef([]);

// useEffect(() => {
//   showSlides(slideIndex);
// }, [slideIndex]);

// const plusSlides = (n) => {
//   setSlideIndex(slideIndex+ n);
// };

// const showSlides = (n) => {
//   let i;
//   if (n > slidesRef.current.length) {
//     setSlideIndex(1);
//   } else if (n < 1) {
//     setSlideIndex(slidesRef.current.length);
//   } else {
//     for (i = 0; i < slidesRef.current.length; i++) {
//       slidesRef.current[i].style.display = 'none';
//     }
//     slidesRef.current[slideIndex - 1].style.display = 'block';
//   }
// };
// let i = 1;
// const intervalId = setInterval(() => {
// if (i < 2) {
//   i++;
//   console.log(i);
//   plusSlides(1);
// } else {
//   clearInterval(intervalId);
// }
// }, 8000);

// <>
//   <div className="slideshow-container">
//     <div className="mySlides" ref={(el) => (slidesRef.current[0] = el)}>
//       <img src="images/aboutpage/about.png" className='fade' style={{ 
//         position: 'absolute', 
//         top: 0, 
//         left: 0, 
//         width: '100%', 
//         height: '100%', 
//         objectFit: 'cover' 
//       }} alt="Slide 1" />
//     </div>

//     <div className="mySlides" ref={(el) => (slidesRef.current[1] = el)}>
//       <img src="images/aboutpage/aerounwiredOne.png" className='fade' style={{ 
//         position: 'absolute', 
//         top: 0, 
//         left: 0, 
//         width: '100%', 
//         height: '100%', 
//         objectFit: 'cover' 
//       }} alt="Slide 2" />
//     </div>

//     <div className="mySlides" ref={(el) => (slidesRef.current[2] = el)}>
//       <img src="images/aboutpage/aerounwiredTwo.png" className='fade' style={{ 
//         position: 'absolute', 
//         top: 0, 
//         left: 0, 
//         width: '100%', 
//         height: '100%', 
//         objectFit: 'cover' 
//       }} alt="Slide 3" />
//     </div>

//     <a className="prev" onClick={() => plusSlides(-1)}>❮</a>
//     <a className="next" onClick={() => plusSlides(1)}>❯</a>
//   </div>
// </>

{/* <AwesomeSlider
    media={[
      {
        source: 'images/aboutpage/aerounwiredTwo.png',
      },
      {
        source: 'images/aboutpage/aerounwiredOne.png',
      },
      {
        source: 'images/aboutpage/aerounwiredTwo.png',
      },
    ]}
  /> */}