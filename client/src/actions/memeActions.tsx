import axios from "axios";
import {
  GET_MEMES_FAIL,
  GET_MEMES_SUCCESS,
  GET_MEMES_REQUEST,
} from "../constants/memeContants";

export const getMemes = () => async (dispatch: any) => {
  try {
    dispatch({
      type: GET_MEMES_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.get("/api/memes", config);

    data.sort((a: any, b: any) => {
      return new Date(b.uploaded).valueOf() - new Date(a.uploaded).valueOf();
    });

    dispatch({
      type: GET_MEMES_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: GET_MEMES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
