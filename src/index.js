import React from "react";
import ReactDOM from 'react-dom/client';
import gameBackground from './img/background2.jpg';
import './index.css';
import BlockObject from "./components/objects/BlockObject";
import ShowScoreBoardsButton from "./components/ShowScoreBoardsButton";
import ScoreBoard from "./components/ScoreBoard";
import ScoreDisplay from "./components/ScoreDisplay"; 
import PlayButton from "./components/PlayButton";
import AddNewRecordToScoreBoards from "./components/AddNewRecordToScoreBoard";
import Bird from "./components/Bird";
import Blocks from "./components/Blocks"; 
import randomNumber from "./components/randomNumber"; 

export const GameContext=React.createContext()

export default class Game extends React.Component{
    state={
        firstRender:true,
        blocksJumpsMargins:70,
        minimumNumber:30,
        spaceBetweenBlocks:150,
        speed:100,
        birdPosition:160,
        score:0,
        newGameState:0,//0-not started,1-started,2-died,3-died, but you can add your nick to scoreboard table
        birdRotate:'normal',
        blocksTransformTranslateX:0,
        tableWithObjectsState:[],
        scoreBoardShow:false,
        GameAreaHeight:0,
        checkIsScoreBoardIsEmpty:false,
        checkIsScoreBoardIsShorterThen10:false,
        item_scoreBoard:[],
        bird:{
            height:443/16,
            width:627/16
        }
    }
    componentDidMount(){
        const item_scoreBoard=JSON.parse(localStorage.getItem('scoreBoard'))??[]
        const {minimumNumber,blocksJumpsMargins,speed}=this.state
        this.setState({
            checkIsScoreBoardIsEmpty:item_scoreBoard && item_scoreBoard,
            checkIsScoreBoardIsShorterThen10:item_scoreBoard && item_scoreBoard?.length<10,
            item_scoreBoard:item_scoreBoard
        })
        const countScore=(aScore)=>{
            aScore++;
            this.setState({score:aScore});
        }
        const checkIfYouCanAddNewRecord=()=>{
            if(this.state.checkIsScoreBoardIsEmpty){
                if(this.state.checkIsScoreBoardIsShorterThen10 || (this.state.item_scoreBoard.pop().score<this.state.score)){
                    this.setState({newGameState:3})
                }else{
                    this.setState({newGameState:2})
                }
            }else{
                this.setState({newGameState:3})
            }
        }
        const updateGameState=()=>{
            checkIfYouCanAddNewRecord();
            this.setState({ birdPosition: 0, blocksTransformTranslateX: -blocksJumpsMargins+40 });
            clearTimeout(timers);
        };
        const moveBirdUp=()=>{
            this.setState({ birdPosition: this.state.birdPosition-1 });
            if(this.state.birdRotate==='up'){
                setTimeout(()=>{
                    this.setState({ birdRotate: 'down' });
                }, 100);
            }else if(this.state.birdRotate==='normal'){
                this.setState({ birdRotate: 'down' });
            }
        };
        const timers=()=>{
            const variables={
                GameArea:{
                    height: document.querySelector('#GameArea')?.getBoundingClientRect().height,
                },
                firstBlock:{
                    height: document.querySelector('.firstBlocks').firstElementChild?.getBoundingClientRect().height,
                    width: document.querySelector('.firstBlocks').firstElementChild?.getBoundingClientRect().left,
                    left: Math.round(document.querySelector('.Blocks').querySelectorAll('.Block')[0]?.getBoundingClientRect().left),
                },
                secoundBlock:{
                    width: document.querySelector('.secoundBlocks').firstElementChild?.getBoundingClientRect().left,
                    height: document.querySelector('.secoundBlocks').firstElementChild?.getBoundingClientRect().height
                },
            };
            const heightDifference=variables.GameArea.height-this.state.bird.height;
            const isBirdCollidingWithBlocks=((this.state.birdPosition<=variables.secoundBlock.height) && (variables.secoundBlock.width<=this.state.bird.width)) || ((this.state.birdPosition >= (variables.GameArea.height-variables.firstBlock.height)) && (variables.firstBlock.width<=this.state.bird.width))
            if(this.state.newGameState===1){
                if(this.state.birdPosition>minimumNumber && this.state.birdPosition < heightDifference){
                    moveBirdUp();
                    if(variables.firstBlock.left<=0){
                        const copy=[...this.state.tableWithObjectsState];
                        copy.push(new BlockObject(randomNumber(minimumNumber)));
                        copy.shift();
                        this.setState({ blocksTransformTranslateX: this.state.blocksTransformTranslateX+blocksJumpsMargins+30, tableWithObjectsState: copy });
                        countScore(this.state.score);
                    }
                }else if(this.state.birdPosition<=minimumNumber || this.state.birdPosition >= heightDifference){
                    updateGameState();
                }
                isBirdCollidingWithBlocks && updateGameState();
            }
            setTimeout(timers, speed/10);
        };
        timers()
    }
    render(){
        const {firstRender,blocksJumpsMargins,minimumNumber,spaceBetweenBlocks,speed}=this.state
        const changeState=(newState)=>this.setState(newState)
        const styles={
            GameArea:{
                overflow:'hidden',
                position:'relative',
            },
            Game:{
                backgroundImage:`url("${gameBackground}")`,
                backgroundSize:'cover',
            }
        }
        const jump=()=>{
            this.state.newGameState===1 &&
            this.setState({birdPosition:this.state.birdPosition+minimumNumber*2,birdRotate:'up'})
        }
        const ShowScoreBoardsF=()=>this.setState({scoreBoardShow:!this.state.scoreBoardShow})
        const reloadGame=()=>window.location.reload()
        const startGame=()=>this.setState({newGameState:1})
        window.onkeydown=jump;
        const onLoad=()=>this.setState({GameAreaHeight:document.querySelector('#GameArea')?.getBoundingClientRect().height})
        const {newGameState,scoreBoardShow,blocksTransformTranslateX,GameAreaHeight,tableWithObjectsState,birdPosition,birdRotate,score,checkIsScoreBoardIsEmpty,checkIsScoreBoardIsShorterThen10}=this.state
        return(
            <GameContext.Provider value={{changeState,firstRender,blocksJumpsMargins,minimumNumber,spaceBetweenBlocks,speed,GameAreaHeight,tableWithObjectsState,newGameState,blocksTransformTranslateX,birdPosition,birdRotate,checkIsScoreBoardIsEmpty,checkIsScoreBoardIsShorterThen10,score,reloadGame}}>
                <div id="Game" style={styles.Game}>
                    <div id="GameArea" style={styles.GameArea} onLoad={onLoad} onClick={jump}>
                        <ShowScoreBoardsButton newGameState={newGameState} ShowScoreBoardsF={ShowScoreBoardsF} scoreBoardShow={scoreBoardShow}/>
                        <ScoreBoard scoreBoardShow={scoreBoardShow}/>
                        <ScoreDisplay actualScore={score}/>
                        <PlayButton startGame={startGame} newGameState={newGameState} reloadGame={reloadGame}/>
                        <AddNewRecordToScoreBoards/>
                        <Bird/>
                        <Blocks firstOrSecound={true}/>
                        <Blocks firstOrSecound={false}/>
                    </div>
                </div>
            </GameContext.Provider>
        )
    }
}

const root=ReactDOM.createRoot(document.getElementById('root'));
root.render(<Game/>);