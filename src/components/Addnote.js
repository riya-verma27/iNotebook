
import React, { useContext, useState } from 'react';
import noteContext from "../context/notes/noteContext";

const Addnote = (props) => {
    const context = useContext(noteContext);
    const { addNote } = context;

    // State for the note and validation errors
    const [note, setNote] = useState({ title: "", description: "", tag: "" });
    const [errors, setErrors] = useState({});

    const handleClick = (event) => {
        event.preventDefault();

        // Validate the inputs when submitting
        const validationErrors = validateNote();
        if (Object.keys(validationErrors).length === 0) {
            addNote(note.title, note.description, note.tag);
            setNote({ title: "", description: "", tag: "" });
            props.showAlert("Added Successfully", "success");
            setErrors({}); // Clear errors after successful submission
        } else {
            setErrors(validationErrors); // Set errors if validation fails
        }
    };

    const onChange = (event) => {
        setNote({ ...note, [event.target.name]: event.target.value });

        // Validate field in real-time as the user types
        const { name, value } = event.target;
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: validateField(name, value),
        }));
    };

    // Function to validate all fields
    const validateNote = () => {
        let validationErrors = {};
        if (note.title.length < 5) {
            validationErrors.title = "Title must be at least 5 characters long.";
        }
        if (note.description.length < 5) {
            validationErrors.description = "Description must be at least 5 characters long.";
        }
        return validationErrors;
    };

    // Function to validate individual field
    const validateField = (name, value) => {
        switch (name) {
            case 'title':
                if (value.length < 5) return "Title must be at least 5 characters long.";
                break;
            case 'description':
                if (value.length < 5) return "Description must be at least 5 characters long.";
                break;
            default:
                return "";
        }
        return "";
    };

    return (
        <div>
            <div className="container my-3">
                <h2>Add a Note</h2>
                <form className='my-3'>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input 
                            type="text" 
                            className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                            id="title" 
                            name="title" 
                            placeholder="Enter Title" 
                            value={note.title} 
                            onChange={onChange} 
                            required 
                        />
                        {errors.title && <div className="invalid-feedback">{errors.title}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <input 
                            type="text" 
                            className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                            id="description" 
                            name="description" 
                            placeholder="Enter Description" 
                            value={note.description} 
                            onChange={onChange} 
                            required 
                        />
                        {errors.description && <div className="invalid-feedback">{errors.description}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="tag">Tag</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="tag" 
                            name="tag" 
                            placeholder="Enter Tag (Optional)" 
                            value={note.tag} 
                            onChange={onChange} 
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="btn btn-primary" 
                        onClick={handleClick}
                    >
                        Add Note
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Addnote;
