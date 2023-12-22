import React, { useEffect, useState } from 'react';
import Post from './post/Post';
import { useGetAllPostsMutation } from '../../slices/appApiSlice';
import SkeletonAvatar from '../skeleton/SkeletonAvatar';
import SkeletonUserName from '../skeleton/SkeletonUserName';
const Posts = ({handleListConsumer, suggestConsumer}) => {
  const [getAllPosts, { isError, isLoading, isSuccess }] = useGetAllPostsMutation();
  const [Posts, setPosts] = useState([]);
  const [DeletePost, setDeletePost] = useState(false);
  const deletePost = (deleted) => {
    setDeletePost(deleted)
  };
  useEffect(() => {
    getAllPosts()
      .then(res => res.data)
      .then(resulte => setPosts(resulte))
      .catch(error => console.log(error.message));
  }, [DeletePost]);
  return (
    <div className="flex flex-col gap-2 mt-4">
      {
        isError &&
        <div className='flex flex-col gap-2'>
            <div className='w-full flex flex-col mx-auto rounded-md bg-white dark:bg-gray-800 shadow-md p-2'>
              <div className="flex items-center gap-2 pb-2">
                <SkeletonAvatar />
                <SkeletonUserName/>
              </div>
              <div className="p-1">
                <div className='w-full h-[100px] bg-slate-300 dark:bg-gray-900 rounded-md animate-pulse'>

                </div>
              </div>
              <div className="p-1">
                <div className='w-full h-[30px] bg-slate-300 dark:bg-gray-900 rounded-md animate-pulse'>

                </div>
              </div>
            </div>
            <div className='w-full flex flex-col mx-auto rounded-md bg-slate-300 dark:bg-gray-800 shadow-md p-2'>
              <div className="flex items-center gap-2 pb-2">
                <SkeletonAvatar />
                <SkeletonUserName/>
              </div>
              <div className="p-1">
                <div className='w-full h-[100px] bg-slate-300 dark:bg-gray-900 rounded-md animate-pulse'>

                </div>
              </div>
              <div className="p-1">
                <div className='w-full h-[30px] bg-slate-300 dark:bg-gray-900 rounded-md animate-pulse'>

                </div>
              </div>
            </div>
            <div className='w-full flex flex-col mx-auto rounded-md bg-slate-300 dark:bg-gray-800 shadow-md p-2'>
              <div className="flex items-center gap-2 pb-2">
                <SkeletonAvatar />
                <SkeletonUserName/>
              </div>
              <div className="p-1">
                <div className='w-full h-[100px] bg-slate-300 dark:bg-gray-900 rounded-md animate-pulse'>

                </div>
              </div>
              <div className="p-1">
                <div className='w-full h-[30px] bg-slate-300 dark:bg-gray-900 rounded-md animate-pulse'>

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
                <div className='w-full h-[100px] bg-slate-300 dark:bg-gray-900 rounded-md animate-pulse'>

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
                <div className='w-full h-[100px] bg-slate-300 dark:bg-gray-900 rounded-md animate-pulse'>

                </div>
              </div>
              <div className="p-1">
                <div className='w-full h-[30px] bg-slate-300 dark:bg-gray-900 rounded-md animate-pulse'>

                </div>
              </div>
            </div>
            <div className='w-full flex flex-col mx-auto rounded-md bg-slate-300 dark:bg-gray-800 shadow-md p-2'>
              <div className="flex items-center gap-2 pb-2">
                <SkeletonAvatar />
                <SkeletonUserName/>
              </div>
              <div className="p-1">
                <div className='w-full h-[100px] bg-slate-300 dark:bg-gray-900 rounded-md animate-pulse'>

                </div>
              </div>
              <div className="p-1">
                <div className='w-full h-[30px] bg-slate-300 dark:bg-gray-900 rounded-md animate-pulse'>

                </div>
              </div>
            </div>
        </div>
      }
      {
        isSuccess && Posts.map((post, index) => (
          <div key={index}>
              <Post post={post} userId={post.userId._id} handleListConsumer={handleListConsumer} suggestConsumer={suggestConsumer} deletePost={deletePost} />
          </div>
        ))
      }
    </div>
  );
}

export default Posts;
