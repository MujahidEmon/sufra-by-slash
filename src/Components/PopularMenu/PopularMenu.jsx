import { useEffect, useState } from "react";
import SectionHeading from "../SectionHeading/SectionHeading";
import MenuItems from "../MenuItems/MenuItems";
import useMenu from "../../Hooks/useMenu";

const PopularMenu = () => {
    const items = useMenu();
    const popularItems = items.filter(item => item.category === 'popular')


    // useEffect(() => {
    //     fetch('menu.json')
    //         .then(res => res.json())
    //         .then(data => {
    //             const popularItems = data.filter(item => item.category === 'popular')
    //             setItems(popularItems)
    //         })
    // }, [])
    return (
        <div className="max-w-7xl mx-auto">
            <SectionHeading heading={'Our popular items'} subheading={'Popular Menu'}>

            </SectionHeading>

            <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                {
                    popularItems.map((item, index) => <MenuItems key={index} item={item}></MenuItems>)
                }
            </div>
        </div>
    );
};

export default PopularMenu;