import mysql from "mysql";
import express from "express";
import cors from "cors";
import * as dotenv from 'dotenv' //import dotenv pour acces db externe 
dotenv.config() //mise en place de la fonction dotenv



const app = express()


const db = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    })

// s'il y a un problème d'authentification
//alter user 'root'@'localhost' IDENTIFIED WITH mysql_native_passxord BY 'domotique'

app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.json("welcome sur backend")
})

app.get("/books", (req, res) => {
    const query= "SELECT * FROM books"
    db.query(query, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

app.post("/books", (req, res) => {
    const q = "INSERT INTO books (`title`,`decsp`,`cover`, `price`) VALUES (?)"
    const values = [
        req.body.title,
        req.body.decsp,
        req.body.cover,
        req.body.price,
    ]
    
    db.query(q, [values], (err, data) => {
        if (err) return res.json(err)
        return res.json("Book a bien etait crée 🥳 🍾")
    })
})

app.delete("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "DELETE FROM books WHERE id = ?"
    db.query(q, [bookId], (err, date) => {
    if (err) return res.json(err)
        return res.json("Book a bien etait enlever de la base de donées 🙌 🎉")
    })
})

app.put("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "UPDATE books SET `title` = ?,`decsp`= ?,`cover`= ?,`price`= ? WHERE id = ?"

    const values = [
        req.body.title,
        req.body.decsp,
        req.body.cover,
        req.body.price,
    ]

    db.query(q, [...values, bookId], (err, date) => {
    if (err) return res.json(err)
        return res.json("Le Book a bien était mise a jour dans la base de donées 👏")
    })
})

app.listen(8000, () => {
    console.log("connected to backEnd port 8000")
});

