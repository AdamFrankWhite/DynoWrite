import React, { useState } from "react";
import { deleteDocument } from "../redux/actions/userActions";
import { connect } from "react-redux";
const ContextMenu = (
    // {
    //     showMenu,
    //     left,
    //     top,
    //     setFileEdit,
    //     selectedFile,
    //     showFileInfo,
    //     currentDocID,
    // },
    props
) => {
    return (
        <ul
            className="right-click-menu"
            style={{
                display: props.showMenu ? "block" : "none",
                left: props.left,
                top: props.top,
            }}
        >
            <li onClick={() => props.setFileEdit(props.selectedFile)}>
                rename
            </li>
            <li
                onClick={() =>
                    props.deleteDocument(
                        props.user.email,
                        props.user.currentDoc
                    )
                }
            >
                delete
            </li>
            <li onClick={() => props.showFileInfo(props.selectedFile)}>info</li>
        </ul>
    );
};
const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};

const mapActionsToProps = {
    deleteDocument,
};
export default connect(mapStateToProps, mapActionsToProps)(ContextMenu);
