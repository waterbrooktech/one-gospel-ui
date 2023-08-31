import { instance } from './axiosInstance';

import { buildURI } from '../../utils/url-builder';

const BASE_PATH = '/one-gospel-centers';

export const getCenters = async (filters) => await instance.get(buildURI(BASE_PATH, filters));