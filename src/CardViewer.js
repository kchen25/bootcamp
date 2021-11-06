import React from 'react';

import {Link} from 'react-router-dom';

class CardViewer extends React.Component {
    constructor(props){
        super(props);
        this.state = {  
            cardFront: true,
            currentIndex: 0,
        };
    }

    //change card state 
    flipCard = () => this.setState({ cardFront: !this.state.cardFront });

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
        const card = this.props.cards[this.state.currentIndex][this.state.cardFront ? 'front' : 'back'];
        return (
            <div> 
                <h2>Card Viewer</h2>
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

export default CardViewer; 