import React, { useState } from "react";

export const ContextMenu = ({
    showMenu,
    left,
    top,
    setFileEdit,
    selectedFile,
    showFileInfo,
}) => {
    return (
        <ul
            className="right-click-menu"
            style={{
                display: showMenu ? "block" : "none",
                left,
                top,
            }}
        >
            <li onClick={() => setFileEdit(selectedFile)}>rename</li>
            <li>delete</li>
            <li onClick={() => showFileInfo(selectedFile)}>info</li>
        </ul>
    );
};
