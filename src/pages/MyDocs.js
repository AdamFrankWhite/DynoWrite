import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { setCurrentDocument } from "../redux/actions/userActions";
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
function MyDocs(props) {
    const [xPos, setXPos] = useState("0px");
    const [yPos, setYPos] = useState("0px");
    const [showMenu, toggleMenu] = useState(false);
    const [fileToEdit, setFileEdit] = useState("");
    const [clickedMenuItem, setClickedMenuItem] = useState("");
    const handleRightClick = (e, filename) => {
        e.preventDefault();
        console.log(filename);
        setFileEdit(filename);

        const calcX = e.clientX;
        const calcY = e.clientY;
        setXPos(`${calcX}px`);
        setYPos(`${calcY}px`);
        toggleMenu(!showMenu);
    };
    useEffect(() => {
        showMenu && toggleMenu(false);
    }, []);
    const leftClick = (e) => {
        if (clickedMenuItem)
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
            <ContextMenu
                setMenuItem={setClickedMenuItem}
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
                {props.user.documents.map((doc) => {
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
};

export default connect(mapStateToProps, mapActionsToProps)(MyDocs);
