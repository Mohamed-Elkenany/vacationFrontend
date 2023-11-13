import React, {  useContext } from 'react';
import SuggestFirend from '../suggestFirend/SuggestFriend';
import FrindsSearch from '../frindsSearch/FrindsSearch';
import { suggestContext } from '../../pages/homePage/HomePage';
const RightHome = () => {
  const suggestConsumer = useContext(suggestContext)
  return (
    <div className='max-md:hidden rightHome flex-[4] flex flex-col gap-2 sticky top-[60px] py-1'>
        <SuggestFirend suggestConsumer={suggestConsumer}/>
        <FrindsSearch />
    </div>
  );
}

export default RightHome;
