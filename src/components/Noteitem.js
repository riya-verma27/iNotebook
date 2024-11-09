import React, { useContext } from 'react';
import noteContext from "../context/notes/noteContext";

const Noteitem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note, updateNote } = props;

    return (
        <div className="card shadow-sm p-3 mb-4 rounded" style={{ width: "18rem" }}>
            <div className="card-body">
                <div className="d-flex align-items-center justify-content-between">
                    <h5 className="card-title">{note.title}</h5>
                    <div>
                        <i className="fas fa-trash-alt text-danger mx-2" onClick={() => { deleteNote(note._id); props.showAlert("Deleted Successfully", "success"); }}></i>
                        <i className="fas fa-edit text-primary mx-2" onClick={() => updateNote(note)}></i>
                    </div>
                </div>
                <p className="card-text">{note.description}</p>
            </div>
        </div>
    );
};

export default Noteitem;