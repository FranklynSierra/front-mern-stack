import React from 'react';
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';
import { usePosts } from '../context/postContext';

const PostCard = ({post}) => {
    const {deletePost}=usePosts()
    const navigate=useNavigate()
 

    const handleDelete=(id)=>{
   
        toast((t)=>(
            <div>
            <p className='text-white'>Do you want to Delete?<strong>{id}</strong></p>
            <div>
                <button className='bg-red-500 hover:bg-red-400 px-3 py-2 text-sm text-white rounded-sm mx-2' onClick={(e)=>{deletePost(id);toast.dismiss(t.id)}}>Delete</button>
                <button className='bg-slate-400 hover:bg-slate-500 px-3 py-2 text-white rounded-sm mx-2'onClick={()=>toast.dismiss(t.id)}>Cancel</button>
            </div>
            </div>
        ),{
            style:{
                background:'#202020'
            }
        })
    }
    return (
        <div onClick={()=>navigate(`/posts/${post._id}`)} className='max-h-full max-w-full  bg-zinc-800 text-white rounded-sm shadow-md shadow-black hover:bg-zinc-700 hover:cursor-pointer  '>
         <div className='px-4 py-7'>
               <div className='flex justify-between'>
               <h3>{post.title}</h3>  
               <button onClick={
                (e)=>{
                    e.stopPropagation()
                    handleDelete(post._id)
                
               }} className='bg-red-600 text-sm px-2 py-1 hover:bg-red-500 rounded-sm'>DELETE</button>
            
               </div>
               <p>{post.description}</p>
               </div>
              {!post.image&&<p className='flex content-center items-center justify-center'>No image here</p>}
              {post.image&&<img src={post.image.url}className='w-full h-96 object-cover'/>}
                
        

     </div>
    );
}

export default PostCard;
