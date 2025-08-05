import DynamicTitle from '../../Components/DynamicTitle/DynamicTitle';
import SectionHeading from '../../Components/SectionHeading/SectionHeading';
import Cover from '../../Components/Shared/Cover/Cover';
import useMenu from '../../Hooks/useMenu';
import menuImg from '../../assets/menu/banner3.jpg'
import pizzaImg from '../../assets/menu/pizza-bg.jpg'
import saladImg from '../../assets/menu/salad-bg.jpg'
import soupImg from '../../assets/menu/soup-bg.jpg'
import dessertImg from '../../assets/menu/dessert-bg.jpeg'
import MenuCategory from './MenuCategory';

const Menu = () => {
    const items = useMenu();
    const offerItems = items.filter(item => item.category === 'offered')
    const dessertItems = items.filter(item => item.category === 'dessert')
    const saladItems = items.filter(item => item.category === 'salad')
    const pizzaItems = items.filter(item => item.category === 'pizza')
    const soupItems = items.filter(item => item.category === 'soup')
    // console.log(menu);
    return (
        <div>
            <DynamicTitle title={"Menu"}></DynamicTitle>
            <Cover img={menuImg} title={'OUR MENU'} subTitle={'Would you like to try a dish?'}></Cover>
            <div className='max-w-7xl mx-auto my-20'>
                <SectionHeading subheading={"Don't Miss"} heading={"today's offer"}></SectionHeading>
                <MenuCategory items={offerItems} ></MenuCategory>
            </div>
            <div className='max-w-7xl mx-auto my-20'>
                <MenuCategory items={dessertItems} title={'dessert'} subTitle={'Taste the Best Dessert Items'} img={dessertImg}></MenuCategory>
            </div>
            <div className='max-w-7xl mx-auto my-20'>
                <MenuCategory items={saladItems} title={'salad'} subTitle={'Want Salad? Get Yours'} img={saladImg}></MenuCategory>
            </div>
            <div className='max-w-7xl mx-auto my-20'>
                <MenuCategory items={pizzaItems} title={'pizza'} subTitle={'Best Selling Pizzas In Your City'} img={pizzaImg}></MenuCategory>
            </div>
            <div className='max-w-7xl mx-auto my-20'>
                <MenuCategory items={soupItems} title={'soup'} subTitle={'Eat Healthy And Be Wealthy'} img={soupImg}></MenuCategory>
            </div>
            
        </div>
    );
};

export default Menu;