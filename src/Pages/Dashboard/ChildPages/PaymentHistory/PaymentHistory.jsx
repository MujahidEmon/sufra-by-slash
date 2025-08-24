import { FaEdit } from "react-icons/fa";
import SectionHeading from "../../../../Components/SectionHeading/SectionHeading";
import usePayment from "../../../../Hooks/usePayment";
import { TiTrash } from "react-icons/ti";
import { Link } from "react-router-dom";
import useMenu from "../../../../Hooks/useMenu";

const PaymentHistory = () => {
    const [payments, refetch] = usePayment();
    const [menu] = useMenu()
    console.log(menu);
    console.log(payments);
    return (
        <div>
            <div className="-mt-12">
                <SectionHeading heading={'Payment History'} subheading={'Browse Payments'}></SectionHeading>
            </div>
            <div className="mx-12 bg-white p-8">
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th></th>
                                <th>trID</th>
                                <th>Pay For</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.map((item, index) => {
                               
                                // const payForMenus = menu.filter(m => item.menuIds.includes(m._id));
                                const payForMenus = menu.filter(m => item.menuIds.includes(m._id) );

                                return (
                                    <tr key={item._id}>
                                        <th>{index + 1}</th>
                                        <td>{item.transactionId}</td>
                                        <td>
                                            {payForMenus.map(m => m.name).join(", ")}
                                        </td>
                                        <td>{item.price}$</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default PaymentHistory;