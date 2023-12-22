import React, { createContext, useEffect, useLayoutEffect, useState } from 'react';
import LeftHome from '../../components/leftHome/LeftHome';
import MiddleHome from '../../components/middleHome/MiddleHome';
import RightHome from '../../components/rightHome/RightHome';
import { useSelector } from 'react-redux';
import { useGetPostByIdMutation, useUpdateUserProfileMutation } from '../../slices/appApiSlice';
import ListOfLikes from '../../components/listOfLikes/ListOfLikes';
export const handleListContext = createContext();
export const suggestContext = createContext();
export const EditCommentContext = createContext();
const HomePage = ({ socket }) => {
  const [postById] = useGetPostByIdMutation();
  const USER = JSON.parse(localStorage.getItem("userInfo")).user;
  const [UpdateBIO, { isLoading, isSuccess: isSuccessUpdateBIO, isError, error }] = useUpdateUserProfileMutation();
  const [updateBIO, setUpdateBIO] = useState(false);
  const [BIO, setBIO] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [deletedPost, setDeletedPost] = useState(false);
  const [showLikeList, setShowLikeList] = useState(false);
  const newPost = useSelector(state => state.post);
  const [listOfLike, setListOfLike] = useState([]);
  const [success, setSucces] = useState(false);
  const value = {
    success,
    setSucces,
    setShowLikeList,
    socket,
    BIO,
    setBIO,
    setUpdateBIO,
    isSuccessUpdateBIO,
    deletedPost,
    setDeletedPost
  };
  const handleListLike = async (postId) => {
    await postById(postId)
      .then(res => res.data)
      .then(result => setListOfLike(result.like))
      .catch(error => console.log(error.message));
    setShowLikeList(newPost.openListOfLike);
  }
  const handleEditBio = async (e) => {
    e.preventDefault();
    await UpdateBIO({ userId: USER._id, userName: USER.userName, bio: BIO })
      .then(res => res.data)
      .then(result => setBIO(result.bio))
      .catch(error => console.log(error));
  }
  useLayoutEffect(() => {
    setUpdateBIO(false);
  }, [isSuccessUpdateBIO]);
  useEffect(() => {
    setErrorMessage(error?.data?.message);
  }, [error])
  return (
    <div className='homePage max-md:px-0 w-full min-h-screen dark:bg-transparent px-2 flex'>
      {
        updateBIO
        &&
        <div className='absolute z-[1000] left-0 top-0 min-h-full w-full bg-black bg-opacity-70 '>
          <div className=' max-md:w-11/12 md:w-1/3 max-h-[500px] rounded-sm bg-white dark:bg-gray-700 fixed left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 py-1 px-2'>
            <button disabled={isLoading || isError} className='text-white absolute -right-4 -top-4 bg-purple-800 dark:bg-black w-7 h-7 rounded-sm flex items-center justify-center' onClick={() => setUpdateBIO(false)}>X</button>
            <div className=' bg-transparent w-full max-h-[490px] overflow-y-scroll scrollbar-none'>
              <h1 className="text-center underline text-purple-800 dark:text-slate-300 font-lobster tracking-wider">Edit BIO</h1>
              {errorMessage &&
                <div className='text-center'>
                  <h1 className='whitespace-nowrap text-sm border p-1 bg-red-800 text-white font-lobster font-medium rounded-md'>{errorMessage}</h1>
                </div>
              }
              <form onSubmit={handleEditBio}>
                <div className='flex flex-col items-center my-2 py-1 dark:text-slate-300'>
                  <textarea rows="5" defaultValue={BIO} placeholder="BIO..." className='w-full bg-transparent pl-2 outline-none border dark:border-gray-600 resize-none max-h-[60px] mb-1 scrollbar-none' onChange={(e) => setBIO(e.target.value)}></textarea>
                  <button disabled={isLoading} className='bg-purple-700 px-2 font-lobster tracking-wider rounded-sm text-slate-100'>Edit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      }
      {showLikeList &&
        <div className='absolute z-[1000] left-0 top-0 min-h-full w-full bg-black bg-opacity-70 '>
          <div className=' max-md:w-11/12 md:w-1/2 lg:w-1/4 max-h-[500px] rounded-sm bg-white dark:bg-gray-700 fixed left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 py-1 px-2'>
            <div className='text-white absolute -right-4 -top-4 bg-black w-7 h-7 rounded-sm flex items-center justify-center cursor-pointer' onClick={() => setShowLikeList(false)}>X</div>
            <div className=' bg-transparent w-full max-h-[490px] overflow-y-scroll scrollbar-none'>
              {
                listOfLike.length ?
                  <div className='max-h-full w-full flex flex-col gap-[10px]'>
                    {
                      listOfLike.map((userLike, index) => (
                        <ListOfLikes userLike={userLike} key={index} />
                      ))
                    }
                  </div>
                  :
                  <h1 className="text-center text-gray-900 dark:text-slate-300 font-lobster tracking-wider">There are no likes for this post yet</h1>
              }
            </div>
          </div>
        </div>}
      <suggestContext.Provider value={value}>
        <LeftHome />
        <handleListContext.Provider value={handleListLike}>
          <MiddleHome />
        </handleListContext.Provider>
        <RightHome />
      </suggestContext.Provider>
    </div>
  );
};

export default HomePage;
