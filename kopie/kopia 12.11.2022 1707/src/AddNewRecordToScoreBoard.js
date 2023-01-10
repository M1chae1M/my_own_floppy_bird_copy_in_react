import React from "react";
import './index.css';
var scoreBoardTab=[];
class BoardScores{constructor(nick, date, score){this.nick=nick;this.date=date;this.score=score;}}
const downloadData=()=>{
let data=JSON.parse(localStorage.getItem('scoreBoard'));
if(data!==null){scoreBoardTab=[];
data.map((x,i)=>scoreBoardTab.push(x));
}}
window.onload=downloadData();

class AddNewRecordToScoreBoards extends React.Component{
render(){
const {aScore, show}=this.props;
const actualDate=()=>{
let data=new Date(),
day=data.getDate(),
month=data.getMonth(),
year=data.getFullYear();
return (day+'-'+(month+1)+'-'+year);
}

const sortTable=(scoreBoardTab)=>{
var n=scoreBoardTab.length;
if(n>1){
while(n>0){
for(let i=0;i<scoreBoardTab.length-1;i++){
let a=parseInt(scoreBoardTab[i].score),
b=parseInt(scoreBoardTab[i+1].score)
if(b>a){
let zm=scoreBoardTab[i+1];
scoreBoardTab[i+1]=scoreBoardTab[i];
scoreBoardTab[i]=zm;
n=scoreBoardTab.length;
}else{n--;}
}}}
if(scoreBoardTab.length>10){scoreBoardTab.pop();}
}

const addNewRecord=(e)=>{
if(document.querySelector('#yourNickInput').value!==''){
let newAA=new BoardScores(document.querySelector('#yourNickInput').value, actualDate(), aScore);
scoreBoardTab.push(newAA);
sortTable(scoreBoardTab);
uploadData();
e.target.parentElement.remove();
this.setState({displayImputStateAdd:false, displayImputState:false, displayPlayAgainButton:true, show:false, buttonBehind:false});
}else{alert('Input your nick first!');}
}

const uploadData=()=>{
if(scoreBoardTab.length!==0){localStorage.setItem('scoreBoard', JSON.stringify(scoreBoardTab));}else{console.log('');}}

let longerThen0=scoreBoardTab.length>0?true:false,
isVisible=false;

if(longerThen0===false){if(show === true){isVisible=true;}}
else if(longerThen0===true){if(show===true && aScore>scoreBoardTab[scoreBoardTab.length-1].score){isVisible=true;}}

return(<div id="AddNewRecordToScoreBoards" className={isVisible===true&&show===true?'':'hidden'}>
<input type="text" placeholder="Your nick" id="yourNickInput"/>
<input type="button" value="Sign to scoreboard" onClick={addNewRecord}/>
</div>)
}}
export default AddNewRecordToScoreBoards;