import SectionHeading from "../SectionHeading/SectionHeading";
import img from '../../assets/home/featured.jpg'
const FromMenu = () => {

    return (
        <div 
        // style={{
        //     backgroundImage: `url(${img}) `
        // }} 
        className="  backdrop-blur-xs md:p-16 p-8 text-white bg-black/30">
            <SectionHeading subheading={'Check it Out'} heading={'from our menu'}></SectionHeading>
            <div className="flex flex-col md:flex-row gap-8">
                <div className="w-1/2">
                    <img src={img} alt="" />
                </div>
                <div className="w-1/2 flex flex-col gap-3">
                    <p>02 August, 2025</p>
                    <h2 className="uppercase text-2xl">Where I can get some</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae adipisci maxime voluptas nemo, consequatur sit mollitia magnam minima, placeat dolore facilis atque hic eum. Fuga necessitatibus alias fugit voluptatum vitae!</p>
                    <button className="btn btn-outline w-fit">Order Now</button>
                </div>
            </div>
        </div>
    );
};

export default FromMenu;