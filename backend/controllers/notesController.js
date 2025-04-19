const pool= require('../db')

//get notes function
exports.getNotes= async (req,res)=>{
    const result= await pool.query(
        'SELECT * FROM notes WHERE user_id=$1 ORDER BY created_at DESC',
        [req.user.id]
    )
    res.json(result.rows)
}

//create note function
exports.createNote= async (req, res)=>{
    const {content}= req.body;
    const result= await pool.query(
        'INSERT INTO notes (content, user_id) VALUES ($1,$2) RETURNING *',
        [content, req.user.id]
    )
    res.json(result.rows[0])
}

//delete note function
exports.deleteNote= async (req,res)=>{
    await pool.query('DELETE FROM notes WHERE id= $1 AND user_id=$2',
        [req.params.id, req.user.id]
    )
    res.sendStatus(204);
}

// update note function
exports.updateNote = async (req, res) => {
    const { content } = req.body;
    const { id } = req.params;
  
    try {
      const result = await pool.query(
        'UPDATE notes SET content = $1 WHERE id = $2 AND user_id = $3 RETURNING *',
        [content, id, req.user.id]
      );
  
      if (result.rowCount === 0) {
        return res.status(404).json({ message: 'Note not found or unauthorized' });
      }
  
      res.json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  };
  