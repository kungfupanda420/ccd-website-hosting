// import { useState } from 'react'
import '../css/AluminiTest.css'
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
// import required modules
import { Navigation } from 'swiper/modules';

const AluminiTest = () => {

    return (
        <>
        <h1 className='aluminihead'>Recruiter Testimonials</h1>
            <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                <SwiperSlide>
                    <div className="testimonial">
                        <span className="icon fa fa-quote-left"></span>
                        <p className="description">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                        </p>
                        <div className="testimonial-content">
                            <div className="pic">
                                <img src="https://media.istockphoto.com/id/1327592506/vector/default-avatar-photo-placeholder-icon-grey-profile-picture-business-man.jpg?s=612x612&w=0&k=20&c=BpR0FVaEa5F24GIw7K8nMWiiGmbb8qmhfkpXcp1dhQg=" 
                                alt="profile" 
                                className='recImage'/>
                            </div>
                            <h3 className="name">Project Manager</h3>
                            <span className="title">Project Manager</span>
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className="testimonial">
                        <span className="icon fa fa-quote-left"></span>
                        <p className="description">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                        </p>
                        <div className="testimonial-content">
                            <div className="pic">
                                <img src="https://media.istockphoto.com/id/1327592506/vector/default-avatar-photo-placeholder-icon-grey-profile-picture-business-man.jpg?s=612x612&w=0&k=20&c=BpR0FVaEa5F24GIw7K8nMWiiGmbb8qmhfkpXcp1dhQg=" 
                                alt="profile" 
                                className='recImage'/>
                            </div>
                            <h3 className="name">Project Manager</h3>
                            <span className="title">Project Manager</span>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="testimonial">
                        <span className="icon fa fa-quote-left"></span>
                        <p className="description">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                        </p>
                        <div className="testimonial-content">
                            <div className="pic">
                                <img src="https://media.istockphoto.com/id/1327592506/vector/default-avatar-photo-placeholder-icon-grey-profile-picture-business-man.jpg?s=612x612&w=0&k=20&c=BpR0FVaEa5F24GIw7K8nMWiiGmbb8qmhfkpXcp1dhQg=" 
                                alt="profile" 
                                className='recImage'/>
                            </div>
                            <h3 className="name">Project Manager</h3>
                            <span className="title">Project Manager</span>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="testimonial">
                        <span className="icon fa fa-quote-left"></span>
                        <p className="description">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                        </p>
                        <div className="testimonial-content">
                            <div className="pic">
                                <img src="https://media.istockphoto.com/id/1327592506/vector/default-avatar-photo-placeholder-icon-grey-profile-picture-business-man.jpg?s=612x612&w=0&k=20&c=BpR0FVaEa5F24GIw7K8nMWiiGmbb8qmhfkpXcp1dhQg=" 
                                alt="profile" 
                                className='recImage'/>
                            </div>
                            <h3 className="name">Project Manager</h3>
                            <span className="title">Project Manager</span>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </>
    )
}

export default AluminiTest