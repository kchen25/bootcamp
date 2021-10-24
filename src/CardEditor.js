import React from 'react';
import "./CardEditor.css";


class CardEditor extends React.Component {
    constructor(props){
        super(props);
        this.state = { front: '', back: ''};
    }

    handleFrontChange = event => {
        console.log(event.target.name)
        this.setState({ front: event.target.value }) //set value of front to user input
    }

    handleBackChange = event => {
        console.log(event.target.name)
        this.setState({ back: event.target.value }) //set value of back to user input
    }

    handleChange = event => {
        this.setState({[event.target.name]: event.target.value})
    }

    render() {
        const cards = this.props.cards.map((card, index) => {
            return (
                <tr key={index}>
                    <td>{card.front}</td>
                    <td>{card.back}</td>
                    <td>
                        <button>Delete card</button>
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
                    onChange = {this.handleFrontChange}
                    placeholder="front of card" 
                    value={this.state.front} //value of front passed back into input to be shown to user
                />
                <input 
                    name="back"
                    onChange = {this.handleBackChange}
                    placeholder="back of card" 
                    value={this.state.back} //value of back passed back into input to be shown to user
                />
                <button>Add card</button>
            </div>
        );
    }
}

export default CardEditor