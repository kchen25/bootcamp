import React from 'react';
import './CardViewer.css';

import {Link, withRouter} from 'react-router-dom';
import {firebaseConnect, isLoaded, isEmpty} from 'react-redux-firebase';
import {connect} from 'react-redux';
import {compose} from 'redux';

class CardViewer extends React.Component {
    constructor(props){
        super(props);
        this.state = {  
            displayFront: true,
            currentIndex: 0,
        };
    }

    //change card state 
    flipCard = () => this.setState({ displayFront: !this.state.displayFront });

    nextCard = () => {
        if (this.state.currentIndex < this.props.cards.length - 1) {
            this.setState({ currentIndex: this.state.currentIndex + 1})
        }
    };

    prevCard = () => {
        if (this.state.currentIndex > 0){
            this.setState({ currentIndex: this.state.currentIndex - 1})
        }
    };

    render(){
        if(!isLoaded(this.props.cards)) {
            return <div>Loading...</div>
        }
        if(isEmpty(this.props.cards)){
            return <div>Page not found!</div>
        }
        const card = this.props.cards[this.state.currentIndex][
            this.state.displayFront ? 'front' : 'back'
        ];
        return (
            <div> 
                <h2>{this.props.name}</h2>
                <h4> Card {this.state.currentIndex + 1} out of {this.props.cards.length} </h4>
                <div className="card" onClick={this.flipCard}> 
                    {card}
                </div>
                <hr/>
                <button 
                    onClick={this.prevCard}
                    disabled={this.state.currentIndex === 0}
                    > 
                    Prev card 
                </button>
                <button 
                    onClick={this.nextCard}
                    disabled={this.state.currentIndex === this.props.cards.length - 1}
                    > 
                    Next card 
                </button>
                <hr/>
                <Link to="/editor">Go to card editor</Link>
                <br />
                <Link to="/">Homepage</Link>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    console.log(state);
    const deck = state.firebase.data[props.match.params.deckId];     //get deck data 
    const name = deck && deck.name;             //check if deck is defined before accessing deck.name
    const cards = deck && deck.cards;
    return { cards: cards, name: name};         //passes props cards, name into cardviewer 
}

export default compose (
    withRouter,
    firebaseConnect(props => {
        const deckId = props.match.params.deckId;
        return [{path: `/flashcards/${deckId}`, storeAs: deckId}];
    }),
    connect(mapStateToProps),
)(CardViewer); 