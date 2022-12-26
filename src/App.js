import React from 'react';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.words = ["foobar", "turing", "robot", "machine", "wintermute"]
    this.guessedLetters = new Set();
    // TODO does alphabet need to be bound? I would prefer a constant
    this.alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

    // Initializing the state 
    this.state = { currentWord: "",
      numWrongGuesses: 0,
      guessedLetters: this.guessedLetters,
      wrongGuesses: 0,
      gameOver: false,
      gameWon: false,
      unGuessedLetters: new Set(),
    };
  }
  componentDidMount() {
    let currentWordIndex = Math.floor(Math.random() * (this.words.length));
    console.log(currentWordIndex)
    let currentWord = this.words[currentWordIndex];

    // get characters in currentWord
    const unGuessedLetters = new Set();
    for (let i = 0; i < currentWord.length; i++) {
      unGuessedLetters.add(currentWord[i]);
    }
    console.log(currentWord)

    this.setState({currentWord, unGuessedLetters});
  }
  guess(letter) {
    letter = letter.toLowerCase()
    // letter has already been guesses or
    if (this.guessedLetters.has(letter) || letter.length !== 1 ) {
      return
    }
    this.guessedLetters.add(letter)
    if (this.state.wrongGuesses >= 4) {
      this.setState({gameOver: true})
    }
    // wrong guess
    if (!this.state.unGuessedLetters.has(letter)) {
      let currentGuesses = this.state.wrongGuesses
      this.setState({ wrongGuesses: currentGuesses + 1});
    } else {
      // correct guess
      console.log(this.state.unGuessedLetters)
      let unGuessedLetters = this.state.unGuessedLetters
      unGuessedLetters.delete(letter)
      this.setState({unGuessedLetters})
      if (unGuessedLetters.size === 0) {
        this.setState({gameWon: true})
      }
      console.log(this.state.unGuessedLetters)

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
        <p>{this.state.currentWord}</p>
        <div className="alphabet">
        {this.alphabet.map(character => (
          // <div className="letter">{character}</div>
          <div className="letter" onClick={() => this.guess(character)}>{character}</div>
        ))}
        </div>
      </div> 
    );
  }
}
export default App;