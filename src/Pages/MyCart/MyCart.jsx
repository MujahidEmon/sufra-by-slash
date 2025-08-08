import Cover from "../../Components/Shared/Cover/Cover";
import menuImg from '../../assets/menu/banner3.jpg'

const MyCart = () => {
    return (
        <div>
            <Cover img={menuImg} title={'Shopping Cart'}></Cover>
            <h1>My Cart</h1>

        </div>
    );
};

export default MyCart;