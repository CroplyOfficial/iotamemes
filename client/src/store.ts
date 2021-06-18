import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { userLoginReducer } from './reducers/userReducers';
import { getMemesReducer } from './reducers/memeReducers';

const reducer = combineReducers({
  userLogin: userLoginReducer,
  getMemes: getMemesReducer,
});

export type RootState = ReturnType<typeof reducer>;

const storageUserInfo: any = localStorage.getItem('userInfo');

const userInfoFromStorage = storageUserInfo
  ? JSON.parse(storageUserInfo)
  : null;

const initialState = {
  userLogin: {
    userInfo: userInfoFromStorage,
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
