import React, { useState } from "react";
import { connect } from "react-redux";
import { updateFilename } from "../redux/actions/userActions";
function Filename(props) {
    const [filename, setFilename] = useState(
        props.user.currentDoc ? props.user.currentDoc.filename : "untitled"
    );
    return (
        <div>
            <input
                type="text"
                onChange={(e) => setFilename(e.target.value)}
                value={filename}
                onBlur={() =>
                    props.updateFilename(
                        filename,
                        props.user.email,
                        props.user.currentDoc.id
                    )
                }
            />
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};

const mapActionsToProps = {
    updateFilename,
};
export default connect(mapStateToProps, mapActionsToProps)(Filename);
