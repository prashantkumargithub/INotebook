import React, { useContext, useEffect, useRef, useState } from 'react';
import {useNavigate} from 'react-router';
import noteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';

function Notes(props) {
    const context = useContext(noteContext);
    const { notes, getNotes, editNote } = context;
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" });
    const ref = useRef(null);
    const refClose = useRef(null);
    let history = useNavigate();
    useEffect(() => {
        if(localStorage.getItem('token')){
            getNotes()
        }
        else{
            history("/login");
        }
        // eslint-disable-next-line
    }, [])

    //update note funtion
    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
    };
    const handleClick = (e) => {
        e.preventDefault();
        refClose.current.click();
        editNote({ id: note.id, title: note.etitle, description: note.edescription, tag: note.etag });
        props.showAlert("Note Updated successfully!","success");
    }

    //on changing the value fo the input
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <>
            <AddNote  showAlert={props.showAlert}/>
            {/* //Update modlas */}
            <div>
                <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Launch demo modal
                </button>

                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="etitle" className="form-label">Titel</label>
                                        <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} onChange={onChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="edescription" className="form-label">Description</label>
                                        <input type="textarea" className="form-control" id="edescription" name='edescription' value={note.edescription} onChange={onChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="etag" className="form-label">Tag</label>
                                        <input type="text" className="form-control" id="etag" name='etag' value={note.etag} onChange={onChange} />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={refClose} >Close</button>
                                <button disabled={note.etitle.length < 5 || note.edescription.length < 5} type="button" className="btn btn-primary" onClick={handleClick} >Update Note</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Showing notes  */}
            <div className="row my-3">
                <h2>Your notes</h2>
                <div className="container mx-2">
                    {notes.length === 0 && 'No notes to display'}
                </div>
                {notes.map((note) => { return <NoteItem key={note._id} note={note} updateNote={updateNote}  showAlert={props.showAlert} />; })}
            </div>
        </>
    )
}

export default Notes