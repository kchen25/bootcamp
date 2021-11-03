import React from 'react';

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
                <button 
                    // style = {{border: '3px solid Violet'}}
                    onClick = {this.flipCard}> 
                    {card}
                </button>
                <hr/>
                <button 
                    onClick={this.nextCard}
                    disabled={this.state.currentIndex === this.props.cards.length - 1}
                    > 
                    Next card 
                </button>
                <button 
                    onClick={this.prevCard}
                    disabled={this.state.currentIndex === 0}
                    > 
                    Prev card 
                </button>
                <hr/>
                <button onClick={this.props.switchMode}>Go to card editor</button>
            </div>
        )
    }
}

export default CardViewer; 