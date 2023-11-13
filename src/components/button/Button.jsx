import React, { useEffect, useState } from 'react';
import { useTogglefollowMutation, useGetUserByIdMutation } from '../../slices/appApiSlice';
import { toggleFollowButton } from "../../slices/buttonFollowSclice";
import { useDispatch } from 'react-redux';
const Button = ({ userId, setUser, user, suggestConsumer }) => {
  const dispatch = useDispatch();
  const mainUser = JSON.parse(localStorage.getItem("userInfo")).user;
  const [toggleFollow, { isSuccess, isLoading }] = useTogglefollowMutation();
  const [getUserById] = useGetUserByIdMutation();
  const [follow, setFollow] = useState("Follow");
  const handleToggleFollow = async () => {
    await toggleFollow(userId)
      .then(res => res.data)
      .then(result => {
        setUser(result.userFollow);
        dispatch({ type: toggleFollowButton, payload: result.user });
      });
  };
  useEffect(() => {
    getUserById(userId)
      .then(res => res.data)
      .then(result => {
        setUser(result);
        const following = result.following.find(user => user._id === mainUser._id);
        const followers = result.followers.find(user => user._id === mainUser._id);
        if (followers) {
          setFollow("Unfollow")
        } else if (following && !followers) {
          setFollow("Follow back")
        } else {
          setFollow("Follow")
        }
      })
      .catch(error => console.error(error.message));
  }, [suggestConsumer?.success]);
  useEffect(() => {
    suggestConsumer?.setSucces(isSuccess);
  }, [isSuccess]);
  useEffect(() => {
    getUserById(mainUser._id)
      .then(res => res.data)
      .then(result => dispatch({ type: toggleFollowButton, payload: result }));
  }, []);
  return (
    <div>
      <button disabled={isLoading}  className={`${isLoading && 'opacity-60'} text-sm font-lobster tracking-wider bg-purple-700 text-slate-100 p-1 rounded-sm`} onClick={handleToggleFollow}>{follow}</button>
    </div>
  );
}
export default Button;
