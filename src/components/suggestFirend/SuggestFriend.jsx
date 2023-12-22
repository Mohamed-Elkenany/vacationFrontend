import React, { useEffect, useState } from 'react';
import { useSuggestUserMutation } from '../../slices/appApiSlice';
import SkeletonAvatar from '../skeleton/SkeletonAvatar';
import SkeletonUserName from '../skeleton/SkeletonUserName';
import SuggestFr from "./SuggestFr";
import LoopIcon from '@mui/icons-material/Loop';
const SuggestFirend = ({suggestConsumer}) => {
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const [suggest, setSuggest] = useState([]);
  const [Suggest, { isSuccess: reloadSuggestIsSuccess, isLoading, isError }] = useSuggestUserMutation();
  const handleReloadSuggest = async () => {
    await Suggest(user)
      .then(res => res.data)
      .then(result => {
        setSuggest(result)
      });
  };
  useEffect(() => {
    Suggest(user)
      .then(res=>res.data)
      .then(result => {
        setSuggest(result)
      });
  },[])
  return (
    <div className='w-full flex-1 bg-white dark:bg-gray-800 rounded-md shadow-md overflow-y-scroll scrollbar-none'>
      <div className='sticky top-0 font-lobster tracking-wider text-slate-200 dark:text-gray-900 text-center bg-purple-800 dark:bg-slate-300 rounded-t-md py-1 mb-2 z-50'>
        <h1>Suggest firend</h1>
        <button className='absolute right-3 top-1/2 -translate-y-1/2' onClick={handleReloadSuggest}><LoopIcon/></button>
      </div>
      {
        isError &&
        <div className="flex flex-col gap-2">
        <div className='px-2 flex items-center justify-between'>
          <div className='flex items-center gap-1'>
            <SkeletonAvatar/>
            <div>
              <SkeletonUserName/>
            </div>
          </div>
          <div className='w-[80px] h-[30px] bg-slate-300 dark:bg-gray-900 animate-pulse rounded-md'></div>
        </div>
        <div className='px-2 flex items-center justify-between'>
          <div className='flex items-center gap-1'>
            <SkeletonAvatar/>
            <div>
              <SkeletonUserName/>
            </div>
          </div>
          <div className='w-[80px] h-[30px] bg-slate-300 dark:bg-gray-900 animate-pulse rounded-md'></div>
        </div>
        <div className='px-2 flex items-center justify-between'>
          <div className='flex items-center gap-1'>
            <SkeletonAvatar/>
            <div>
              <SkeletonUserName/>
            </div>
          </div>
          <div className='w-[80px] h-[30px] bg-slate-300 dark:bg-gray-900 animate-pulse rounded-md'></div>
        </div>
        <div className='px-2 flex items-center justify-between'>
          <div className='flex items-center gap-1'>
            <SkeletonAvatar/>
            <div>
              <SkeletonUserName/>
            </div>
          </div>
          <div className='w-[80px] h-[30px] bg-slate-300 dark:bg-gray-900 animate-pulse rounded-md'></div>
        </div>
        </div>
      }
      {
        isLoading &&
        <div className="flex flex-col gap-2">
        <div className='px-2 flex items-center justify-between'>
          <div className='flex items-center gap-1'>
            <SkeletonAvatar/>
            <div>
              <SkeletonUserName/>
            </div>
          </div>
          <div className='w-[80px] h-[30px] bg-slate-300 dark:bg-gray-900 animate-pulse rounded-md'></div>
        </div>
        <div className='px-2 flex items-center justify-between'>
          <div className='flex items-center gap-1'>
            <SkeletonAvatar/>
            <div>
              <SkeletonUserName/>
            </div>
          </div>
          <div className='w-[80px] h-[30px] bg-slate-300 dark:bg-gray-900 animate-pulse rounded-md'></div>
        </div>
        <div className='px-2 flex items-center justify-between'>
          <div className='flex items-center gap-1'>
            <SkeletonAvatar/>
            <div>
              <SkeletonUserName/>
            </div>
          </div>
          <div className='w-[80px] h-[30px] bg-slate-300 dark:bg-gray-900 animate-pulse rounded-md'></div>
        </div>
        <div className='px-2 flex items-center justify-between'>
          <div className='flex items-center gap-1'>
            <SkeletonAvatar/>
            <div>
              <SkeletonUserName/>
            </div>
          </div>
          <div className='w-[80px] h-[30px] bg-slate-300 dark:bg-gray-900 animate-pulse rounded-md'></div>
        </div>
        </div>
      }
      {
        reloadSuggestIsSuccess
        &&
        <div className="flex flex-col gap-3">
        {
          suggest.map((user, index) => (
            <SuggestFr user={user} key={index} suggestConsumer={suggestConsumer} reloadSuggestIsSuccess={reloadSuggestIsSuccess} />
          ))
        }
      </div>
      }
    </div>
  );
}

export default SuggestFirend;
