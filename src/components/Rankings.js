import React from 'react';
import '../css/Rankings.css';

const Rankings = () => {
  const endNumbers = {
    Architecture: 2,
    Innovation: 31,
    Engineering: 21,
    overrall: 45, // keeping original spelling
    management: 85
  };
  
  return (
    <div className="Rankings">
      <div className="placementStaticContainer">
        <div className='ranks'><h1>NIRF Rankings - 2025</h1></div>
        <div className='runningStatContainer1'>
          <div className='eachStatContainer'>
            <div className='statValue'>
              <h1 className='statNumber1'>{endNumbers.Architecture}</h1>
            </div>
            <p className='statText1'>Architecture</p>
          </div>
          
          <div className='eachStatContainer'>
            <div className='statValue'>
              <h1 className='statNumber1'>{endNumbers.Engineering}</h1>
            </div>
            <p className='statText1'>Engineering</p>
          </div>
          
          <div className='eachStatContainer'>
            <div className='statValue'>
              <h1 className='statNumber1'>{endNumbers.overrall}</h1>
            </div>
            <p className='statText1'>Overall</p>
          </div>
          
          <div className='eachStatContainer'>
            <div className='statValue'>
              <h1 className='statNumber1'>{endNumbers.management}</h1>
            </div>
            <p className='statText1'>Management</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Rankings;