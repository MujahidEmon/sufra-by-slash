import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import coverImg from '../../assets/shop/banner2.jpg'
import Cover from '../../Components/Shared/Cover/Cover';
import { useState } from 'react';
import FoodCard from '../../Components/FoodCard/FoodCard';
import useMenu from '../../Hooks/useMenu';
import DynamicTitle from '../../Components/DynamicTitle/DynamicTitle';
const OrderFood = () => {
    const [tabIndex, setTabIndex] = useState(0);
    const items = useMenu();
    const offerItems = items.filter(item => item.category === 'offered')
    const dessertItems = items.filter(item => item.category === 'dessert')
    return (

        <div>
            <DynamicTitle title={'Order Food'}></DynamicTitle>
            <Cover img={coverImg} title={"Order Your Food"}></Cover>
            <div className='max-w-7xl mx-auto'>
                <div className='flex justify-center my-12'>
                    <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)} >
                        <TabList>
                            <Tab>Salads</Tab>
                            <Tab>Pizza</Tab>
                            <Tab>Soup</Tab>
                            <Tab>Dessert</Tab>
                            <Tab>Drinks</Tab>
                        </TabList>
                        <TabPanel></TabPanel>
                        <TabPanel></TabPanel>
                        <TabPanel></TabPanel>
                        <TabPanel></TabPanel>
                        <TabPanel></TabPanel>
                    </Tabs>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-fit mx-auto mb-12'>
                    {
                        dessertItems.map(item => <FoodCard key={item._id} item={item}></FoodCard>)
                    }
                </div>
            </div>
        </div>


    );
};

export default OrderFood;