import React from 'react';
import {Link, useHistory} from "react-router-dom"
import {deleteDeck} from "../utils/api"



function Deck({data, buildDeckList}){
    const history = useHistory()

    function handleDeleteDeck(event){
        console.log(data.id)
        event.preventDefault();
        let result = window.confirm("Delete Deck?")
        if(result){
            deleteDeck(data.id)
                .then(res => {
                    buildDeckList()
                    history.push(`/`)  
                })
            }
       }

    return (
        <div className="card" >
            <div className="card-body">
                <h5 className="card-title">{data.name}</h5> 
                <span className="text-end">{data.cards.length} cards</span>
                <p className="card-text">{data.description}</p>
                <Link to={`decks/${data.id}`}><button className="btn btn-primary mx-2">
                    View
                    </button></Link>
                <Link to={`/decks/${data.id}/study`}><button className="btn btn-primary mx-2">
                    Study
                    </button></Link>
                <button onClick={handleDeleteDeck} className="btn btn-primary mx-2">
                    Delete
                </button>
            </div>
        </div>
    )          
}

export default Deck;