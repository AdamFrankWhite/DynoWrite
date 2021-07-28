import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { setCurrentDocument } from "../redux/actions/userActions";
import moment from "moment";
function MyDocs(props) {
    return (
        <section className="my-docs">
            <h2>My Docs</h2>
            <ul>
                <li>
                    <span>File</span>
                    <span>Date Created</span>
                    <span>Last edited</span>
                </li>
                {props.user.documents.map((doc) => {
                    console.log(doc);
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
                                <span>{doc.filename}</span>
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
