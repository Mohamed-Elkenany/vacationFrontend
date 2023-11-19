import React, { useEffect, useLayoutEffect, useState } from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import PhotoAlbumIcon from '@mui/icons-material/PhotoAlbum';
import EditIcon from '@mui/icons-material/Edit';
import { useDeleteUserAvatarMutation, useDeleteUserBannerMutation, useGetUserProfileMutation, useUploadUserAvatarMutation, useUploadUserBannerMutation } from '../../../../slices/appApiSlice';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateAvatar, updateBanner, DELETEAVATAR, DELETEBANNER } from "../../../../slices/updateSlice";
import Loading from "../../../loading/Loading";
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
const SettingPage = ({ userId, suggestConsumer }) => {
    const dispatch = useDispatch()
    const [deleteBanner, { isLoading, isSuccess, isError }] = useDeleteUserBannerMutation();
    const [uploadBanner, { isLoading: loadingUploadBanner, isSuccess: successUploadBanner, isError:ErrorUpBanner }] = useUploadUserBannerMutation();
    const [deleteAvatar, { isLoading: loadingDeleteAvatar, isSuccess: successDeleteAvatar, isError:ErrorDeAvatar }] = useDeleteUserAvatarMutation();
    const [uploadAvatar, { isLoading: loadingUploadAvatar, isSuccess: successUploadAvatar, isError:ErrorUpAvatar }] = useUploadUserAvatarMutation();
    const [user] = useGetUserProfileMutation();
    const [successes , setSuccesses] = useState();
    const handleDeleteBanner = async () => {
        await deleteBanner(userId)
        .then(res => res.data)
    }
    const handleDeleteAvatar = async () => {
        await deleteAvatar(userId)
        .then(res => res.data)
    }
    const handleUploadBanner = async (e) => {
        const formData = new FormData();
        formData.append("banner", e.target.files[0]);
        formData.append("userId", userId);
        await uploadBanner(formData)
            .then(res => res.data)
    }
    const handleUploadAvatar = async (e) => {
        const formData = new FormData();
        formData.append("avatar", e.target.files[0]);
        formData.append("userId", userId);
        await uploadAvatar(formData)
            .then(res => res.data)
    }
    useEffect(() => {
        user(userId);
    }, [isSuccess, successUploadBanner, successDeleteAvatar, successUploadAvatar]);
    useLayoutEffect(() => {
        dispatch({ type: updateAvatar, payload: successUploadAvatar });
    }, [successUploadAvatar]);
    useLayoutEffect(() => {
        dispatch({ type: DELETEAVATAR, payload: successDeleteAvatar });
    }, [successDeleteAvatar]);
    useLayoutEffect(() => {
        dispatch({ type: DELETEBANNER, payload: isSuccess });
    }, [isSuccess]);
    useLayoutEffect(() => {
        dispatch({ type: updateBanner, payload: successUploadBanner });
    }, [successUploadBanner]);
    return (
        <div className='flex-1 bg-white dark:bg-slate-800 rounded-md shadow-md  overflow-y-scroll scrollbar-none'>
            <div className='sticky top-0 bg-purple-800 dark:bg-slate-300 w-full rounded-sm' >
                <h1 className='text-slate-200 dark:text-slate-900 text-center font-lobster tracking-widest font-semibold select-none'>Setting</h1>
            </div>
            <div className='p-1 flex flex-col justify-between h-full'>
                <label htmlFor='upload_avatar' className={`flex items-center justify-between gap-1 p-1 font-lobster tracking-widest text-purple-700 dark:text-slate-200 hover:bg-purple-500 hover:text-slate-200 rounded-sm select-none ${isLoading || loadingDeleteAvatar || loadingUploadBanner || loadingUploadAvatar ? 'cursor-default' : 'cursor-pointer'}`}>
                    <div>
                        <div><PhotoAlbumIcon fontSize='small' className='text-slate-300 mr-1' />Update avatar</div>
                        <input disabled={isLoading || loadingDeleteAvatar || loadingUploadBanner || loadingUploadAvatar} onChange={handleUploadAvatar} type="file" accept="image/png, image/jpg, image/gif, image/jpeg" id="upload_avatar" className='hidden' />
                    </div>
                    {loadingUploadAvatar && <Loading/>}
                    {successUploadAvatar ? <div className='dark:text-slate-300 text-purple-700'><FileDownloadDoneIcon /></div> : ""}
                    {ErrorUpAvatar && <h1 className='text-sm text-red-900'>Try again</h1>}
                </label>
                <label htmlFor='upload_banner' className={`flex items-center justify-between gap-1 p-1 font-lobster tracking-widest text-purple-700 dark:text-slate-200 hover:bg-purple-500 hover:text-slate-200 rounded-sm select-none ${isLoading || loadingDeleteAvatar || loadingUploadBanner || loadingUploadAvatar ? 'cursor-default' : 'cursor-pointer'}`}>
                    <div>
                        <div><PhotoAlbumIcon fontSize='small' className='text-slate-300 mr-1' />Update banner</div>
                        <input disabled={isLoading || loadingDeleteAvatar || loadingUploadBanner || loadingUploadAvatar} onChange={handleUploadBanner} type="file" accept="image/png, image/jpg, image/gif, image/jpeg" id="upload_banner" className='hidden' />
                    </div>
                    {loadingUploadBanner && <Loading/>}
                    {successUploadBanner && <div className='dark:text-slate-300 text-purple-700'><FileDownloadDoneIcon /></div>}
                    {ErrorUpBanner && <h1 className='text-sm text-red-900'>Try again</h1>}
                </label>
                <button disabled={isLoading || loadingDeleteAvatar || loadingUploadBanner || loadingUploadAvatar} onClick={() => suggestConsumer.setUpdateBIO(true)} className='flex items-center gap-1 p-1 font-lobster tracking-widest text-purple-700 dark:text-slate-200 hover:bg-purple-500 hover:text-slate-200 rounded-sm select-none'>
                    <span><EditIcon fontSize='small' className='text-slate-300' /></span>
                    <span className='text-sm'>Edit bio</span>
                </button>
                <button disabled={isLoading || loadingDeleteAvatar || loadingUploadBanner || loadingUploadAvatar} onClick={handleDeleteBanner} className='flex items-center justify-between gap-1 p-1 font-lobster tracking-widest text-purple-700 dark:text-slate-200 hover:bg-purple-500 hover:text-slate-200 rounded-sm select-none'>
                    <div>
                        <span><DeleteOutlineIcon fontSize='small' className='text-slate-300' /></span>
                        <span className='text-sm'>Delete banner</span>
                    </div>
                    {isLoading && <Loading/>}
                    {isSuccess && <div className='dark:text-slate-300 text-purple-700'><FileDownloadDoneIcon /></div>}
                    {isError && <h1 className='text-sm text-red-900'>Try again</h1>}
                </button>
                <button disabled={isLoading || loadingDeleteAvatar || loadingUploadBanner || loadingUploadAvatar} onClick={handleDeleteAvatar} className='flex items-center justify-between gap-1 p-1 font-lobster tracking-widest text-purple-700 dark:text-slate-200 hover:bg-purple-500 hover:text-slate-200 rounded-sm select-none'>
                    <div>
                        <span><DeleteOutlineIcon fontSize='small' className='text-slate-300' /></span>
                        <span className='text-sm'>Delete avatar</span>
                    </div>
                    {loadingDeleteAvatar && <Loading/>}
                    <div className={`${successDeleteAvatar ? "flex" : "hidden"} dark:text-slate-300 text-purple-700`}><FileDownloadDoneIcon /></div>
                    {ErrorDeAvatar && <h1 className='text-sm text-red-900'>Try again</h1>}
                </button>
            </div>
        </div>
    );
};

export default SettingPage;
