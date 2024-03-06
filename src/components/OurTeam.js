import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import "../css/OurTeam.css";

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

  return (
    <>
    <div className="ourTeamContainer">
      <div className="ourTeamSubDiv">
        <div className="topHeading">
          <h1 className="mainHeading">Our Team </h1>
       
        </div>
        <div className="teachersDiv">
          {
              teacherData.map((person, index) => (
                  
              <div className="teacherCard">
              <img src={person.image} alt="" />
              <div className="teacherDetail">
                  <p className="smallHeading">{person.name}</p>
                  <p className="tinyTexts">{person.position}</p>
              </div>
              </div>
              ))
          } 
          
        </div>
        {/* student div */}
        <motion.div ref={studentContainer} whileTap={{cursor:"grabbing"}} className="studentsDiv" >
          <motion.div
           drag = 'x' 
           dragMomentum={true} 
           dragConstraints={{right:0, left:-width }}
           className="innerStudentsDiv">
              {studentData.map((student, index) => (
                <div  className="studentCard active" >
                  <img src={student.image} alt="" />
                  <div className="studentDetail">
                    <p className="smallHeading">{student.name}</p>
                    <p className="tinyTexts">{student.position}</p>
                  </div>
                </div>
              ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  </>
  );
}

export default OurTeam;