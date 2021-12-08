import React from "react";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function DocNotes(props) {
    return (
        <div className={props.view ? "show doc-notes-cont" : "doc-notes-cont"}>
            {/* <p>My Document Notes</p> */}
            <div className="doc-notes-cont__flex-cont">
                <div className="doc-notes-cont__flex-cont__tab-icons">
                    <div className="doc-notes-cont__flex-cont__tab-icons__icon">
                        <FontAwesomeIcon icon={faBook} />
                        <span>Notes</span>
                    </div>
                    <div className="doc-notes-cont__flex-cont__tab-icons__icon">
                        <FontAwesomeIcon icon={faBook} />
                        <span>References</span>
                    </div>
                    <div className="doc-notes-cont__flex-cont__tab-icons__icon">
                        <FontAwesomeIcon icon={faBook} />
                        <span>Links</span>
                    </div>
                    <div className="doc-notes-cont__flex-cont__tab-icons__icon">
                        <FontAwesomeIcon icon={faBook} />
                        <span>Themes</span>
                    </div>
                </div>
                <div></div>
            </div>
        </div>
    );
}
