import React from "react";
var scoreBoardTab=[];
class ScoreBoard extends React.Component{
render(){
const {scoreBoardShow}=this.props;
const downloadData=()=>{
let data = JSON.parse(localStorage.getItem('scoreBoard'));
if(data !== null){scoreBoardTab=[];
data.map((x,i)=>scoreBoardTab.push(x));
}}
return(<div id="ScoreBoard" className={scoreBoardShow===true?'':'hidden'}>
{downloadData()}
<table cellspacing="0" cellpadding="0">
<tr><td>ID</td><td>Nick</td><td>Date</td><td>Score</td></tr>
{scoreBoardTab.map((x, i)=><tr><td>{i+1}</td><td>{x.nick}</td> <td>{x.date}</td> <td>{x.score}</td></tr>)}
</table>
</div>)
}}
export default ScoreBoard;