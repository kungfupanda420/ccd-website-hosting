import React, { useState, useEffect, useRef } from 'react';
import '../css/HeroCarousal.css';

export default function HeroCarousal() {
  const [slideIndex, setSlideIndex] = useState(1);
  const slidesRef = useRef([]);
  // const dotsRef = useRef([]);

  useEffect(() => {
    showSlides(slideIndex);
  }, [slideIndex]);

  const plusSlides = (n) => {
    setSlideIndex(slideIndex+ n);
  };

  // const currentSlide = (n) => {
  //   setSlideIndex(n);
  // };

  const showSlides = (n) => {
    let i;
    if (n > slidesRef.current.length) {
      setSlideIndex(1);
    } else if (n < 1) {
      setSlideIndex(slidesRef.current.length);
    } else {
      for (i = 0; i < slidesRef.current.length; i++) {
        slidesRef.current[i].style.display = 'none';
      }
      // for (i = 0; i < dotsRef.current.length; i++) {
      //   dotsRef.current[i].className = dotsRef.current[i].className.replace('active', '');
      // }
      slidesRef.current[slideIndex - 1].style.display = 'block';
      // dotsRef.current[slideIndex - 1].className += ' active';
    }
  };
  let i = 1;
  const intervalId = setInterval(() => {
  if (i < 2) {
    i++;
    console.log(i);
    plusSlides(1);
  } else {
    clearInterval(intervalId);
  }
  }, 8000);

  return (
    <>
      <div className="slideshow-container">
        <div className="mySlides" ref={(el) => (slidesRef.current[0] = el)}>
          <img src="images/aboutpage/about.png" className='fade' style={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover' 
          }} alt="Slide 1" />
        </div>

        <div className="mySlides" ref={(el) => (slidesRef.current[1] = el)}>
          <img src="images/aboutpage/aerounwiredOne.png" className='fade' style={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover' 
          }} alt="Slide 2" />
        </div>

        <div className="mySlides" ref={(el) => (slidesRef.current[2] = el)}>
          <img src="images/aboutpage/aerounwiredTwo.png" className='fade' style={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover' 
          }} alt="Slide 3" />
        </div>

        <a className="prev" onClick={() => plusSlides(-1)}>❮</a>
        <a className="next" onClick={() => plusSlides(1)}>❯</a>
      </div>

      {/* <div style={{ textAlign: 'center' }}>
        <span className="dot" ref={(el) => (dotsRef.current[0] = el)} onClick={() => currentSlide(1)}></span>
        <span className="dot" ref={(el) => (dotsRef.current[1] = el)} onClick={() => currentSlide(2)}></span>
        <span className="dot" ref={(el) => (dotsRef.current[2] = el)} onClick={() => currentSlide(3)}></span>
      </div> */}
    </>
  );
}
