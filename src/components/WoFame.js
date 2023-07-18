import "../css/WallOfFame.css";
import { AiFillLinkedin } from 'react-icons/ai';
import { useEffect, useState } from 'react';

function WoFame() {
  const [wofDataRowOne, setWofDataRowOne] = useState([]);
  const [wofDataRowTwo, setWofDataRowTwo] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/wall-of-fame');
      const data = await response.json();
      setWofDataRowOne(data.wofDataRowOne);
      setWofDataRowTwo(data.wofDataRowTwo);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const openLinkedInProfile = (url) => {
    window.open(url, '_blank');
  };

  return (
    <div className="wofComponent">
      <div className="wallOfFameMainContainer">
        <h1 className="mainHeading">Wall Of Fame</h1>
      </div>

      {/* row one */}
      <div className="wallOfFameContainer rowOne">
        <div className="wallOfFameSubContianer">
          {wofDataRowOne.map((cardItem, index) => (
            <div className="cardContainer" key={index} onClick={() => openLinkedInProfile(cardItem.studentLinkedIn)}>
              <div className="studentInfoContainer">
                <div className="studentImage">
                  <img src="" alt="" />
                </div>
                <div className="studentDetailes">
                  <h1 className="smallHeading">{cardItem.studentName}</h1>
                  <p className='studentPosition smallHeading'>
                    <span>{cardItem.studentPosition}</span>
                    <span>{cardItem.studentBatch}</span>
                  </p>
                </div>
              </div>

              <div className="studentSaid">
                <p className="smallHeading">{cardItem.studentSaid}</p>

                <div className="dateAndDetails">
                  <p className='smallHeading'>
                    {cardItem.dateOfSaying}
                    <a href={cardItem.studentLinkedIn} rel='noreferer' target='_blank'>
                      <AiFillLinkedin />
                    </a>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="wallOfFameSubContianer">
          {wofDataRowOne.map((cardItem, index) => (
            <div className="cardContainer" key={index} onClick={() => openLinkedInProfile(cardItem.studentLinkedIn)}>
              <div className="studentInfoContainer">
                <div className="studentImage">
                  <img src="" alt="" />
                </div>
                <div className="studentDetailes">
                  <h1 className="smallHeading">{cardItem.studentName}</h1>
                  <p className='studentPosition smallHeading'>
                    <span>{cardItem.studentPosition}</span>
                    <span>{cardItem.studentBatch}</span>
                  </p>
                </div>
              </div>

              <div className="studentSaid">
                <p className="smallHeading">{cardItem.studentSaid}</p>

                <div className="dateAndDetails">
                  <p className='smallHeading'>
                    {cardItem.dateOfSaying}
                    <a href={cardItem.studentLinkedIn} rel='noreferer' target='_blank'>
                      <AiFillLinkedin />
                    </a>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* row two */}
      <div className="wallOfFameContainer rowTwo">
        <div className="wallOfFameSubContianer">
          {wofDataRowTwo.map((cardItem, index) => (
            <div className="cardContainer" key={index} onClick={() => openLinkedInProfile(cardItem.studentLinkedIn)}>
              <div className="studentInfoContainer">
                <div className="studentImage">
                  <img src="" alt="" />
                </div>
                <div className="studentDetailes">
                  <h1 className="smallHeading">{cardItem.studentName}</h1>
                  <p className='studentPosition smallHeading'>
                    <span>{cardItem.studentPosition}</span>
                    <span>{cardItem.studentBatch}</span>
                  </p>
                </div>
              </div>

              <div className="studentSaid">
                <p className="smallHeading">{cardItem.studentSaid}</p>

                <div className="dateAndDetails">
                  <p className='smallHeading'>
                    {cardItem.dateOfSaying}
                    <a href={cardItem.studentLinkedIn} rel='noreferer' target='_blank'>
                      <AiFillLinkedin />
                    </a>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="wallOfFameSubContianer">
          {wofDataRowOne.map((cardItem, index) => (
            <div className="cardContainer" key={index} onClick={() => openLinkedInProfile(cardItem.studentLinkedIn)}>
              <div className="studentInfoContainer">
                <div className="studentImage">
                  <img src="" alt="" />
                </div>
                <div className="studentDetailes">
                  <h1 className="smallHeading">{cardItem.studentName}</h1>
                  <p className='studentPosition smallHeading'>
                    <span>{cardItem.studentPosition}</span>
                    <span>{cardItem.studentBatch}</span>
                  </p>
                </div>
              </div>

              <div className="studentSaid">
                <p className="smallHeading">{cardItem.studentSaid}</p>

                <div className="dateAndDetails">
                  <p className='smallHeading'>
                    {cardItem.dateOfSaying}
                    <a href={cardItem.studentLinkedIn} rel='noreferer' target='_blank'>
                      <AiFillLinkedin />
                    </a>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WoFame;
