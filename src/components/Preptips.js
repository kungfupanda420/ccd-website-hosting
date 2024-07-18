import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination ,Navigation} from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

// import required modules
import '../css/Preptips.css'

function Preptips() {
  const posts=[{image:'/images/insta/insta1.jpg',profile:'https://www.instagram.com/ccd.nitc/p/C9g0gayxk7D/?img_index=1'},{image:'/images/insta/insta2.jpg',profile:'https://www.instagram.com/ccd.nitc/p/C862NYhPd_D/?img_index=1'}]
  return (
    <div className='preptipsmain'>
      {/* <h1 style={{ marginBottom: '1rem' }}>Prep Tips</h1> */}
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          // when window width is >= 320px
          320: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          // when window width is >= 640px
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          // when window width is >= 768px
          768: {
            slidesPerView: 1,
            spaceBetween: 30,
          },
          // when window width is >= 1024px
          1024: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1556:{
            slidesPerView: 3,
            spaceBetween: 30,
          },
          2200:{
            slidesPerView: 4,
            spaceBetween: 10,
          }
        }}
        modules={[FreeMode, Pagination]}
        className="mySwiper"
      >
        {posts.map((post,index)=>(
        <SwiperSlide>
          <div>
            <a href={post.profile} target='_blank'>
            <div class="cardPost">
              <div class="top">
                <div class="userDeatils">
                  <div class="profileImg">
                    <img src="/images/insta/ccdlogo.jpg" alt="user" class="cover" />
                  </div>
                  <h3>ccd.nitc<br /><span>NIT Calicut</span></h3>
                </div>
              </div>
              <div class="imgBg">
                <img src={post.image} alt="bg" class="cover" />
              </div>
            </div>
            </a>
          </div>
          {/* <img src='/images/insta/insta1.jpg' alt='post'/> */}
        </SwiperSlide>
        ))}
        
        <SwiperSlide>
          <div>
            <a href='https://www.instagram.com/ccd.nitc/p/C9g0gayxk7D/?img_index=1' target='_blank'>
            <div class="cardPost">
              <div class="top">
                <div class="userDeatils">
                  <div class="profileImg">
                    <img src="/images/insta/ccdlogo.jpg" alt="user" class="cover" />
                  </div>
                  <h3>ccd.nitc<br /><span>NIT Calicut</span></h3>
                </div>
              </div>
              <div class="imgBg">
                <img src='/images/insta/insta1.jpg' alt="bg" class="cover" />
              </div>
            </div>
            </a>
          </div>
          {/* <img src='/images/insta/insta1.jpg' alt='post'/> */}
        </SwiperSlide>
        <SwiperSlide>
          <div>
            <a href='https://www.instagram.com/ccd.nitc/p/C9g0gayxk7D/?img_index=1' target='_blank'>
            <div class="cardPost">
              <div class="top">
                <div class="userDeatils">
                  <div class="profileImg">
                    <img src="/images/insta/ccdlogo.jpg" alt="user" class="cover" />
                  </div>
                  <h3>ccd.nitc<br /><span>NIT Calicut</span></h3>
                </div>
              </div>
              <div class="imgBg">
                <img src='/images/insta/insta1.jpg' alt="bg" class="cover" />
              </div>
            </div>
            </a>
          </div>
          {/* <img src='/images/insta/insta1.jpg' alt='post'/> */}
        </SwiperSlide>
      </Swiper>
    </div>
  )

  
}

export default Preptips