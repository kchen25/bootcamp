import React from 'react';
import "./CardEditor.css";

import {Link} from 'react-router-dom';

class CardEditor extends React.Component {
    constructor(props){
        super(props);
        this.state = { front: '', back: ''};
    }

    addCard = () => {
        this.props.addCard(this.state); //this is the addCard function from App component
        this.setState({front: '', back: ''}) //clear the input after adding
    }

    deleteCard = index => this.props.deleteCard(index);

    /* sets values of front and back to user input
    event.target.name = front or back
    event.target.value = user input
    */
    handleChange = event => {
        this.setState({[event.target.name]: event.target.value}); 
    }

    render() {
        const cards = this.props.cards.map((card, index) => {
            return (
                <tr key={index}>
                    <td>{card.front}</td>
                    <td>{card.back}</td>
                    <td>
                        <button onClick={() => this.deleteCard(index)}>Delete card</button>   
                    </td>
                </tr>
            )
        })
        return (
            <div> 
                <h2>Card Editor</h2>
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
                <Link to="/viewer">Go to card viewer</Link>
                <br />
                <Link to="/">Homepage</Link>
            </div>
        );
    }
}

export default CardEditor