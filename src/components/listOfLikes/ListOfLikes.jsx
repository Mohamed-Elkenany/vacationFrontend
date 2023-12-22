import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetUserByIdMutation } from '../../slices/appApiSlice';

const ListOfLikes = ({ userLike }) => {
    const userId = JSON.parse(localStorage.getItem("userInfo")).user._id;
    const user = JSON.parse(localStorage.getItem("userInfo")).user;
    const [getUser] = useGetUserByIdMutation();
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);
    useEffect(() => {
        getUser(userLike?._id)
            .then(res => res.data)
            .then(resulte => {
                setFollowers(resulte.followers)
                setFollowing(resulte.following)
            })
    }, []);
  return (
    <div className='flex items-center justify-between'>
        <Link to={`/profile/${userLike._id}`} className='flex items-center gap-1'>
            <div className="w-[50px] h-[50px] rounded-full p-1 border border-purple-700">
                <img className='w-full h-full rounded-full object-cover ' src={userLike.avatar.url} alt="user" />
            </div>
            <div>
                <h1 className='font-lobster tracking-wider text-md text-slate-600 dark:text-slate-300 whitespace-nowrap max-sm:text-sm pr-2'>{`${userLike.userName[0].toUpperCase()}${userLike.userName.split(' ')[0].slice(1)} ${userLike.userName.split(' ')[1] !== undefined ? userLike.userName.split(' ')[1][0].toUpperCase() : ''}${userLike.userName.split(' ')[1] !== undefined ? userLike.userName.split(' ')[1].slice(1) : ''}`}</h1>
                <div className="flex items-center gap-1">
                    <span className='font-lobster tracking-wider text-xs text-slate-600 dark:text-slate-400'>{followers.length} follower</span>
                    <span className='font-lobster tracking-wider text-xs text-slate-600 dark:text-slate-400'>{following.length} following</span>
                </div>
            </div>
        </Link>
        {
            userLike._id === userId || user.following?.includes(userLike._id) ? ""
                :
            !user.followers?.includes(userLike._id) && user.following?.includes(userLike._id) ? 
            <button className='font-lobster tracking-wider bg-purple-700 text-slate-100 px-2 max-sm:px-1 max-sm:text-[15px] rounded-sm'>Follow back</button>
                :
            <button className='font-lobster tracking-wider bg-purple-700 text-slate-100 px-2 max-sm:px-1 max-sm:text-[15px] rounded-sm'>Follow</button>
        }
    </div>
  );
}

export default ListOfLikes;
