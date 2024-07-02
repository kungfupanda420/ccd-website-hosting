import '../css/Footer.css'
// import { NavLink } from 'react-router-dom'
// import  { useEffect } from 'react';
import { FaSquareInstagram, FaLinkedin  } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { IoLocationSharp } from "react-icons/io5";

// import AOS from "aos";
// import "aos/dist/aos.css";
function Footer(){

    return(
        <>
            <div className="footer">
                <div className="footerContent smallHeading">
                   <div className="footerSubContent">
                     <p className='footerTitle'>Resources</p>
                        <ul className='footerLinks '>
                       <li><a href="https://nitc.ac.in/" rel="noreferrer" target='_blank'>NIT Calicut</a></li>
                       <li><a href="https://www.linkedin.com/company/ieee-sb-nitc/?originalSubdomain=in" rel="noreferrer" target='_blank'>IEEE NIT Calicut</a></li>
                       <li><a href="!#">Clubs NIT Calicut</a></li>
                    </ul>
                   </div>

                    {/* <div className="footerSubContent">
                     <p className='footerTitle'>Terms</p>
                    <ul className='footerLinks'>
                        <li><NavLink>Privacy Policy</NavLink></li>
                        <li><NavLink>Cookies</NavLink></li>
                    </ul>
                   </div> */}

                    <div className="footerSubContent">
                     <p className='footerTitle'>Contact</p>
                    <ul className='footerLinks'>
                        <li><a href="!#">{<FaPhoneAlt/>} 04952286601 </a></li>
                        <li><a href="!#">{<IoIosMail size={18}/>} ccd@nitc.ac.in</a></li>
                        <li><a href="https://www.google.com/maps/place/CENTRE+FOR+CAREER+DEVELOPMENT+-+NITC/@11.321252,75.9351196,17z/data=!3m1!4b1!4m6!3m5!1s0x3ba643cc776435c3:0x8c2fc08ee720516f!8m2!3d11.321252!4d75.9351196!16s%2Fg%2F11sqkfd640?authuser=0&entry=ttu" rel='noreferrer' target='_blank'>{<IoLocationSharp/>} Location</a></li>
                    </ul>
                   </div>

                   <div className="footerSubContent">
                     <p className='footerTitle'>Social</p>
                    <ul className='footerLinks '>
                       <li><a className='linkedin' href="https://www.linkedin.com/company/training-placement-cell-nit-calicut/?originalSubdomain=in" rel="noreferrer" target='_blank'>{<FaLinkedin />} LinkedIn</a></li>
                       <li><a className='insta' href="https://instagram.com/ccd.nitc?igshid=NTc4MTIwNjQ2YQ==" rel="noreferrer" target='_blank'>{<FaSquareInstagram/>} Instagram</a></li>
                       {/* <li><a href="!#">Facebook</a></li> */}
                    </ul>
                   </div>

                </div>
            </div>
        </>
    )
}

export default Footer
