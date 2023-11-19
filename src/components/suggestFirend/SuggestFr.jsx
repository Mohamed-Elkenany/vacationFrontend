import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../button/Button';
import { useGetUserByIdMutation } from '../../slices/appApiSlice';
import SkeletonAvatar from '../skeleton/SkeletonAvatar';
import SkeletonUserName from '../skeleton/SkeletonUserName';
const SuggestFr = ({ user, suggestConsumer }) => {
    const [getUserById, { isLoading, isSuccess }] = useGetUserByIdMutation();
    const [follow, setFollow] = useState(user);
    const [userSuggest, setUserSuggest] = useState();
    const setUser = (updateUser) => {
        setFollow(updateUser)
    }
    useEffect(() => {
        getUserById(user._id)
            .then(res => res.data)
            .then(result => setUserSuggest(result));
    }, [])
    return (
        <div className='px-2 flex items-center justify-between'>
            <Link to={`/profile/${userSuggest?._id}`} className='flex items-center gap-1'>
                {
                    isLoading
                    &&
                    <SkeletonAvatar />
                }
                {
                    isSuccess
                    &&
                    <div className="relative w-[50px] h-[50px] rounded-full p-1 border border-purple-700">
                        <div className="overlay absolute top-0 left-0 w-full h-full rounded-full z-50 bg-black opacity-5"></div>
                        <img className='w-full h-full rounded-full object-cover' src={userSuggest?.avatar?.url} alt="user" />
                    </div>
                }
                        
                {
                    isLoading
                    &&
                    <SkeletonUserName />
                }
                {
                    isSuccess
                    &&
                    <div>
                        <h1 className='font-lobster tracking-wider text-md text-slate-600 dark:text-slate-300'>{userSuggest?.userName}</h1>
                        <div className="flex items-center gap-1">
                            <span className='font-lobster tracking-wider text-xs text-slate-600 dark:text-slate-400'>{follow?.followers?.length} follower</span>
                            <span className='font-lobster tracking-wider text-xs text-slate-600 dark:text-slate-400'>{follow?.following?.length} following</span>
                        </div>
                    </div>
                }
            </Link>
            {
                isLoading
                &&
                <div className='w-[80px] h-[30px] bg-slate-300 dark:bg-gray-900 animate-pulse rounded-md'></div>
            }
            {
                isSuccess
                &&
                <Button userId={user._id} setUser={setUser} user={user} suggestConsumer={suggestConsumer} />
            }
        </div>
    );
};

export default SuggestFr;
