import React, { useContext ,useState } from 'react';
import noteContext from '../context/notes/noteContext';

function AddNote(props) {
    const context = useContext(noteContext);
    const {addNote} = context;
    const [note, setNote] = useState({title: "", description: "" , tag:""});

    const handleClick = (e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        setNote({title: "", description: "" , tag:"default"});
        props.showAlert("Note Added successfully!","success");
    }

    const onChange = (e)=>{
        setNote({...note, [e.target.name] : e.target.value});
    }
    return (
        <div>
            <div className="container my-3">
                <h2>Add you notes</h2>
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Titel</label>
                        <input type="text" className="form-control" id="title" name="title"  onChange={onChange}  value={note.title}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="textarea" className="form-control" id="description" name='description' onChange={onChange} value={note.description} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" name='tag' onChange={onChange} value={note.tag} />
                    </div>
                    <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick} >Add Note</button>
                </form>
            </div>
        </div>
    )
}

export default AddNote