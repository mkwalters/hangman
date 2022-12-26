import React from 'react';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.words = ["foobar", "turing", "robot", "machine", "wintermute"]
    this.guessedLetters = new Set();
    // TODO does alphabet need to be bound? I would prefer a constant
    this.alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

    // Initializing the state 
    this.state = { currentWord: "", numWrongGuesses: 0, guessedLetters: this.guessedLetters,  wrongGuesses: 0};
  }

  // Guess(letter) {
  //   if (letter.length !== 1 || this.guessedLetters.has(letter)) {
  //     return
  //   }
  //   this.guessedLetters.add(letter)
  //
  //   if (!this.state.currentWord.includes(letter)) {
  //     this.setState({ wrongGuesses: this.state.wrongGuesses++});
  //   }
  //   console.log(this.state.wrongGuesses)
  // }

  componentDidMount() {
  
    let currentWordIndex = Math.floor(Math.random() * (this.words.length));
    console.log(currentWordIndex)
    let currentWord = this.words[currentWordIndex];
    this.setState({ currentWord: currentWord});
  }
  render() {
    return (
      <div>
        <p>{this.state.currentWord}</p>
        <div className="alphabet">
        {this.alphabet.map(character => (
          <div className="letter">{character}</div>
          // <div className="letter" onClick={Guess(character)}>{character}</div>
        ))}
        </div>
      </div> 
    );
  }
}
export default App;