import React from 'react'
import '../css/AboutUs.css'
import Facilities from './Facilities'
function AboutUs() {
    return (
        <>
            <div class="we-are-block">
                <div id="about-us-section">
                    <div class="about-us-image">
                        <img src="/images/aboutpage/aboutus.png" className='ccdImage' alt="CCD" />
                    </div>

                    <div class="about-us-info">
                        <h2>About Us</h2>
                        <p style={{ fontSize: '1rem', textAlign: 'justify' }}>The Centre for Career Development (CCD) at NIT Calicut is dedicated to providing comprehensive career guidance, training, and placement support to students. Our mission is to empower students with the skills, knowledge and opportunities necessary to succeed in their chosen careers. We offer personalized counselling, industry connections and a range of workshops and training programmes to enhance employability skills. Our goal is to bridge the gap between academia and industry, ensuring students have access to internships, industrial training, and placement opportunities. At CCD, we are committed to nurturing well-rounded professionals who are equipped for the challenges of the ever-evolving job market.</p>
                        <a href="documents/placement_brochure_2024.pdf" download='NIT Calicut Brochure 2024' title="About Us Button">ABOUT NITC</a>
                    </div>
                </div>

                <div id="history-section">
                    {/* <div class="card">
                        <div class="card-inner">
                            <svg xmlns="http://www.w3.org/2000/svg" height="70" width="70" viewBox="0 0 512 512"><path className='aboutIcon' d="M256 0c17.7 0 32 14.3 32 32V42.4c93.7 13.9 167.7 88 181.6 181.6H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H469.6c-13.9 93.7-88 167.7-181.6 181.6V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V469.6C130.3 455.7 56.3 381.7 42.4 288H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H42.4C56.3 130.3 130.3 56.3 224 42.4V32c0-17.7 14.3-32 32-32zM107.4 288c12.5 58.3 58.4 104.1 116.6 116.6V384c0-17.7 14.3-32 32-32s32 14.3 32 32v20.6c58.3-12.5 104.1-58.4 116.6-116.6H384c-17.7 0-32-14.3-32-32s14.3-32 32-32h20.6C392.1 165.7 346.3 119.9 288 107.4V128c0 17.7-14.3 32-32 32s-32-14.3-32-32V107.4C165.7 119.9 119.9 165.7 107.4 224H128c17.7 0 32 14.3 32 32s-14.3 32-32 32H107.4zM256 224a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" /></svg>
                            <h1>Mission</h1>
                            <p>Liaison with talent acquisition teams of industries, consultant firms and research organisations for placement and internship opportunities. Collaborate with alumni to facilitate exploration of career options for students. Enhance the skill set of students through training programmes so as to make them career-ready.</p>
                        </div>
                    </div>

                    <div class="card">

                        <div class="card-inner">
                            <svg xmlns="http://www.w3.org/2000/svg" height="72" width="76" viewBox="0 0 576 512"><path className='aboutIcon' d="M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 0-1.3 0-2 0c1.3 5.1 2 10.5 2 16c0 35.3-28.7 64-64 64c-5.5 0-10.9-.7-16-2c0 .7 0 1.3 0 2c0 44.2 35.8 80 80 80zm0-208a128 128 0 1 1 0 256 128 128 0 1 1 0-256z" /></svg>                    <h1>Vision</h1>
                            <p>Inculcate a career-oriented campus culture that moulds the undergraduate, postgraduate and doctoral research students of the Institute to pursue their academic and professional goals.</p>
                        </div>
                    </div> */}

                </div>
            </div>
            <Facilities />
        </>
    )
}

export default AboutUs