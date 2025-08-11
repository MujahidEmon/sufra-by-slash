import React from 'react';
import { TiDelete, TiTrash } from 'react-icons/ti';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const TableRow = ({ item, refetch }) => {
    const { image, price, name, _id } = item;
    const axiosSecure = useAxiosSecure();
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

                axiosSecure.delete(`/cart/${id}`)
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
        <tr>
            <th>
                #
            </th>
            <td>
                <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                        <img
                            src={image}
                            alt="Avatar Tailwind CSS Component" />
                    </div>
                </div>
            </td>
            <td>{name}</td>
            <td>{price}</td>
            <th>
                <button onClick={() => handleDelete(_id)} className="btn bg-red-600 btn-sm"><TiTrash color='white' size={20}></TiTrash></button>
            </th>
        </tr>
    );
};

export default TableRow;