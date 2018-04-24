import React, { Component } from "react";
import ClickedCard from "./components/ClickedCard";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import cards from "./cards.json";
import "./App.css";
import { Jumbotron, Container } from "reactstrap";

let numCorrect = 0;
let highScore = 0;
let message =
  "Click on an image to earn points, but don't click on any of them more than once!";

class App extends Component {
  // Setting this.state.friends to the friends json array
  state = {
    cards,
    numCorrect,
    highScore,
    message
  };

  pickCard = id => {
    // array of state.cards to manipulate
    const cards = this.state.cards;

    // filter through the selected cards
    const rightCard = cards.filter(card => card.id === id);

    // if the olayer selects a card thats already been picked, reset cards clicked to false, display losing message
    if (rightCard[0].clicked) {
      numCorrect = 0;
      message =
        "Sorry Chief, you already clicked that one! Don't give up! Try again?";

      for (let i = 0; i < cards.length; i++) {
        cards[i].clicked = false;
      }

      this.setState({ message });
      this.setState({ numCorrect });
      this.setState({ cards });

      // if clicked = false, and there are still cards to be clicked
    } else if (numCorrect < 15) {
      // set clicked card to true
      rightCard[0].clicked = true;

      // increase score by 1
      numCorrect++;
// display message
      message = "Good job, keep this gravy train rolling. See if you can get all 16";

      if (numCorrect > highScore) {
        highScore = numCorrect;
        this.setState({ highScore });
      }

      // Shuffle the array to be rendered in a random order
      cards.sort(function(a, b) {
        return 0.5 - Math.random();
      });

      // Set this.state.matches equal to the new matches array
      this.setState({ cards });
      this.setState({ numCorrect });
      this.setState({ message });
    } else {
      // Set its value to true
      rightCard[0].clicked = true;

      // restart the guess counter
      numCorrect = 0;

      // Egg on the user to play again
      message =
        "WOW!!! You got ALL of them!!! Now, let's see if you can do it again!";
      highScore = 16;
      this.setState({ highScore });

      for (let i = 0; i < cards.length; i++) {
        cards[i].clicked = false;
      }

      // Shuffle the array to be rendered in a random order
      cards.sort(function(a, b) {
        return 0.5 - Math.random();
      });

      // Set this.state.matches equal to the new matches array
      this.setState({ cards });
      this.setState({ numCorrect });
      this.setState({ message });
    }
  };

  // Map over this.state.cards and render a Card component for each fteam object
  render() {
    return (
      <Wrapper>
        <Title>NBA Click 'em (Golden State Edition)</Title>
        <Jumbotron fluid className="jumbotron">
          <Container fluid>
            <h3 className="scoreSummary">{this.state.message}</h3>

            <h3 className="scoreSummary">
              Correct Guesses: {this.state.numCorrect}
              <br />
              Best Score: {this.state.highScore}
            </h3>
          </Container>
        </Jumbotron>
        {"\n"}

        {this.state.cards.map(card => (
          <ClickedCard
            id={card.id}
            key={card.id}
            image={card.image}
            pickCard={this.pickCard}
          /> 
        ))}
    
      </Wrapper>
    );
  }
}

export default App;
