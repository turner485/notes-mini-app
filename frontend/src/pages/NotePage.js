import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// const url = 'http://13.41.75.26:8000/';

const NotePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    let [note, setNote] = useState(null);
    useEffect(() => {
        getNotes();
    }, [id]);

    let getNotes = async () => {
        if (id === 'new') return
        let res = await fetch(`/api/notes/${id}/`);
        const contentType = res.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            let data = await res.json();
            setNote(data);
        }
    }

    let CSRF = document.cookie.slice(10)
    let updateNote = async () => {
        fetch(`/api/notes/${id}/`, {
            credentials: 'include',
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "X-CSRFToken": CSRF
            },
            body: JSON.stringify(note)
        });
    }

    let createNote = async () => {
        fetch(`/api/notes/`, {
            credentials: 'include',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "X-CSRFToken": CSRF
            },
            body: JSON.stringify(note)
        });
    }

    let deleteNote = async () => {
        fetch(`/api/notes/${id}/`, {
            credentials: 'include',
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "X-CSRFToken": CSRF
            },
        });
        navigate('/');
    }

    let handleSubmit = () => {
        if (id !== 'new' && note.body == '') {
            deleteNote();
        } else if (id !== 'new') {
            updateNote();
        } else if (id == 'new' && note !== null) {
            createNote();
        }
        navigate('/');
    }

    let handleChange = (value) => {
        setNote(note => ({ ...note, 'body': value }))
        console.log('Handle Change:', note)
    }

    return (
        <div className='note'>
            <div className='note-header'>
                <h3><ArrowBackIcon onClick={handleSubmit} /></h3>

                {id !== 'new' ? (
                    <button onClick={deleteNote}>Delete</button>
                ) : (
                    <button onClick={handleSubmit}>Done</button>
                )}
            </div>
            <textarea onChange={(e) => { handleChange(e.target.value) }} value={note?.body}></textarea>

        </div>
    );
};
export default NotePage;
