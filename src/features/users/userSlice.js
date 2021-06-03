import { createSlice } from "@reduxjs/toolkit";

export const fetchUserProfile = createAsyncThunk("/userProfile",async(userName)=>{
    // console.log(loginDetails);
    const response=await axios.get(
        `https://dhrutham-connect-backend.janaki23.repl.co/${userName}`
    );
    // console.log(response);
    return response.data;
})

export const fetchLoggedInUserDetails = createAsyncThunk("/loggedInUserDetails",async(token)=>{
    // console.log(loginDetails);
    const response=await axios.get(
        `https://dhrutham-connect-backend.janaki23.repl.co/user`,{
            headers:{
                authorization:token
            }
        }
    );
    // console.log(response);
    return response.data;
})
export const userSlice = createSlice(
    {
        name:"user",
        initialState={
            loggedInUser:{},
            userProfile:{},
        },
        reducers:{
            loadLoggedInUserDetails:(state,action)=>{
                state.loggedInUser=action.payload;
            },
            viewUserProfile:(state,action)=>{
                state.userProfile=action.payload;
            }
        },
        extraReducers:{

        }
    }
)

export default profileSlice.reducer;