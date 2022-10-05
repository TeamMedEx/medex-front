import { GET_POST_LIST } from '../../actions/generalAction';

const post = (state, action) => {
    const { type } = action;
    switch (type) {
        case GET_POST_LIST:
            return {
                ...state,
                post: {
                    result: action.payload.data,
                    loading: action.payload.loading,
                    error: action.payload.errorMessage,
                },
            };
        default:
            return { ...state };
    }
};

export default post;
