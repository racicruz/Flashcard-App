import React, {useEffect, useState} from "react";
import DeckList from "../Decks/DeckList";
import Study from "../Decks/Study";
import Header from "./Header";
import NotFound from "./NotFound";
import ViewDeck from "../Decks/ViewDeck";
import CreateDeck from "../Decks/CreateDeck";
import EditDeck from "../Decks/EditDeck";
import AddCard from "../Cards/AddCard";
import EditCard from "../Cards/EditCard"


import { listDecks, deleteCard, deleteDeck } from "../utils/api";
import {BrowserRouter as Router, Route, Link, Switch, useHistory, useLocation, useRouteMatch, useParams} from "react-router-dom"





function Layout() {
  let [deckList, setDeckList] = useState([])
  
  function buildDeckList(){
    listDecks()
      .then((decks) => {
          setDeckList(decks)
      })  
  }

  useEffect( buildDeckList, [])



  return (
    <>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        {/*On click, display a form, render a form component*/}
        {/*Render deck list component*/}
        <Switch>

          <Route path="/decks/:deckId/cards/:cardId/edit">
              <EditCard buildDeckList={buildDeckList}/>
          </Route>

          <Route path="/decks/:deckId/cards/new">
              <AddCard buildDeckList={buildDeckList}/>
          </Route>


          <Route path="/decks/:deckId/study">
              <Study />
          </Route>

          <Route path="/decks/new">
              <CreateDeck buildDeckList={buildDeckList}/>
          </Route>

          <Route path="/decks/:deckId/edit">
              <EditDeck buildDeckList={buildDeckList}/>
          </Route>

          <Route path="/decks/:deckId">
              <ViewDeck buildDeckList={buildDeckList}/>
          </Route>

          <Route exact={true} path="/">
            <DeckList deckList={deckList} buildDeckList={buildDeckList}/>
          </Route>
          
          <Route>
            <NotFound />            
          </Route>

        </Switch>
      </div>
    </>
  );
}

export default Layout;