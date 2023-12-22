import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../button/Button';
import { useGetUserByIdMutation } from '../../slices/appApiSlice';
const Search = ({ user, suggestConsumer }) => {
    const mainUserId = JSON.parse(localStorage.getItem("userInfo")).user._id;
    const [getUser] = useGetUserByIdMutation();
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);
    const setUser = (updateUser) => {
        setFollowers(updateUser.followers)
    }
    useEffect(() => {
        getUser(user?._id)
            .then(res => res.data)
            .then(resulte => {
            setFollowers(resulte.followers)
            setFollowing(resulte.following)
        })
    },[])
    return (
        <div className='px-2 flex items-center justify-between'>
            <Link to={`/profile/${user._id}`} className='flex items-center gap-1'>
                <div className="w-[50px] h-[50px] rounded-full p-1 border border-purple-700">
                    <img className='w-full h-full rounded-full object-cover' src={user.avatar.url} alt="user" />
                </div>
                <div className='pr-4'>
                    <h6 className='font-lobster text-md text-purple-800 font-semibold dark:text-slate-300 whitespace-nowrap tracking-wide max-lg:text-sm'>{`${user?.userName?.split(" ")[0][0].toUpperCase()}${user?.userName?.split(" ")[0].slice(1)} ${user?.userName?.split(" ")[1] ? user?.userName?.split(" ")[1][0].toUpperCase() : ''}${user?.userName?.split(" ")[1] ? user?.userName?.split(' ')[1].slice(1) : ''}`}</h6>
                    <div className="flex items-center gap-1">
                        <span className='font-lobster tracking-wider text-xs text-slate-600 dark:text-slate-400'>{followers.length} follower</span>
                        <span className='font-lobster tracking-wider text-xs text-slate-600 dark:text-slate-400'>{following.length} following</span>
                    </div>
                </div>
            </Link>
            {mainUserId !== user?._id && <Button userId={user._id} setUser={setUser} user={user} suggestConsumer={suggestConsumer} />}
        </div>
    );
}

export default Search;
