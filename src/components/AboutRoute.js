import React, {useState} from 'react'
import NewAbout from './NewAbout'
import AboutSubCompo from './AboutSubCompo'

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
        clubName:"Team AEROUNWIRED",
        clubInfoTwoLines:"AeroUnwired is an aero-modelling club, a branch of Club Unwired, found by students of NITC who aspired to harness the knowledge",
        clubInfoMore:"of flight. Inspired by the magnificent creatures with wings and technical aspects of the same, this club puts effort to build aircrafts and study the science of flight. The club offers knowledge to those who seek and invest their time in innovation. With a classical workspace to work & supportive faculty members and seniors, this club welcomes all those who wish to learn.",
        clubImageOne:"/images/aboutpage/aerounwiredTwo.png",
        clubImageTwo:"/images/aboutpage/aerounwiredOne.png",
        clubImageThree:"/images/aboutpage/aerounwiredTwo.png",
    },



]

function AboutRoute() {

  return (
    <div>
        <NewAbout/>

       {
        clubInfo.map((item, index) => (
            <AboutSubCompo clubContent = {item} />
        ))
       }

    </div>
  )
}

export default AboutRoute