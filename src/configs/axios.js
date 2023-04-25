import axios from "axios";

const { REACT_APP_BASE_URL } = process.env;

const BASE_URL = REACT_APP_BASE_URL;

const instance = axios.create({
  baseURL: `${BASE_URL}`,
});

export default instance;
