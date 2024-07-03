import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import "../css/OurTeam.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaLinkedin } from "react-icons/fa6";
function OurTeam() {
  const [teacherData, setTeacherData] = useState([]);
  const [studentData, setStudentData] = useState([]);
  const [width, setWidth] = useState();
  const studentContainer = useRef();

  useEffect(() => {
    // Fetch data from the server API
    fetch("/api/our-team")
      .then((response) => response.json())
      .then((data) => {
        setTeacherData(data.teacherData);
        setStudentData(data.studentData);
      })
      .catch((error) => {
        console.error("Error fetching team data:", error);
      });

    // Calculate width

  }, []);
  useEffect(() => {
    setWidth(studentContainer.current.scrollWidth - studentContainer.current.offsetWidth);
  })
  useEffect(() => {
    AOS.init({duration: 1600});
  }, []);
  return (
    <>
      <div className="ourTeamContainer">
        <div className="ourTeamSubDiv">
          {/* <div className="topHeading">
          <h1 className="mainHeading">Our Team </h1>
       
        </div>
        <div className="teachersDiv">
          {
              teacherData.map((person, index) => (
                  
              <div className="teacherCard">
              <img src={person.image} alt="" //>
              <div className="teacherDetail">
                  <p className="smallHeading">{person.name}</p>
                  <p className="tinyTexts">{person.position}</p>
              </div>
              </div>
              ))
          } 
          
        </div> */}
          <h3 class="section-head-text">
            Meet Our Team
          </h3>
          <div class="responsive-container-block outer-container">

            <div class="responsive-container-block">
              {
                teacherData.map((person, index) => (
                  <div class="nft">
                    <div class='main'>
                      <img class='tokenImage' src={person.image} alt="image" />
                      <h2>{person.name}</h2>
                      <p class='description'>{person.position}</p>
                      <hr />
                      <h2><FaLinkedin/></h2>
                    </div>
                  </div>
                ))
              }

           </div>
              
            {/* student div */}
            <div ref={studentContainer} className="studentsDiv" >
            <h4 className="spochead">SPOCs</h4>
              <div
                className="innerStudentsDiv">
                {studentData.map((student, index) => (
                  <div className="studentCard active" >
                    <img src={student.image} alt="" />
                    <div className="studentDetail">
                      <p className="smallHeading">{student.name}</p>
                      <p className="tinyTexts">{student.position}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* <Card className="eachstudent" style={{ width: '18rem',padding:'1rem' }}>
              <Card.Img variant="top" src="images/our_team/students/ayush.png" />
              <Card.Body>
                <Card.Title>Ayush Gupta</Card.Title>
                <Card.Text>
                  Chemical Engineering
                </Card.Text>
              </Card.Body>
            </Card> */}



        </div>
      </div>
    </>
  );
}

export default OurTeam;