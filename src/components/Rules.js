import React, {useState} from 'react'

const Rules = () => {

const [ruleState,setRuleState]=useState("Show Text");

const [rule, setRule] = useState({
    display: 'none', 
  });

const toogleRules= ()=> {
    if (rule.display === 'none'){
        setRule({
          display: 'block'
        })
        setRuleState("Hide Text")
      }
      else {
        setRule({
          display: 'none'
        })
        setRuleState("Show Text")
      }
    }
  return (

    <div className='rules'>
    <h3 onClick={toogleRules}> {ruleState} </h3>
    <p style={rule}> Try to guess the pattern, in both order and
    color, within ten turns. After submitting a row,
    a small Black circle is show for each circle
    in a correct position and color. A white circle
    indicates the existence of a correct color in an
    incorrect position & cross is show for wrong color.<br/> <b>NOTE: At the start of game, Cross will show as default, it will change upon condition after you submit guess colors! </b>
    More info on <a href="https://en.wikipedia.org/wiki/Mastermind_(board_game)" target="_blank">Wikipedia.</a>.
    </p>
  </div>
  )
}

export default Rules
