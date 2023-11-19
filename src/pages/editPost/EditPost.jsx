import React, { useEffect, useReducer, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import { initialStatePost, reducer } from '../../services/addPostReducer';
import { useGetPostByIdMutation, useUpdatePostMutation } from '../../slices/appApiSlice';
import { ToastContainer, toast } from 'react-toastify';
import EntryNavbar from '../../components/entryNavbar/EntryNavbar';
const EditPost = () => {
    const navigate = useNavigate();
    const { id: postId } = useParams();
    const [getPost, { isLoading, isSuccess }] = useGetPostByIdMutation();
    const [updatePost, { isLoading: loading, isSuccess: success }] = useUpdatePostMutation();
    const [state, dispatch] = useReducer(reducer, initialStatePost);

    const handlePoster = (e) => {
        e.preventDefault();
        const selectFile = e.target.files;
        const fileArray = Array.from(selectFile);
        const addMoreFile = state.imageUrl.concat(fileArray);
        dispatch({ type: 'ADD_IMAGE', payload: addMoreFile });
        const showImage = fileArray.map(imageurl => {
            if (imageurl.type.startsWith("video")) {
                return {
                    url: URL.createObjectURL(imageurl),
                    isVideo: true,
                }
            } else {
                return {
                    url: URL.createObjectURL(imageurl),
                    isVideo: false,
                }
            }
        });
        const concatArrayShow = state.Showimage.concat(showImage);
        dispatch({ type: 'ADD_SHOWIMAGE', payload: concatArrayShow });
    };

    const handleRemoveFile = ({ e, publicId, imageUrl }) => {
        e.preventDefault();
        if (publicId) {
            dispatch({ type: 'ADD_PUBLICID', payload: publicId })
            const filtImg = state.Showimage.filter(img => {
                if (img.publicId !== publicId) {
                    return img;
                }
            });
            dispatch({ type: "ADD_SHOWIMAGE", payload: filtImg });
        } else {
            const filtImg = state.Showimage.filter(img => {
                if (img.url !== imageUrl) {
                    return img;
                }
            });
            const filtImgUrl = state.imageUrl.filter(img => {
                if (img !== state.imageUrl[parseInt(e.target.value)]) {
                    return img;
                }
            });
            dispatch({ type: "ADD_SHOWIMAGE", payload: filtImg });
            dispatch({ type: "ADD_IMAGE", payload: filtImgUrl });
        }
    }
    useEffect(() => {
        getPost(postId)
            .then(res => res.data)
            .then(result => {
                dispatch({ type: "ADD_DESCRIPTION", payload: result.description });
                dispatch({ type: "ADD_SHOWIMAGE", payload: result.imageUrl });
            });
    }, []);
    useEffect(() => {
        if (success) {
            toast.success("Post edit successfully", { autoClose: 1500 });
            setTimeout(() => {
                navigate("/")
            }, 2100);
        };
}, [success, navigate]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (state.description || state.imageUrl.length || state.Showimage.length) {
            let formData = new FormData();
            formData.append("description", state.description);
            for (let file of state.imageUrl) {
                formData.append("imageUrl", file);
            }
            for (let id of state.publicId) {
                formData.append("publicId", id);
            }
            formData.append("postId", postId);
            await updatePost(formData)
                .then(res => res.data)
                .then(result=>console.log(result));
        } else {
            return toast.warning("Your title or photo is required", { autoClose: 2000, position: 'top-center' });
        }
    };
    console.log(state)
    return (
        <div className='bg-slate-100 dark:bg-gray-900 min-h-screen pb-6'>
            <EntryNavbar />
            <div className='w-full h-full mt-4 max-md:px-4'>
                <form onSubmit={handleSubmit} encType='multipart/form-data' className=' bg-slate-50 dark:bg-gray-800 w-3/4 mx-auto rounded-md shadow-md p-1 max-md:w-full'>
                    <h1 className="text-center font-lobster text-xl tracking-widest text-purple-800 dark:text-slate-300 font-semibold">Edit post</h1>
                    <div className='border-b dark:border-gray-600 w-2/3 h-[150px] mx-auto max-md:w-10/12'>
                        <textarea disabled={isLoading} defaultValue={state.description} className=' bg-transparent p-1 outline-none  resize-none w-full max-h-full text-slate-600 dark:text-slate-300' placeholder={`${isLoading ? 'Loading...' : 'Title...'}`} cols="40" rows="5" onChange={(e) => dispatch({ type: "ADD_DESCRIPTION", payload: e.target.value })} />
                    </div>
                    <div className={`w-2/3 mx-auto mt-6  h-[200px] flex flex-col items-center justify-center`}>
                        <div className='relative flex items-center justify-center border border-dashed border-purple-800 dark:border-slate-300 rounded-md w-full h-full'>
                            {
                                isLoading
                                &&
                                <h1 className=' text-center text-purple-700 dark:text-slate-300 font-lobster tracking-widest'>Loading...</h1>
                            }
                            {isSuccess &&
                                state.Showimage?.length > 0 &&
                                <div className='absolute top-0 left-0 bg-white w-full h-full flex justify-center'>
                                    {
                                        state.Showimage.map((image, index) => (
                                            <div key={index} className='max-w-full h-full'>
                                                {image.isVideo ?
                                                    <div className='max-w-full h-full relative'>
                                                        <video className='max-w-full h-full object-contain' src={image.url} alt="poster" autoPlay loop />
                                                        <button disabled={success || loading} value={index} className='absolute z-[999] bg-gray-900 text-white dark: text-sm w-6 h-6 flex items-center justify-center -top-4 left-2 rounded-md' onClick={(e)=>handleRemoveFile({e,publicId:image.publicId,imageUrl:image.url})}>X</button>
                                                    </div>
                                                    :
                                                    <div className='max-w-full h-full relative'>
                                                        <button disabled={success || loading} value={index} className='absolute z-[999] bg-gray-900 text-white dark: text-sm w-6 h-6 flex items-center justify-center -top-4 left-2 rounded-md' onClick={(e)=>handleRemoveFile({e,publicId:image.publicId,imageUrl:image.url})}>X</button>
                                                        <img className='max-w-full h-full object-contain' src={image.url} alt="poster" />
                                                    </div>
                                                }
                                            </div>
                                        ))
                                    }
                                </div>
                            }
                            <label htmlFor='file' className={`${isLoading && 'hidden'} cursor-pointer text-purple-800 dark:text-slate-300`} ><PhotoLibraryIcon fontSize='large' /></label>
                            <input name='imageUrl' multiple type="file" id='file' accept="image/png, image/jpg, image/gif, image/jpeg, video/mp4, video/x-m4v, video/*" className='mb-2 hidden' onChange={handlePoster} />
                        </div>
                        <label htmlFor='file' className={`${state.Showimage?.length > 0 ? 'flex' : 'hidden'} items-center cursor-pointer dark:text-slate-300 mt-1 max-md:text-sm gap-1`}>
                            <PhotoLibraryIcon fontSize='small' />
                            <span>Add more photo / video</span>
                        </label>
                    </div>
                    <div className='flex items-center justify-center w-full my-3'><button disabled={!state.description && !state.imageUrl.length && !state.Showimage.length || loading || success} className=' rounded-sm bg-slate-300 px-3 font-lobster tracking-widest text-purple-700 dark:text-gray-900'>{loading ? "Loading..." : "Post"}</button></div>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default EditPost;