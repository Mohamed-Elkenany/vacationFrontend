import React, { createContext, useContext, useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import EntryNavbar from '../../components/entryNavbar/EntryNavbar';
import { useSearchFrindMutation } from '../../slices/appApiSlice';
import Searching from '../../components/frindsSearch/Search';
import SkeletonUserName from '../../components/skeleton/SkeletonUserName';
import SkeletonAvatar from '../../components/skeleton/SkeletonAvatar';
const Search = () => {
    const [success, setSucces] = useState(false);
    const suggestContext = createContext({ success, setSucces });
    const suggestConsumer = useContext(suggestContext);

    const [searchFriends, { isLoading, isSuccess, isError }] = useSearchFrindMutation();
    const [frindsSearch, setFrindsSearch] = useState([]);
    const [userName, setUserName] = useState("");
    const handleSearch = (e) => {
        e.preventDefault();
        searchFriends({ userName })
            .then(res => res.data)
            .then(result => {
                setFrindsSearch(result)
            })
            .catch(error => console.log(error.message));
    }
    useEffect(() => {
        searchFriends()
            .then(res => res.data)
            .then(result => {
                setFrindsSearch(result)
            })
            .catch(error => console.log(error.message));
    }, []);
    const searchFrind = frindsSearch?.filter(user => {
        if (userName) {
            return user.userName.toLowerCase().indexOf(userName.toLowerCase()) !== -1
        } else {
            return user;
        }
    });
    return (
        <div className='min-h-screen'>
            <div className=' sticky -top-8'>
                <EntryNavbar />
                <div className=' md:hidden bg-white dark:bg-slate-800'>
                    <form onSubmit={(e) => e.preventDefault()} onChange={handleSearch} className='p-2'>
                        <div className='dark:border-gray-800'>
                            <div className='flex items-center border-b dark:border-gray-700 pb-1'>
                                <input type="text" placeholder='Search...' className=' bg-transparent outline-none w-full pl-2 text-purple-700 dark:text-slate-300 text-sm' onChange={(e) => setUserName(e.target.value)} />
                                <button disabled={!userName} className={`${!userName && 'bg-opacity-80'} bg-purple-700 dark:bg-slate-200 text-slate-100 dark:text-purple-700 flex items-center justify-center w-fit p-[2px] rounded-full mb-[1px]`}><SearchIcon fontSize='small' /></button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            {
                isError &&
                <div className="flex flex-col gap-2">
                    <div className='px-2 flex items-center justify-between'>
                        <div className='flex items-center gap-1'>
                            <SkeletonAvatar />
                            <div>
                                <SkeletonUserName />
                            </div>
                        </div>
        
                    </div>
                    <div className='px-2 flex items-center justify-between'>
                        <div className='flex items-center gap-1'>
                            <SkeletonAvatar />
                            <div>
                                <SkeletonUserName />
                            </div>
                        </div>
        
                    </div>
                    <div className='px-2 flex items-center justify-between'>
                        <div className='flex items-center gap-1'>
                            <SkeletonAvatar />
                            <div>
                                <SkeletonUserName />
                            </div>
                        </div>
        
                    </div>
                    <div className='px-2 flex items-center justify-between'>
                        <div className='flex items-center gap-1'>
                            <SkeletonAvatar />
                            <div>
                                <SkeletonUserName />
                            </div>
                        </div>
        
                    </div>
                </div>
            }
            {
                isLoading &&
                <div className="flex flex-col gap-2">
                    <div className='px-2 flex items-center justify-between'>
                        <div className='flex items-center gap-1'>
                            <SkeletonAvatar />
                            <div>
                                <SkeletonUserName />
                            </div>
                        </div>
        
                    </div>
                    <div className='px-2 flex items-center justify-between'>
                        <div className='flex items-center gap-1'>
                            <SkeletonAvatar />
                            <div>
                                <SkeletonUserName />
                            </div>
                        </div>
        
                    </div>
                    <div className='px-2 flex items-center justify-between'>
                        <div className='flex items-center gap-1'>
                            <SkeletonAvatar />
                            <div>
                                <SkeletonUserName />
                            </div>
                        </div>
        
                    </div>
                    <div className='px-2 flex items-center justify-between'>
                        <div className='flex items-center gap-1'>
                            <SkeletonAvatar />
                            <div>
                                <SkeletonUserName />
                            </div>
                        </div>
        
                    </div>
                </div>
            }
            {
                isSuccess &&
                <div className='mt-2 flex flex-col gap-2'>
                    {
                        searchFrind.length ?
                            searchFrind.map((user, index) => (
                                <Searching key={index} user={user} suggestConsumer={suggestConsumer} />
                            ))
                            :
                            <div className=' text-purple-800 text-center dark:text-slate-300 font-lobster tracking-wider'>
                                <h1>Not Found</h1>
                            </div>
                    }
                </div>
            }
        </div>
    )
};

export default Search;
