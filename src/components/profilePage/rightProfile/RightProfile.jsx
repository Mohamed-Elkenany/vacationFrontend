import React, { useContext, useState } from 'react';
import SettingPage from './settingPage/SettingPage';
import { useParams } from 'react-router-dom';
import { suggestContext } from '../../../pages/profilePage/ProfilePage';
import SuggestFirend from '../../suggestFirend/SuggestFriend';
import UserInfo from '../../advertisment/UserInfo';
const RightProfile = () => {
  const suggestConsumer = useContext(suggestContext);
  const { id: userId } = useParams();
  const mainUserId = JSON.parse(localStorage.getItem("userInfo")).user._id;
  return (
    <div className='max-lg:hidden rightHome flex-[4] flex flex-col gap-2 sticky top-[60px] py-1'>
      {
        userId === mainUserId
        ?
          <SettingPage suggestConsumer={suggestConsumer} userId={mainUserId}/>
          :
          <UserInfo/>
      }
      <SuggestFirend suggestConsumer={suggestConsumer}/>
    </div>
  );
}

export default RightProfile;
