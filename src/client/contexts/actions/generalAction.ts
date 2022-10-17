import axios from 'axios';

export const GET_POST_LIST = 'GET_POST_LIST';

export const getPostList = (dispatch) => {
   dispatch({
      type: GET_POST_LIST,
      payload: {
         loading: true,
         data: false,
         errorMessage: false,
      },
   });

   axios({
      method: 'GET',
      url: 'https://jsonplaceholder.typicode.com/posts',
      timeout: 120000,
   })
      .then((response) => {
         dispatch({
            type: GET_POST_LIST,
            payload: {
               loading: false,
               data: response.data,
               errorMessage: false,
            },
         });
      })
      .catch((error) => {
         dispatch({
            type: GET_POST_LIST,
            payload: {
               loading: false,
               data: false,
               errorMessage: error.message,
            },
         });
      });
};
