import React, { useState } from "react";

export const ContextMenu = ({
    showMenu,
    left,
    top,
    setFileEdit,
    selectedFile,
    setFileInfo,
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
            <li onClick={() => setFileInfo(selectedFile)}>info</li>
        </ul>
    );
};
