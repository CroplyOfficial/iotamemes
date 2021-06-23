import axios from 'axios';
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_REQUEST,
  USER_LOGOUT,
  GET_LIKED_MEMES_FAIL,
  GET_LIKED_MEMES_REQUEST,
  GET_LIKED_MEMES_SUCCESS,
} from '../constants/userContants';

export const login = (code: any) => async (dispatch: any) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      '/api/users/authorize',
      {
        code,
      },
      config
    );

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => (dispatch: any) => {
  localStorage.removeItem('userInfo');
  dispatch({ type: USER_LOGOUT });
};

export const getLikedMemes = () => async (dispatch: any, getState: any) => {
  try {
    dispatch({
      type: GET_LIKED_MEMES_REQUEST,
    });

    const {
      userLogin: { userInfo },
    }: any = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get('/api/users/@me/liked', config);

    dispatch({
      type: GET_LIKED_MEMES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_LIKED_MEMES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
