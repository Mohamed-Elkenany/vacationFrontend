import React, { createContext, useContext, useState } from 'react';
import InfoProfile from './infoProfile/InfoProfile';
import ProfilePost from '../../profilePost/ProfilePost';
import { suggestContext, handleListContext } from '../../../pages/profilePage/ProfilePage';
import { useParams } from 'react-router-dom';
export const postLengthContext = createContext();
const Middleprofile = () => {
  const [postLength, setPostLength] = useState('');
  const value = {
    postLength,
    setPostLength
  };
  const homePage = false;
  const handleListConsumer = useContext(handleListContext);
  const suggestConsumer = useContext(suggestContext);
  const { id: userId } = useParams();
  return (
    <div className='flex-[6] flex flex-col max-md:px-0 px-2 pt-2 pb-3'>
      <postLengthContext.Provider value={value}>
        <InfoProfile homePage={homePage} suggestConsumer={suggestConsumer} userId={userId} postLengthContext={postLengthContext} />
        <ProfilePost handleListConsumer={handleListConsumer} suggestConsumer={suggestConsumer} />
      </postLengthContext.Provider>
    </div>
  );
}

export default Middleprofile;
