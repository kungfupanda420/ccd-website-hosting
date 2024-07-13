import React from 'react';
import '../css/Facilities.css';

const facilities = [
  { name: 'Central Library', description: 'A place with extensive resources and a quiet study area.', image: '/images/aboutpage/library.jpg' },
  { name: 'Central Computing Center', description: 'CCC at NIT Calicut offers advanced computing facilities with 190+ client machines and a 25 TeraFlops hybrid cluster.', image: '/images/aboutpage/ccc2.jpg' },
  { name: 'Health Centre', description: 'NITC Health Center offers 24/7 medical care with two medical officers, a 10-bed facility, ambulance support, and direct payment options at local hospitals for faculty and staff.', image: '/images/aboutpage/healthcenter.jpg' },
  { name: 'Campus networking Centre', description: 'NITC Campus Networking Centre (CNC) provides internet and intranet services via a 21 km fiber optic network, supported by high-end servers and UTM appliances for the entire campus.', image: '/images/aboutpage/cnc3.webp' },
  { name: 'Lab Facilities', description: 'State-of-the-art laboratories for practical learning.', image: '/images/aboutpage/labs.png' },
  { name: 'Student Guidance Cell', description: 'SGC at NITC offers confidential counselling and academic support with two clinical psychologists, enhancing students overall well-being.', image: '/images/aboutpage/sgc2.jpeg' },
];

const CollegeFacilities = () => {
  return (
    <div className="college-facilities">
      <h1 className="heading">Central Facilities</h1>
      <main className="grid-layout">
        {facilities.map((facility, index) => (
          <div key={index} className={`facility ${index < 3 ? 'first-row' : 'second-row'}`}>
            <div className="facility-image-wrapper">
              <img src={facility.image} alt={facility.name} className="facility-image" />
              <div className="overlay">
                <div className="text">
                  <h2>{facility.name}</h2>
                  <p>{facility.description}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </main>

    </div>
  );
};

export default CollegeFacilities;