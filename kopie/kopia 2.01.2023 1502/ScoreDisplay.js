import React from "react";
class ScoreDisplay extends React.Component{
render(){
const {actualScore}=this.props;
let score='Score: '+actualScore;
return(<div id="ScoreDisplay">{score}</div>)
}}
export default ScoreDisplay;