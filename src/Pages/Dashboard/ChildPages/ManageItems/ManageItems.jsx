import { TiTrash } from "react-icons/ti";
import SectionHeading from "../../../../Components/SectionHeading/SectionHeading";
import useMenu from "../../../../Hooks/useMenu";
import { FaEdit } from "react-icons/fa";

const ManageItems = () => {
    const [menu, refetch] = useMenu();
    return (
        <div>
            <div className="-my-12">
                <SectionHeading heading={'want to update?'} subheading={'Hurry Up'}></SectionHeading>
            </div>

            <div className="flex mx-12 mb-6 font-semibold flex-row justify-between items-center">
                <h1 className="text-3xl">Total Items: {menu.length}</h1>
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
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                menu.map((item, index) =>
                                    <tr>
                                        <th>
                                            {index+1}
                                        </th>
                                        <td>
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src={item.image}
                                                        alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                        </td>
                                        <td>{item.name}</td>
                                        <td className="">{item.price}$</td>
                                        <th>
                                            <button className="btn btn-accent  btn-sm shadow-none"><FaEdit color='white' size={20}></FaEdit></button>
                                        </th>
                                        <th>
                                            <button className="btn btn-accent  btn-sm shadow-none"><TiTrash color='white' size={20}></TiTrash></button>
                                        </th>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageItems;