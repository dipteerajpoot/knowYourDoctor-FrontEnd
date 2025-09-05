import { createSlice } from "@reduxjs/toolkit";
const slice = createSlice({
    name:"User-Slice",
    initialState:{
        // user:{},
        user : JSON.parse(sessionStorage.getItem("current-user")),

        isSignIn:false
    },
    reducers:{
        signInUser:(state,action)=>{
            console.log(action);
            let{email,password,role} = action.payload;
            state.user={email,password,role};
            state.isSignIn = true;
        },
        signOut:(state,action) =>{
            state.user = {};
            state.isSignIn = false;
        }
    }
    
});

export const {signInUser , signOut} = slice.actions;
export default slice.reducer;