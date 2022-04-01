import React from 'react'

const Board = (props) => {
    let rows = [];
    for (let i = 0; i < props.gameState.totalRows; i++) {
      rows.push(
        <Row
          key={'row_' + i}
          id={'row_' + i}
          gameState={props.gameState}
          pegAction={props.pegAction}
          checkAction={props.checkAction} />
        )
      }
        return (
      <div className='board'>
        {rows}
       
      </div>
    );
   
}
export default Board

const Row = (props) => {
    let active = ''
    if (+props.id.substr(4) === props.gameState.activeRow) {
      active = 'active'
    }
  
    return (
      <div className={'row ' + active} id={props.id}>
        <Circles
          rowId={props.id}
          gameState={props.gameState}
          pegAction={props.pegAction} />
        <OkButton
          gameState={props.gameState}
          rowId={props.id}
          checkAction={props.checkAction} />
        <Hints
          gameState={props.gameState}
          rowId={props.id} />
      </div>
    )
  }
  // export default Row
  

  const Circles = (props) => {
    const rowId = props.rowId.substr(4)
    let Pegs = []
    for (let i = 0; i < 4; i++) {
      Pegs.push(
        <Peg
          gameState={props.gameState}
          pegAction={props.pegAction}
          key={'p' + rowId + '-' + i}
          pegId={'p' + rowId + '-' + i} />)
    }
    return (
        <div className='circles'> {Pegs} </div>
    )
  }
  // export default Circles
  
  const Peg = (props) => {
    const pegId = +props.pegId.substr(props.pegId.indexOf('-') + 1)
    const rowId = +props.pegId.substr(1, props.pegId.indexOf('-') - 1)
    let clase = '' //class for the selected color
    if (props.gameState.activeRow === rowId) {
      clase = props.gameState.currentRow[pegId]
    } else {
      for (let i in props.gameState.previousRows) {
        if (+i === +rowId) {
          clase = props.gameState.previousRows[rowId][pegId]
        }
      }
    }
    return (
        <span
        id={props.pegId}
        className={'peg ' + clase}
        onClick={() =>
          props.pegAction(props.gameState.activeColor, props.pegId)} >
      </span>
    )
  }

  const Hints = (props) => {
    let allHints = []
    let hintClass = ''
    const rowId = +props.rowId.substr(4)
    const hintArr = props.gameState.hints
    const prevHints = props.gameState.previousHints
  
    for (let i = 0; i < hintArr.length; i++) {
      if (rowId === props.gameState.activeRow) {
        hintClass = hintArr[i] === 2 ? 'exact' : (hintArr[i] === 1 ? 'partial' : 'cross')
      } else {
        for (let j = 0; j < prevHints.length; j++) {
          if (rowId === j) {
            hintClass = prevHints[j][i] === 2 ? 'exact' : (prevHints[j][i] === 1 ? 'partial' : 'cross')
          }
        }
      }
  
      allHints.push(
        <CheckBox
          hintClass={hintClass}
          key={'h_' + rowId + i}
          id={'h_' + rowId + i} />
      )
    }
    return (
      <div className='hints'>
        {allHints}
      </div>
    )
  }
  // export default Hints

  const CheckBox = (props) => (
    <span
      className={props.hintClass}
      id={props.id}>
    </span>
  )
  // export default CheckBox

  const OkButton = (props) => {
    const row = +props.rowId.substr(4)
    let disabled = 'disabled'
    const doNothing = () => (false)

    if (props.gameState.activeRow === row) {
      disabled = props.gameState.canCheck ? '' : 'disabled'
    }
    const checkAction = disabled === 'disabled' ? doNothing : props.checkAction
  
    return (
      <button className={'ok-button ' + disabled}
      onClick={checkAction}></button>
    )
  }
  // export default OkButton


