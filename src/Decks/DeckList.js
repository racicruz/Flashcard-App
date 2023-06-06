import React, { useEffect, useState } from 'react';
import Deck from './Deck';
import {BrowserRouter as Router, Link } from "react-router-dom"


function DeckList({deckList, buildDeckList}) {

    return <div>
        <Link to={`/decks/new`}><button className="btn btn-primary mx-2">
        + Create A Deck
            </button></Link>
        {deckList.map((oneDeck, indx) => <Deck key={indx} data={oneDeck} buildDeckList={buildDeckList}/>)}
    </div>
}

export default DeckList;