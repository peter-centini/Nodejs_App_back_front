import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


const Books = () => {
    const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get("http://localhost:8000/books")
        setBooks(res.data);
      } catch (err) {
        // console.log(err);
      }
    };
    fetchAllBooks();
  }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete("http://localhost:8000/books/" + id)
            window.location.reload()
        } catch (err) {
        // console.log(err);
        }
    }
    
  return (
      <div className="container">
          <div>
          <h1 className="title_book">Peter Books</h1>
          </div>
      <div className="books">
        {books.map((book) => (
          <div className="book" key={book.id}>
            {book.cover && <img src={process.env.PUBLIC_URL + book.cover} alt="" />}
            <h2>{book.title}</h2>
            <p>{book.decsp}</p>
                <span>{book.price}</span>
                <button className="delete" onClick={()=>handleDelete(book.id)}>Delete</button>
                    <button className="update"><Link to={`/update/${book.id}`}>Update</Link></button>
          </div>
        ))}
          </div>
          <button className="newbook addBook"><Link to="/add">Ajouter Nouveaux Books</Link></button>
    </div>
  );
};
export default Books;
