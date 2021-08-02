import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import {
    setCurrentDocument,
    updateFilename,
} from "../redux/actions/userActions";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFileAlt,
    faFileWord,
    faFolder,
    faRecycle,
    faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { ContextMenu } from "../comp/ContextMenu";
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

    useEffect(() => {
        getMyDocuments(props.user.documents);
    }, [props.user.documents]);
    const handleRightClick = (e, filename) => {
        e.preventDefault();
        console.log(filename);
        setSelectedFile(filename);

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
            />
            <h2>My Docs</h2>
            <ul className="filelist">
                <li>
                    <span>File</span>
                    <span>Date Created</span>
                    <span>Last edited</span>
                </li>
                {myDocuments.map((doc) => {
                    return (
                        <li>
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
                                    {moment(doc.created_on).format(
                                        "DD/MM/YYYY"
                                    )}
                                </span>
                                <span>
                                    {moment(doc.modified_on)
                                        .startOf("minute")
                                        .fromNow()}
                                </span>
                                <span className="delete">
                                    <FontAwesomeIcon
                                        style={{
                                            textAlign: "center",
                                        }}
                                        onClick={(e) => e.stopPropagation()}
                                        icon={faTrash}
                                    ></FontAwesomeIcon>
                                </span>
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
};

export default connect(mapStateToProps, mapActionsToProps)(MyDocs);
