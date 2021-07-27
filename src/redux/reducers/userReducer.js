import {
    SET_USER,
    SET_AUTHENTICATION,
    LOGOUT,
    SET_UNAUTHENTICATED,
    LOADING_UI,
    SUCCESS_RES,
    FAIL_RES,
    UPDATE_WRITING_SESSION,
} from "../types";

const initialState = {
    authenticated: false,
    token: "",
    writingSession: null,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_AUTHENTICATION:
            return {
                ...state,
                authenticated: true,
                token: action.payload.token,
            };

        case LOGOUT:
            return initialState;
        case UPDATE_WRITING_SESSION:
            return {
                ...state,
                writingSession: action.payload,
            };
        case SET_USER:
            return {
                ...state,
                userData: action.payload,
            };

        case LOADING_UI:
            return { ...state, loading: action.payload };
        case SUCCESS_RES:
            return { ...state, success_res: action.payload };
        case FAIL_RES:
            return { ...state, fail_res: action.payload };
        default:
            return { ...state };
    }
}
