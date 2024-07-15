import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRef } from 'react';

import '../css/NewsMedia.css';
import AOS from "aos";
import "aos/dist/aos.css";
export const NewsMedia = () => {
  const [width, setWidth] = useState();
  const newMediaContainer = React.useRef();
  const [cardData, setCardData] = useState([]);
  const carouselRef = useRef(null);
  const slideRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/news-media'); // Replace 'API_URL' with the actual API endpoint
        const data = await response.json();
        setCardData(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setWidth(newMediaContainer.current.scrollWidth - newMediaContainer.current.offsetWidth);

  });
  
  useEffect(() => {
    AOS.init({duration: 1600});
  }, []);


  const handleCarouselMove = (direction) => {
    return () => {
      const carousel = carouselRef.current;
      const slideWidth = carousel.querySelector('.carousel-slide').offsetWidth;
      const maxIndex = cardData.length - 1;

      setCurrentIndex((prevIndex) => {
        let newIndex = prevIndex;
        if (direction) {
          newIndex = prevIndex < maxIndex ? prevIndex + 1 : maxIndex;
        } else {
          newIndex = prevIndex > 0 ? prevIndex - 1 : 0;
        }
        carousel.scrollLeft = newIndex * slideWidth;
        return newIndex;
      });
    };
  };

  return (
    <>
    <div className='newsMediaDiv'>
      <div className="newsMediaHeading" id="newMeadiMobileView" data-aos="zoom-in">
        News/Media
      </div>
      <div ref={newMediaContainer} className="newsMediaContainer" whileTap={{ cursor: 'pointer' }}>
        
          <div drag="x" className="newsMediaHolder " dragConstraints={{ right: 0, left: -width }} dragMomentum={false} >
          <div className="newsMediaHeading">News/Media</div>
          
          <div className="newsMediaCards carousel-container" ref={carouselRef}>
          <button className="carousel-arrow carousel-arrow--prev" onClick={handleCarouselMove(0)}>&#8249;
          </button>
            {cardData.map((card, index) => (
              <div className="cardNews carousel-slide" key={index} ref={slideRef}>
                <img className="cardImage" src={card.img} alt="card img" />
                <div className="cardTitle">{card.title}</div>
                <div className="cardSubText">{card.subtext}</div>
                <div className="cardDate">{card.date}</div>
              </div>
            ))}

          </div>
          
        </div>
      <button className="carousel-arrow carousel-arrow--next" onClick={handleCarouselMove(1)}>&#8250;
        </button>
        </div>
        </div>
    </>
  );
};

export default NewsMedia;
