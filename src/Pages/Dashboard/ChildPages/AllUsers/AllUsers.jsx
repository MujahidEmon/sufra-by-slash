import { useQuery } from "@tanstack/react-query";
import SectionHeading from "../../../../Components/SectionHeading/SectionHeading";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import TableRow from "../../../../Components/TableRow/TableRow";
import { TiTrash } from "react-icons/ti";
import Swal from "sweetalert2";

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();

    const { data: users = [], isLoading, isError, error, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    });


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

                axiosSecure.delete(`/users/${id}`)
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
    console.log(users);
    return (
        <div className="-mt-14">
            <SectionHeading heading={'manage users'} ></SectionHeading>
            <div className="mx-12 mb-6 font-semibold">
                <h1 className="text-2xl">Total Users : {users.length}</h1>

            </div>
            <div className="mx-12 bg-white p-8">
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map(user =>
                                    <tr>
                                        <th>
                                            #
                                        </th>
                                        <td>
                                        </td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <th>
                                            <button onClick={() => handleDelete(user._id)} className="btn bg-red-600 btn-sm"><TiTrash color='white' size={20}></TiTrash></button>
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

export default AllUsers;