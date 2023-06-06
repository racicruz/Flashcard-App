import React, { Fragment, useState, useEffect } from "react";
import {BrowserRouter as Router, Link, useHistory, useParams} from "react-router-dom"
import {updateDeck, readDeck} from "../utils/api"

function EditDeck({ buildDeckList }){
    const history = useHistory()
    const {deckId} = useParams()
    const [deck, setDeck] = useState({})
    const [formData, setFormData] = useState({name: '', description: ''})


    useEffect(() => {
        readDeck(deckId).then((res) => {
          setDeck(res);
          setFormData({
            name: res.name,
            description: res.description,
          });
        });
      }, [deckId]);

  

    function handleInputChange(event){
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };



    function handleSubmit(event){
        event.preventDefault();
        formData.id = deck && deck.id
        updateDeck(formData)
            .then(res => {
                buildDeckList()
                history.push(`/decks/${res.id}`)  
            })
    }


    return (
        <React.Fragment>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deck && deck.name}</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Edit Deck</li>
                </ol>
            </nav>

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name</label>
                        <input 
                        type="text" 
                        name="name" 
                        id="name" 
                        value={formData.name} onChange={handleInputChange}/>
                    <label htmlFor="description"></label>
                        Description
                        <textarea 
                            type="text"
                            name="description"
                            id="description" 
                            value={formData.description} onChange={handleInputChange}></textarea>
                </div>
                <Link to={`/decks/${deckId}`}><button className="btn btn-primary mx-2">
                    Cancel
                    </button></Link>
                <button onClick={handleSubmit} className="btn btn-primary mx-2">
                    Submit
                </button>
            </form>          
        </React.Fragment>
    )
    
    

}

export default EditDeck