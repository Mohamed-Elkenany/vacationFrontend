import React, { useContext, useEffect, useLayoutEffect, useReducer, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import {useGetUserByIdMutation, useGetPostProfileMutation, useGetUserProfileMutation, useUploadUserAvatarMutation, useUploadUserBannerMutation } from '../../../../slices/appApiSlice';
import Follower from '../../../followers/follower/Follower';
import { updateAvatarInfo, updateBanner } from "../../../../slices/updateSlice";
import SkeletonAvatar from '../../../skeleton/SkeletonAvatar';
import SkeletonBio from '../../../skeleton/SkeletonBio';
const InfoProfile = ({ suggestConsumer, userId, postLengthContext, homePage }) => {
    const DISpatch = useDispatch();
    const updates = useSelector(state => state.update);
    const [userProfile, setUserProfile] = useState();
    const [banner, setBanner] = useState();
    const [avatar, setAvatar] = useState();
    const [BIO, setBIO] = useState();
    const [countOfPost, setCountOfPost] = useState('');
    const mainUserId = JSON.parse(localStorage.getItem("userInfo")).user._id;
    const postLengthConsumer = useContext(postLengthContext);
    const [uploadBanner, { isLoading, isSuccess }] = useUploadUserBannerMutation();
    const [uploadAvatar, { isLoading: loadingUploadAvatar, isSuccess: successUploadAvatar }] = useUploadUserAvatarMutation();
    const [getprofilePost, { isLoading: loadPostProfile, isSuccess: successPostProfile }] = useGetPostProfileMutation();
    const [user, { isSuccess: successGetUser }] = useGetUserProfileMutation();
    const [userById, { isLoading: loadingGetUserById, isSuccess: successGetUserById, isError: errorGetUserById }] = useGetUserByIdMutation();
    const [searchFollower, setSearchFollower] = useState('');
    const initialState = {
        overlay: false,
        typeFollow: null,
        count: null,
        follow: null,
    };
    const reducerFollow = (_, action) => {
        switch (action.type) {
            case "Followers": {
                return {
                    overlay: true,
                    typeFollow: "Follower",
                    count: userProfile?.followers.length,
                    follow: userProfile?.followers,
                }
            }
            case "Following": {
                return {
                    overlay: true,
                    typeFollow: "Following",
                    count: userProfile?.following.length,
                    follow: userProfile?.following,
                }
            }
            default: {
                return {
                    overlay: false,
                    typeFollow: null,
                    count: null,
                    follow: null,
                }
            }
        }
    };
    const [state, dispatch] = useReducer(reducerFollow, initialState);
    const handleUploadBanner = async (e) => {
        const formData = new FormData();
        formData.append("banner", e.target.files[0]);
        formData.append("userId", userProfile?._id);
        await uploadBanner(formData)
            .then(res => res.data)
            .then(resulte => console.log(resulte));
    }
    const handleUploadAvatar = async (e) => {
        const formData = new FormData();
        formData.append("avatar", e.target.files[0]);
        formData.append("userId", userProfile?._id);
        await uploadAvatar(formData)
            .then(res => res.data)
            .then(resulte => {
                setAvatar(resulte.avatar)
            });
    };
    useEffect(() => {
        userById(userId)
            .then(res => res.data)
            .then(resulte => {
                setUserProfile(resulte)
                setBanner(resulte?.banner)
                setAvatar(resulte?.avatar)
                suggestConsumer?.setBIO(resulte?.bio)
            });
    }, [userId]);
    useEffect(() => {
        user(userId)
            .then(res => res.data)
            .then(resulte => {
                setUserProfile(resulte)
                setBanner(resulte?.banner)
                setAvatar(resulte?.avatar)
                suggestConsumer?.setBIO(resulte?.bio)
            });
    }, [suggestConsumer?.success]);
    useEffect(() => {
        user(userId)
            .then(res => res.data)
            .then(resulte => {
                setUserProfile(resulte)
                setBIO(resulte?.bio)
            });
    }, [suggestConsumer.success,suggestConsumer.isSuccessUpdateBIO]);
    useEffect(() => {
        user(userId)
            .then(res => res.data)
            .then(resulte => {
                setAvatar(resulte?.avatar)
            });
    }, [successUploadAvatar, updates.updateAvatar, updates.deleteAvatar]);
    useEffect(() => {
        DISpatch({ type: updateAvatarInfo, payload: successUploadAvatar });
    }, [successUploadAvatar]);
    useEffect(() => {
        user(userId)
            .then(res => res.data)
            .then(resulte => {
                setBanner(resulte?.banner)
                DISpatch({ type: updateBanner, payload: isSuccess });
            });
    }, [isSuccess, updates.updateBanner, updates.deleteBanner]);
    useEffect(() => {
        dispatch({ type: "default" })
    }, [userId]);
    useEffect(() => {
        getprofilePost(userId)
            .then(res => res.data)
            .then(resulte => {
                setCountOfPost(resulte.posts)
                postLengthConsumer.setPostLength(resulte.posts?.length);
            })
            .catch(error => console.log(error));
    }, [userId, getprofilePost]);
    return (
        <div>
            <div className='bg-white dark:bg-gray-800 w-full h-auto rounded-md shadow-md'>
                {state.overlay &&
                    <div className='absolute top-0 left-0 bg-black bg-opacity-60 w-full h-full z-[1000]'>
                        <div className='fixed pb-2 rounded-md text-white left-1/2 -translate-x-1/2 top-1/4 bg-slate-100 dark:bg-gray-800 w-fill w-[88%] max-h-2/3'>
                            <button className="absolute -right-4 -top-4 bg-gray-950 px-2 rounded-md z-[1000]" onClick={() => dispatch({ type: "default" })}>X</button>
                            <div className='sticky top-0 rounded-md bg-slate-100 dark:bg-gray-800'>
                                <h1 className='rounded-t-md text-center bg-purple-700 h-full dark:bg-gray-800 font-lobster tracking-widest mb-1 py-1'>{state.count > 0 ? state.count : ""} {state.typeFollow}</h1>
                                <form className={`${!state.follow.length && 'hidden'} w-full px-2 mb-2`}>
                                    <div className='flex items-center border-b dark:border-gray-700'>
                                        <input type="text" className="w-full bg-slate-100 dark:bg-gray-800 outline-none text-xs" onChange={(e) => setSearchFollower(e.target.value)} />
                                        <button className='bg-purple-700 rounded-full flex items-center justify-center p-[2px] mb-1'><SearchIcon style={{ fontSize: "20px" }} /></button>
                                    </div>
                                </form>
                                <div className='flex flex-col gap-2'>
                                    {
                                        !state.follow?.length ? <h1 className='text-center font-lobster tracking-widest font-semibold text-purple-700 dark:text-slate-400 mb-2'>Not {state.typeFollow} yet</h1>
                                            :
                                            state.follow.filter(user => {
                                                if (searchFollower) {
                                                    return user.email.toLowerCase().indexOf(searchFollower.toLowerCase()) !== -1
                                                } else {
                                                    return user
                                                }
                                            })
                                                .map((user, index) => (
                                                    <Follower key={index} user={user} />
                                                ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                }
                <div className="banner relative w-full h-[200px] flex items-center justify-center">
                    <div className="absolute z-10 top-0 left-0 w-full h-full bg-slate-100 bg-opacity-5"></div>
                    {
                        isLoading && <h1 className="text-xl dark:text-slate-400 font-lobster tracking-widest">Loading...</h1>
                    }
                    {
                        loadingGetUserById &&
                        <div className='rounded-t-md w-full h-full bg-slate-300 dark:bg-gray-900 animate-pulse'></div>
                    }
                    {successGetUserById &&
                        (
                            banner?.url ? <img className='rounded-t-md w-full h-full object-cover object-right-top' src={banner.url} alt="banner" />
                                :
                                userProfile?._id === mainUserId ?
                                    <div className='relative w-full h-full bg-slate-200 dark:bg-transparent rounded-t-md'>
                                        <label disabled={isLoading} htmlFor='upload_banner' className={`absolute right-2 top-2 w-fit text-slate-300 bg-purple-700  p-1 rounded-full flex items-center justify-center ${isLoading ? "cursor-default" : "cursor-pointer"} z-50`}><AddAPhotoIcon /></label>
                                        <input disabled={isLoading} accept="image/png, image/jpg, image/gif, image/jpeg" type="file" id="upload_banner" className='hidden' onChange={handleUploadBanner} />
                                        <h1 className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-lobster tracking-widest dark:text-slate-300 text-slate-900 text-3xl opacity-30 select-none'>Vacation</h1>
                                    </div>
                                    :
                                    <div className='relative w-full h-full bg-slate-200 dark:bg-transparent rounded-t-md'>
                                        <h1 className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-lobster tracking-widest dark:text-slate-300 text-slate-900 text-3xl opacity-30 select-none'>Vacation</h1>
                                    </div>
                        )
                    }
                    <div className='absolute -bottom-[35px] left-1/2 -translate-x-1/2 w-[70px] h-[70px] rounded-full p-1 border border-purple-800 z-50'>
                        {
                            loadingGetUserById &&
                            <div className='h-full w-full rounded-full object-cover object-left-top bg-slate-300 dark:bg-gray-900 animate-pulse'></div>
                        }
                        {successGetUserById &&
                            <div className="overlay relative w-full h-full z-50 rounded-full">
                                {
                                    (userProfile?._id === mainUserId && !homePage) &&
                                    <label className={`absolute -bottom-2 left-0 w-6 h-6 rounded-full text-slate-300 text-opacity-70 bg-opacity-70 bg-purple-700 flex items-center justify-center ${loadingUploadAvatar ? 'cursor-default' : 'cursor-pointer'}`} htmlFor="uploadAvatar"><AddIcon /></label>
                                }
                                <input disabled={loadingUploadAvatar} type="file" id="uploadAvatar" className='hidden' onChange={handleUploadAvatar} />
                                <img className='h-full w-full rounded-full object-cover z-10' src={avatar?.url} alt="user" />
                            </div>
                        }
                    </div>
                </div>
                <div className='mt-[35px] mb-2 pb-2'>
                    {
                        loadingGetUserById &&
                        <div className='flex items-center justify-center w-full py-2'>
                            <SkeletonBio />
                        </div>
                    }
                    {successGetUserById &&
                        <h1 className='text-center font-lobster tracking-widest text-purple-700 dark:text-slate-300 font-semibold mb-1'>{`${userProfile?.userName[0].toUpperCase()}${userProfile?.userName.split(' ')[0].slice(1)} ${userProfile?.userName.split(' ')[1] ? userProfile?.userName.split(' ')[1][0].toUpperCase() : ''}${userProfile?.userName.split(' ')[1] ? userProfile?.userName.split(' ')[1].slice(1) : ''}`}</h1>
                    }
                    {
                        loadingGetUserById &&
                        <div className='ml-2'>
                            <SkeletonBio />
                        </div>
                    }
                    {
                        userProfile?.bio && <div className='flex items-start gap-1 text-purple-700 dark:text-slate-400 text-xs font-lobster tracking-wider px-1 my-1'>
                            <span className='whitespace-nowrap'>BIO : </span>
                            <span className=''>{userProfile?.bio}</span>
                        </div>
                    }
                    <div className='px-8 mt-2'>
                        <div className='border-t dark:border-slate-600 flex items-center justify-around py-1'>
                            <div className='font-lobster tracking-wider text-purple-800 dark:text-slate-200 flex flex-col items-center justify-center border-r dark:border-slate-600 w-full h-full'>
                                {
                                    loadPostProfile &&
                                    <div className='w-3 h-7 rounded-full bg-slate-300 dark:bg-gray-900'></div>
                                }
                                { successGetUserById &&
                                    <span className='max-md:hidden'>{userProfile?.followers?.length}</span>
                                    }
                                <span className='max-md:hidden'>Followers</span>
                                <button className="md:hidden font-lobster tracking-wider text-purple-800 dark:text-slate-200 flex flex-col items-center justify-center border-r dark:border-slate-600 w-full h-full" onClick={() => dispatch({ type: "Followers" })}>
                                    <span>{userProfile?.followers.length}</span>
                                    <span className='text-sm'>Followers</span>
                                </button>
                            </div>
                            <div className='font-lobster tracking-wider text-purple-800 dark:text-slate-200 flex flex-col items-center justify-center border-r dark:border-slate-600 w-full h-full'>
                                {
                                    loadPostProfile &&
                                    <div className='w-3 h-7 rounded-full bg-slate-300 dark:bg-gray-900'></div>
                                }
                                { successGetUserById &&
                                    <span className='max-md:hidden'>{userProfile?.following?.length}</span>
                                    }
                                <span className='max-md:hidden'>Following</span>
                                <button className="md:hidden font-lobster tracking-wider text-purple-800 dark:text-slate-200 flex flex-col items-center justify-center border-r dark:border-slate-600 w-full h-full" onClick={() => dispatch({ type: "Followers" })}>
                                    <span>{userProfile?.following.length}</span>
                                    <span className='text-sm'>Following</span>
                                </button>
                            </div>
                            <div className='font-lobster tracking-wider text-purple-800 dark:text-slate-200 flex flex-col items-center justify-center  w-full h-full'>
                                { successPostProfile && successGetUserById &&
                                    <span>{countOfPost?.length > 0 ? countOfPost.length : '0'}</span>
                                }
                                { loadPostProfile &&
                                    <div className='w-3 h-7 rounded-full bg-slate-300 dark:bg-gray-900'></div>
                                }
                                <span className='max-md:text-sm'>Posts</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InfoProfile;