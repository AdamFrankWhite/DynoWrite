import {
    faCross,
    faFile,
    faFileArchive,
    faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import moment from "moment";
export function FileInfoWindow(props) {
    const file = props.file[0];
    return (
        <div className="file-info">
            <FontAwesomeIcon
                className="close"
                icon={faTimes}
                onClick={() => props.closeInfo(false)}
            />
            <FontAwesomeIcon icon={faFileArchive} />
            <h2>File Info</h2>
            <ul>
                <li>
                    <span className="title">Filename:</span> {file.filename}
                </li>
                <li>
                    <span className="title">ID:</span> {file.id}
                </li>
                <li>
                    <span className="title">Created on:</span>{" "}
                    {moment(file.date_created).format("DD/MM/YYYY")}
                </li>
                <li>
                    <span className="title">Last Modified:</span>{" "}
                    {moment(file.modified_on).format("DD/MM/YYYY")}
                </li>
                <li className="download">
                    <FontAwesomeIcon icon={faFile} />
                    Download
                </li>
            </ul>
        </div>
    );
}
