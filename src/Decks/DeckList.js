import React from 'react';
import Deck from './Deck';
import {Link} from "react-router-dom"


function DeckList({deckList, buildDeckList}) {

    return <div>
        <Link to={`/decks/new`}><button className="btn btn-primary mx-2">
        + Create A Deck
            </button></Link>
        {deckList.map((oneDeck, indx) => <Deck key={indx} data={oneDeck} buildDeckList={buildDeckList}/>)}
    </div>
}

export default DeckList;