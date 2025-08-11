import SectionHeading from "../../../../Components/SectionHeading/SectionHeading";
import TableRow from "../../../../Components/TableRow/TableRow";
import useCart from "../../../../Hooks/useCart";

const MyCart = () => {
    const [cart, refetch] = useCart();
    console.log(cart);
    const totalPrice = cart.reduce((sum, item) => sum += item.price,0)
    console.log(totalPrice);
    return (
        <div>
            <SectionHeading heading={'My Cart'} subheading={'Want to add more?'}></SectionHeading>
                    <div className="flex mx-12 mb-6 font-semibold flex-row justify-between items-center">
                        <h1>Total Items: {cart.length}</h1>
                        <h1>Total Price: ${totalPrice}</h1>
                        <button className="btn btn-primary shadow-none">Pay</button>
                    </div>
            <div className="mx-12 bg-white p-8">
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>
                                    
                                </th>
                                <th>
                                    Item Image
                                </th>
                                <th>Item Name</th>
                                <th>Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                cart.map(item => <TableRow key={item._id} item={item} refetch={refetch}></TableRow>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MyCart;