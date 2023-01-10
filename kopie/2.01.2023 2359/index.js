import React from "react";
import ReactDOM from 'react-dom/client';
import Bird from "./Bird";
import Block from "./Block";
import PlayButton from "./PlayButton";
import ScoreDisplay from "./ScoreDisplay";
import ScoreBoard from "./ScoreBoard";
import ShowScoreBoardsButton from "./ShowScoreBoardsButton";
import AddNewRecordToScoreBoards from "./AddNewRecordToScoreBoard";
import gameBackground from './img/background2.jpg';
import './index.css';
import BlockObject from "./BlockObject";
// class BlockObject{constructor(blockHeight, blockLeft){this.blockHeight=blockHeight;this.blockLeft=blockLeft;}}

const tableWithObjects=[], numberOfRenderedBlocks=30;

var firstRender=true, canJump=true, minimumNumber=30, spaceBetweenBlocks=150, speed=100;
const randomNumber=(minimumNumber)=>{
    return (parseInt(Math.floor(Math.random()*100+minimumNumber)));
}

class Blocks extends React.Component{
    render(){
        const styles={
            Blocks:{
                position:'absolute',
                alignItems:this.props.firstOrSecound===true?'flex-start':'flex-end',
                overflow:'hidden',
                display:'flex',
                animation:'moveblocks 999s linear forwards',
                transition:'all 999s linear forwards',
            }
        }
        const {tableWithObjectsState,firstOrSecound}=this.props;
        let heightMax,
        // firstOrSecoundStyle=firstOrSecound===true?'align-items:flex-start;':'align-items:flex-end;',
        // allstyles=firstOrSecoundStyle,
        classes=firstOrSecound===true?'Blocks firstBlocks':'Blocks secoundBlocks';
        document.querySelector('#GameArea')?heightMax=document.querySelector('#GameArea').clientHeight:console.log('')

        const mapRender=()=>{
            for(let i=0;i<numberOfRenderedBlocks;i++){
                tableWithObjectsState[i]=new BlockObject(randomNumber(minimumNumber)//, (minimumNumber*4+(i*minimumNumber*2))
                );
            }
            firstRender=false;
        }

        return(
            <div className={classes} style={styles.Blocks}>
                {
                    (tableWithObjectsState.length<numberOfRenderedBlocks)&&(firstRender===true)?
                    mapRender():
                    null
                }
                {
                    tableWithObjectsState.map((x,i)=>
                    <Block
                        blockHeight={firstOrSecound===true?(heightMax-x.blockHeight-spaceBetweenBlocks):x.blockHeight}
                        // blockLeft={x.blockLeft}
                        isRotated={firstOrSecound===true?true:false}
                    />
                    )
                }
            </div>
        );
    }
}

class GameArea extends React.Component{
    state={
        birdPosition:160,
        score:0,
        scoreBoardShow:false,
        birdRotate:'normal',
        tableWithObjectsState:tableWithObjects,
        displayImputState:false,
        displayPlayAgainButton:false,
        displayImputStateAdd:false,
        died:false,
    }
    render(){
        const styles={
            GameArea:{
                overflow:'hidden',
                position:'relative',
            },
        }
        const countScore=(aScore)=>{
            aScore++;
            this.setState({score:aScore});
        }
        const jump=(e)=>{
            canJump===true?
            this.setState({birdPosition:(this.state.birdPosition+minimumNumber*2),birdRotate:'up'}):
            console.log('');
        }
        window.onkeydown=jump;
        const timers=()=>{
            // eslint-disable-next-line
            // var alldata={
            //     GameArea:{
            //         height:document.querySelector('#GameArea').getBoundingClientRect().height,
            //     },
            //     Bird:{
            //         height:document.querySelector('#Bird').getBoundingClientRect().height,
            //         width:document.querySelector('#Bird').getBoundingClientRect().width
            //     },
            //     firstBlock:{
            //         height:document.querySelector('.firstBlocks').firstElementChild.getBoundingClientRect().height,
            //         width:document.querySelector('.firstBlocks').firstElementChild.getBoundingClientRect().left
            //     },
            //     secoundBlock:{
            //         width:document.querySelector('.secoundBlocks').firstElementChild.getBoundingClientRect().left,
            //         height:document.querySelector('.secoundBlocks').firstElementChild.getBoundingClientRect().height
            //     },
            // }


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

                // if(this.state.tableWithObjectsState[0].blockLeft<=0){
                    // console.log((Math.floor(document.querySelector('.Blocks').querySelectorAll('.Block')[0].getBoundingClientRect().left))<=0)
                if((Math.floor(document.querySelector('.Blocks').querySelectorAll('.Block')[0].getBoundingClientRect().left))<=0){
                   
                    tableWithObjects.push(
                        new BlockObject(
                            randomNumber(minimumNumber)
                            //,
                            //((minimumNumber*4)+(tableWithObjects[tableWithObjects.length-1].blockLeft-minimumNumber*2))
                            )
                        );
                   
                    tableWithObjects.shift();

                    //sprawdź, czy już działa
                    // document.querySelectorAll('.Block').map(x=>x.style='left:70px')
                    

                    // tableWithObjects.push(new BlockObject(randomNumber(minimumNumber),((minimumNumber*4)+(tableWithObjects[tableWithObjects.length-1].blockLeft-minimumNumber*2))));

                    this.setState({tableWithObjectsState:tableWithObjects});
                    countScore(this.state.score);
                }

                // this.state.tableWithObjectsState.map((x,i)=>x.blockLeft-=minimumNumber/3);
                this.setState({tableWithObjectsState:tableWithObjects});
            }

            //hit the floor
            else if(this.state.birdPosition<=minimumNumber){
                canJump=false;
                this.setState({displayImputState:true,birdPosition:0,displayPlayAgainButton:true,displayImputStateAdd:true,died:true})
                clearTimeout(timers);
            }

            //hit the ceiling
            else if(this.state.birdPosition>heightDifference){
                canJump=false;
                this.setState({displayImputState:true, birdPosition:heightDifference, displayPlayAgainButton:true, displayImputStateAdd:true,died:true})
                clearTimeout(timers);
            }

            //hit the first block
            if(((this.state.birdPosition<=heightOfFirstBlock2)&&(widthOfFirstBlock2<=widthOfBird)) ||
            ((this.state.birdPosition>=(heightOfGameArea-heightOfFirstBlock1))&&(widthOfFirstBlock1<=widthOfBird))){
                canJump=false;
                this.setState({
                    displayImputState:true,
                    birdPosition:0,
                    displayPlayAgainButton:true,
                    displayImputStateAdd:true,
                    died:true
                })
                clearTimeout(timers);
            }
            setTimeout(timers, speed);
        }
        window.onload=timers;
        const ShowScoreBoardsF=()=>{
            this.setState({scoreBoardShow:!this.state.scoreBoardShow});
        }
        const reloadGame=()=>{
            window.location.reload();
        }
        return(
            <div id="GameArea" style={styles.GameArea}>
                <ShowScoreBoardsButton
                    displayState={this.state.displayImputState}
                    ShowScoreBoardsF={ShowScoreBoardsF}
                    scoreBoardShow={this.state.scoreBoardShow}
                />
                <ScoreBoard scoreBoardShow={this.state.scoreBoardShow}/>
                <ScoreDisplay actualScore={this.state.score}/>


                {
                    this.state.died===true?
                    // console.log('died'):console.log('not died')
                        JSON.parse(localStorage.getItem('scoreBoard'))!==null&&JSON.parse(localStorage.getItem('scoreBoard'))!==undefined?
                            JSON.parse(localStorage.getItem('scoreBoard')).length<10?
                                <AddNewRecordToScoreBoards
                                    aScore={this.state.score}
                                    show={this.state.displayImputStateAdd}
                                    reloadGame={reloadGame}
                                />
                            :null
                                        
                        :<PlayButton reloadGame={reloadGame}/>
                    :null
                // ((Array.from(JSON.parse(localStorage.getItem('scoreBoard')))!== undefined &&
                // Array.from(JSON.parse(localStorage.getItem('scoreBoard')))!== null) &&
                // Array.from(JSON.parse(localStorage.getItem('scoreBoard'))).length<10)
                // ?
                // <AddNewRecordToScoreBoards
                //                 aScore={this.state.score}
                //                 show={this.state.displayImputStateAdd}
                //                 reloadGame={reloadGame}
                //             />
                            // null:
                            // null:
                            // null
                }
                {/* {
                    this.state.died===true?
                        ((Array.from(JSON.parse(localStorage.getItem('scoreBoard'))).length<10 && Array.from(JSON.parse(localStorage.getItem('scoreBoard')))!==undefined && JSON.parse(localStorage.getItem('scoreBoard'))!== null)||
                        JSON.parse(localStorage.getItem('scoreBoard')).pop().score<this.state.score)?
                            <AddNewRecordToScoreBoards
                                aScore={this.state.score}
                                show={this.state.displayImputStateAdd}
                                reloadGame={reloadGame}
                            />:
                                <PlayButton reloadGame={reloadGame}/>
                                :null
                } */}
                <Bird
                    position={this.state.birdPosition}
                    rotate={this.state.birdRotate}
                />
                <Blocks
                    tableWithObjectsState={this.state.tableWithObjectsState}
                    firstOrSecound={true}
                />
                <Blocks
                    tableWithObjectsState={this.state.tableWithObjectsState}
                    firstOrSecound={false}
                />
            </div>
        );
    }
}

class Game extends React.Component{
    render(){
        const styles={
            Game:{
                backgroundImage:'url("'+gameBackground+'")',
                backgroundSize:'cover',
            },
        }
        return(
            <div id="Game" style={styles.Game}>
                <GameArea/>
            </div>
        );
    }
}

const root=ReactDOM.createRoot(document.getElementById('root'));root.render(<Game/>);export default <Game/>;