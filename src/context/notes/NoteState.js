import React, { useState, useCallback } from "react";
import NoteContext from "./noteContext";
//import { json } from "react-router-dom";
const NoteState = (props) => {
  const host = "http://localhost:3001";
  const notesInitial = [
    
  ];
  //Get All Notes
  const getNotes = useCallback(async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
    });
    const json = await response.json();
    setNotes(json);
  }, [host]);
  const [notes, setNotes] = useState(notesInitial);
  const updateUser = async (name, email, password) => {
    try {
      const response = await fetch(`${host}/api/user/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token') // Use the token to authenticate the user
        },
        body: JSON.stringify({ name, email, password }) // Only include the fields you want to update
      });

      const json = await response.json();
      if (response.status === 200) {
        console.log("User updated successfully:", json);
        return json; // Return the updated user details
      } else {
        console.error("Error updating user:", json);
        return json; // Return the error response for handling on the client
      }
    } catch (error) {
      console.error("Internal Server Error:", error);
    }
  };
  //Add Note
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')
      },
      body: JSON.stringify({title, description, tag})
    });
    const note= await response.json();
    setNotes(notes.concat(note));
  }
  //Delete a Note
  const deleteNote = async(id) => {
    //TO DO: API Call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')
      },
    });
     const json = await response.json();
    const newNotes = notes.filter((item) => { return item?._id !== id });
    setNotes(newNotes);

  }
  //Edit a Note
  const editNote = async (id, title, description, tag) => {
    //API Call: TO DO
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')
      },
      body: JSON.stringify({title, description, tag})
    });
    const json= await response.json();
  //Logic to edit, for client
  let newNotes= JSON.parse(JSON.stringify(notes));
  for (let index = 0; index < newNotes.length; index++) {
    const element = newNotes[index];
    if (element._id === id) {
      newNotes[index].title = title;
      newNotes[index].description = description;
      newNotes[index].tag = tag;
      break;
    }
  }
  setNotes(newNotes);

}
return (
  <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes,updateUser}}>
    {props.children}
  </NoteContext.Provider>
);
}

export default NoteState;