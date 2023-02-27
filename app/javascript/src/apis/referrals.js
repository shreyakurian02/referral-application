import axios from "axios";

const BASE_URL = "/referrals";

const fetch = () => axios.get(`${BASE_URL}`);

const create = (payload) => axios.post(`${BASE_URL}`, payload);

export const referralsApi = {
  fetch,
  create,
};
