import React, { useState, useEffect } from "react";
import { readDeck } from "../utils/api";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  useHistory,
  useLocation,
  useRouteMatch,
  useParams,
} from "react-router-dom";

function Study() {
  const { deckId } = useParams();
  const history = useHistory();

  let [deck, setDeck] = useState({
    id: "",
    name: "",
    description: "",
    cards: [],
  });
  let [side, setSide] = useState(true);
  let [cardIndex, setCardIndex] = useState(0);
  const [show, setShow] = useState(true);

  //const { path, url, params: {deckId} } = useRouteMatch();

  function flipHandler() {
    if (side) {
      setSide(false);
      setShow(!show);
    } else {
      setSide(true);
      setShow(!show);
    }
  }

  function nextHandler() {
    setCardIndex(cardIndex + 1);
    setShow(!show);
    setSide(true)
    if (cardIndex >= deck.cards.length - 1) {
      if (
        window.confirm(
          "Restart cards?\nClick 'cancel' to return to the home page"
        )
      ) {
        //window.location.replace(`/decks/${deckId}/study`)
        history.go(0);
      } else {
        //window.location.replace(`/`)
        history.push("/");
      }
    }
  }

    function addBtnHandler(){
        alert('hello')
    }

  useEffect(() => {
    readDeck(deckId).then((deck) => {
      setDeck(deck);
    });
    }, []);

  if (deck.cards?.length < 3) {
    return (
      <div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to={`/decks/${deckId}`}>{deck.name}</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Study
            </li>
          </ol>
        </nav>
        <h1>{deck.name}: Study</h1>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Not enough cards.</h5>
            <p className="card-text">
              You need at least 3 cards to study. There are {deck.cards.length}{" "}
              cards in this deck.
            </p>

            <Link to={`/decks/${deckId}/cards/new`}><button className="btn btn-primary mx-2">
              + Add Cards
              </button></Link>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to={`/decks/${deckId}`}>{deck.name}</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Study
            </li>
          </ol>
        </nav>
        <h1>{deck.name}: Study</h1>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">
              Card {cardIndex + 1} of {deck.cards?.length}
            </h5>
            <p className="card-text">
              {side
                ? deck.cards[cardIndex]?.front
                : deck.cards[cardIndex]?.back}
            </p>
            {show && <button onClick={flipHandler} className="btn btn-primary mx-2">
              Flip
            </button>}
            {!show && <button onClick={nextHandler} className="btn btn-primary mx-2">
              Next
            </button>}
          </div>
        </div>
      </div>
    );
  }
}

export default Study;