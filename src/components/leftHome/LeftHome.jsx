import React, { useContext } from 'react';
import UserInfo from '../advertisment/UserInfo';
import { suggestContext } from '../../pages/homePage/HomePage';
import SettingPage from '../profilePage/rightProfile/settingPage/SettingPage';
const LeftHome = () => {
  const suggestConsumer = useContext(suggestContext);
  const userId = JSON.parse(localStorage.getItem("userInfo")).user._id;
  const homePage = true;
  return (
    <div className='max-lg:hidden leftHome flex-[4] flex flex-col gap-2 sticky top-[60px] py-1'>
      <UserInfo  suggestConsumer={suggestConsumer}/>
      <SettingPage suggestConsumer={suggestConsumer} userId={userId}/>
    </div>
  );
}

export default LeftHome;
