const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getNotes, createNote, deleteNote, updateNote } = require('../controllers/notesController');

router.get('/', auth, getNotes);
router.post('/', auth, createNote);
router.delete('/:id', auth, deleteNote);
router.put('/:id', auth, updateNote);


module.exports = router;
