import React from 'react'
import { Link } from 'react-router-dom'
import NoteAddIcon from '@mui/icons-material/NoteAdd';
const AddButton = () => {
    return (
        <Link to="/note/new" className='floating-button'>
            <h1><NoteAddIcon sx={{fontSize: 50}}/></h1>
        </Link>
    )
}

export default AddButton