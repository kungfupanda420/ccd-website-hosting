import '../css/Hero.css'
import HeroCarousal from './HeroCarousal'


const Hero = () => {
    return(
        <>
        <div className="heroFull">
        <HeroCarousal />
            <div className="heroSection">
                <div className="heroText">
                    <h1 className="heroHeading">
                    <span className='head1'>C</span><span className='rest1'>ENTRE FOR </span>
                    <span className='head1'>C</span><span className='rest1'>AREER </span>
                    <span className='head1'>D</span><span className='rest1'>EVELOPMENT</span>
                    </h1>
                    <h1 className="heroSubHeading">NIT CALICUT</h1>
                </div>
            </div>
        </div>
        </>
    )
}


export default Hero