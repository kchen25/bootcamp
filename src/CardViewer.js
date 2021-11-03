import React from 'react';

class CardViewer extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            front: "FRONT", 
            back: 'BACK' , 
            cardFront: true,
        };
    }

    //change card state 
    flipCard = () => this.setState({ cardFront: !this.state.cardFront });

    render(){
        let displayText = '';
        if (this.state.cardFront) {
            displayText = this.state.front;
        } else {
            displayText = this.state.back;
        }
        return (
            <div> 
                <h2>Card Viewer</h2>
                <button 
                    // style = {{border: '3px solid Violet'}}
                    onClick = {this.flipCard}> 
                    {displayText}
                </button>
                <hr/>
                <button onClick={this.props.switchMode}>Go to card editor</button>
            </div>
        )
    }
}

export default CardViewer; 