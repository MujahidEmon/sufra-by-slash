import React from 'react';
import Banner from '../Components/Banner/Banner';
import Slides from '../Components/Slides/Slides';
import SectionHeading from '../Components/SectionHeading/SectionHeading';
import PopularMenu from '../Components/PopularMenu/PopularMenu';
import FromMenu from '../Components/FromMenu/FromMenu';

const Home = () => {
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
        </div>
    );
};

export default Home;