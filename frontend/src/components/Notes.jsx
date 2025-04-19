import React, { useState, useEffect } from 'react';
import axios from '../api';
import '../Notes.css'; // import your styles

const Notes = ({ token }) => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');

  useEffect(() => {
    if (token) {
      axios
        .get('/notes', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => setNotes(response.data));
    }
  }, [token]);

  const handleAddNote = async () => {
    if (newNote.trim()) {
      try {
        const response = await axios.post(
          '/notes',
          { content: newNote },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setNotes([...notes, response.data]);
        setNewNote('');
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      await axios.delete(`/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(notes.filter((note) => note.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="notes-container">
      <h2 className="notes-title">Your Notes</h2>
      <div className="note-input-group">
        <input
          type="text"
          className="note-input"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Add a new note..."
        />
        <button className="note-add-button" onClick={handleAddNote}>
          Add
        </button>
      </div>
      <ul className="note-list">
        {notes.map((note) => (
          <li key={note.id} className="note-item">
            <span>{note.content}</span>
            <button className="note-delete-button" onClick={() => handleDeleteNote(note.id)}>
              ✖
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notes;
