
const MenuItems = ({item}) => {
    return (
        <div className="flex items-center gap-2">
            <img className="w-[118px] h-[104px]" style={{borderRadius: '0 200px 200px 200px'}} src={item.image} alt="" />
            <div>
                <div className="flex items-center text-gray-600 justify-between">
                    <h1>{item.name} -------------------</h1>
                    <h1 className="text-yellow-500 italic">${item.price}</h1>
                </div>
                <p className="text-gray-600">{item.recipe}</p>
            </div>
        </div>
    );
};

export default MenuItems;