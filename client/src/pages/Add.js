import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate,Link } from "react-router-dom";


const Add = () => {
  const [book, setBook] = useState({
    title: "",
    decsp: "",
    cover: "",
    price: null,
  });

  const navitage = useNavigate()
  
  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  // console.log(book);
  const handleClick =  async e => {
    e.preventDefault()
    try {
      await axios.post("http://localhost:8000/books", book)
      navitage("/")
    } catch (err) {
    // console.log(err)
    }
  }

  return (
    <div className="form">
      <h1>Ajouter New Livre</h1>
      <input
        type="text"
        placeholder="title"
        onChange={handleChange}
        name="title"
      />
      <input
        type="text"
        placeholder="decsp"
        onChange={handleChange}
        name="decsp"
      />
      <input
        type="text"
        placeholder="cover"
        onChange={handleChange}
        name="cover"
      />
      <input
        type="text"
        placeholder="price"
        onChange={handleChange}
        name="price"
      />
      <button className="newbook" onClick={handleClick}>Ajouter New Book</button>
    <div>
    <button className="btn_home"><Link to="/">Retour Home</Link></button>
    </div>
    </div>
    
  );
};
export default Add;
