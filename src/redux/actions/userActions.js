import {
    SET_USER,
    SET_AUTHENTICATION,
    LOGOUT,
    UPDATE_WRITING_SESSION,
    SAVE_FILE,
    CREATE_FILE,
    UPDATE_FILE,
    SET_CURRENT_DOCUMENT,
    GET_DOCUMENTS,
    DELETE_DOCUMENT,
    SET_FULLSCREEN,
    SET_SCANNED_TEXT,
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

export const saveFile = (filename, document, user) => (dispatch) => {
    console.log("saved");
    axios
        .post("http://localhost:5000/save", { user, filename, document })
        .then((res) => {
            console.log(res.data);
        });
    dispatch({ type: SAVE_FILE });
};

export const updateFilename = (filename, user, id) => (dispatch) => {
    console.log(filename, user, id);
    axios
        .post("http://localhost:5000/update-filename", { filename, user, id })
        .then((res) => {
            console.log(res.data);
            dispatch({ type: UPDATE_FILE, payload: res.data });
        });
};

export const createDoc = (email) => (dispatch) => {
    axios.post("http://localhost:5000/create-file", { email }).then((res) => {
        console.log(res.data);
        dispatch({ type: CREATE_FILE, payload: res.data });
    });
};

export const setCurrentDocument = (document) => (dispatch) => {
    // axios
    //     .get("http://localhost:5000/set-current-document", {
    //         filename,
    //         content,
    //     })
    //     .then((res) => {
    dispatch({
        type: SET_CURRENT_DOCUMENT,
        payload: document,
    });
    // });
};

export const getDocuments = (user) => (dispatch) => {
    axios.post("http://localhost:5000/get-docs", { user }).then((res) => {
        console.log(res.data);
        dispatch({ type: GET_DOCUMENTS, payload: res.data.user });
    });
};

export const deleteDocument = (email, document) => (dispatch) => {
    console.log(document);
    axios
        .put("http://localhost:5000/delete-doc", { email, document })
        .then((res) => {
            console.log(res.data);
            dispatch({ type: DELETE_DOCUMENT, payload: res.data });
        });
};

export const setFullScreen = (newView) => (dispatch) => {
    console.log(newView);
    dispatch({ type: SET_FULLSCREEN, payload: newView });
    if (newView == true) {
        var elem = document.getElementById("editor");

        /* When the openFullscreen() function is executed, open the video in fullscreen.
    Note that we must include prefixes for different browsers, as they don't support the requestFullscreen method yet */

        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) {
            /* Safari */
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) {
            /* IE11 */
            elem.msRequestFullscreen();
        }
    }
};

export const uploadFile = (file) => (dispatch) => {
    console.log(file.get("file"));

    axios
        .post("http://localhost:5000/upload", file)
        .then((res) => {
            let responseText = res.data;
            dispatch({ type: SET_SCANNED_TEXT, payload: responseText });
        })
        .catch((err) => console.log(err));
};
