import { API } from '../../const';
import { API_CALL, errorHandler } from '../../RequestHelper';

type IGetExam = { page?: string; limit?: string; search?: string };

export const getChatDetailData = async (id) => {
   try {
      const options = {
         url: process.env.MEDEX_BASEAPI_URI + API.CHAT_DETAIL,
      };
      const response = await API_CALL(options);
      return response;
   } catch (error) {
      console.log('error on get detail chat : ', error);
      return errorHandler(error);
   }
};

export const sendChat = async (params) => {
   try {
      const options = {
         url: process.env.MEDEX_BASEAPI_URI + API.CHAT_DETAIL,
         data: params?.data,
         method: 'POST',
         headers: {
            auth: global?.tokenAuthorization,
            room: global?.roomId,
         },
      };
      const response = await API_CALL(options);
      return response;
   } catch (error) {
      console.log('error on send chat : ', error);
      return errorHandler(error);
   }
};

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
      console.log('error on get detail chat : ', error);
      return errorHandler(error);
   }
};
