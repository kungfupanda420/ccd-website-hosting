// import { useRef, useState, useEffect } from "react";
// import "../css/OurTeam.css";
// import AOS from "aos";
// import "aos/dist/aos.css";
// import { FaLinkedin } from "react-icons/fa6";
// function OurTeam() {
//   const [teacherData, setTeacherData] = useState([]);
//   const [studentData, setStudentData] = useState([]);
//   const [width, setWidth] = useState();
//   const studentContainer = useRef();
//   const links=['https://www.linkedin.com/in/psankaran',
//     'https://www.linkedin.com/in/vijayaraj-k-505a4947',
//     'https://www.linkedin.com/in/prateek-negi-92971164',
//     'https://www.linkedin.com/in/manju-mahipalan-05159743'
//   ]
//   useEffect(() => {
//     // Fetch data from the server API
//     fetch("/api/our-team")
//       .then((response) => response.json())
//       .then((data) => {
//         setTeacherData(data.teacherData);
//         setStudentData(data.studentData);
//       })
//       .catch((error) => {
//         console.error("Error fetching team data:", error);
//       });

//     // Calculate width

//   }, []);
 
//   useEffect(() => {
//     AOS.init({duration: 1600});
//   }, []);
//   return (
//     <>
//       <div className="ourTeamContainer">
//         <div className="ourTeamSubDiv">
//           {/* <div className="topHeading">
//           <h1 className="mainHeading">Our Team </h1>
       
//         </div>
//         <div className="teachersDiv">
//           {
//               teacherData.map((person, index) => (
                  
//               <div className="teacherCard">
//               <img src={person.image} alt="" //>
//               <div className="teacherDetail">
//                   <p className="smallHeading">{person.name}</p>
//                   <p className="tinyTexts">{person.position}</p>
//               </div>
//               </div>
//               ))
//           } 
          
//         </div> */}
//           <h3 class="section-head-text">
//             Meet Our Team
//           </h3>
//           <div class="responsive-container-block outer-container">

//             <div class="responsive-container-block">
//               {
//                 teacherData.map((person, index) => (
//                   <div class="nft">
//                     <div class='main'>
//                       <img class='tokenImage' src={person.image} alt="image" />
//                       <h2 style={{color:'var(--nameColor)'}}>{person.name}</h2>
//                       <p class='description1'>{person.position}</p>
//                       <hr />
//                       <h2><a href={links[index]} target="_blank" style={{textDecoration:'none'}}><FaLinkedin/></a></h2> 
//                     </div>
//                   </div>
//                 ))
//               }

//            </div>
              
//             {/* student div */}
//             <div ref={studentContainer} className="studentsDiv" >
//             <h4 className="spochead">SPOCs</h4>
//               <div
//                 className="innerStudentsDiv">
//                 {studentData.filter((person,index)=>person.position==='SPOCS').map((student, index) => (
//                   <div className="studentCard active" >
//                     <img src={student.image} alt="" />
//                     <div className="studentDetail">
//                       <p style={{color:'var(--nameColor)'}} className="smallHeading">{student.name}</p>
//                       <p style={{color:'var(--nameColor)'}} className="tinyTexts">SPOC</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div ref={studentContainer} className="studentsDiv" >
//             <h4 className="spochead">INTERNs</h4>
//               <div
//                 className="innerInternDiv">
//                 {studentData.filter((person,index)=>person.position==='INTERN').map((student, index) => (
//                   <div className="internCard" >
//                     <img src={student.image} alt="" />
//                     <div className="studentDetail">
//                       <p style={{color:'var(--nameColor)'}} className="smallHeading">{student.name}</p>
//                     </div>
//                   </div>
//                   ))}
                  
//               </div>
//             </div>
//           </div>

//           {/* <Card className="eachstudent" style={{ width: '18rem',padding:'1rem' }}>
//               <Card.Img variant="top" src="images/our_team/students/ayush.png" />
//               <Card.Body>
//                 <Card.Title>Ayush Gupta</Card.Title>
//                 <Card.Text>
//                   Chemical Engineering
//                 </Card.Text>
//               </Card.Body>
//             </Card> */}

//         </div>
        
//       </div>
//     </>
//   );
// }

// export default OurTeam;
import { useEffect } from "react";
import "../css/OurTeam.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaLinkedin } from "react-icons/fa6";

function OurTeam() {
  const teacherData = [
    {
      name: "Dr. Vinay V. Panicker",
      position: "Chairperson",
      image: "/images/our_team/teachers/vinay.jpg",
      linkedin: "https://www.linkedin.com/in/vinay-panicker-5b61b484/",
    },
    {
      name: "Dr. Arunkumar R",
      position: "Vice Chairperson",
      image: "/images/our_team/teachers/arun.jpg",
      linkedin: "https://www.linkedin.com/in/arunbte/",
    },
    {
      name: "Dr. C. S. Suchand",
      position: "Vice Chairperson",
      image: "/images/our_team/teachers/suchand.jpg",
      linkedin: "https://www.linkedin.com/in/suchand-sangeeth-c-s-440a301a/",
    },
    
    {
      name: "Dr. Nujoom Sageer",
      position: "Vice Chairperson",
      image: "/images/our_team/teachers/nujoom.jpg",
      linkedin: "https://www.linkedin.com/in/nujoom-sageer-k-845a4375/",
    },
    {
      name: "Dr. Manu Mohan",
      position: "Training and Placement Officer",
      image: "/images/our_team/teachers/manumohan.jpg",
      linkedin: "https://www.linkedin.com/in/dr-manumohanthundathil",
    },
  ];

  const studentData = [
    {
      name: "Praneeth Emandi",
      position: "INTERN",
      image: "images/our_team/students/praneeth2.jpg",
    },
    {
      name: "Advaith Girish",
      position: "INTERN",
      image: "images/our_team/students/advaith.png",
    },
    {
      name: "Hari Govind",
      position: "INTERN",
      image: "images/our_team/students/harigovind.png",
    },
    {
      name: "Hari",
      position: "SPOCS",
      image: "images/our_team/students/hari.png",
    },
    {
      name: "Talib",
      position: "INTERN",
      image: "images/our_team/students/talib.png",
    },
    {
      name: "Sujin",
      position: "INTERN",
      image: "images/our_team/students/sujin.png",
    },
    {
      name: "Gethin",
      position: "INTERN",
      image: "images/our_team/students/gethin.png",
    },
    {
      name: "Kedar Kamath",
      position: "SPOCS",
      image: "images/our_team/students/kedar.png",
    },
    {
      name: "Mitali Jain",
      position: "SPOCS",
      image: "images/our_team/students/mithali.png",
    },
    {
      name: "Niya",
      position: "SPOCS",
      image: "images/our_team/students/niya.png",
    },
    {
      name: "Noor Muhammad",
      position: "SPOCS",
      image: "images/our_team/students/noor.png",
    },
    {
      name: "Shivangi",
      position: "SPOCS",
      image: "images/our_team/students/shivangi.png",
    },
  ];

  useEffect(() => {
    AOS.init({ duration: 1600 });
  }, []);

  return (
    <>
      <div className="ourTeamContainer">
        <div className="ourTeamSubDiv">
          <h3 className="section-head-text">Meet Our Team</h3>
          <div className="responsive-container-block outer-container">
            {/* Teachers Section */}
            <div className="responsive-container-block">
              {teacherData.map((person, index) => (
                <div className="nft" key={index}>
                  <div className="main">
                    <img
                      className="tokenImage"
                      src={person.image}
                      alt={person.name}
                    />
                    <h2 style={{ color: "var(--nameColor)" }}>{person.name}</h2>
                    <p className="description1">{person.position}</p>
                    <hr />
                    <h2>
                      <a
                        href={person.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        style={{ textDecoration: "none" }}
                      >
                        <FaLinkedin />
                      </a>
                    </h2>
                  </div>
                </div>
              ))}
            </div>

            {/* Students SPOCs Section */}
            <div className="studentsDiv">
              <h4 className="spochead">SPOCs</h4>
              <div className="innerStudentsDiv">
                {studentData
                  .filter((person) => person.position === "SPOCS")
                  .map((student, index) => (
                    <div className="studentCard active" key={index}>
                      <img src={student.image} alt={student.name} />
                      <div className="studentDetail">
                        <p
                          style={{ color: "var(--nameColor)" }}
                          className="smallHeading"
                        >
                          {student.name}
                        </p>
                        <p
                          style={{ color: "var(--nameColor)" }}
                          className="tinyTexts"
                        >
                          SPOC
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Students Interns Section */}
            <div className="studentsDiv">
              <h4 className="spochead">INTERNs</h4>
              <div className="innerInternDiv">
                {studentData
                  .filter((person) => person.position === "INTERN")
                  .map((student, index) => (
                    <div className="internCard" key={index}>
                      <img src={student.image} alt={student.name} />
                      <div className="studentDetail">
                        <p
                          style={{ color: "var(--nameColor)" }}
                          className="smallHeading"
                        >
                          {student.name}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OurTeam;
