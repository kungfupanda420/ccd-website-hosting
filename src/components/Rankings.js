import React from 'react';
import '../css/Rankings.css';

const Rankings = () => {
  const endNumbers = {
    Architecture: 2,
    Innovation: 8,
    Engineering: 23
  };

  return (
    <div className="Rankings">
      {/* <header className="header"> */}
        {/* <h1>College Name</h1> */}
      {/* </header> */}
      <div className="placementStaticContainer">
        <div className='runningStatContainer1'>
          {/* Architecture */}
          <div className='eachStatContainer'>
            <div className='statValue'>
              <h1 className='statNumber1'>{endNumbers.Architecture}</h1>
            </div>
            <p className='statText1'>Architecture</p>
          </div>
          {/* <div className='verticalLine'></div> */}
          {/* Innovation */}
          <div className='eachStatContainer'>
            <div className='statValue'>
              <h1 className='statNumber1'>{endNumbers.Innovation}</h1>
            </div>
            <p className='statText1'>Innovation</p>
          </div>
          {/* <div className='verticalLine1'></div> */}
          {/* Engineering */}
          <div className='eachStatContainer'>
            <div className='statValue'>
              <h1 className='statNumber1'>{endNumbers.Engineering}</h1>
            </div>
            <p className='statText1'>Engineering</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Rankings;
