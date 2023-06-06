import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Link,
  useHistory,
  useParams,
} from "react-router-dom";
import { createCard, readDeck } from "../utils/api";
import CardForm from "../Forms/CardForm";



function AddCard() {
  const { deckId } = useParams();
  const history = useHistory();

  const [deck, setDeck] = useState({});    
  let initialFormData ={
    front: '',
    back: '',
    }
    const [formData, setFormData] = useState(initialFormData)

  useEffect(() => {
    readDeck(deckId).then((res) => {
      setDeck(res);
    });
  }, []);

  function handleCardSubmit(event) {
    event.preventDefault()
    createCard(deckId, formData).then(() => {
      history.push(`/decks/${deckId}`);
    });
  }

  function handleInputChange(event){
    event.preventDefault();
    setFormData({
        ...formData,
        [event.target.name]: event.target.value
    });
};

  return (
    <React.Fragment>
        <div>
        <div>
            <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item">
                <Link to={`/decks/${deckId}`}>{deck && deck.name}</Link>
                </li>
                <li className="breadcrumb-item">Add Card</li>
            </ol>
            </nav>
        </div>
        <CardForm formData={formData} handleSubmit={handleCardSubmit} handleInputChange={handleInputChange} />
        </div>
    </React.Fragment>
  );
}

export default AddCard;