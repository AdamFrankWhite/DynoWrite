import React, { useEffect, useState } from "react";
import axios from "axios";
import FileDownload from "js-file-download";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Bold from "@tiptap/extension-bold";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faParagraph,
    faSave,
    faBold,
    faItalic,
    faHighlighter,
    faStrikethrough,
    faAlignCenter,
    faAlignJustify,
    faAlignRight,
    faAlignLeft,
    faFilePdf,
} from "@fortawesome/free-solid-svg-icons";
import { generateHTML } from "@tiptap/html";
import { connect } from "react-redux";
import { updateWritingSession, saveFile } from "../redux/actions/userActions";
const MenuBar = (props) => {
    const { editor } = props;
    if (!editor) {
        return null;
    }
    // const [htmlExport, setHtmlExport] = useState(null)
    const exportPdf = () => {
        const html = editor.getHTML();
        var options = {
            method: "POST",
            url: "https://yakpdf.p.rapidapi.com/pdf",
            headers: {
                "content-type": "application/json",
                "x-rapidapi-key":
                    "43f5abb83emshfa2d4927159b8a0p10ef2djsnb2ee5458b828",
                "x-rapidapi-host": "yakpdf.p.rapidapi.com",
            },
            data: {
                pdf: { format: "A4", printBackground: true, scale: 1 },
                source: {
                    html: `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body>${html}</body></html>`,
                },
                wait: { for: "navigation", timeout: 250, waitUntil: "load" },
            },
            responseType: "blob",
        };

        axios
            .request(options)
            .then(function (response) {
                console.log(response.data);
                FileDownload(response.data, "yourFile.pdf");
            })
            .catch(function (error) {
                console.error(error);
            });
    };

    return (
        <div className="toolbar">
            <span
                onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 1 }).run()
                }
                className={
                    editor.isActive("heading", { level: 1 }) ? "is-active" : ""
                }
            >
                h1
            </span>
            <span
                onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 2 }).run()
                }
                className={
                    editor.isActive("heading", { level: 2 }) ? "is-active" : ""
                }
            >
                h2
            </span>
            <span
                onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 3 }).run()
                }
                className={
                    editor.isActive("heading", { level: 3 }) ? "is-active" : ""
                }
            >
                h3
            </span>
            <span
                onClick={() => editor.chain().focus().setParagraph().run()}
                className={editor.isActive("paragraph") ? "is-active" : ""}
            >
                <FontAwesomeIcon icon={faParagraph} />
            </span>
            <span
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={editor.isActive("bold") ? "is-active" : ""}
            >
                <FontAwesomeIcon icon={faBold} />
            </span>
            <span
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={editor.isActive("italic") ? "is-active" : ""}
            >
                <FontAwesomeIcon icon={faItalic} />
            </span>
            <span
                onClick={() => editor.chain().focus().toggleStrike().run()}
                className={editor.isActive("strike") ? "is-active" : ""}
            >
                <FontAwesomeIcon icon={faStrikethrough} />
            </span>
            <span
                onClick={() => editor.chain().focus().toggleHighlight().run()}
                className={editor.isActive("highlight") ? "is-active" : ""}
            >
                <FontAwesomeIcon icon={faHighlighter} />
            </span>
            <span
                onClick={() =>
                    editor.chain().focus().setTextAlign("left").run()
                }
                className={
                    editor.isActive({ textAlign: "left" }) ? "is-active" : ""
                }
            >
                <FontAwesomeIcon icon={faAlignLeft} />
            </span>
            <span
                onClick={() =>
                    editor.chain().focus().setTextAlign("center").run()
                }
                className={
                    editor.isActive({ textAlign: "center" }) ? "is-active" : ""
                }
            >
                <FontAwesomeIcon icon={faAlignCenter} />
            </span>
            <span
                onClick={() =>
                    editor.chain().focus().setTextAlign("right").run()
                }
                className={
                    editor.isActive({ textAlign: "right" }) ? "is-active" : ""
                }
            >
                <FontAwesomeIcon icon={faAlignRight} />
            </span>
            <span
                onClick={() =>
                    editor.chain().focus().setTextAlign("justify").run()
                }
                className={
                    editor.isActive({ textAlign: "justify" }) ? "is-active" : ""
                }
            >
                <FontAwesomeIcon icon={faAlignJustify} />
            </span>
            <span onClick={() => exportPdf()}>
                <FontAwesomeIcon icon={faFilePdf} />
            </span>
            <span
                onClick={() => {
                    props.saveFile(
                        props.user.currentDoc.filename,
                        props.writingSession,
                        props.user.email
                    );
                }}
            >
                <FontAwesomeIcon icon={faSave} />
            </span>
        </div>
    );
};

const MyEditor = (props) => {
    // setInterval(() => {
    //     console.log("autosave");
    // }, 60000);
    const [content, setContent] = useState(
        props.user.currentDoc ? props.user.currentDoc.content : ""
    );
    // useEffect(() => {
    //     setContent(props.user.currentDoc.content);
    // }, [props.user.currentDoc]);
    const editor = useEditor({
        extensions: [
            StarterKit,
            TextAlign.configure({
                types: ["heading", "paragraph"],
            }),
            Highlight,
        ],
        content: content,

        autofocus: true,
        onUpdate() {
            // const json = this.getJSON();
            const html = this.getHTML();
            console.log(html);
            // props.updateWritingSession(json);
            props.updateWritingSession(html);
        },
    });

    return (
        <div>
            <MenuBar
                saveFile={props.saveFile}
                user={props.user}
                writingSession={props.user.writingSession}
                editor={editor}
            />
            <EditorContent editor={editor} />
        </div>
    );
};
const mapStateToProps = (state) => {
    return {
        user: state.user,
        writingSession: state.writingSession,
    };
};

const mapActionsToProps = {
    updateWritingSession,
    saveFile,
};
export default connect(mapStateToProps, mapActionsToProps)(MyEditor);
