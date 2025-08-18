import { useForm } from "react-hook-form";
import { FaUtensils } from "react-icons/fa";
import SectionHeading from "../../../../Components/SectionHeading/SectionHeading";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";

const imageApiKey = import.meta.env.VITE_IMAGE_API
const imageHostingAPI = `https://api.imgbb.com/1/upload?key=${imageApiKey}`
const AddItem = () => {

    const axiosPublic = useAxiosPublic();
    const { register, handleSubmit } = useForm()
    const onSubmit = async (data) => {
        console.log(data);
        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(imageHostingAPI, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'

            }
        })
        console.log(res.data);
    }
    return (
        <div>
            <div className="-my-12">
                <SectionHeading heading={'Add an Item'} subheading={'Want to Add?'}></SectionHeading>
            </div>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="max-w-4xl mx-auto space-y-6 bg-white p-12 "
            >

                {/* Recipe Name */}
                <div className=" form-control  w-full ">
                    <label className="text-slate-900  text-lg font-semibold ">
                        Recipe Name
                    </label>
                    <input
                        type="text"
                        {...register('name', { required: true })}
                        placeholder="Enter product name"
                        className="input bg-base-100 mt-2 w-full text-sm border-b-2 border-gray-100 focus:border-[#333] outline-none"
                        required
                    />
                </div>



                <div className="flex flex-row w-full items-center gap-6">
                    {/* Category */}
                    <div className="form-control w-full ">
                        <label className="text-slate-900  text-lg font-semibold ">
                            Category*
                        </label>
                        <select
                            {...register('category', { required: true })}
                            defaultValue="Select A Category" className="select w-full mt-2">
                            <option disabled={true}>Select A Category</option>
                            <option value={'salad'}>Salad</option>
                            <option value={'pizza'}>Pizza</option>
                            <option value={'soup'}>Soup</option>
                            <option value={'dessert'}>Dessert</option>
                            <option value={'drinks'}>Drinks</option>
                            <option value={'drinks'}>Drinks</option>
                        </select>
                    </div>

                    {/* Price */}
                    <div className="w-full">
                        <label className="text-slate-900 text-lg font-semibold ">
                            Price (BDT)
                        </label>
                        <input
                            type="text"
                            {...register('price', { required: true })}
                            placeholder="Enter price"
                            className="input bg-base-100 w-full text-sm border-b-2 mt-2 border-gray-100 focus:border-[#333] outline-none"
                            required
                        />
                    </div>
                </div>

                {/* Description */}
                <div className="">
                    <label className="text-slate-900 text-lg font-semibold ">
                        Recipe Details*
                    </label>
                    <textarea
                        placeholder="Recipe Details"
                        {...register('recipe', { required: true })}
                        className="px-2 pt-5 pb-2 pr-8 bg-base-100 mt-2 w-full text-sm border-b-2 border-gray-100 focus:border-[#333] outline-none resize-none"
                        rows={2}
                        required
                    ></textarea>
                </div>

                {/* Image Upload */}
                <div className="form-control">
                    {/* <label className="text-slate-900 text-lg font-semibold ">
                        Product Image
                    </label> */}
                    <input
                        {...register('image', { required: true })}
                        type="file" className="file-input file-input-ghost" />
                </div>

                <button
                    className=" btn w-fit rounded-sm text-sm font-medium bg-[#09bf09] cursor-pointer hover:bg-[#222] text-white"
                >
                    Add Product <FaUtensils></FaUtensils>
                </button>
            </form>
        </div>
    );
};

export default AddItem;