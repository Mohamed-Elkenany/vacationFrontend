import { configureStore } from "@reduxjs/toolkit";
import appApiSlice from "../slices/appApiSlice";
import thunk from "redux-thunk";
import userSlice from "../slices/userSlice";
import suggestSlice from "../slices/suggestSlice";
import postsSlice from "../slices/postsSlice";
import postSlice from "../slices/postSlice";
import userProfile from "../slices/userProfile";
import updateprofile from "../slices/updateSlice"
const store = configureStore({
    reducer: {
        user: userSlice,
        suggest: suggestSlice,
        posts: postsSlice,
        post: postSlice,
        userProfile: userProfile,
        update: updateprofile,
        [appApiSlice.reducerPath]: appApiSlice.reducer,
    },
    middleware: [thunk, appApiSlice.middleware],
});

export default store;