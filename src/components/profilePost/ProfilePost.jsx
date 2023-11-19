import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetPostProfileMutation } from '../../slices/appApiSlice';
import { postLengthContext } from '../profilePage/middleprofile/Middleprofile';
import PostProfile from '../postProfile/PostProfile';
import SkeletonAvatar from '../skeleton/SkeletonAvatar';
import SkeletonUserName from '../skeleton/SkeletonUserName';
const ProfilePost = ({ handleListConsumer, suggestConsumer }) => {
  const { id } = useParams();
  const postLengthConsumer = useContext(postLengthContext);
  const [getprofilePost, { isLoading, isSuccess,isError }] = useGetPostProfileMutation();
  const [posts, setPosts] = useState([]);
  const deletePost = (postId) => {
    const newPosts = posts.filter(post => {
      if(post._id !== postId){
        return post;
      }
    });
    setPosts(newPosts);
    postLengthConsumer.setPostLength(newPosts.length);
  }
  useEffect(() => {
    getprofilePost(id)
      .then(res => res.data)
      .then(resulte => {
        setPosts(resulte?.posts);
        postLengthConsumer.setPostLength(resulte?.posts?.length);
      })
      .catch(error => console.log(error));
  }, [id, getprofilePost]);
  return (
    <div className="flex flex-col gap-2 mt-1">
      {
        isError &&
        <div className='flex flex-col gap-2'>
            <div className='w-full flex flex-col mx-auto rounded-md bg-white dark:bg-gray-800 shadow-md p-2'>
              <div className="flex items-center gap-2 pb-2">
                <SkeletonAvatar />
                <SkeletonUserName/>
              </div>
              <div className="p-1">
                <div className='w-full h-[100px] dark:bg-gray-900 rounded-md animate-pulse'>

                </div>
              </div>
              <div className="p-1">
                <div className='w-full h-[30px] dark:bg-gray-900 rounded-md animate-pulse'>

                </div>
              </div>
            </div>
            <div className='w-full flex flex-col mx-auto rounded-md bg-white dark:bg-gray-800 shadow-md p-2'>
              <div className="flex items-center gap-2 pb-2">
                <SkeletonAvatar />
                <SkeletonUserName/>
              </div>
              <div className="p-1">
                <div className='w-full h-[100px] dark:bg-gray-900 rounded-md animate-pulse'>

                </div>
              </div>
              <div className="p-1">
                <div className='w-full h-[30px] dark:bg-gray-900 rounded-md animate-pulse'>

                </div>
              </div>
            </div>
            <div className='w-full flex flex-col mx-auto rounded-md bg-white dark:bg-gray-800 shadow-md p-2'>
              <div className="flex items-center gap-2 pb-2">
                <SkeletonAvatar />
                <SkeletonUserName/>
              </div>
              <div className="p-1">
                <div className='w-full h-[100px] dark:bg-gray-900 rounded-md animate-pulse'>

                </div>
              </div>
              <div className="p-1">
                <div className='w-full h-[30px] dark:bg-gray-900 rounded-md animate-pulse'>

                </div>
              </div>
            </div>
        </div>
      }
      {
        isLoading &&
        <div className='flex flex-col gap-2'>
            <div className='w-full flex flex-col mx-auto rounded-md bg-white dark:bg-gray-800 shadow-md p-2'>
              <div className="flex items-center gap-2 pb-2">
                <SkeletonAvatar />
                <SkeletonUserName/>
              </div>
              <div className="p-1">
                <div className='w-full h-[100px] dark:bg-gray-900 rounded-md animate-pulse'>

                </div>
              </div>
              <div className="p-1">
                <div className='w-full h-[30px] dark:bg-gray-900 rounded-md animate-pulse'>

                </div>
              </div>
            </div>
            <div className='w-full flex flex-col mx-auto rounded-md bg-white dark:bg-gray-800 shadow-md p-2'>
              <div className="flex items-center gap-2 pb-2">
                <SkeletonAvatar />
                <SkeletonUserName/>
              </div>
              <div className="p-1">
                <div className='w-full h-[100px] dark:bg-gray-900 rounded-md animate-pulse'>

                </div>
              </div>
              <div className="p-1">
                <div className='w-full h-[30px] dark:bg-gray-900 rounded-md animate-pulse'>

                </div>
              </div>
            </div>
            <div className='w-full flex flex-col mx-auto rounded-md bg-white dark:bg-gray-800 shadow-md p-2'>
              <div className="flex items-center gap-2 pb-2">
                <SkeletonAvatar />
                <SkeletonUserName/>
              </div>
              <div className="p-1">
                <div className='w-full h-[100px] dark:bg-gray-900 rounded-md animate-pulse'>

                </div>
              </div>
              <div className="p-1">
                <div className='w-full h-[30px] dark:bg-gray-900 rounded-md animate-pulse'>

                </div>
              </div>
            </div>
        </div>
      }
    {
        isSuccess &&
        (
          posts?.length > 0 ? posts.map((post, index) => (
            <div key={index}>
                <PostProfile post={post} userId={post.userId._id} handleListConsumer={handleListConsumer} suggestConsumer={suggestConsumer} deletePost={deletePost} />
            </div>
          ))
            :
          <h1 className="text-center text-2xl text-purple-700 dark:text-slate-300 font-lobster tracking-wider select-none">No posts yet</h1>
        )
        
      
    }
    </div>
  );
}

export default ProfilePost;




