import MenuItems from "../../Components/MenuItems/MenuItems";
import Cover from "../../Components/Shared/Cover/Cover";

const MenuCategory = ({title, img, subTitle, items}) => {
    return (
        <div>
            {title && <Cover title={title} img={img} subTitle={subTitle}></Cover>}
            <div className="grid md:grid-cols-2 grid-cols-1 gap-4 mt-20">
                {
                    items.map((item, index) => <MenuItems key={index} item={item}></MenuItems>)
                }
            </div>
        </div>
    );
};

export default MenuCategory;