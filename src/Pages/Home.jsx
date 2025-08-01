import React from 'react';
import Banner from '../Components/Banner/Banner';
import Slides from '../Components/Slides/Slides';
import SectionHeading from '../Components/SectionHeading/SectionHeading';
import PopularMenu from '../Components/PopularMenu/PopularMenu';

const Home = () => {
    return (
        <div className=''>
            <Banner></Banner>
            <SectionHeading heading={"Order Online"} subheading={"From 10:00am to 11:00pm"}></SectionHeading>
            <Slides></Slides>
            <PopularMenu></PopularMenu>
        </div>
    );
};

export default Home;