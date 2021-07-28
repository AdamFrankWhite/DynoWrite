import {
    SET_USER,
    SET_AUTHENTICATION,
    LOGOUT,
    UPDATE_WRITING_SESSION,
    SAVE_FILE,
    CREATE_FILE,
    UPDATE_FILE,
    SET_UNAUTHENTICATED,
    LOADING_UI,
    GET_USER_MESSAGES,
    GET_ALL_USERS,
    CLEAR_ERRORS,
    SET_ERRORS,
} from "../types";
import axios from "axios";
export const signupUser = (userData, history) => (dispatch) => {
    console.log(userData);
    axios
        .post("http://localhost:5000/signup", userData)
        .then((res) => {
            console.log(res.data);
            history.push("/dashboard");
            dispatch({ type: SET_AUTHENTICATION, payload: res.data });
        })
        .catch((err) => console.log(err));
    // dispatch(
    //   loginUser({ username: userData.username, password: userData.password })
    // );
};
export const loginUser = (userData, history) => (dispatch) => {
    // dispatch({ type: LOADING_UI, payload: true });
    axios
        .post("http://localhost:5000/login", userData)
        .then((res) => {
            if (res.data.token) {
                console.log(res.data);
                history.push("/my-docs");

                dispatch({ type: SET_AUTHENTICATION, payload: res.data });
            }
        })
        .catch((err) => console.log(err));
};

export const logout = () => (dispatch) => {
    dispatch({ type: LOGOUT });
};

export const updateWritingSession = (text) => (dispatch) => {
    dispatch({ type: UPDATE_WRITING_SESSION, payload: text });
};

export const saveFile = (filename, text, user) => (dispatch) => {
    console.log("saved");
    axios
        .post("http://localhost:5000/save", { user, filename, text })
        .then((res) => {
            console.log(res.data);
        });
    dispatch({ type: SAVE_FILE });
};

export const updateFilename = (filename, user, id) => (dispatch) => {
    axios
        .post("http://localhost:5000/update-filename", { filename, user, id })
        .then((res) => {
            console.log(res.data.currentDoc);
            dispatch({ type: UPDATE_FILE, payload: res.data });
        });
};

export const createDoc = (email) => (dispatch) => {
    axios.post("http://localhost:5000/create-file", { email }).then((res) => {
        console.log(res.data);
        dispatch({ type: CREATE_FILE, payload: res.data });
    });
};
