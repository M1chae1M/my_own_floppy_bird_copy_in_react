import React from "react";
import ReactDOM from 'react-dom/client';
import Bird from "./components/Bird";
import Block from "./components/Block";
import PlayButton from "./components/PlayButton";
import ScoreDisplay from "./components/ScoreDisplay";
import ScoreBoard from "./components/ScoreBoard";
import ShowScoreBoardsButton from "./components/ShowScoreBoardsButton";
import AddNewRecordToScoreBoards from "./components/AddNewRecordToScoreBoard";
import gameBackground from './img/background2.jpg';
import BlockObject from "./components/objects/BlockObject";
import './index.css';

const tableWithObjects=[], numberOfRenderedBlocks=30;

var firstRender=true,
blocksJumpsMargins=70,
minimumNumber=30, spaceBetweenBlocks=150, speed=100;
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
                transform:'translateX('+this.props.blocksTransformTranslateX+'px)',
                animation:this.props.newGameState===1?'moveblocks 999s linear forwards':null,
                transition:this.props.newGameState===1?'all 999s linear forwards':null,
            }
        }
        const {tableWithObjectsState,firstOrSecound}=this.props;
        let heightMax,
        classes=firstOrSecound===true?'Blocks firstBlocks':'Blocks secoundBlocks';
        document.querySelector('#GameArea')?heightMax=document.querySelector('#GameArea').clientHeight:console.log('')

        const mapRender=()=>{
            for(let i=0;i<numberOfRenderedBlocks;i++){
                tableWithObjectsState[i]=new BlockObject(randomNumber(minimumNumber));
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
                        isRotated={firstOrSecound===true?true:false}
                        blocksJumpsMargins={blocksJumpsMargins}
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
        newGameState:0,//0-not started,1-started,2-died,3-died, but you can add your nick to scoreboard table
        birdRotate:'normal',
        blocksTransformTranslateX:0,
        tableWithObjectsState:tableWithObjects,
        scoreBoardShow:false,
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

        var checkIsScoreBoardIsEmpty=JSON.parse(localStorage.getItem('scoreBoard'))!==null&&JSON.parse(localStorage.getItem('scoreBoard'))!==undefined,
        checkIsScoreBoardIsShorterThen10=
            checkIsScoreBoardIsEmpty===true?
                JSON.parse(localStorage.getItem('scoreBoard')).length<10:null;

        const checkIfYouCanAddNewRecord=()=>{
            checkIsScoreBoardIsEmpty?
                checkIsScoreBoardIsShorterThen10?
                this.setState({newGameState:3})
                    :JSON.parse(localStorage.getItem('scoreBoard')).pop().score<this.state.score?
                    this.setState({newGameState:3})
                    :this.setState({newGameState:2})
            :this.setState({newGameState:3})
        }

        const jump=(e)=>{
            this.state.newGameState===1?
                this.setState({birdPosition:(this.state.birdPosition+minimumNumber*2),birdRotate:'up'}):
            console.log('')
        }
        window.onkeydown=jump;
        const timers=()=>{
            var variables={
                GameArea:{
                    height:document.querySelector('#GameArea').getBoundingClientRect().height,
                },
                Bird:{
                    height:document.querySelector('#Bird').getBoundingClientRect().height,
                    width:document.querySelector('#Bird').getBoundingClientRect().width
                },
                firstBlock:{
                    height:document.querySelector('.firstBlocks').firstElementChild.getBoundingClientRect().height,
                    width:document.querySelector('.firstBlocks').firstElementChild.getBoundingClientRect().left
                },
                secoundBlock:{
                    width:document.querySelector('.secoundBlocks').firstElementChild.getBoundingClientRect().left,
                    height:document.querySelector('.secoundBlocks').firstElementChild.getBoundingClientRect().height
                },
            }

            var heightDifference=variables.GameArea.height-variables.Bird.height;

            if(this.state.newGameState===1){

                if(this.state.birdPosition>minimumNumber&&this.state.birdPosition<heightDifference){
                    this.setState({birdPosition:this.state.birdPosition-minimumNumber/3,birdRotate:'down'});

                        if((Math.round(document.querySelector('.Blocks').querySelectorAll('.Block')[0].getBoundingClientRect().left))<=0){
                            tableWithObjects.push(new BlockObject(randomNumber(minimumNumber)));
                            this.setState({blocksTransformTranslateX:this.state.blocksTransformTranslateX+blocksJumpsMargins});
                            tableWithObjects.shift();
                            this.setState({tableWithObjectsState:tableWithObjects});
                            countScore(this.state.score);
                        }

                    this.setState({tableWithObjectsState:tableWithObjects});
                }

                //hit the floor
                else if(this.state.birdPosition<=minimumNumber){
                    checkIfYouCanAddNewRecord();
                    this.setState({birdPosition:0});
                    clearTimeout(timers);
                }

                //hit the ceiling
                else if(this.state.birdPosition>heightDifference){
                    checkIfYouCanAddNewRecord();
                    this.setState({birdPosition:heightDifference});
                    clearTimeout(timers);
                }

                //hit the first block
                if(((this.state.birdPosition<=variables.secoundBlock.height)&&(variables.secoundBlock.width<=variables.Bird.width)) ||
                ((this.state.birdPosition>=(variables.GameArea.height-variables.firstBlock.height))&&(variables.firstBlock.width<=variables.Bird.width))){
                    checkIfYouCanAddNewRecord();
                    this.setState({birdPosition:0});
                    clearTimeout(timers);
                }
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
        const startGame=()=>{
            this.setState({newGameState:1});
        }
        return(
            <div id="GameArea" style={styles.GameArea}>
                {
                    this.state.newGameState===0||this.state.newGameState===2||this.state.newGameState===3?
                        <ShowScoreBoardsButton
                            ShowScoreBoardsF={ShowScoreBoardsF}
                            newGameState={this.state.newGameState}
                        />:
                    null
                }
                <ScoreBoard scoreBoardShow={this.state.scoreBoardShow}/>
                <ScoreDisplay actualScore={this.state.score}/>

                {
                    this.state.newGameState===0?
                        <PlayButton
                            reloadGame={reloadGame}
                            value="Start"
                            startGame={startGame}
                            newGameState={this.state.newGameState}
                        />:
                    null
                }
                {
                    this.state.newGameState===2?
                        <PlayButton
                            reloadGame={reloadGame}
                            value="Play again?"
                            startGame={startGame}
                            newGameState={this.state.newGameState}
                        />:
                    null
                }
                {
                    this.state.newGameState===3?
                        checkIsScoreBoardIsEmpty?
                            checkIsScoreBoardIsShorterThen10?

                                <AddNewRecordToScoreBoards
                                    aScore={this.state.score}
                                    reloadGame={reloadGame}
                                />:
                            <AddNewRecordToScoreBoards
                                aScore={this.state.score}
                                reloadGame={reloadGame}
                            />:
                        <AddNewRecordToScoreBoards
                            aScore={this.state.score}
                            reloadGame={reloadGame}
                        />:
                    null
                }
                <Bird
                    position={this.state.birdPosition}
                    rotate={this.state.birdRotate}
                />
                <Blocks
                    tableWithObjectsState={this.state.tableWithObjectsState}
                    firstOrSecound={true}
                    newGameState={this.state.newGameState}
                    blocksTransformTranslateX={this.state.blocksTransformTranslateX}
                />
                <Blocks
                    tableWithObjectsState={this.state.tableWithObjectsState}
                    firstOrSecound={false}
                    newGameState={this.state.newGameState}
                    blocksTransformTranslateX={this.state.blocksTransformTranslateX}
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