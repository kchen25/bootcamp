//import logo from './logo.svg';
import React from 'react';
import CardEditor from './CardEditor';
import CardViewer from './CardViewer';
import Homepage from './Homepage';

import { Switch, Route } from 'react-router-dom';

/* app = parent component. keeps flashcard state for 
editor and viewer*/

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      cards: [
        { front: 'front1', back: 'back1' },
        { front: 'front2', back: 'back2' },
        { front: 'front3', back: 'back3' },
      ],
    };
  }

  addCard = card => {
    if (card.front.trim().length > 0 && card.back.trim().length > 0){
      const cards = this.state.cards.slice().concat(card); //copy state of cards + concatenate new card
      this.setState({ cards });
    }
  };

  deleteCard = index => {
    const cards = this.state.cards.slice(); //copy state of cards
    //can't do cards = splice since it would return the removed card.
    cards.splice(index, 1); //remove at index (mutates cards).
    this.setState({ cards });
  };

  render(){
    return (
      <Switch>
        <Route exact path="/">
          <Homepage/>
        </Route>
        <Route exact path="/editor">
          <CardEditor
            addCard={this.addCard}
            cards={this.state.cards}
            deleteCard={this.deleteCard}
          />
        </Route>
        <Route exact path="/viewer">
          <CardViewer cards={this.state.cards} />
        </Route>
      </Switch>
    );
  }
}

export default App;
