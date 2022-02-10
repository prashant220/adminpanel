import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// import slices
import authSlice from "./features/auth/authSlice";
import wordSlice from "./features/word/wordSlice";
import sentenceSlice from "./features/sentence/sentenceSlice";
import transliterateSlice from "./features/transliterate/transliterateSlice";

const authPersistConfig = {
  key: "auth",
  storage: storage,
};

const appReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authSlice),
  word: wordSlice,
  sentence: sentenceSlice,
  transliterate: transliterateSlice,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
