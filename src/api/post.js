import axios from 'axios'
export const getPostsRequest=async()=>await axios.get('/posts')
export const createPostRequest=async(post)=>{
   const form=new FormData()
   for(let i in post){
  form.append(i,post[i])
   }
  return await axios.post('/posts',form,{
        headers:{
            "Content-Type":"multipart/form-data"
        }
    })

}
export const DeletePostRequest = async (id) =>await axios.delete("/posts/"+ id);
export const getPostRequest = async (id) =>await axios.get("/posts/"+ id);
export const updatePostRequest = async (id,newField) =>{
    const form=new FormData()
    for(let i in newField){
   form.append(i,newField[i])
    }
   return await axios.put(`/posts/${id}`,form,{
         headers:{
             "Content-Type":"multipart/form-data"
         }
     })
    


}

