import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SkeletonAvatar from "../skeleton/SkeletonAvatar";
import SkeletonBio from "../skeleton/SkeletonBio";
import { useGetUserByIdMutation, useGetPostProfileMutation, useGetUserProfileMutation } from "../../slices/appApiSlice";
import { useSelector } from 'react-redux';
const UserInfo = ({ suggestConsumer }) => {
  const toggleFollow = useSelector(state => state.toggleFollow);
  const updates = useSelector(state => state.update);
  const userId = JSON.parse(localStorage.getItem("userInfo")).user._id;
  const [getUserById] = useGetUserByIdMutation();
  const [getUserProf, { isLoading, isSuccess, isError }] = useGetUserProfileMutation();
  const [getprofilePost] = useGetPostProfileMutation();
  const [user, setUser] = useState();
  const [avatar, setAvatar] = useState();
  const [banner, setBanner] = useState();
  const [countOfPost, setCountOfPost] = useState();
  useEffect(() => {
    getUserProf(userId)
      .then(res => res.data)
      .then(result => {
        setUser(result);
        suggestConsumer?.setBIO(result?.bio);
      });
  }, []);


  useEffect(() => {
    getUserById(userId)
      .then(res => res.data)
      .then(result => {
        setAvatar(result?.avatar);
      });
  }, [updates.updateAvatar, updates.deleteAvatar]);


  useEffect(() => {
    getUserById(userId)
      .then(res => res.data)
      .then(result => {
        setBanner(result?.banner);
      });
  }, [updates.updateBanner, updates.deleteBanner]);


  useEffect(() => {
    getUserById(userId)
      .then(res => res.data)
      .then(result => {
        setUser(result)
        suggestConsumer?.setBIO(result?.bio);
      });
  }, [updates.updateBio, suggestConsumer.isSuccessUpdateBIO]);

  useEffect(() => {
    getprofilePost(userId)
      .then(res => res.data)
      .then(resulte => {
        setCountOfPost(resulte.posts)
      })
      .catch(error => console.log(error));
  }, [suggestConsumer.deletedPost]);
  return (
    <div className="w-full h-full bg-white dark:bg-gray-800 rounded-md shadow-md flex-1 flex flex-col justify-between">
      {
        isError &&
        <div className='relative w-full flex-1 bg-white dark:bg-gray-800 rounded-md shadow-md flex flex-col justify-between p-1'>
          <div className='relative rounded-t-md w-full h-[120px] bg-slate-300 dark:bg-gray-950 rounded-md animate-pulse'>
          
            <div className='absolute top-3/4 left-1/2 -translate-x-1/2 w-[60px] h-[60px] border p-1 border-purple-700 rounded-full'>
              <SkeletonAvatar />
            </div>
            </div>
            <div className='my-4 py-4'>
          <div className="flex items-center justify-center w-full mb-2">
            <SkeletonBio />
          </div>
          <SkeletonBio />
            </div>
          <div className='px-8 font-semibold'>
            <div className='border-t dark:border-slate-600 flex items-center justify-around py-1 mb-2'>
              <div className='font-lobster tracking-wider text-purple-800 dark:text-slate-200 flex flex-col items-center justify-center border-r dark:border-slate-600 w-full h-full'>
                <span className='text-sm w-3 h-6 rounded-md bg-slate-300 dark:bg-gray-900 animate-pulse'></span>
                <span className='text-sm'>Followers</span>
              </div>
              <div className='font-lobster tracking-wider text-purple-800 dark:text-slate-200 flex flex-col items-center justify-center border-r dark:border-slate-600 w-full h-full'>
                <span className='text-sm w-3 h-6 rounded-md bg-slate-300 dark:bg-gray-900 animate-pulse'></span>
                <span className='text-sm'>Following</span>
              </div>
              <div className='font-lobster tracking-wider text-purple-800 dark:text-slate-200 flex flex-col items-center justify-center w-full h-full'>
                <span className='text-sm w-3 h-6 rounded-md bg-slate-300 dark:bg-gray-900 animate-pulse'></span>
                <span className='text-sm'>Posts</span>
              </div>
            </div>
          </div>
        </div>
      }
      {
        isLoading &&
        <div className='relative w-full flex-1 bg-white dark:bg-gray-800 rounded-md shadow-md flex flex-col justify-between p-1'>
          <div className='relative rounded-t-md w-full h-[120px] bg-slate-300 dark:bg-gray-950 rounded-md animate-pulse'>
          
            <div className='absolute top-3/4 left-1/2 -translate-x-1/2 w-[60px] h-[60px] border p-1 border-purple-700 rounded-full'>
              <SkeletonAvatar />
            </div>
            </div>
            <div className='my-4 py-4'>
          <div className="flex items-center justify-center w-full mb-2">
            <SkeletonBio />
          </div>
          <SkeletonBio />
            </div>
          <div className='px-8 font-semibold'>
            <div className='border-t dark:border-slate-600 flex items-center justify-around py-1 mb-2'>
              <div className='font-lobster tracking-wider text-purple-800 dark:text-slate-200 flex flex-col items-center justify-center border-r dark:border-slate-600 w-full h-full'>
                <span className='text-sm w-3 h-6 rounded-md bg-slate-300 dark:bg-gray-900 animate-pulse'></span>
                <span className='text-sm'>Followers</span>
              </div>
              <div className='font-lobster tracking-wider text-purple-800 dark:text-slate-200 flex flex-col items-center justify-center border-r dark:border-slate-600 w-full h-full'>
                <span className='text-sm w-3 h-6 rounded-md bg-slate-300 dark:bg-gray-900 animate-pulse'></span>
                <span className='text-sm'>Following</span>
              </div>
              <div className='font-lobster tracking-wider text-purple-800 dark:text-slate-200 flex flex-col items-center justify-center w-full h-full'>
                <span className='text-sm w-3 h-6 rounded-md bg-slate-300 dark:bg-gray-900 animate-pulse'></span>
                <span className='text-sm'>Posts</span>
              </div>
            </div>
          </div>
        </div>
      }
      {isSuccess &&
        <Link to={`/profile/${userId}`} className='relative w-full flex-1 max-h-full rounded-md  flex flex-col justify-between'>
          <div className={`${banner?.url ? 'px-0' : 'p-1 rounded-lg'} relative rounded-t-md w-full h-[150px]`}>
            {banner?.url ?
              <img src={banner.url} alt="user_banner" className='rounded-t-md w-full h-full object-cover object-top' />
              :
              <div className='w-full h-full bg-slate-100 dark:bg-slate-900'>
                <h1 className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xl font-lobster tracking-widest text-gray-700 dark:text-gray-400'>Vacation</h1>
              </div>
            }
            <div className='absolute max-xl:-bottom-[15px] lg:-bottom-[25px] left-1/2 -translate-x-1/2 max-lg:w-[50px] max-lg:h-[50px] lg:w-[60px] lg:h-[60px] border p-1 border-purple-700 rounded-full'>
              <img src={avatar?.url} alt="user_photo" className='h-full w-full rounded-full object-cover' />
            </div>
          </div>
          <div className='my-4 py-2'>
            <div>
              <h1 className='text-center font-lobster tracking-widest text-purple-700 dark:text-slate-300 max-xl:text-sm font-semibold'>{`${user?.userName[0].toUpperCase()}${user?.userName.split(' ')[0].slice(1)} ${user?.userName.split(' ')[1] !== undefined ? user?.userName.split(' ')[1][0].toUpperCase() : ''}${user?.userName.split(' ')[1] !== undefined ? user?.userName.split(' ')[1].slice(1) : ''}`}</h1>
            </div>
            {
              user?.bio && <div className='flex items-start gap-1 text-purple-700 dark:text-slate-400 text-xs font-lobster tracking-wider pl-2 pr-1 max-xl:py-1 mt-2'>
                <span className='whitespace-nowrap'>BIO : </span>
                <span className=''>{user?.bio}</span>
              </div>
            }
          </div>
          <div className='px-4'>
            <div className='border-t dark:border-slate-600 flex items-center justify-around py-1'>
              <div className='font-lobster tracking-wider text-purple-900 dark:text-slate-200 flex flex-col items-center justify-center border-r dark:border-slate-600 w-full h-full'>
                <span className='text-sm font-semibold'>{toggleFollow?.user?.followers?.length}</span>
                <span className='text-sm max-xl:text-xs font-semibold'>Followers</span>
              </div>
              <div className='font-lobster tracking-wider text-purple-900 dark:text-slate-200 flex flex-col items-center justify-center border-r dark:border-slate-600 w-full h-full'>
                <span className='text-sm font-semibold'>{toggleFollow?.user?.following?.length}</span>
                <span className='text-sm max-xl:text-xs font-semibold'>Following</span>
              </div>
              <div className='font-lobster tracking-wider text-purple-900 dark:text-slate-200 flex flex-col items-center justify-center  w-full h-full'>
                <span className='text-sm font-semibold'>{countOfPost?.length > 0 ? countOfPost.length : '0'}</span>
                <span className='text-sm max-xl:text-xs font-semibold'>Posts</span>
              </div>
            </div>
          </div>
        </Link>
      }
    </div>
  );
};

export default UserInfo;
