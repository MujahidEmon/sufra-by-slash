import React, { useEffect, useState } from 'react';
import Banner from '../Components/Banner/Banner';
import Slides from '../Components/Slides/Slides';
import SectionHeading from '../Components/SectionHeading/SectionHeading';
import PopularMenu from '../Components/PopularMenu/PopularMenu';
import FromMenu from '../Components/FromMenu/FromMenu';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Rating } from '@smastrom/react-rating'

import '@smastrom/react-rating/style.css'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import './styles.css';

// import required modules
import { Navigation } from 'swiper/modules';


const Home = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch('reviews.json')
            .then(res => res.json())
            .then(data => {
                setReviews(data)
            })
    }, [])
    return (
        <div className=''>
            <Banner></Banner>
            <SectionHeading heading={"Order Online"} subheading={"From 10:00am to 11:00pm"}></SectionHeading>
            <Slides></Slides>
            <div className='mb-18'>
                <PopularMenu></PopularMenu>
                <div className='justify-center flex'>
                    <button className='border-t-0 border-l-0 border-r-0 btn border-b-2 border-black m-10'>View Full Menu</button>
                </div>
            </div>


            <div className=' bg-center bg-[url(/featured.jpg)] max-w-7xl mx-auto mb-18'>
                <FromMenu></FromMenu>
            </div>

            <div className='max-w-7xl mx-auto mb-18'>
                <SectionHeading heading={'testimonials'} subheading={'What Our Clients Say'}></SectionHeading>
                <Swiper navigation={true} modules={[Navigation]} className="mySwiper">

                    {
                        reviews.map(review => <SwiperSlide key={review._id} review={review}>
                            <div className='max-w-lg mx-auto flex flex-col items-center gap-4'>
                                <Rating
                                    style={{ maxWidth: 180 }}
                                    value={review.rating}
                                    readOnly
                                />
                                <p className='text-center'>{review.details}</p>
                                <p className='uppercase text-2xl text-orange-500'>{review.name}</p>

                            </div>
                        </SwiperSlide>)
                    }
                </Swiper>

            </div>
        </div>
    );
};

export default Home;