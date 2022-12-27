import React from 'react';
import b1 from './b1.jpg';
import b2 from './b2.jpg';
import b3 from './b3.jpg';
import b4 from './b4.jpg';
import b5 from './b5.jpg';
import b6 from './b6.jpg';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.words = ["foobar", "turing", "robot", "machine", "wintermute"]
    this.guessedLetters = new Set();

    // TODO does alphabet need to be bound? I would prefer a constant
    this.alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
    this.images = {1: b1, 2: b2, 3: b3, 4: b4, 5: b5, 6: b6}

    // Initializing the state 
    this.state = { currentWord: "",
      numWrongGuesses: 0,
      guessedLetters: this.guessedLetters,
      wrongGuesses: 0,
      gameOver: false,
      gameWon: false,
      unGuessedLetters: new Set(),
      currentImage: this.images[0],
    };
  }
  componentDidMount() {
    let currentWordIndex = Math.floor(Math.random() * (this.words.length));
    let currentWord = this.words[currentWordIndex];

    // get characters in currentWord
    const unGuessedLetters = new Set();
    for (let i = 0; i < currentWord.length; i++) {
      unGuessedLetters.add(currentWord[i]);
    }
    this.setState({currentWord, unGuessedLetters});
  }
  guess(letter) {
    letter = letter.toLowerCase()
    // letter has already been guessed or is malformed
    if (this.guessedLetters.has(letter) || letter.length !== 1 ) {
      return
    }
    this.guessedLetters.add(letter)
    if (this.state.unGuessedLetters.has(letter)) {
      this.correctGuess(letter)
    } else {
      this.wrongGuess()
    }
  }

  wrongGuess() {
    console.log("WRONG  GUESS")
    console.log(this.state.currentImage)
    let currentGuesses = this.state.wrongGuesses
    this.setState({ wrongGuesses: currentGuesses + 1});
    this.setState({currentImage: this.images[this.state.numWrongGuesses + 1]})

    if (this.state.wrongGuesses >= 6) {
      this.setState({gameOver: true})
    }
  }
  correctGuess(letter) {
    console.log("correct  GUESS")

    let unGuessedLetters = this.state.unGuessedLetters
    unGuessedLetters.delete(letter)
    this.setState({unGuessedLetters})
    if (unGuessedLetters.size === 0) {
      this.setState({gameWon: true})
    }
  }
  render() {
    return (
      <div>
        <div>
          {(this.state.gameOver) &&
            <p>game over</p>
          }
        </div>
        <div>
          {(this.state.gameWon) &&
              <p>game won</p>
          }
        </div>
        <img src={this.state.currentImage} alt="Logo" />
        <p>{this.state.currentWord}</p>
        <p>wrong guesses: {this.state.wrongGuesses}</p>
        <div className="alphabet">
        {this.alphabet.map(character => (
          <div className="letter" onClick={() => this.guess(character)}>{character}</div>
        ))}
        </div>
      </div> 
    );
  }
}
export default App;