import React from 'react';
import './CardEditor.css';

import {Link, withRouter} from 'react-router-dom';
import {firebaseConnect} from 'react-redux-firebase';
import {compose} from 'redux';

class CardEditor extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            cards: [
                { front: 'front1', back: 'back1' },
                { front: 'front2', back: 'back2' },
                { front: 'front3', back: 'back3' },
            ],
            front: '', 
            back: '',
            name: '',
        };
    }

    addCard = () => {
        if (!this.state.front.trim() || !this.state.back.trim()) {
            alert('Cannot add empty card');
            return;
        }
        this.props.addCard(this.state); //this is the addCard function from App component
        const newCard = { front: this.state.front, back: this.state.back};
        const cards = this.state.cards.slice().concat(newCard); //copy state of cards + concatenate new card
        this.setState({cards, front: '', back: ''}) //clear the input after adding
    }

    deleteCard = index => {
        const cards = this.state.cards.slice(); //copy state of cards
        //can't do cards = splice since it would return the removed card.
        cards.splice(index, 1); //remove at index (mutates cards).
        this.setState({ cards });
    };

    /* sets values of front and back to user input
    event.target.name = front or back
    event.target.value = user input
    */
    handleChange = event => {
        this.setState({[event.target.name]: event.target.value}); 
    }

    createDeck = () => {
        const deckId = this.props.firebase.push('/flashcards').key;
        const updates = {};     //use dict to store updates to update flashcards and homepage simultaneously
        const newDeck = {cards: this.state.cards, name: this.state.name};
        updates[`/flashcards/${deckId}`] = newDeck
        updates[`/homepage/${deckId}`] = {name: this.state.name}
        const onComplete = () => {      //callback func that gets executed upon successful update
            this.props.history.push(`/viewer/${deckId}`);   //redirect user to /viewer/deckId
        }
        this.props.firebase.update('/', updates, onComplete);
    }

    render() {
        const cards = this.state.cards.map((card, index) => {
            return (
                <tr key={index}>
                    <td>{card.front}</td>
                    <td>{card.back}</td>
                    <td>
                        <button
                            onClick={() => this.deleteCard(index)}>
                            Delete card
                        </button>   
                    </td>
                </tr>
            )
        })
        return (
            <div> 
                <h2>Card Editor</h2>
                <div>
                    Deck name: {''}
                    <input 
                    name="name"
                    onChange={this.handleChange}
                    placeholder="name of deck" 
                    value={this.state.name}></input>
                </div>
                <br/>
                <table>
                    <thead>
                        <tr>
                            <th>Front</th>
                            <th>Back</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>{cards}</tbody>
                </table>
                <br />
                <input 
                    name="front"
                    onChange = {this.handleChange}
                    placeholder="front of card" 
                    value={this.state.front} //value of front passed back into input to be shown to user
                />
                <input 
                    name="back"
                    onChange = {this.handleChange}
                    placeholder="back of card" 
                    value={this.state.back} //value of back passed back into input to be shown to user
                />
                <button onClick={this.addCard}>Add card</button>
                <hr/>
                <div> 
                    <button 
                        disabled={!this.state.name.trim() || this.state.cards.length === 0}
                        onClick={this.createDeck}
                    >
                        Create deck
                    </button>
                </div>
                <br />
                <Link to="/">Homepage</Link>
            </div>
        );
    }
}

export default compose(firebaseConnect(),withRouter)(CardEditor);