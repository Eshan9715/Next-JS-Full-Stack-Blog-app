"use client";
import { useRouter } from 'next/navigation';
import {Fragment, useRef} from 'react';
import { Toaster, toast } from 'react-hot-toast';

const postBlog  = async ({title,description}:{title: String, description: String}) =>{
    const res = fetch("http://localhost:3000/api/blog",{
        method: "POST",
        body: JSON.stringify({title,description}),
        //@ts-ignore
        "Content-Type": "application/json"
    });
    return (await res).json();
}

const AddBlog = () => {
    const router = useRouter();
    const titleRef = useRef<HTMLInputElement | null>(null);
    const descriptionRef = useRef<HTMLTextAreaElement | null>(null);

    const handleSubmit = async(e: any)=>{
        e.preventDefault();
        if(titleRef.current && descriptionRef.current){
            toast.loading("Uploading blog.. 🚀 ", {id:"1"})
            await postBlog({
                title: titleRef.current?.value,
                description: descriptionRef.current?.value,
            });
            toast.success("Blog posted successfully! ", {id:"1"})
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
                <p className='text-2xl text-slate-200 font-bold p-3'>Add a wonderful blog 📚 </p>
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

export default AddBlog