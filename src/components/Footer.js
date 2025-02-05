import '../css/Footer.css'
import { FaSquareInstagram, FaLinkedin } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { IoLocationSharp } from "react-icons/io5";
import { useEffect } from 'react';

function Footer() {
    //useEffect(() => {
    //     AOS.init({duration: 1000});
    //   }, []);
    return (

        <>
            <div className="footer">
                <div className="footerContent smallHeading">
                    <div className='footercontact'>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3912.184009667951!2d75.9325446759246!3d11.321257248906157!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba643cc776435c3%3A0x8c2fc08ee720516f!2sCENTRE%20FOR%20CAREER%20DEVELOPMENT%20-%20NITC!5e0!3m2!1sen!2sin!4v1718787592552!5m2!1sen!2sin" width="300" height="300" style={{'border':'2px'}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"/>
                    
                    
                    </div>

                    <div className='links'>
                    <div className="footerSubContent">
                        <p className='footerTitle'>Contact</p>
                        <ul className='footerLinks'>
                            <li><a href="tel:04952286601">{<FaPhoneAlt />} 04952286601 </a></li>
                            <li><a href="mailto:placement@nitc.ac.in">{<IoIosMail size={18} />} placement@nitc.ac.in</a></li>
                            <li ><a className='location' href="https://www.google.com/maps/place/CENTRE+FOR+CAREER+DEVELOPMENT+-+NITC/@11.321252,75.9351196,17z/data=!3m1!4b1!4m6!3m5!1s0x3ba643cc776435c3:0x8c2fc08ee720516f!8m2!3d11.321252!4d75.9351196!16s%2Fg%2F11sqkfd640?authuser=0&entry=ttu" rel='noreferrer' target='_blank'><span id='loc-pin'>{<IoLocationSharp className='pin' />}</span> Location</a></li>
                        </ul>
                    </div>
                    <div className="footerSubContent">
                        <p className='footerTitle'>Resources</p>
                        <ul className='footerLinks'>
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
                        <p className='footerTitle'>Social</p>
                        <ul className='footerLinks '>
                            <li><a className='linkedin' href="https://www.linkedin.com/company/training-placement-cell-nit-calicut/?originalSubdomain=in" rel="noreferrer" target='_blank'>{<FaLinkedin />} LinkedIn</a></li>
                            <li><a className='insta' href="https://instagram.com/ccd.nitc?igshid=NTc4MTIwNjQ2YQ==" rel="noreferrer" target='_blank'>{<FaSquareInstagram />} Instagram</a></li>
                            {/* <li><a href="!#">Facebook</a></li> */}
                        </ul>
                    </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Footer
