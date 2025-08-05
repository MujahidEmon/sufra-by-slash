import { Link } from "react-router-dom";
import MenuItems from "../../Components/MenuItems/MenuItems";
import Cover from "../../Components/Shared/Cover/Cover";

const MenuCategory = ({ title, img, subTitle, items }) => {
    return (
        <div>
            {title && <Cover title={title} img={img} subTitle={subTitle}></Cover>}
            <div className="grid md:grid-cols-2 grid-cols-1 gap-4 mt-20">
                {
                    items.map((item, index) => <MenuItems key={index} item={item}></MenuItems>)
                }
            </div>
            <div className="flex justify-center">
                <Link to={`/order/${title ? title : 'salad'}`} className='border-0 btn border-b-2 border-black m-10'>Order Your Food</Link>
            </div>
        </div>
    );
};

export default MenuCategory;