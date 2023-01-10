import React from "react";
import ReactDOM from 'react-dom/client';
import Bird from "./Bird";
import Block from "./Block";
import PlayButton from "./PlayButton";
import ScoreDisplay from "./ScoreDisplay";
import ScoreBoard from "./ScoreBoard";
import ShowScoreBoardsButton from "./ShowScoreBoardsButton";
import AddNewRecordToScoreBoards from "./AddNewRecordToScoreBoard";
// import gameBackground from './img/background.jpg';
import gameBackground from './img/background2.jpg';

import './index.css';

class BlockObject{constructor(blockHeight, blockLeft){this.blockHeight=blockHeight;this.blockLeft=blockLeft;}}

const tableWithObjects=[];
var firstRender=true, canJump=true, minimumNumber=30, spaceBetweenBlocks=150;
const randomNumber=(minimumNumber)=>{return (parseInt(Math.floor(Math.random()*100+minimumNumber)));}
const numberOfRenderedBlocks=30;
class Blocks extends React.Component{
render(){
const {tableWithObjectsState,firstOrSecound}=this.props;
let heightMax,
firstOrSecoundStyle=firstOrSecound===true?'align-items:flex-start;':'align-items:flex-end;',
allstyles=firstOrSecoundStyle,
classes=firstOrSecound===true?'Blocks firstBlocks':'Blocks secoundBlocks';
document.querySelector('#GameArea')?heightMax=document.querySelector('#GameArea').clientHeight:console.log('')

const mapRender=()=>{
for(let i=0;i<numberOfRenderedBlocks;i++){tableWithObjectsState[i]=new BlockObject(randomNumber(minimumNumber), (minimumNumber*4+(i*minimumNumber*2)));}
firstRender=false;
}

return(<div className={classes} Style={allstyles}>
{(tableWithObjectsState.length<numberOfRenderedBlocks)&&(firstRender===true)?mapRender():null}
{
tableWithObjectsState.map((x,i)=><Block blockHeight={
firstOrSecound===true?(heightMax-x.blockHeight-spaceBetweenBlocks):x.blockHeight
}
blockLeft={x.blockLeft} isRotated={
firstOrSecound===true?true:false
}/>)
}
</div>);
}}

class GameArea extends React.Component{
state={
birdPosition:160,
score:0,
scoreBoardShow:false,
birdRotate:'normal',
tableWithObjectsState:tableWithObjects,
displayImputState:false,
displayPlayAgainButton:false,
buttonBehind:true,
displayImputStateAdd:false,
}

render(){

const countScore=(aScore)=>{aScore++;this.setState({score:aScore});}

const jump=(e)=>{canJump===true?this.setState({birdPosition:(this.state.birdPosition+minimumNumber*2),birdRotate:'up'}):console.log('');}

window.onkeydown=jump;

const timers=()=>{
var heightOfGameArea=document.querySelector('#GameArea').getBoundingClientRect().height,
heightOfBird=document.querySelector('#Bird').getBoundingClientRect().height,
heightDifference=heightOfGameArea-heightOfBird,
widthOfBird=document.querySelector('#Bird').getBoundingClientRect().width,
widthOfFirstBlock1=document.querySelector('.firstBlocks').firstElementChild.getBoundingClientRect().left,
heightOfFirstBlock1=document.querySelector('.firstBlocks').firstElementChild.getBoundingClientRect().height,
widthOfFirstBlock2=document.querySelector('.secoundBlocks').firstElementChild.getBoundingClientRect().left,
heightOfFirstBlock2=document.querySelector('.secoundBlocks').firstElementChild.getBoundingClientRect().height;

if(this.state.birdPosition>minimumNumber&&this.state.birdPosition<heightDifference){
this.setState({birdPosition:this.state.birdPosition-minimumNumber/3,birdRotate:'down'});

if(this.state.tableWithObjectsState[0].blockLeft<=0){
tableWithObjects.shift();
tableWithObjects.push(new BlockObject(randomNumber(minimumNumber),((minimumNumber*4)+(tableWithObjects[tableWithObjects.length-1].blockLeft-minimumNumber*2))));
this.setState({tableWithObjectsState:tableWithObjects});
countScore(this.state.score);
}

this.state.tableWithObjectsState.map((x,i)=>x.blockLeft-=minimumNumber/3);
this.setState({tableWithObjectsState:tableWithObjects});
}

//hit the floor
else if(this.state.birdPosition<=minimumNumber){
canJump=false;
this.setState({displayImputState:true,birdPosition:0,displayPlayAgainButton:true,displayImputStateAdd:true});
clearTimeout(timers);
}

//hit the ceiling
else if(this.state.birdPosition>heightDifference){
canJump=false;
this.setState({displayImputState:true, birdPosition:heightDifference, displayPlayAgainButton:true, displayImputStateAdd:true});
clearTimeout(timers);
}

//hit the first block
if(((this.state.birdPosition<=heightOfFirstBlock2)&&(widthOfFirstBlock2<=widthOfBird)) ||
((this.state.birdPosition>=(heightOfGameArea-heightOfFirstBlock1))&&(widthOfFirstBlock1<=widthOfBird))){
canJump=false;
this.setState({displayImputState:true,birdPosition:0,displayPlayAgainButton:true,displayImputStateAdd:true});
clearTimeout(timers);
}

setTimeout(timers, 100);
}
window.onload=timers;

const ShowScoreBoardsF=()=>{this.setState({scoreBoardShow:!this.state.scoreBoardShow});}

return(<div id="GameArea">

<PlayButton
displayState={this.state.displayPlayAgainButton}
show={this.state.displayImputState}
buttonBehind={this.state.buttonBehind}
displayImputStateAdd={this.state.displayImputStateAdd}/>

<ShowScoreBoardsButton
displayState={this.state.displayImputState}
ShowScoreBoardsF={ShowScoreBoardsF}
scoreBoardShow={this.state.scoreBoardShow}/>

<ScoreBoard
scoreBoardShow={this.state.scoreBoardShow}/>

<ScoreDisplay
actualScore={this.state.score}/>

<AddNewRecordToScoreBoards
aScore={this.state.score}
show={this.state.displayImputStateAdd}
displayState={this.state.displayPlayAgainButton}
buttonBehind={this.state.buttonBehind}/>

<Bird
position={this.state.birdPosition}
rotate={this.state.birdRotate}/>

<Blocks
tableWithObjectsState={this.state.tableWithObjectsState}
timers={timers}
firstOrSecound={true}/>
<Blocks
tableWithObjectsState={this.state.tableWithObjectsState}
timers={timers}
firstOrSecound={false}/>

</div>);
}}

class Game extends React.Component{
render(){
let source=gameBackground;
let allstyles='background-image:url("'+source+'");';
return(<div id="Game" Style={allstyles}>
<GameArea/>
</div>);
}}

const root = ReactDOM.createRoot(document.getElementById('root'));root.render(<Game />);export default <Game/>;