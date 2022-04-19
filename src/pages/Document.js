import React, { useState } from "react";
import Editor from "../comp/Editor";
import Filename from "../comp/Filename";
import { connect } from "react-redux";
import { uploadFile } from "../redux/actions/userActions";

function Document(props) {
    const [uploadFile, setUploadFile] = useState(null);
    const uploadAction = () => {
        let formData = new FormData();
        formData.append("file", uploadFile);
        props.uploadFile(formData);
    };
    return (
        <>
            <Filename />
            <input
                type="file"
                onChange={(e) => setUploadFile(e.target.files[0])}
            />
            <button onClick={() => uploadAction()}>Upload File</button>

            <Editor />
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};

const mapActionsToProps = {
    uploadFile,
};

export default connect(mapStateToProps, mapActionsToProps)(Document);
