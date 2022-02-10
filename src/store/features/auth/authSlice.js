import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    token: null,

    isLoading: false,
    isSuccessfull: false,
    isFailed: false,
    error: null,
    user: null,
   role:false

  },
  reducers: {
    loginLoadingStart: (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
 
    },
  
    
    
    loginLoadingEnd: (state, action) => {
      return {
        ...state,
        isLoading: false,
      };
    },
    login: (state, action) => {
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.response.accessToken,
        isSuccessfull: true,
        isFailed: false,
        error: null,
        user: action.payload.credentials.userName,
      };
    },
    loginFailed: (state, action) => {
      return {
        ...state,
        isAuthenticated: false,
        token: action.payload.accessToken,
        isSuccessfull: false,
        isFailed: true,
        error: action.payload,
      };
    },
    clearAuth: (state, action) => {
      return {
        isAuthenticated: false,
        token: null,

        isLoading: false,
        isSuccessfull: false,
        isFailed: false,
        error: null,
        user: null,
      };
    },
  },
});

export const {
  login,
  loginFailed,
  loginLoadingStart,
  loginLoadingEnd,
  clearAuth,
  
} = loginSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectCount = (state) => state.counter.value;

export default loginSlice.reducer;
