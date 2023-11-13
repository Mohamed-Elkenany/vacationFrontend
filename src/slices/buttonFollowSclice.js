import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
}

const buttonToggleFollowSlice = createSlice({
    name: "buttonToggleFollowSlice",
    initialState,
    reducers: {
        toggleFollowButton: (state, action) => {
            state.user = action.payload;
        }
    }
});

export const { toggleFollowButton } = buttonToggleFollowSlice.actions;
export default buttonToggleFollowSlice.reducer;