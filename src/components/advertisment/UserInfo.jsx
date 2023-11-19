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
        suggestConsumer?.setMainBIO(result?.bio);
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
        suggestConsumer?.setMainBIO(result?.bio);
      });
  }, [updates.updateBio]);

  useEffect(() => {
    getprofilePost(userId)
      .then(res => res.data)
      .then(resulte => {
        setCountOfPost(resulte.posts)
      })
      .catch(error => console.log(error));
  }, []);
  return (
    <div className="h-1/2 w-full">
      {
        isError &&
        <div className='relative w-full flex-1 h-full bg-white dark:bg-gray-800 rounded-md shadow-md flex flex-col justify-between p-1'>
        <div className='relative rounded-t-md w-full h-1/2 bg-slate-300 dark:bg-gray-950 rounded-md animate-pulse'>
          
          <div className='absolute top-3/4 left-1/2 -translate-x-1/2 w-[60px] h-[60px] border p-1 border-purple-700 rounded-full'>
            <SkeletonAvatar/>
          </div>
        </div>
        <div className="flex items-center justify-center w-full mt-2">
          <SkeletonBio/>
        </div>
          <SkeletonBio/>
        <div className='px-8'>
          <div className='border-t dark:border-slate-600 flex items-center justify-around py-1'>
            <div className='font-lobster tracking-wider text-purple-800 dark:text-slate-200 flex flex-col items-center justify-center border-r dark:border-slate-600 w-full h-full'>
              <span className='text-sm font-extrabold  w-3 h-6 rounded-md bg-slate-300 dark:bg-gray-900 animate-pulse'></span>
              <span className='text-sm font-extrabold '>Followers</span>
            </div>
            <div className='font-lobster tracking-wider text-purple-800 dark:text-slate-200 flex flex-col items-center justify-center border-r dark:border-slate-600 w-full h-full'>
              <span className='text-sm font-extrabold  w-3 h-6 rounded-md bg-slate-300 dark:bg-gray-900 animate-pulse'></span>
              <span className='text-sm font-extrabold '>Following</span>
            </div>
            <div className='font-lobster tracking-wider text-purple-800 dark:text-slate-200 flex flex-col items-center justify-center w-full h-full'>
              <span className='text-sm font-extrabold  w-3 h-6 rounded-md bg-slate-300 dark:bg-gray-900 animate-pulse'></span>
              <span className='text-sm font-extrabold '>Posts</span>
            </div>
          </div>
        </div>
      </div>
      }
      {
        isLoading &&
        <div className='relative w-full flex-1 h-full bg-white dark:bg-gray-800 rounded-md shadow-md flex flex-col justify-between p-1'>
        <div className='relative rounded-t-md w-full h-1/2 bg-slate-300 dark:bg-gray-950 rounded-md animate-pulse'>
          
          <div className='absolute top-3/4 left-1/2 -translate-x-1/2 w-[60px] h-[60px] border p-1 border-purple-700 rounded-full'>
            <SkeletonAvatar/>
          </div>
        </div>
        <div className="flex items-center justify-center w-full mt-2">
          <SkeletonBio/>
        </div>
          <SkeletonBio/>
        <div className='px-8'>
          <div className='border-t dark:border-slate-600 flex items-center justify-around py-1'>
            <div className='font-lobster tracking-wider text-purple-800 dark:text-slate-200 flex flex-col items-center justify-center border-r dark:border-slate-600 w-full h-full'>
              <span className='text-sm font-light w-3 h-6 rounded-md bg-slate-300 dark:bg-gray-900 animate-pulse'></span>
              <span className='text-sm font-light'>Followers</span>
            </div>
            <div className='font-lobster tracking-wider text-purple-800 dark:text-slate-200 flex flex-col items-center justify-center border-r dark:border-slate-600 w-full h-full'>
              <span className='text-sm font-light w-3 h-6 rounded-md bg-slate-300 dark:bg-gray-900 animate-pulse'></span>
              <span className='text-sm font-light'>Following</span>
            </div>
            <div className='font-lobster tracking-wider text-purple-800 dark:text-slate-200 flex flex-col items-center justify-center w-full h-full'>
              <span className='text-sm font-light w-3 h-6 rounded-md bg-slate-300 dark:bg-gray-900 animate-pulse'></span>
              <span className='text-sm font-light'>Posts</span>
            </div>
          </div>
        </div>
      </div>
      }
      { isSuccess &&
        <Link to={`/profile/${userId}`} className='relative w-full flex-1 h-full bg-white dark:bg-gray-800 rounded-md shadow-md flex flex-col justify-between'>
        <div className='relative rounded-t-md w-full h-1/2'>
          {banner?.url ?
            <img src={banner.url} alt="user_banner" className='rounded-t-md w-full h-full object-cover object-top' />
            :
            <h1 className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xl font-lobster tracking-widest text-gray-700 dark:text-gray-400'>Vacation</h1>
          }
          <div className='absolute top-3/4 left-1/2 -translate-x-1/2 w-[60px] h-[60px] border p-1 border-purple-700 rounded-full'>
            <img src={avatar?.url} alt="user_photo" className='h-full w-full rounded-full object-cover' />
          </div>
        </div>
        <div>
          <h1 className='text-center font-lobster tracking-widest text-purple-700 dark:text-slate-300 font-semibold mt-2'>{user?.userName}</h1>
        </div>
        {
          user?.bio && <div className='flex items-start gap-1 text-purple-700 dark:text-slate-400 text-xs font-lobster tracking-wider px-1'>
            <span className='whitespace-nowrap'>BIO : </span>
            <span className=''>{suggestConsumer?.mainBIO ? suggestConsumer?.mainBIO : user.bio}</span>
          </div>
        }
        <div className='px-8'>
          <div className='border-t dark:border-slate-600 flex items-center justify-around py-1'>
            <div className='font-lobster tracking-wider text-purple-800 dark:text-slate-200 flex flex-col items-center justify-center border-r dark:border-slate-600 w-full h-full'>
              <span className='text-sm font-light'>{toggleFollow?.user?.followers?.length}</span>
              <span className='text-sm font-light'>Followers</span>
            </div>
            <div className='font-lobster tracking-wider text-purple-800 dark:text-slate-200 flex flex-col items-center justify-center border-r dark:border-slate-600 w-full h-full'>
              <span className='text-sm font-light'>{toggleFollow?.user?.following?.length}</span>
              <span className='text-sm font-light'>Following</span>
            </div>
            <div className='font-lobster tracking-wider text-purple-800 dark:text-slate-200 flex flex-col items-center justify-center  w-full h-full'>
              <span className='text-sm font-light'>{countOfPost?.length > 0 ? countOfPost.length : '0'}</span>
              <span className='text-sm font-light'>Posts</span>
            </div>
          </div>
        </div>
      </Link>
      }
    </div>
  );
};

export default UserInfo;
