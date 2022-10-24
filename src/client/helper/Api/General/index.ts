import { API } from '../../const';
import { API_CALL, errorHandler } from '../../RequestHelper';

type IGetExam = { page?: string; limit?: string; search?: string };

export const getExamList = async ({
   page = '1',
   limit = '10',
   search = '',
}: IGetExam) => {
   try {
      const options = {
         url: `/api/v1/exam/all?page=${page}&limit=${limit}&search=${search}`,
      };
      const response = await API_CALL(options);
      return response;
   } catch (error) {
      console.log('error on get list exam : ', error);
      return errorHandler(error);
   }
};
export const getDetailExam = async (oid) => {
   try {
      const options = {
         url: `/api/v1/exam/${oid}/detail`,
      };
      const response = await API_CALL(options);
      return response;
   } catch (error) {
      console.log('error on get detail exam : ', error);
      return errorHandler(error);
   }
};

export const submitExam = async (oid, params) => {
   try {
      const options = {
         url: `/api/v1/exam/${oid}/submit`,
         data: params,
         method: 'POST',
      };
      const response = await API_CALL(options);
      return response;
   } catch (error) {
      console.log('error on send chat : ', error);
      return errorHandler(error);
   }
};
