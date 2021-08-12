import {
    SET_USER,
    SET_AUTHENTICATION,
    LOGOUT,
    CREATE_FILE,
    UPDATE_FILE,
    SET_UNAUTHENTICATED,
    LOADING_UI,
    SUCCESS_RES,
    FAIL_RES,
    UPDATE_WRITING_SESSION,
    GET_DOCUMENTS,
    SET_CURRENT_DOCUMENT,
    DELETE_DOCUMENT,
} from "../types";

const initialState = {
    authenticated: false,
    token: "",
    writingSession: null,
    email: null,
    documents: [],
    currentDoc: null,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_AUTHENTICATION:
            return {
                ...state,
                authenticated: true,
                token: action.payload.token,
                email: action.payload.user.email,
                documents: action.payload.user.documents,
            };

        case LOGOUT:
            return initialState;
        case UPDATE_WRITING_SESSION:
            return {
                ...state,
                writingSession: action.payload,
            };
        case UPDATE_FILE:
            return {
                ...state,
                user: action.payload.user,
                documents: action.payload.user.documents,
                currentDoc: action.payload.currentDoc,
            };
        case CREATE_FILE:
            return {
                ...state,
                documents: action.payload.documents,
                currentDoc: action.payload.currentDoc,
            };
        case SET_CURRENT_DOCUMENT:
            return {
                ...state,
                currentDoc: action.payload,
            };
        case GET_DOCUMENTS:
            return {
                ...state,
                user: action.payload.user,
                documents: action.payload.documents,
            };
        case DELETE_DOCUMENT:
            return {
                ...state,
                user: action.payload.user,
                documents: action.payload.documents,
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
