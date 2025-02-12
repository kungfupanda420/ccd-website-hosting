import React from 'react';
import '../css/Rankings.css';

const Rankings = () => {
  const endNumbers = {
    Architecture: 3,
    Innovation: 31,
    Engineering: 25
  };

  return (
    <div className="Rankings">
      {/* <header className="header">
        <h1>College Name</h1>
      </header> */}
      <div className="placementStaticContainer">
      <div className='ranks'><h1>NIRF Rankings - 2024</h1></div>
        <div className='runningStatContainer1'>
         
         
          <div className='eachStatContainer'>
            <div className='statValue'>
              <h1 className='statNumber1'>{endNumbers.Architecture}</h1>
            </div>
            <p className='statText1'>Architecture</p>
          </div>
          {/* <div className='verticalLine'></div> */}
          <div className='eachStatContainer'>
            <div className='statValue'>
              <h1 className='statNumber1'>{endNumbers.Engineering}</h1>
            </div>
            <p className='statText1'>Engineering</p>
          </div>
          {/* Innovation */}
          <div className='eachStatContainer'>
            <div className='statValue'>
              <h1 className='statNumber1'>{endNumbers.Innovation}</h1>
            </div>
            <p className='statText1'>Innovation</p>
          </div>
          {/* <div className='verticalLine1'></div> */}
          {/* Engineering */}
          
        </div>
      </div>
    </div>
  );
}

export default Rankings;
