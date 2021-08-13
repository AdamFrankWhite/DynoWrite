import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import {
    setCurrentDocument,
    updateFilename,
    deleteDocument,
} from "../redux/actions/userActions";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCheck,
    faCheckSquare,
    faFileAlt,
    faFileWord,
    faFolder,
    faRecycle,
    faSquare,
    faTrash,
} from "@fortawesome/free-solid-svg-icons";
import ContextMenu from "../comp/ContextMenu";
import { FileInfoWindow } from "../comp/FileInfoWindow";
function MyDocs(props) {
    const [xPos, setXPos] = useState("0px");
    const [yPos, setYPos] = useState("0px");
    const [showMenu, toggleMenu] = useState(false);
    const [fileToEdit, setFileEdit] = useState("");
    const [fileInfo, showFileInfo] = useState("");
    const [newFilename, setUpdateFilename] = useState("");
    const [selectedFile, setSelectedFile] = useState("");
    const [myDocuments, getMyDocuments] = useState(props.user.documents);
    const [checked, setChecked] = useState([]);
    useEffect(() => {
        getMyDocuments(props.user.documents);
    }, [props.user.documents]);
    const handleRightClick = (e, filename) => {
        e.preventDefault();
        console.log(filename);
        setSelectedFile(filename);
        let currentDoc = props.user.documents.filter(
            (doc) => doc.filename == filename
        )[0];
        props.setCurrentDocument(currentDoc);
        const calcX = e.clientX;
        const calcY = e.clientY;
        setXPos(`${calcX}px`);
        setYPos(`${calcY}px`);
        toggleMenu(!showMenu);
    };
    useEffect(() => {
        showMenu && toggleMenu(false);
    }, []);
    useEffect(() => {
        setUpdateFilename(selectedFile);
    }, [selectedFile]);
    useEffect(() => {
        console.log(checked);
    }, [checked]);
    const leftClick = (e) => {
        // if (selectedFile)
        if (showMenu) {
            e.nativeEvent.stopImmediatePropagation();
            toggleMenu(false);
        }

        if (!showMenu && fileToEdit !== "") {
            setFileEdit("");
        }
    };
    const handleRemoveItem = (doc) => {
        setChecked(checked.filter((x) => x != doc));
    };

    return (
        <section
            className="my-docs"
            onContextMenu={(e) => e.preventDefault()}
            onClick={(e) => leftClick(e)}
        >
            {fileInfo && (
                <FileInfoWindow
                    file={props.user.documents.filter(
                        (doc) => doc.filename == fileInfo
                    )}
                    closeInfo={showFileInfo}
                />
            )}
            <ContextMenu
                setFileEdit={setFileEdit}
                selectedFile={selectedFile}
                showFileInfo={showFileInfo}
                left={xPos}
                top={yPos}
                showMenu={showMenu}
                currentDoc={props.currentDoc}
            />
            <NavLink to="/trash">Recycle Bin</NavLink>
            <h2>My Docs</h2>
            <ul className="filelist">
                <li>
                    <span>File</span>
                    <span>Date Created</span>
                    <span>Last edited</span>
                </li>
                {myDocuments.map((doc) => {
                    console.log(doc.id);
                    return (
                        <li>
                            {checked.includes(doc.id) ? (
                                <FontAwesomeIcon
                                    onClick={() => handleRemoveItem(doc.id)}
                                    icon={faCheckSquare}
                                />
                            ) : (
                                <FontAwesomeIcon
                                    onClick={() =>
                                        setChecked([...checked, doc.id])
                                    }
                                    icon={faSquare}
                                />
                            )}
                            <NavLink
                                className={
                                    fileToEdit != "" ? "disabled-link" : ""
                                }
                                onContextMenu={(e) =>
                                    handleRightClick(e, doc.filename)
                                }
                                to={fileToEdit == "" ? "/editor" : ""}
                                onClick={() => {
                                    console.log(doc);
                                    props.setCurrentDocument(
                                        doc.filename,
                                        doc.content,
                                        doc.id
                                    );
                                }}
                            >
                                <span className="filename">
                                    <FontAwesomeIcon icon={faFileAlt} />
                                    {fileToEdit == doc.filename ? (
                                        <input
                                            type="text"
                                            className="clickable"
                                            onClick={(e) =>
                                                fileToEdit == doc.filename &&
                                                e.preventDefault()
                                            }
                                            onChange={(e) =>
                                                setUpdateFilename(
                                                    e.target.value
                                                )
                                            }
                                            value={newFilename}
                                            autoFocus={true}
                                            onBlur={() => {
                                                if (
                                                    newFilename !== fileToEdit
                                                ) {
                                                    props.updateFilename(
                                                        newFilename,
                                                        props.user.email,
                                                        props.user.currentDoc.id
                                                    );
                                                }
                                            }}
                                        />
                                    ) : (
                                        doc.filename
                                    )}
                                </span>
                                <span>
                                    {moment(doc.date_created).format(
                                        "DD/MM/YYYY"
                                    )}
                                </span>
                                <span>
                                    {moment(doc.modified_on)
                                        .startOf("minute")
                                        .fromNow()}
                                </span>
                                {/* <span className="delete">
                                    <FontAwesomeIcon
                                        style={{
                                            textAlign: "center",
                                        }}
                                        onClick={(e) => {
                                            e.nativeEvent.stopImmediatePropagation();
                                            console.log(
                                                "delete",
                                                props.user.email,
                                                doc.id
                                            );
                                            props.deleteDocument(
                                                props.user.email,
                                                doc.id
                                            );
                                        }}
                                        icon={faTrash}
                                    ></FontAwesomeIcon>
                                </span> */}
                            </NavLink>
                        </li>
                    );
                })}
            </ul>
        </section>
    );
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};

const mapActionsToProps = {
    setCurrentDocument,
    updateFilename,
    deleteDocument,
};

export default connect(mapStateToProps, mapActionsToProps)(MyDocs);
