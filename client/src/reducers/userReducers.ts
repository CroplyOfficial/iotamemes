import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  GET_LIKED_MEMES_REQUEST,
  GET_LIKED_MEMES_SUCCESS,
  GET_LIKED_MEMES_FAIL,
} from '../constants/userContants';

export const userLoginReducer = (state = {}, action: any) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const getLikedMemesReducer = (state = {}, action: any) => {
  switch (action.type) {
    case GET_LIKED_MEMES_REQUEST:
      return { loading: true };
    case GET_LIKED_MEMES_SUCCESS:
      return { loading: false, likedMemes: action.payload };
    case GET_LIKED_MEMES_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
