const pool= require('../db')
const bcrypt=require('bcrypt')
const jwt= require('jsonwebtoken');
require('dotenv').config()

//signup function
exports.signup= async (req,res)=>{
    const {username, password}=req.body;
    try{
        const hash= await bcrypt.hash(password,10)
        const result= await pool.query(
            'INSERT INTO users (username, password) VALUES ($1,$2) RETURNING id, username',
            [username,hash]
        );
        res.status(201).json(result.rows[0])
    }catch(err){
        res.status(400).json({message: 'User already exists'})
    }
}

//login function
exports.login=async (req,res)=>{
    const {username, password}=req.body;
    const result= await pool.query('SELECT * FROM users WHERE username=$1', [username]);
    const user= result.rows[0];
    if(!user)
        return res.status(401).json({message: 'Invalid credentials'})

    const valid= await bcrypt.compare(password, user.password)
    if(!valid)
        return res.status(401).json({message: 'Invalid credentials'})

    const token= jwt.sign({id: user.id, username: user.username}, process.env.JWT_SECRET, {
        expiresIn:'1h',
    })

    res.json({token})
}