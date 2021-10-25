//import logo from './logo.svg';
import React from 'react';
import CardEditor from './CardEditor';

/* app = parent component. keeps flashcard state for 
editor and viewer*/

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      cards: [
        { front: 'front1', back: 'back1' },
        { front: 'front2', back: 'back2' },
      ],
    };
  }

  addCard = card => {
    const cards = this.state.cards.slice().concat(card); //copy state of cards + concatenate new card
    this.setState({ cards });
  };

  deleteCard = index => {
    const cards = this.state.cards.slice(); //copy state of cards
    //can't do cards = splice since it would return the removed card.
    cards.splice(index, 1); //remove at index (mutates cards).
    this.setState({ cards });
  };

  render(){
    return <CardEditor addCard = {this.addCard} cards={this.state.cards} />;
  }
}

export default App;
