import React from 'react';
import Banner from '../Components/Banner/Banner';
import Slides from '../Components/Slides/Slides';
import SectionHeading from '../Components/SectionHeading/SectionHeading';

const Home = () => {
    return (
        <div className=''>
            <Banner></Banner>
            <SectionHeading heading={"Order Online"} subheading={"From 10:00am to 11:00pm"}></SectionHeading>
            <Slides></Slides>
        </div>
    );
};

export default Home;