import React from 'react';
import { useForm } from 'react-hook-form';
import { FaUtensils } from 'react-icons/fa';
import { useLoaderData } from 'react-router-dom';
import useAxiosSecure from '../../../../../Hooks/useAxiosSecure';
import useAxiosPublic from '../../../../../Hooks/useAxiosPublic';
import toast from 'react-hot-toast';

const imageApiKey = import.meta.env.VITE_IMAGE_API
const imageHostingAPI = `https://api.imgbb.com/1/upload?key=${imageApiKey}`

const UpdateItem = () => {
    const item = useLoaderData();
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();

    const { name, recipe, price, category, image, _id } = item;
    console.log(item);

    const { register, handleSubmit } = useForm()

    const onSubmit = async (data) => {
        console.log(data);
        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(imageHostingAPI, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'

            }
        })

        if (res.data.success) {
            const menuItem = {
                name: data.name,
                recipe: data.recipe,
                category: data.category,
                price: parseFloat(data.price),
                image: res.data.data.display_url

            }

            const menuRes = await axiosSecure.patch(`/menu/${_id}`, menuItem)
            console.log(menuRes.data);
            if(menuRes.data.modifiedCount>0){
                toast.success(`${name} is updated`)
            }
        }
        console.log(res.data);
    }
    return (
        <div>
            <h1 className="my-12 font-semibold text-center text-3xl">UPDATE ITEM</h1>
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
                        defaultValue={name}
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
                            defaultValue={category} className="select w-full mt-2">
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
                            defaultValue={price}
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
                        defaultValue={recipe}
                        placeholder="Recipe Details"
                        {...register('recipe', { required: true })}
                        className="px-2 pt-5 pb-2 pr-8 bg-base-100 mt-2 w-full text-sm border-b-2 border-gray-100 focus:border-[#333] outline-none resize-none"
                        rows={2}
                        required
                    ></textarea>
                </div>

                {/* Image Upload */}

                <div className="form-control flex flex-row items-end gap-6 justify-evenly">
                    <img src={image} alt="" className='rounded-xl w-1/2' />
                    <div className='w-1/2'>
                        <label htmlFor="image" className='font-semibold text-xl'>Want to Change Image?</label>
                        <input
                            {...register('image', { required: true })}
                            type="file" placeholder='jj' className="file-input file-input-ghost mt-4" />
                    </div>
                </div>

                <div className='items-center flex justify-center'>
                    <button
                        className=" btn w-fit rounded-sm text-sm font-medium bg-[#09bf09] cursor-pointer hover:bg-[#222] text-white"
                    >
                        Update This Menu <FaUtensils></FaUtensils>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateItem;