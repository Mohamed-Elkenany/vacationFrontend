import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../button/Button';
import { useGetUserByIdMutation } from '../../slices/appApiSlice';
import SkeletonAvatar from '../skeleton/SkeletonAvatar';
import SkeletonUserName from '../skeleton/SkeletonUserName';
const SuggestFr = ({ user, suggestConsumer, reloadSuggestIsSuccess }) => {
    const [getUserById, { isLoading, isSuccess }] = useGetUserByIdMutation();
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);
    const [userSuggest, setUserSuggest] = useState();
    const setUser = (updateUser) => {
        setFollowers(updateUser.followers)
    }
    useEffect(() => {
        getUserById(user._id)
            .then(res => res.data)
            .then(result => {
                setUserSuggest(result)
                setFollowers(result.followers)
                setFollowing(result.following)
            });
    }, [reloadSuggestIsSuccess])
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
                    <div className='pr-4'>
                        <h1 className='font-lobster tracking-wider text-md text-purple-800 font-semibold whitespace-nowrap dark:text-slate-300 max-lg:text-sm'>{`${userSuggest?.userName[0].toUpperCase()}${userSuggest?.userName.split(' ')[0].slice(1)} ${userSuggest?.userName.split(' ')[1] !== undefined ? userSuggest?.userName.split(' ')[1][0].toUpperCase() : ''}${userSuggest?.userName.split(' ')[1] !== undefined ? userSuggest?.userName.split(' ')[1].slice(1) : ''}`}</h1>
                        <div className="flex items-center gap-1">
                            <span className='font-lobster tracking-wider text-xs text-slate-600 dark:text-slate-400'>{followers.length} follower</span>
                            <span className='font-lobster tracking-wider text-xs text-slate-600 dark:text-slate-400'>{following.length} following</span>
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
