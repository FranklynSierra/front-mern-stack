import React,{useEffect,useState} from 'react';
import {Formik,Form,Field,ErrorMessage} from 'formik'
import { usePosts } from '../context/postContext';
import {Link, useNavigate,useParams} from 'react-router-dom'
import {AiOutlineLoading3Quarters} from 'react-icons/ai'
import * as Yup from 'yup'
const PostForm = () => {
    const {createPost,getPost,updatePost}=usePosts()
    const navigate=useNavigate()
    const params=useParams()
    const [post, setPost] = useState({
        title:'',
        description:'',
        image:null
    });
 
    useEffect(() => {
        (async()=>{
            if(params.id){
                const post=await  getPost(params.id)
                  setPost(post)
               }
          })()
    }, [getPost, params.id]);
    return (
        <div className='flex items-center justify-center'>
          <div className='bg-zinc-800 p-10 shadow-md text-purple-700'>
         <div className='flex justify-between items-center py-4 text-indigo-600'>
            <h3 className='text-xl'>
                New Post
            </h3>
            <Link to='/' className='text-gray-400 text-sm hover:text-gray-300'>Go Back </Link>
         </div>
          <Formik initialValues={post }
           enableReinitialize={true}
           validationSchema={Yup.object({
            title:Yup.string().required('Title is Required'),
            description:Yup.string().required('Description is required')
           })}
            onSubmit={async(values,actions)=>{
                if (params.id) {
              await updatePost(params.id, values);
            } else {
              await createPost(values);
            }
            actions.setSubmitting(false)
            navigate('/')
             
            }}
        >
            {({handleSubmit,setFieldValue,isSubmitting})=>(      
                <Form onSubmit={handleSubmit}>
                   <label htmlFor='title'className='text-sm block font-bold text-gray-400' >Title</label>
                    <Field className='px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full mb-4' name='title' placeholder='title'/>
                    
                    <ErrorMessage component='p' className='text-red-400 text-sm' name='title'></ErrorMessage>
                    <label htmlFor='description'className='text-sm block font-bold text-gray-400' >Description</label>
                    <Field component='textarea' className='px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full' name='description'rows='3' placeholder='description'/>
                    <ErrorMessage component='p' className='text-red-400 text-sm'  name='description'></ErrorMessage>
                    <label htmlFor='description'className='text-sm block font-bold text-gray-400' >image</label>
                    <input onChange={(e)=>setFieldValue('image',e.target.files[0])} type='file'name='image'className='px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full'/>
                   <button disabled={isSubmitting} className='bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded mt-2 text-white focus:outline-none disable:bg-indigo-400' type='submit'>{isSubmitting?(
                    <AiOutlineLoading3Quarters className='animate-spin h-5 w-4'/>
            ):'save'}</button>
                 </Form>

            )}
            </Formik>
          </div>
        </div>
    );
}

export default PostForm;
