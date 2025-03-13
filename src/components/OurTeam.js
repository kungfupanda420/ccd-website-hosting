
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
      name: "Dr. C. S. Suchand Sangeeth",
      position: "Vice Chairperson",
      image: "/images/our_team/teachers/suchand.jpg",
      linkedin: "https://www.linkedin.com/in/suchand-sangeeth-c-s-440a301a/",
    },
    
    {
      name: "Dr. Nujoom Sageer Karat",
      position: "Vice Chairperson",
      image: "/images/our_team/teachers/nujoom.jpg",
      linkedin: "https://www.linkedin.com/in/nujoom-sageer-k-845a4375/",
    },
    {
      name: "Dr. Manu Mohan",
      position: "Placement & Career Development Officer",
      image: "/images/our_team/teachers/manumohan2.jpg",
      linkedin: "https://www.linkedin.com/in/dr-manumohanthundathil",
    },
  ];

  const studentData = [
    // {
    //   name: "Praneeth Emandi",
    //   position: "INTERN",
    //   image: "images/our_team/students/praneeth2.jpg",
    // },
    // {
    //   name: "Advaith Girish",
    //   position: "INTERN",
    //   image: "images/our_team/students/advaith.png",
    // },
    // {
    //   name: "Hari Govind",
    //   position: "INTERN",
    //   image: "images/our_team/students/harigovind.png",
    // },
    {
      name: "Hari",
      position: "SPOCS",
      image: "images/our_team/students/hari.png",
    },
    // {
    //   name: "Talib",
    //   position: "INTERN",
    //   image: "images/our_team/students/talib.png",
    // },
    // {
    //   name: "Sujin",
    //   position: "INTERN",
    //   image: "images/our_team/students/sujin.png",
    // },
    // {
    //   name: "Gethin",
    //   position: "INTERN",
    //   image: "images/our_team/students/gethin.png",
    // },
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
    {
      name: "Alok Niranjan",
      position: "SPOCS",
      image: "images/our_team/students/alok.jpeg",
    },
    {
      name: "Anuradha Gupta",
      position: "SPOCS",
      image: "images/our_team/students/anuradha.jpeg",
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
              {/* <h4 className="spochead">INTERNs</h4> */}
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
