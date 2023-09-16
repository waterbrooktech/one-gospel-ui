import { instance } from './axiosInstance';

const BASE_PATH = '/auth';

export const persistPasswordConfirmation = async (data) => instance.post(`${BASE_PATH}/confirm-password`, data);
