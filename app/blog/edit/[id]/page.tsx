"use client";
import { useRouter } from 'next/navigation';
import {Fragment, useEffect, useRef} from 'react';
import { Toaster, toast } from 'react-hot-toast';

type updateBlogParams = {
    title: String,
    description: String,
    id: String
}

const updateBlog  = async (data: updateBlogParams) =>{
    const res = fetch(`http://localhost:3000/api/blog/${data.id}`,{
        method: "PUT",
        body: JSON.stringify({title: data.title, description: data.description}),
        //@ts-ignore
        "Content-Type": "application/json"
    });
    return (await res).json();
}

const getBlogById = async(id: String) =>{
    const res = await fetch(`http://localhost:3000/api/blog/${id}`);
    const data = await res.json();
    return data.post;
}

const EditBlog = ({params}: {params: {id: String}}) => {
    const router = useRouter();
    console.log(params.id)
    const titleRef = useRef<HTMLInputElement | null>(null);
    const descriptionRef = useRef<HTMLTextAreaElement | null>(null);

    useEffect(()=>{
        toast.loading("Fetching blog details..⏰ ")
        getBlogById(params.id).then((data)=>{
            if(titleRef.current && descriptionRef.current){
                titleRef.current.value = data.title;
                descriptionRef.current.value = data.description;
                toast.success("Blog fetched successfully!! 🚀  ", {id:"1"})
            }            
        }).catch((err)=>{
            console.log(err);
            toast.error("Error fetching blog! 💢", {id:"1"})

        })
    }, [params.id])

    const handleSubmit = async(e: any)=>{
        e.preventDefault();
        if(titleRef.current && descriptionRef.current){
            toast.loading("Updating blog.. 🚀 ", {id:"1"})
            await updateBlog({
                title: titleRef.current?.value,
                description: descriptionRef.current?.value,
                id: params.id
            });
            toast.success("Blog updated successfully! ", {id:"1"})
            router.push("/")
        }
    };
    
    const goBack = ()=>{
        router.push("/")
    }
  return (
    <Fragment>
        <Toaster/>
        <div className='w-full m-auto flex my-4'>
            <div className='flex flex-col justify-center items-center m-auto'>
                <p className='text-2xl text-slate-200 font-bold p-3'>Edit your blog 📚 </p>
                <form>
                    <input 
                        ref={titleRef}
                        placeholder='Enter title' 
                        className='rounded-md px-4 py-2 my-2 w-full' 
                        type='text'>
                    </input>

                    <textarea 
                        ref={descriptionRef}
                        className='rounded-md px-4 py-2 my-2 w-full' 
                        placeholder='Enter description'>
                    </textarea>

                </form>
                <div className='flex justify-between w-full'>                
                    <button onClick={handleSubmit} className='px-4 font-semibold py-2 shadow-xl bg-slate-200 rounded-lg m-auto hover:bg-slate-200'>Submit</button>
                    <button onClick={goBack} className='px-4 font-semibold py-2 shadow-xl bg-slate-200 rounded-lg m-auto hover:bg-slate-200'>Back</button>
                </div>
            </div>
        </div>
    </Fragment>
  )
}

export default EditBlog