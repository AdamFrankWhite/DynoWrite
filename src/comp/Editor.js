import React, { useState } from "react";
import axios from "axios";
import FileDownload from "js-file-download";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
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
} from "@fortawesome/free-solid-svg-icons";
const MenuBar = ({ editor }) => {
    if (!editor) {
        return null;
    }
    // const [htmlExport, setHtmlExport] = useState(null)
    const exportHtml = () => {
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
            <span onClick={() => exportHtml()}>
                <FontAwesomeIcon icon={faSave} />
            </span>
        </div>
    );
};

export default () => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            TextAlign.configure({
                types: ["heading", "paragraph"],
            }),
            Highlight,
        ],
        content: `
      <h3 style="text-align:center">
        Devs Just Want to Have Fun by Cyndi Lauper
      </h3>
      <p style="text-align:center">
        I come home in the morning light<br>
        My mother says, “When you gonna live your life right?”<br>
        Oh mother dear we’re not the fortunate ones<br>
        And devs, they wanna have fun<br>
        Oh devs just want to have fun</p>
      <p style="text-align:center">
        The phone rings in the middle of the night<br>
        My father yells, "What you gonna do with your life?"<br>
        Oh daddy dear, you know you’re still number one<br>
        But <s>girls</s>devs, they wanna have fun<br>
        Oh devs just want to have
      </p>
      <p style="text-align:center">
        That’s all they really want<br>
        Some fun<br>
        When the working day is done<br>
        Oh devs, they wanna have fun<br>
        Oh devs just wanna have fun<br>
        (devs, they wanna, wanna have fun, devs wanna have)
      </p>
    `,
    });

    return (
        <div>
            <MenuBar editor={editor} />
            <EditorContent editor={editor} />
        </div>
    );
};
