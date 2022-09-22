import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate,useLocation } from "react-router-dom";
import { Link } from "react-router-dom";



const Update = () => {
  const [book, setBook] = useState({
    title: "",
    decsp: "",
    cover: "",
    price: null,
  });

  const navitage = useNavigate()
  const location = useLocation()
  
  const bookId = location.pathname.split("/")[2]

  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  console.log(book);
  const handleClick =  async e => {
    e.preventDefault()
    try {
      await axios.put("http://localhost:8000/books/"+ bookId, book)
      navitage("/")
    } catch (err) {
    // console.log(err)
    }
  }

  return (
    <div className="form">
      <h1>Mettre le livre a jour</h1>
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
      <button className="formButton" onClick={handleClick}>Mise a jour du livre</button>
      <div className="btn_return">
    <button className="btn_home"><Link to="/">Retour Home</Link></button>
    </div>
    
    
    </div>

    
  );
};
export default Update;
