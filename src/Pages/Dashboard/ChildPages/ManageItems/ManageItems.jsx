import { TiTrash } from "react-icons/ti";
import SectionHeading from "../../../../Components/SectionHeading/SectionHeading";
import useMenu from "../../../../Hooks/useMenu";
import { FaEdit } from "react-icons/fa";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import axios from "axios";

const ManageItems = () => {
    
    const [menu, refetch] = useMenu();
    const axiosSecure = useAxiosSecure()
    const handleDelete = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/menu/${id}`)
                    .then(res => {
                        console.log(res.data);
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: `${name} removed form cart`,
                                icon: "success"
                            });
                            refetch();
                        }
                    })
            }
        });
    }
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
                                            {index + 1}
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
                                            <Link to={`/dashboard/updateItem/${item._id}`}  className="btn btn-accent  btn-sm shadow-none"><FaEdit color='white' size={20}></FaEdit></Link>
                                        </th>
                                        <th>
                                            <button onClick={() => handleDelete(item._id)} className="btn btn-accent  btn-sm shadow-none"><TiTrash color='white' size={20}></TiTrash></button>
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