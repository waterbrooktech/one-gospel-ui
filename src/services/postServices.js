import { instance } from './axiosInstance';

import { buildURI } from '../../utils/url-builder';

// const BASE_PATH = `${import.meta.env.VITE_API_URL}/posts`;
const BASE_PATH = '/posts';

export const createPost = async (data) => {
  return await instance.post(BASE_PATH, data);
};

export const getPosts = async (filter) => {
  return await instance.get(buildURI(BASE_PATH, filter));
};
