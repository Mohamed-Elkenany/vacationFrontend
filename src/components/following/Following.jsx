import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import Follow from './follow/Follow';
import { useSelector } from 'react-redux';
const Followers = () => {
    const [searchFollowing, setSearchFollowing] = useState('');
    let uesrProfile = useSelector(state => state.userProfile.user);
    return (
        <div className='bg-white dark:bg-slate-800 rounded-md shadow-md h-1/2 overflow-y-scroll scrollbar-none'>
            <h1 className='sticky top-0 bg-purple-800 dark:bg-slate-200 text-slate-200 dark:text-gray-900 text-center text-lg font-lobster tracking-widest font-semibold py-[2px] '>Following</h1>
            <div className='px-4 sticky top-8 bg-white dark:bg-gray-800'>
                <div className='flex items-center border-b dark:border-slate-600 w-full mb-2'>
                    <input className='h-full w-full pl-1 outline-none py-1 bg-transparent dark:text-slate-300' type="text" placeholder='Following...' onChange={(e) => setSearchFollowing(e.target.value)} />
                    <button className='max-h-full flex items-center justify-center py-1 dark:text-slate-300'><SearchIcon className='text-purple-800 dark:text-slate-300' fontSize='small' /></button>
                </div>
            </div>
            <div className='flex flex-col gap-2'>
                {
                    !uesrProfile?.following?.length ? <h1 className='text-center font-lobster tracking-widest font-semibold text-slate-400'>Not Found!</h1>
                        :
                        uesrProfile.following.filter(user => {
                            if (searchFollowing) {
                                return user.email.toLowerCase().indexOf(searchFollowing.toLowerCase()) !== -1
                            } else {
                                return user
                            }
                        })
                            .map((user, index) => (
                                <Follow key={index} user={user} />
                            ))
                }
            </div>
        </div>
    );
};

export default Followers;
