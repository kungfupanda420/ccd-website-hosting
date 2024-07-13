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
                    <div class="testimonial">
                        <span class="icon fa fa-quote-left"></span>
                        <p class="description">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                        </p>
                        <div class="testimonial-content">
                            <div class="pic">
                                <img src="https://picsum.photos/130/130?image=1027" alt="" />
                            </div>
                            <h3 class="name">Michele Miller</h3>
                            <span class="title">Project Manager</span>
                        </div>
                    </div>
                </SwiperSlide>


                <SwiperSlide>
                    <div class="testimonial">
                        <span class="icon fa fa-quote-left"></span>
                        <p class="description">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                        </p>
                        <div class="testimonial-content">
                            <div class="pic">
                                <img src="https://picsum.photos/130/130?image=1027" alt="" />
                            </div>
                            <h3 class="name">Michele Miller</h3>
                            <span class="title">Project Manager</span>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                <div class="testimonial">
                        <span class="icon fa fa-quote-left"></span>
                        <p class="description">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                        </p>
                        <div class="testimonial-content">
                            <div class="pic">
                                <img src="https://picsum.photos/130/130?image=1027" alt="" />
                            </div>
                            <h3 class="name">Michele Miller</h3>
                            <span class="title">Project Manager</span>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                <div class="testimonial">
                        <span class="icon fa fa-quote-left"></span>
                        <p class="description">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                        </p>
                        <div class="testimonial-content">
                            <div class="pic">
                                <img src="https://picsum.photos/130/130?image=1027" alt="" />
                            </div>
                            <h3 class="name">Michele Miller</h3>
                            <span class="title">Project Manager</span>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </>
    )
}

export default AluminiTest