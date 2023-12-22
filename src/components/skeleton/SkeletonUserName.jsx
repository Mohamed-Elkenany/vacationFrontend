import React from 'react';

const SkeletonUserName = () => {
    return (
        <div className="flex flex-col gap-2">
            <div className='h-[8px] w-[150px] bg-slate-300 dark:bg-gray-900 rounded-sm animate-pulse'>
            </div>
            <div className='h-[8px] w-[120px] bg-slate-300 dark:bg-gray-900 rounded-sm animate-pulse'>
            </div>
        </div>
    );
};

export default SkeletonUserName;
