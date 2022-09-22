import mysql from "mysql";
import express from "express";
import cors from "cors";

const app = express()
const db = mysql.createConnection({
    host: "192.168.0.15",
    user: "domotique",
    password: "domotique",
    database: "test"
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

