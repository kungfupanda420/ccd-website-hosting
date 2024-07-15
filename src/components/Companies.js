import React from "react";
import "../css/Companies.css";
import { useRef, useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";
import {
  SiCisco,
  SiSap,
  SiIntel,
  SiAccenture,
  SiTata,
  SiSuzuki,
} from "react-icons/si";


import { FaAtlassian, FaSalesforce } from "react-icons/fa";

import { BsAmd, BsNvidia } from "react-icons/bs";

import { GrOracle } from "react-icons/gr";

import { GiTexas } from "react-icons/gi";
import AOS from "aos";
import "aos/dist/aos.css";
const CompaniesLogo = [
  {
    companyName: "",
    svg: "",
  },
  {
    companyName: "",
    svg: "",
  },
  {
    companyName: "Tata",
    svg: <SiTata />,
  },
  {
    companyName: "",
    svg: "",
  },
  {
    companyName: "",
    svg: "",
  },
  {
    companyName: "",
    svg: "",
  },
  {
    companyName: "Accenture",
    svg: <SiAccenture />,
  },
  {
    companyName: "",
    svg: "",
  },
  {
    companyName: "",
    svg: "",
  },
  {
    companyName: "CISCO",
    svg: <SiCisco />,
  },
  {
    companyName: "",
    svg: "",
  },
  {
    companyName: "",
    svg: "",
  },

  {
    companyName: "",
    svg: "",
  },
  {
    companyName: "",
    svg: "",
  },
  {
    companyName: "",
    svg: "",
  },

  {
    companyName: "",
    svg: "",
  },
  {
    companyName: "",
    svg: "",
  },
  {
    companyName: "SAP",
    svg: <SiSap />,
  },
  {
    companyName: "",
    svg: "",
  },
  {
    companyName: "",
    svg: "",
  },
  {
    companyName: "",
    svg: "",
  },
  {
    companyName: "",
    svg: "",
  },

  {
    companyName: "",
    svg: "",
  },
  {
    companyName: "",
    svg: "",
  },

  {
    companyName: "",
    svg: "",
  },

  {
    companyName: "Intel",
    svg: <SiIntel />,
  },
  {
    companyName: "",
    svg: "",
  },
  {
    companyName: "",
    svg: "",
  },

  {
    companyName: "",
    svg: "",
  },
  {
    companyName: "",
    svg: "",
  },

  {
    companyName: "",
    svg: "",
  },
  {
    companyName: "Oracle",
    svg: <GrOracle />,
  },
  {
    companyName: "",
    svg: "",
  },
  {
    companyName: "",
    svg: "",
  },
  {
    companyName: "",
    svg: "",
  },
  {
    companyName: "",
    svg: "",
  },

  {
    companyName: "AMD",
    svg: <BsAmd />,
  },

  {
    companyName: "",
    svg: "",
  },

  {
    companyName: "",
    svg: "",
  },

  {
    companyName: "",
    svg: "",
  },
  {
    companyName: "",
    svg: "",
  },
  {
    companyName: "",
    svg: "",
  },
  {
    companyName: "",
    svg: "",
  },

  {
    companyName: "JP Morgan",
    svg: <img src="/images/companies/jp.png" alt="" />,
  },
  {
    companyName: "",
    svg: "",
  },

  {
    companyName: "",
    svg: "",
  },
  {
    companyName: "Nvidia",
    svg: <BsNvidia />,
  },
  {
    companyName: "",
    svg: "",
  },
  {
    companyName: "",
    svg: "",
  },
  {
    companyName: "",
    svg: "",
  },

  {
    companyName: "",
    svg: "",
  },
  {
    companyName: "",
    svg: "",
  },
  {
    companyName: "Suzuki",
    svg: <SiSuzuki />,
  },

  {
    companyName: "",
    svg: "",
  },
  {
    companyName: "Atlassian",
    svg: <FaAtlassian />,
  },
  {
    companyName: "",
    svg: "",
  },
  ,
  {
    companyName: "",
    svg: "",
  },
  {
    companyName: "",
    svg: "",
  },
  {
    companyName: "Texas Instruments",
    svg: <GiTexas />,
  },
  {
    companyName: "",
    svg: "",
  },
  {
    companyName: "",
    svg: "",
  },
  {
    companyName: "",
    svg: "",
  },
  {
    companyName: "",
    svg: "",
  },
  {
    companyName: "",
    svg: "",
  },

  {
    companyName: "",
    svg: "",
  },
  {
    companyName: "",
    svg: "",
  },

  {
    companyName: "",
    svg: "",
  },
  {
    companyName: "",
    svg: "",
  },
  {
    companyName: "Deloitte Digital",
    svg: <img src="/images/companies/deloitte.png" alt="" />,
  },
  {
    companyName: "",
    svg: "",
  },
  {
    companyName: "",
    svg: "",
  },

  {
    companyName: "",
    svg: "",
  },
  {
    companyName: "",
    svg: "",
  },
  {
    companyName: "",
    svg: "",
  },
  {
    companyName: "",
    svg: "",
  },
  {
    companyName: "",
    svg: "",
  },
  {
    companyName: "",
    svg: "",
  },

  {
    companyName: "General Electric",
    svg: <img src="/images/companies/ge.png" alt="" />,
  },
  {
    companyName: "",
    svg: "",
  },
  {
    companyName: "",
    svg: "",
  },
  {
    companyName: "IBM",
    svg: <img src="/images/companies/ibm.png" alt="" />,
  },
  {
    companyName: "",
    svg: "",
  },
  {
    companyName: "",
    svg: "",
  },
  {
    companyName: "",
    svg: "",
  },

  {
    companyName: "",
    svg: "",
  },

  {
    companyName: "",
    svg: "",
  },
  {
    companyName: "Discovery",
    svg: <img src="/images/companies/discovery.png" alt="" />,
  },
  {
    companyName: "",
    svg: "",
  },
  {
    companyName: "",
    svg: "",
  },
  {
    companyName: "Larsen & Toubro",
    svg: <img src="/images/companies/lt.png" alt="" />,
  },
  {
    companyName: "",
    svg: "",
  },
  {
    companyName: "Sales Force",
    svg: <FaSalesforce />,
  },
  {
    companyName: "",
    svg: "",
  },
  {
    companyName: "",
    svg: "",
  },
  {
    companyName: "",
    svg: "",
  },

  {
    companyName: "",
    svg: "",
  },
  {
    companyName: "",
    svg: "",
  },
  {
    companyName: "TCS",
    svg: <img src="/images/companies/tcs.png" alt="" />,
  },
  {
    companyName: "",
    svg: "",
  },
  {
    companyName: "",
    svg: "",
  },
  {
    companyName: "",
    svg: "",
  },
  {
    companyName: "",
    svg: "",
  },
  {
    companyName: "",
    svg: "",
  },
  {
    companyName: "TVS",
    svg: <img src="/images/companies/tvs.png" alt="" />,
  },
  {
    companyName: "",
    svg: "",
  },
];


//main componenet starts here

function Companies() {
  const [moment, setMoment] = useState({
    x: 0,
    y: 0,
  });

  const cursor = useRef();

  const handleMouseOVer = (e) => {
    setMoment({
      x: e.clientX,
      y: e.clientY,
    });
  };
  const handleMouseLeave = (e) => {
    setMoment({
      x: 0,
      y: 0,
    });
  };
  const cursorStyling = {
    transform: `translate(${moment.x - 50}px, ${moment.y - 50}px)`,
  };

  //use in view hoook
  const animation = useAnimation()
  const [inViewRef, inView] = useInView({threshold:0.15})

  const popUpVariants ={
    hidden:{
      scale:0.05,
      opacity:0.25
    },
    visible: (index)=>({
      scale:1, 
      opacity:1,
      transition:{
        duration:5,
        delay:0.25,
        delayChildren: 2*index,
        type:"spring",
        stiffness:100,
        staggerChildren:10*index
      }
    })
  }

  useEffect(() => {
    if(inView){
      animation.start("visible")
    }
    else{
      animation.start('hidden')
    }
  }, [animation, inView])
  useEffect(() => {
    AOS.init({duration: 1000});
  }, []);
  return (
    <div
    ref={inViewRef}
      className="companiesContainer"
      onMouseOver={handleMouseOVer}
      onMouseLeave={handleMouseLeave}
      data-aos="zoom-in"
    >
      <div className="backgroundHover" ref={cursor} style={cursorStyling}></div>

      <motion.div className="gridContainer">
        {CompaniesLogo.map((item, index) => (
          <div 
          
          className="item">
            <motion.div 
            variants={popUpVariants}
            initial="hidden"
            custom={index}
            whileInView="visible"
         >
              {item.svg}
            </motion.div>
            {item.companyName != "" ? (
              <span className="companyName tinyTexts">{item.companyName}</span>
            ) : (
              ""
            )}
          </div>
        ))}
      </motion.div>
      <div className="headingCompany">
        <h1 className="mainHeading">
          Recruiting
          <br /> Companies
        </h1>
      </div>
    </div>
  );
}

export default Companies;


//  useEffect(() => {
//    const mouseMove = e => {
//     setMoment({
//       x: e.clientX,
//       y: e.clientY - 150
//     })

//    }
//    cursor.current.addEventListener('mousemove', mouseMove)

//    return () => {
//     cursor.current.addEventListener('mousemove', mouseMove)
//    }
//   }, [])





// SiQualcomm,
// SiSamsung,
// SiBarclays,
// ,
// ,
// SiMercedes,
// SiFord,
// SiRelianceindustrieslimited,
// SiPaytm,
//FaUber,
//BsGoogle,