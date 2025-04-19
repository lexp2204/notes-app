const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getNotes, createNote, deleteNote } = require('../controllers/notesController');

router.get('/', auth, getNotes);
router.post('/', auth, createNote);
router.delete('/:id', auth, deleteNote);

module.exports = router;
