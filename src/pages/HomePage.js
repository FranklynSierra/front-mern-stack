
import { usePosts } from '../context/postContext';
import {VscEmptyWindow} from 'react-icons/vsc'
import {Link} from 'react-router-dom'
import PostCard from '../components/PostCard';
const HomePage = () => {

 const {posts}=usePosts()
 if(posts.length===0)return(
    <div className='flex flex-col justify-center items-center'>
        <VscEmptyWindow className='w-48 h-48 text-white'/>
        <h1 className='text-white text-2xl'>No posts here</h1>
        <Link className='px-3 py-2 bg-indigo-500 hover:bg-indigo-600' to='/new'>Create New Post</Link>
    </div>
 )

    return (
        <div className='text-white'>
        <div className='flex justify-between py-4'>
        <h1 className='text-2xl text-gray-300 font-bold'>Post {posts.length}</h1>
        <Link className='px-3 py-2 bg-indigo-500 hover:bg-indigo-600' to='/new'>Create New Post</Link>
 
        </div>
           <div className='grid grid-cols-3 gap-5'>
           {
                posts.map((post)=>(
                    <PostCard post={post}key={post._id}/>
                ))
            }
           </div>
           
        </div>
    );
}

export default HomePage;
