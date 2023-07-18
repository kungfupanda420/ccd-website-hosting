import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import '../css/NewsMedia.css';

export const NewsMedia = () => {
  const [width, setWidth] = useState();
  const newMediaContainer = React.useRef();
  const [cardData, setCardData] = useState([]);

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

  return (
    <>
      <div className="newsMediaHeading" id="newMeadiMobileView">
        News/Media
      </div>
      <motion.div ref={newMediaContainer} className="newsMediaContainer" whileTap={{ cursor: 'grabbing' }}>
        <motion.div drag="x" dragConstraints={{ right: 0, left: -width }} dragMomentum={false} className="newsMediaHolder">
          <div className="newsMediaHeading">News/Media</div>
          <div className="newsMediaCards">
            {cardData.map((card, index) => (
              <div className="card" key={index}>
                <img className="cardImage" src={card.img} alt="card img" />
                <div className="cardTitle">{card.title}</div>
                <div className="cardSubText">{card.subtext}</div>
                <div className="cardDate">{card.date}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default NewsMedia;
