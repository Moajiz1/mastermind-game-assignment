import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import Rules from './components/Rules';
import Game from './components/Game';
ReactDOM.render(
  <React.StrictMode>
   
      <h1 className='mastermind-heading'>
              <span className="M">M</span>
              <span className="A">A</span>
              <span className="S">S</span>
              <span className="T">T</span>
              <span className="E">E</span>
              <span className="R">R</span>
              <span className="MIND"> MIND</span>
          </h1>
          <Rules/>
          <Game/>
  </React.StrictMode>,
  document.getElementById('root')
);