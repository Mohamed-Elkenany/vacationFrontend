import { createSlice } from "@reduxjs/toolkit";
import appApiSlice from "./appApiSlice";

let initialState = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null;
const userToken =  JSON.stringify(localStorage.getItem("userInfo")).token ;

const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {
        logout: () => {
            localStorage.clear();
            localStorage.setItem("theme","light");
            return initialState = null;
        },
    },
    extraReducers: builder => {
        builder.addMatcher(appApiSlice.endpoints.login.matchFulfilled, (_, { payload }) => {
            localStorage.setItem("userInfo", JSON.stringify(payload));
            return payload;
        });
        builder.addMatcher(appApiSlice.endpoints.updateUserProfile.matchFulfilled, (_, { payload }) => {
            localStorage.setItem("userInfo", JSON.stringify({ user: payload, token: JSON.parse(localStorage.getItem("userInfo")).token }));
        });
        builder.addMatcher(appApiSlice.endpoints.uploadUserAvatar.matchFulfilled, (_, { payload }) => {
            localStorage.setItem("userInfo", JSON.stringify({ user: payload, token: JSON.parse(localStorage.getItem("userInfo")).token }));
        });
        builder.addMatcher(appApiSlice.endpoints.uploadUserBanner.matchFulfilled, (_, { payload }) => {
            localStorage.setItem("userInfo", JSON.stringify({ user: payload.user, token: JSON.parse(localStorage.getItem("userInfo")).token }));
        });
        builder.addMatcher(appApiSlice.endpoints.deleteUserAvatar.matchFulfilled, (_, { payload }) => {
            localStorage.setItem("userInfo", JSON.stringify({ user: payload, token: JSON.parse(localStorage.getItem("userInfo")).token }));
        });
        builder.addMatcher(appApiSlice.endpoints.deleteUserBanner.matchFulfilled, (_, { payload }) => {
            localStorage.setItem("userInfo", JSON.stringify({ user: payload, token: JSON.parse(localStorage.getItem("userInfo")).token }));
        });
    }
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;