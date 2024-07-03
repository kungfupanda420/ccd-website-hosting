import React from 'react'
import '../css/AboutUs.css'

function AboutUs() {
    return (
        <>
            <div class="we-are-block">
                <div id="about-us-section">
                    <div class="about-us-image">
                        <img src="/images/aboutpage/aboutus.png" width="600" height="300" alt="Lobby Image" />
                    </div>

                    <div class="about-us-info">
                        <h2>About Us</h2>
                        <p style={{fontSize:'1rem'}}>The Centre for Career Development (CCD) at NIT Calicut is dedicated to providing comprehensive career guidance, training, and placement support to students. Our mission is to empower students with the skills, knowledge and opportunities necessary to succeed in their chosen careers. We offer personalized counselling, industry connections and a range of workshops and training programmes to enhance employability skills. Our goal is to bridge the gap between academia and industry, ensuring students have access to internships, industrial training, and placement opportunities. At CCD, we are committed to nurturing well-rounded professionals who are equipped for the challenges of the ever-evolving job market.</p>
                        <a href="#" title="About Us Button">ABOUT US</a>
                    </div>
                </div>

            <div id="history-section">
                <div class="card">
                    
                    <div class="card-inner">
                    <svg xmlns="http://www.w3.org/2000/svg" height="70" width="70" viewBox="0 0 512 512"><path d="M256 0c17.7 0 32 14.3 32 32V42.4c93.7 13.9 167.7 88 181.6 181.6H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H469.6c-13.9 93.7-88 167.7-181.6 181.6V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V469.6C130.3 455.7 56.3 381.7 42.4 288H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H42.4C56.3 130.3 130.3 56.3 224 42.4V32c0-17.7 14.3-32 32-32zM107.4 288c12.5 58.3 58.4 104.1 116.6 116.6V384c0-17.7 14.3-32 32-32s32 14.3 32 32v20.6c58.3-12.5 104.1-58.4 116.6-116.6H384c-17.7 0-32-14.3-32-32s14.3-32 32-32h20.6C392.1 165.7 346.3 119.9 288 107.4V128c0 17.7-14.3 32-32 32s-32-14.3-32-32V107.4C165.7 119.9 119.9 165.7 107.4 224H128c17.7 0 32 14.3 32 32s-14.3 32-32 32H107.4zM256 224a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/></svg>
                        <h1>Mission</h1>
                        <p>Liaison with talent acquisition teams of industries, consultant firms and research organisations for placement and internship opportunities. Collaborate with alumni to facilitate exploration of career options for students. Enhance the skill set of students through training programmes so as to make them career-ready.</p>
                    </div>
                </div>

                <div class="card">
                    
                    <div class="card-inner">
                    <svg xmlns="http://www.w3.org/2000/svg" height="72" width="76" viewBox="0 0 576 512"><path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"/></svg>
                    <h1>Vision</h1>
                    <p>Inculcate a career-oriented campus culture that moulds the undergraduate, postgraduate and doctoral research students of the Institute to pursue their academic and professional goals.</p>
                    </div>
                </div>

            </div>
            </div>
        </>
    )
}

export default AboutUs