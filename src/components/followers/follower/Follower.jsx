import React, { useContext, useEffect, useState } from 'react';
import Button from '../../button/Button';
import { Link } from 'react-router-dom';
import { suggestContext } from '../../../pages/profilePage/ProfilePage';
import SkeletonAvatar from '../../skeleton/SkeletonAvatar';
import SkeletonUserName from '../../skeleton/SkeletonUserName';
const Follower = ({ user }) => {
  const mainUserId = JSON.parse(localStorage.getItem("userInfo")).user._id;
  const suggestConsumer = useContext(suggestContext);
  const [follow, setFollow] = useState(user);
  const setUser = (updateUser) => {
    setFollow(updateUser)
  };
  return (
    <div className="flex flex-col gap-3">
      {
        suggestConsumer.getUserLoading &&
        <div className='px-2 flex items-center justify-between'>
        <div className='flex items-center gap-1'>
          <SkeletonAvatar/>
          <div>
            <SkeletonUserName/>
          </div>
        </div>
        {
          <div className='w-[80px] h-[30px] bg-slate-300 dark:bg-gray-900 animate-pulse rounded-md'/>
        }
      </div>
      }
      {
        suggestConsumer.getUsersuccess &&
        <div className='px-2 flex items-center justify-between'>
        <Link to={`/profile/${user?._id}`} className='flex items-center gap-1'>
          <div className="relative w-[50px] h-[50px] rounded-full p-1 border border-purple-700">
            <div className="overlay absolute top-0 left-0 w-full h-full rounded-full z-50 bg-black opacity-5"></div>
            <img className='w-full h-full rounded-full object-cover' src={user?.avatar?.url} alt="user" />
          </div>
          <div>
            <h1 className='font-lobster tracking-wider text-md text-slate-600 dark:text-slate-300'>{user?.userName}</h1>
            <div className="flex items-center gap-1">
              <span className='font-lobster tracking-wider text-xs text-slate-600 dark:text-slate-400'>{follow?.followers?.length}followers</span>
              <span className='font-lobster tracking-wider text-xs text-slate-600 dark:text-slate-400'>{follow?.following?.length}following</span>
            </div>
          </div>
        </Link>
        {
          mainUserId !== user?._id &&
          <Button userId={user._id} setUser={setUser} user={user} suggestConsumer={suggestConsumer} />
        }
      </div>
      }
    </div>
  );
};

export default Follower;
