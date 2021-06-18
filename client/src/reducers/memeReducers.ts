import {
  GET_MEMES_REQUEST,
  GET_MEMES_SUCCESS,
  GET_MEMES_FAIL,
} from '../constants/memeContants';

export const getMemesReducer = (state = {}, action: any) => {
  switch (action.type) {
    case GET_MEMES_REQUEST:
      return { loading: true };
    case GET_MEMES_SUCCESS:
      return { loading: false, memes: action.payload };
    case GET_MEMES_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
