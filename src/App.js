import React from 'react';
import './App.css';
import {swap, minimax, getRandom, getWinner, isAllNull} from './utils/utils';

export default class App extends React.Component {
  state = {
    board: [null, null, null, null, null, null, null, null, null],
    current: 1,
    player: null,
    computer: null,
    winner: null,
  };

  setWinner = board => {
    let winner = getWinner(board);
    if (winner || winner === 0) {
      this.setState({
        winner: winner
      });
      return true;
    }
    return false;
  }

  setGameBoard = index => {
    let value = this.state.current;
    let board = this.state.board;

    if (board[index] === null && !this.setWinner(board)) {
      board[index] = value;
      this.setState({
        current: swap(this.state.current)
      });
    }
    return board;
  }

  chooseToken = choice => {
    this.setState({
      player: choice,
      computer: swap(choice)
    }, () => {
      if (choice === 2) {
        this.computerMove(this.state.computer);
      }
    });
    
  }

  computerMove = (token) => {

    const board = this.state.board.slice();
      const index = isAllNull(board)
        ? getRandom(0, 8)
        : minimax(board, token)[1]
      this.setState({
        board: this.setGameBoard(index)
      }, () => {
        this.setWinner(this.state.board);
      });
  }

  placeToken = index => {
    this.setState({
      board: this.setGameBoard(index)
    }, () => {
      this.computerMove(this.state.computer);
      
    });
  };

  render() {
    return (
      <div className="App">
        <h2>Tic-Tac-Toe</h2>
        {(this.state.winner !== null) ? <h3>{(this.state.winner === 0) ? 'Draw' : (this.state.winner === 1) ? 'X won the game' : 'O won the game' }</h3> : null}

        {(this.state.player !== null) ? <div className="gameBoard">
          {this.state.board.map((value, index) => {
            return (
              <div key={index} onClick={() => {this.placeToken(index)}} 
                className={"box " + ((index === 1 || index === 4 || index === 7) ? 'vertical ' : '') + ((index === 3 || index === 4 || index === 5) ? 'horizontal' : '')}> 
                  {(value === null) ? '' : (value === 1) ? 'X' : 'O' }
              </div>
            );
          })}
        </div> : 
        <div className="buttonContainer">
          <h3>Choose your token</h3>
          <div onClick={() => {this.chooseToken(1)}} className="button" ><span>X</span></div>
          <div onClick={() => {this.chooseToken(2)}} className="button" ><span>O</span></div>
        </div> 
        }
      </div>
    );
  }
}
