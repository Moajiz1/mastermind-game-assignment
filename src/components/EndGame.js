import React, {useState} from 'react'
// import classNames from 'classnames';

const EndGame = (props) => {
  
const endSt= (props.state.defeat && !props.state.victory) || (!props.state.defeat && props.state.victory) ? 'endgame' : ' hidden';

const endMsg= props.state.defeat && !props.state.victory ? 'endgame-relative failure' : (!props.state.defeat && props.state.victory) ? 'endgame-relative success' : ' hidden';

// let win='';
//  let checkFinal =[2, 2, 2, 2];
//  for (let i = 0; i < 4; i++) {
//   if (checkFinal[i] === props.final[i]) {
//     const win='endgame'
//   }
// }

  const reload =()=>{
    window.location.reload(false);
  }

  const infoText = !props.state.defeat ? 'Congratulations, You Won!' : 'GAME OVER!';
  return (
    <div className={endSt}>
				<div className={endMsg} >
					<h2 className="endgame-header"> {infoText} </h2>
					<button className="endgame-btn" onClick={reload} >PLAY AGAIN</button>
				</div>
				<div className="endgame-overlay"></div>
			</div>
  )
}

export default EndGame
