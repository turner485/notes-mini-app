import React, { useState, useEffect } from "react";
import ListItem from "../components/ListItem";
import AddButton from "../components/AddButton";

const NotesListPage = () => {
    let [notes, setNotes] = useState([]);

    useEffect(() => {
        getNotes();
    }, [])

    let getNotes = async () => {

        let res = await fetch("/api/notes/");
        let data = await res.json();
        console.log(data);
        setNotes(data);
    }

    return (
        <div className="notes">
            <div className="notes-header">
                <h1 className="notes-title">&#9782; Notes</h1>
                <p className="notes-count">{notes.length}</p>
            </div>
            <div className="notes-list">
                {notes.map((note, index) => (
                    <ListItem key={index} note={note} />
                ))}
            </div>
            <AddButton/>
        </div>
    );
};

export default NotesListPage;
