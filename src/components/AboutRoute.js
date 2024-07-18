import React from 'react'
import NewAbout from './NewAbout'
import AboutSubCompo from './AboutSubCompo'
import '../css/AboutRoute.css'
import AboutUs from './AboutUs'
import Departments from './Departments'
import CulturalClubs from './CulturalClubs'
// import AluminiTest from './AluminiTest'

const clubInfo=[
    {
        clubName:"RIG Club",
        clubInfoTwoLines:"Robotics Interest Group(RIG) was formed out of the passion for robotics, to facilitate learning and research in the areas of Mechatronics/Robotics and ",
        clubInfoMore:"Intelligent Systems, Automation, Advanced Control Systems, Modelling and Simulation & Sensors and Algorithms. Our aim is to acquire knowledge and appropriate hands-on experience, in order to meet the needs of these rapidly changing technologies and provide services to industry for promoting new technologies as well as designing and manufacturing commercially viable products, for the development of our country",
        clubImageOne:"/images/aboutpage/rigOne.jpg",
        clubImageTwo:"/images/aboutpage/rigTwo.jpg",
        clubImageThree:"/images/aboutpage/rigOne.jpg"
    },
        {
        clubName:"GDSC Club",
        clubInfoTwoLines:"GDSC club at NITC is a community group for students who are interested in learning and applying Google Developer technologies. The club is part of the Google Developer Student Clubs (GDSC) program, ",
        clubInfoMore:" which aims to empower student developers in universities to impact their student communities through technology. The club organizes events, workshops, and projects on topics such as Android App Development, Google Cloud, Flutter and more. The club also helps students to build solutions for real, local or global issues using Google technologies. The club is led by a GDSC lead, who is a student with foundational knowledge about software development and passion for leading a community of developers.",
        clubImageOne:"/images/aboutpage/gdscOne.jpg",
        clubImageTwo:"/images/aboutpage/gdscTwo.jpg",
        clubImageThree:"/images/aboutpage/gdscOne.jpg"
    },
        {
        clubName:"AI Club",
        clubInfoTwoLines:"The Artificial Intelligence Club is a collaborative platform that brings together students, teachers and professionals interested in exploring and promoting innovative AI-",
        clubInfoMore:"based technologies. The club provides opportunities for learning, discussing and working on AI-related and research enabling members to stay updated with the latest trends and development in the field. Through workshops, seminars and competitions, the club fosters a community of AI enthusiasts, encouraging collab, among its members.",
        clubImageOne:"/images/aboutpage/aiOne.jpeg",
        clubImageTwo:"/images/aboutpage/aiOne.jpeg",
        clubImageThree:"/images/aboutpage/rigOne.jpg"
    },
        {
        clubName:"FOSS CELL",
        clubInfoTwoLines:"FOSS-NITC is a community that promotes and contribute to the Free and Open Source Community. ",
        clubInfoMore:"The community comprises passionate students and faculties who work towards the promotion of free and open-source technology tools and the development of software that respects user freedom. FOSS fosters an inclusive culture on campus by facilitating strong discussions on open source, the latest technology and topics related to freedom.",
        clubImageOne:"/images/aboutpage/fossOne.jpeg",
        clubImageTwo:"/images/aboutpage/fossTwo.jpg",
        clubImageThree:"/images/aboutpage/fossOne.jpeg"
    },

      {
        clubName:"Team UNWIRED",
        clubInfoTwoLines:"Team Unwired is a student club at NITC which undertakes student engineering projects and competitions. It is a joint venture between Club",
        clubInfoMore:" Unwired - the engineering and technology club of NIT Calicut and SAE INDIA Collegiate club.",
        clubImageOne:"/images/aboutpage/unwiredTwo.jpg",
        clubImageTwo:"/images/aboutpage/unwiredOne.jpg",
        clubImageThree:"/images/aboutpage/unwiredThree.jpg"
    },

      {
        clubName:"AEROUNWIRED",
        clubInfoTwoLines:"AeroUnwired is an aero-modelling club, a branch of Club Unwired, found by students of NITC who aspired to harness the knowledge",
        clubInfoMore:"of flight. Inspired by the magnificent creatures with wings and technical aspects of the same, this club puts effort to build aircrafts and study the science of flight. The club offers knowledge to those who seek and invest their time in innovation. With a classical workspace to work & supportive faculty members and seniors, this club welcomes all those who wish to learn.",
        clubImageOne:"/images/aboutpage/aerounwiredTwo.png",
        clubImageTwo:"/images/aboutpage/aerounwiredOne.png",
        clubImageThree:"/images/aboutpage/aerounwiredTwo.png",
    },

    {
      clubName:"IEEE",
      clubInfoTwoLines:"A group of enthusiastic students who are passionate about technology and innovation. Our aim is to foster technical skills, knowledge sharing, and professional development among our members.",
      clubInfoMore:"Through various events, workshops, and projects, we strive to create a vibrant community that encourages collaboration and learning in the field of engineering. Join us and become a part of our journey towards exploring and shaping the future of technology!",
      clubImageOne:"/images/aboutpage/ieee1.jpeg",
      clubImageTwo:"/images/aboutpage/ieee2.jpeg",
      clubImageThree:"/images/aboutpage/ieee3.jpeg",
  },



]

function AboutRoute() {

  return (
    <div>
        {/* <NewAbout/> */}
        <AboutUs/>
        <Departments/>
      <div className='clubhead'>
        <span>Technical Clubs At NIT Calicut</span>
      </div>
       {
        clubInfo.map((item, index) => (
            <AboutSubCompo clubContent = {item} />
        ))
       }
       <div style={{marginTop:'0rem'}} className='clubhead'>
        <span>Cultural Clubs At NIT Calicut</span>
      </div>
       <CulturalClubs/>
    </div>
  )
}

export default AboutRoute