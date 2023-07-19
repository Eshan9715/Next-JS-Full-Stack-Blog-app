async function fetchBlogs(){
  const res = await fetch("http://localhost:3000/api/blog",{
    next:{
      revalidate: 10,
    },
  });
  const data = await res.json();
  return data.posts;
}

import Link from "next/link";
import { toast } from "react-hot-toast";


export default async function Home() {
  const posts = await fetchBlogs();
  //console.log(posts)

  const deleteBlog = async(id: String)=>{
    const res = fetch(`http://localhost:3000/api/blog/${id}`,{
      method: 'DELETE',
      //@ts-ignore
      "Content-Type": "application/json"
    });
    return (await res).json(); 
    
  }

  const handleDelete = async(key:String) =>{
      toast.loading("Deleting blog...🚀" , {id:"2"})
      await deleteBlog(key)
      toast.success("Blog deleted successfully! ", {id:"2"})
  }
  return (
    <main className="w-full h-full">
      <div className="md:w-2/4 sm:w-3/4 m-auto p-4 my-4 rounded-lg bg-slate-600">
        <h1 className="text-slate-300  text-center text-2xl  font-extrabold">Full stack blog app</h1>
      </div>

      <div className="flex">
        <Link href={"/blog/add"} className="md:w-1/6 sm:w-2/4  text-center rounded-md p-2 m-auto bg-slate-200">
          Add new blog
        </Link>
      </div>

      <div className="w-full flex flex-col justify-center items-center">
        {posts?.map((post: any)=>(
          <div className="w-3/4 rounded-md mx-3 my-3 p-2 bg-slate-200 flex flex-col justify-center" key={post.id}>
            <div className="flex items-center my-3">
              <div className="mr-auto">
                <h2 className="mr-auto font-semibold">{post.title}</h2>
              </div>
              <Link href={`/blog/edit/${post.id}`} className="px-4 py-1 text-center rounded-md font-semibold bg-slate-900 text-slate-200">
                Edit
              </Link>
              {/* <button onClick={()=>handleDelete(post.id)} className="px-4 py-1 text-center rounded-md font-semibold bg-slate-900 text-slate-200">
                Delete
              </button> */}

            </div>
            <div className="mr-auto my-1">
              <blockquote className="font-bold text-slate-700">{new Date(post.date).toDateString()}</blockquote>
            </div>
            <div className="mr-auto my-1">
              <h2>{post.description}</h2>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
