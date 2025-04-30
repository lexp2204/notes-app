import React, { useState, useEffect } from 'react';
import axios from '../api';

const Notes = () => {
  const [token] = useState(localStorage.getItem('token'));
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [editedContent, setEditedContent] = useState('');

  useEffect(() => {
    axios.get('/notes', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setNotes(res.data))
    .catch(err => console.error(err));
  }, [token]);

  const handleAddNote = async () => {
    try {
      const res = await axios.post('/notes', { content: newNote }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotes(prev => [...prev, res.data]);
      setNewNote('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotes(notes.filter(note => note.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = async (id) => {
    try {
      const res = await axios.put(`/notes/${id}`, { content: editedContent }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotes(notes.map(note =>
        note.id === id ? res.data : note
      ));
      setEditingNoteId(null);
      setEditedContent('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  return (
    <div>
      <h2>Your Notes</h2>
      <button onClick={handleLogout}>Logout</button>
      <input
        value={newNote}
        onChange={(e) => setNewNote(e.target.value)}
        placeholder="Add a note"
      />
      <button onClick={handleAddNote}>Add</button>
      <ul>
        {notes.map((n) => (
          <li key={n.id}>
            {editingNoteId === n.id ? (
              <>
                <input
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                />
                <button onClick={() => handleEdit(n.id)}>✅</button>
                <button onClick={() => setEditingNoteId(null)}>❌</button>
              </>
            ) : (
              <>
                {n.content}
                <button onClick={() => {
                  setEditingNoteId(n.id);
                  setEditedContent(n.content);
                }}>✏️</button>
                <button onClick={() => handleDelete(n.id)}>🗑️</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notes;
