//import logo from './logo.svg';
import React from 'react';
import CardEditor from './CardEditor';
import CardViewer from './CardViewer';

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
      editor: true,
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

  //negate the editor state
  switchMode = () => this.setState({ editor: !this.state.editor });


  render(){
    if (this.state.editor){
      return <CardEditor 
      addCard = {this.addCard} 
      cards={this.state.cards}
      deleteCard = {this.deleteCard} 
      switchMode={this.switchMode}
    />;
    } else {
      return <CardViewer 
      cards={this.state.cards}
      switchMode={this.switchMode} 
    />;
    }
    
  }
}

export default App;
