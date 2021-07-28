import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { setCurrentDocument } from "../redux/actions/userActions";
function MyDocs(props) {
    return (
        <div>
            <h2>My Docs</h2>
            <ul>
                {props.user.documents.map((doc) => {
                    console.log(doc.filename);
                    return (
                        <li>
                            <NavLink
                                to={"/editor"}
                                onClick={() => {
                                    console.log(doc);
                                    props.setCurrentDocument(
                                        doc.filename,
                                        doc.content,
                                        doc.id
                                    );
                                }}
                            >
                                {doc.filename}
                            </NavLink>
                        </li>
                    );
                })}
            </ul>
        </div>
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
