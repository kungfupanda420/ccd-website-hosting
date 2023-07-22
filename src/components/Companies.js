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

import { FaAtlassian, FaSalesforce } from "react-icons/fa";

import { BsAmd, BsNvidia } from "react-icons/bs";

import { GrOracle } from "react-icons/gr";

import { GiTexas } from "react-icons/gi";

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
    companyName: "Suzuki",
    svg: <SiSuzuki />,
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
    companyName: "Texas",
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

  const animation = useAnimation();
  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  useEffect(() => {
    if (inView) {
      animation.start({
        scale: 1,
        opacity: 1,
        transition: {
          duration:2,
          type: "spring",
          stiffness: 260,
          staggerChildren:1
        },
      });
    } else {
      animation.start({
        scale: 0.25,
        opacity: 0.15,
      });
    }
  });

  return (
    <div
      ref={ref}
      className="companiesContainer"
      onMouseOver={handleMouseOVer}
      onMouseLeave={handleMouseLeave}
    >
      <div className="backgroundHover" ref={cursor} style={cursorStyling}></div>

      <div className="gridContainer">
        {CompaniesLogo.map((item, index) => (
          <div className="item">
            <motion.div animate={animation}>{item.svg}</motion.div>
            {item.companyName != "" ? (
              <span className="companyName tinyTexts">{item.companyName}</span>
            ) : (
              ""
            )}
          </div>
        ))}
      </div>
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
