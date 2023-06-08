import React, {useState} from "react";
import {Link, useHistory} from "react-router-dom"
import { createDeck } from "../utils/api";


function CreateDeck({buildDeckList}){
    const history = useHistory()

    let initialFormData ={
        name: '',
        description: '',
    }
    const [formData, setFormData] = useState(initialFormData)
  

    function handleInputChange(event){
        event.preventDefault();
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };
  
    function handleSubmit(event){
        event.preventDefault();
        createDeck(formData)
            .then(res => {
                buildDeckList()
                history.push(`/decks/${res.id}`)  
            })
    }

    return (
        <React.Fragment>
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                        <li className="breadcrumb-item active">Create Deck</li>
                    </ol>
                </nav>
            </div>
            <h1>Create Deck</h1>


            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input 
                        type="text" 
                        name="name" 
                        id="name" 
                        placeholder="Deck Name" 
                        value={formData.name} onChange={handleInputChange}/>
                    <label htmlFor="description"></label>
                    Description
                    <textarea 
                        type="text"
                        name="description"
                        id="description" 
                        placeholder="Description"
                        value={formData.description} onChange={handleInputChange}></textarea>
                </div>
                <Link to={"/"}><button className="btn btn-primary mx-2">
                    Cancel
                    </button></Link>
                <button onClick={handleSubmit} className="btn btn-primary mx-2">
                    Submit
                </button>
            </form>
                
        </React.Fragment>
    )

}

export default CreateDeck