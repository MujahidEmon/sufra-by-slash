import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import coverImg from '../../assets/shop/banner2.jpg'
import Cover from '../../Components/Shared/Cover/Cover';
import { useState } from 'react';
import FoodCard from '../../Components/FoodCard/FoodCard';
import useMenu from '../../Hooks/useMenu';
import DynamicTitle from '../../Components/DynamicTitle/DynamicTitle';
import { useParams } from 'react-router-dom';
const OrderFood = () => {
    const categories = ['salad', 'pizza', 'soup', 'dessert', 'drinks']
    const {category} = useParams()
    console.log(category);
    const initialIndex = categories.indexOf(category)
    const [tabIndex, setTabIndex] = useState(initialIndex);
    const items = useMenu();
    const drinksItems = items.filter(item => item.category === 'drinks')
    const dessertItems = items.filter(item => item.category === 'dessert')
    const saladItems = items.filter(item => item.category === 'salad')
    const pizzaItems = items.filter(item => item.category === 'pizza')
    const soupItems = items.filter(item => item.category === 'soup')
    return (

        <div>
            <DynamicTitle title={'Order Food'}></DynamicTitle>
            <Cover img={coverImg} title={"Order Your Food"}></Cover>
            <div className='max-w-7xl mx-auto'>
                <div className='flex justify-center my-12'>
                    <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)} >
                        <TabList>
                            <Tab>Salad</Tab>
                            <Tab>Pizza</Tab>
                            <Tab>Soup</Tab>
                            <Tab>Dessert</Tab>
                            <Tab>Drinks</Tab>
                        </TabList>
                        <TabPanel>
                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-fit mx-auto mb-12'>
                                {
                                    saladItems.map(item => <FoodCard key={item._id} item={item}></FoodCard>)
                                }
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-fit mx-auto mb-12'>
                                {
                                    pizzaItems.map(item => <FoodCard key={item._id} item={item}></FoodCard>)
                                }
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-fit mx-auto mb-12'>
                                {
                                    soupItems.map(item => <FoodCard key={item._id} item={item}></FoodCard>)
                                }
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-fit mx-auto mb-12'>
                                {
                                    dessertItems.map(item => <FoodCard key={item._id} item={item}></FoodCard>)
                                }
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-fit mx-auto mb-12'>
                                {
                                    drinksItems.map(item => <FoodCard key={item._id} item={item}></FoodCard>)
                                }
                            </div>
                        </TabPanel>
                    </Tabs>
                </div>


            </div>
        </div>


    );
};

export default OrderFood;