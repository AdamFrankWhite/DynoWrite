import React, { useState } from "react";

export const ContextMenu = ({ showMenu, left, top }) => {
    return (
        <ul
            className="right-click-menu"
            style={{
                display: showMenu ? "block" : "none",
                left,
                top,
            }}
        >
            <li onClick={() => console.log("rename")}>rename</li>
            <li>delete</li>
            <li>info</li>
        </ul>
    );
};
