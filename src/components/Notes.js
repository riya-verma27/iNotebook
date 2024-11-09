import React, { useContext, useEffect, useRef, useState, useCallback } from 'react';
import noteContext from "../context/notes/noteContext";
import Noteitem from './Noteitem';
import Addnote from './Addnote';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const Notes = (props) => {
    const context = useContext(noteContext);
    let navigate = useNavigate(); // Corrected line
    const { notes, getNotes, editNote } = context;

    const checkTokenExpiration = useCallback(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decoded = jwtDecode(token);
            const currentTime = Date.now() / 1000; // in seconds
            if (decoded.exp < currentTime) {
                localStorage.removeItem('token'); // remove expired token
                props.showAlert("Session expired, please log in again", "warning");
                navigate('/login');
            }
        }
    }, [navigate, props]);

    useEffect(() => {
        checkTokenExpiration();
        if (localStorage.getItem('token')) {
            getNotes();
        } else {
            navigate("/login");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    

    const [note, setModalNote] = useState({id:"", etitle: "", edescription: "", etag: "" });

    const updateNote = (note) => {
        setModalNote({id: note._id, etitle: note.title, edescription: note.description, etag: note.tag});
        ref.current.click();
    }

    const ref = useRef(null);
    const refClose = useRef(null);

    const handleClick = () => {
        editNote(note.id, note.etitle, note.edescription, note.etag);
        refClose.current.click();
        props.showAlert("Updated Successfully", "success");
    }

    const onChange = (event) => {
        setModalNote({...note, [event.target.name]: event.target.value});
    }

    return (
        <>
            <Addnote showAlert={props.showAlert} />

            {/* Trigger Button */}
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            {/* Modal */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="noteTitle">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} onChange={onChange} minLength={5} required/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="noteDescription">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} minLength={5} required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="noteTag">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} required/>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.edescription?.length < 5 || note.etitle?.length < 5} onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Notes Display */}
            <div className="container my-3">
                <h2>Your Notes</h2>
                {notes?.length === 0 && 'No Notes To Display'}
                <div className="d-flex flex-wrap">
                    {notes.map((note) => (
                        <div className="mx-2 my-2" key={note._id}>
                            <Noteitem key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert} />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Notes;