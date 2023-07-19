import React, {useState} from 'react'
import NewAbout from './NewAbout'
import AboutSubCompo from './AboutSubCompo'

const clubInfo=[
    {
        clubName:"Rig Club",
        clubInfoTwoLines:"Robotics Interest Group(RIG) was formed out of the passion for robotics, to facilitate learning and researh in the areas of Machatronics/Robotics and ",
        clubInfoMore:"Intelligent Systems, Automation, Advanced Control Systems, Modeling and Simulation, and Sensors & Algorithms. Our aim is to acquire knowledge and appropriate hands-on experience, in order to meet the needs of these rapidly changing technologies and provide services to industry for promoting new technologies as well as designing and manufacturing commercially viable products, for the development of our country",
        clubImageOne:"/images/aboutpage/rigOne.jpg",
        clubImageTwo:"/images/aboutpage/rigTwo.jpg",
        clubImageThree:"/images/aboutpage/rigOne.jpg"
    },
        {
        clubName:"GDSC Club",
        clubInfoTwoLines:"GDSC club at nitc is a community group for students who are interested in learning and applying Google developer technologies. The club is part of the Google Developer Student Clubs (GDSC) program, ",
        clubInfoMore:" which aims to empower student developers in universities to impact their student communities through technology. The club organizes events, workshops, and projects on topics such as Android App Development, Google Cloud, Flutter, and more. The club also helps students to build solutions for real local or global issues using Google technologies. The club is led by a GDSC lead, who is a student with foundational knowledge about software development and passion for leading a community of developers.",
        clubImageOne:"/images/aboutpage/rigOne.jpg",
        clubImageTwo:"/images/aboutpage/rigTwo.jpg",
        clubImageThree:"/images/aboutpage/rigOne.jpg"
    },
        {
        clubName:"AI Club",
        clubInfoTwoLines:"The Artificial Intelligence Club is a collaborative platform that brings together students, teachers, and professionals interested in exploring and promoting innovative AI- ",
        clubInfoMore:"based technologies. The club provides opportunities for learning, discussing, and working on AI-related and research enabling memebers to stay updated with the latest trends and development in the field. Through workshops, seminars and competitins, the club fosters a acommunity of AI enthusiasts, encouraging collab, among its members",
        clubImageOne:"/images/aboutpage/rigOne.jpg",
        clubImageTwo:"/images/aboutpage/rigTwo.jpg",
        clubImageThree:"/images/aboutpage/rigOne.jpg"
    },
        {
        clubName:"FOSS CELL",
        clubInfoTwoLines:"FOSS-NITC is a community that promotes and contribute to the Free and Open Source Community",
        clubInfoMore:"The community comprises passionate students and faculties who work towards the promotion of free and open-source technology tools and the developement of software that respects user freedom. FOSS fosters an inclusive culture on campus by facilitating strong discussins on open source, the latest techology and topics related to freedom.",
        clubImageOne:"/images/aboutpage/rigOne.jpg",
        clubImageTwo:"/images/aboutpage/rigTwo.jpg",
        clubImageThree:"/images/aboutpage/rigOne.jpg"
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