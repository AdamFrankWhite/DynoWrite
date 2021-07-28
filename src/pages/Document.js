import React from "react";
import Editor from "../comp/Editor";
import Filename from "../comp/Filename";
export default function Document() {
    return (
        <div>
            <Filename />
            <Editor />
        </div>
    );
}
