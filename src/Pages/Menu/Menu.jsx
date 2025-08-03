import DynamicTitle from '../../Components/DynamicTitle/DynamicTitle';
import SectionHeading from '../../Components/SectionHeading/SectionHeading';
import Cover from '../../Components/Shared/Cover/Cover';
import menuImg from '../../assets/menu/banner3.jpg'

const Menu = () => {
    return (
        <div>
            <DynamicTitle title={"Menu"}></DynamicTitle>
            <Cover img={menuImg} title={'OUR MENU'} subTitle={'Would you like to try a dish?'}></Cover>
            <SectionHeading subheading={"Don't Miss"} heading={"today's offer"}></SectionHeading>
        </div>
    );
};

export default Menu;