import { useState,createContext,useContext, useEffect } from "react"
import { getPostsRequest,createPostRequest,DeletePostRequest, getPostRequest, updatePostRequest } from "../api/post"
const postContext=createContext()

export const usePosts=()=>{
    const context=useContext(postContext)
    return context
}
export const PostProvider=({children})=>{
 const [posts,setPost]=useState([])
    const getPosts=async ()=>{
   const res=await getPostsRequest()
   setPost(res.data)
    }
    const createPost=async(post1)=>{
    try{
      const res=await createPostRequest(post1)
      setPost([...posts,res.data])
    }catch(err){
      console.error(err)
    }
    }


    const deletePost = async (id1) => {
        const res = await DeletePostRequest(id1);
        if (res.status === 204) {
          setPost(posts.filter((post) => post._id !== id1));
        }
      };
      const getPost=async(id)=>{
   const res=await  getPostRequest(id)
    return res.data
      }
 
      const updatePost = async (id, post) => {
        try {
          const res = await updatePostRequest(id, post);
          setPost(posts.map((post) => post._id === id?res.data:post));

        } catch (error) {
          console.error(error);
        }
      };
    
    useEffect(() => {
     getPosts()
     }, []);
    return <postContext.Provider value={{updatePost
    ,posts,getPost,getPosts,createPost,deletePost}}>
        {children}
    </postContext.Provider>
}