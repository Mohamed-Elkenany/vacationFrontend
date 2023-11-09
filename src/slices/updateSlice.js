import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    updateAvatarInfo: false,
    updateAvatar: false,
    deleteAvatar: false,
    updateBanner: false,
    deleteBanner: false,
    updateBio: false,
};
const updateprofile = createSlice({
    name: "updateprofile",
    initialState,
    reducers: {
        updateAvatarInfo: (state, action) => {
            return {
                ...state,
                updateAvatarInfo: action.payload,
            }
        },
        updateAvatar: (state, action) => {
            return {
                ...state,
                updateAvatar: action.payload,
            }
        },
        DELETEAVATAR: (state, action) => {
            return {
                ...state,
                deleteAvatar: action.payload,
            }
        },
        updateBanner: (state, action) => {
            return {
                ...state,
                updateBanner: action.payload,
            }
        },
        DELETEBANNER: (state, action) => {
            return {
                ...state,
                deleteBanner: action.payload,
            }
        },
        updateBio: (state, action) => {
            return {
                ...state,
                updateBio: action.payload,
            }
        },
    }
});

export const {updateAvatarInfo, updateAvatar, updateBanner, DELETEAVATAR, DELETEBANNER, updateBio } = updateprofile.actions;
export default updateprofile.reducer;
 