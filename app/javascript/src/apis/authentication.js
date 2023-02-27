import axios from "axios";

const BASE_URL = "/users";

const login = (payload) => axios.post(`${BASE_URL}/sign_in`, payload);

const signUp = (payload) => axios.post(BASE_URL, payload);

const signOut = () => axios.delete(`${BASE_URL}/sign_out`);

export const authentication = {
  login,
  signUp,
  signOut,
};
