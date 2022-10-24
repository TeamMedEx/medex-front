import axios from 'axios';
import dayjs from 'dayjs';
import { MESSAGE_CONST } from '../const';
import { getSession } from 'next-auth/react';

export const API_CALL = async (
   option: any = {},
   contentType = 'application/json; charset=UTF-8',
) => {
   try {
      const session = await getSession();
      const timezone = dayjs().format('Z');
      const API_OPTION = {
         ...option,
         baseURL: process.env.MEDEX_BASEAPI_URI,
         headers: {
            'Content-Type': contentType,
            Authorization: session['accessToken'],
            timezone: timezone,
            countrycode: 'ID',
            ...(option?.headers ?? {}),
         },
      };
      // console.log('API OPTION API CALL -> ', API_OPTION);
      const res = await axios.request(API_OPTION);
      // console.log('res API CALL -> ', res);

      return responseHandler(res);
   } catch (error) {
      console.log('error on call api : ', error);
      const error_temp =
         error && error.response
            ? error.response.data
            : error
            ? error
            : { message: MESSAGE_CONST.SOMETHING_WENT_WRONG };
      return error_temp;
   }
};

//return data from response
export const responseHandler = (res) => {
   return res.data;
};

// convert error response from axios
export const errorHandler = (error) => {
   return error;
};
