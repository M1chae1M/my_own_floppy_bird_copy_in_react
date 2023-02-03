import React from "react";
import BlockObject from "./objects/BlockObject";
import ShowScoreBoardsButton from "./ShowScoreBoardsButton";
import ScoreBoard from "./ScoreBoard";
import ScoreDisplay from "./ScoreDisplay";
import PlayButton from "./PlayButton";
import AddNewRecordToScoreBoards from "./AddNewRecordToScoreBoard";
import Bird from "./Bird";
import Blocks from "./Blocks";

export default class GameArea extends React.Component{
    state={
        birdPosition:160,
        score:0,
        newGameState:0,//0-not started,1-started,2-died,3-died, but you can add your nick to scoreboard table
        birdRotate:'normal',
        blocksTransformTranslateX:0,
        tableWithObjectsState:this.props.tableWithObjects,
        scoreBoardShow:false,
        GameAreaHeight:0,
    }
    render(){
        var checkIsScoreBoardIsEmpty=JSON.parse(localStorage.getItem('scoreBoard'))!==null&&JSON.parse(localStorage.getItem('scoreBoard'))!==undefined,
        checkIsScoreBoardIsShorterThen10=
            checkIsScoreBoardIsEmpty===true?
                JSON.parse(localStorage.getItem('scoreBoard')).length<10:null;
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
            this.setState({birdPosition:(this.state.birdPosition+this.props.minimumNumber*2),birdRotate:'up'}):
            console.log('')
        }
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
                    width:document.querySelector('.firstBlocks').firstElementChild.getBoundingClientRect().left,
                    left:Math.round(document.querySelector('.Blocks').querySelectorAll('.Block')[0].getBoundingClientRect().left),
                },
                secoundBlock:{
                    width:document.querySelector('.secoundBlocks').firstElementChild.getBoundingClientRect().left,
                    height:document.querySelector('.secoundBlocks').firstElementChild.getBoundingClientRect().height
                },
            },
            heightDifference=variables.GameArea.height-variables.Bird.height;

            if(this.state.newGameState===1){
                if(this.state.birdPosition>this.props.minimumNumber&&this.state.birdPosition<heightDifference){
                    this.setState({birdPosition:this.state.birdPosition-1});
                        if(this.state.birdRotate==='up'){
                            setTimeout(()=>{
                                this.setState({birdRotate:'down'});
                            },100)
                        }
                        else if(this.state.birdRotate==='normal'){
                            this.setState({birdRotate:'down'});
                        }

                        if(variables.firstBlock.left<=0){
                            this.props.tableWithObjects.push(new BlockObject(this.props.randomNumber(this.props.minimumNumber)));
                            this.setState({blocksTransformTranslateX:this.state.blocksTransformTranslateX+this.props.blocksJumpsMargins+30});
                            this.props.tableWithObjects.shift();
                            this.setState({tableWithObjectsState:this.props.tableWithObjects});
                            countScore(this.state.score);
                        }
                    this.setState({tableWithObjectsState:this.props.tableWithObjects});
                }

                //hit the floor
                else if(this.state.birdPosition<=this.props.minimumNumber){
                    checkIfYouCanAddNewRecord();
                    this.setState({birdPosition:0,blocksTransformTranslateX:-this.props.blocksJumpsMargins+40});
                    clearTimeout(timers);
                }

                //hit the ceiling
                else if(this.state.birdPosition>heightDifference){
                    checkIfYouCanAddNewRecord();
                    this.setState({birdPosition:heightDifference,blocksTransformTranslateX:-this.props.blocksJumpsMargins+40});
                    clearTimeout(timers);
                }

                //hit the first block
                if(((this.state.birdPosition<=variables.secoundBlock.height)&&(variables.secoundBlock.width<=variables.Bird.width)) ||
                ((this.state.birdPosition>=(variables.GameArea.height-variables.firstBlock.height))&&(variables.firstBlock.width<=variables.Bird.width))){
                    checkIfYouCanAddNewRecord();
                    this.setState({birdPosition:0,blocksTransformTranslateX:-this.props.blocksJumpsMargins+40});
                    clearTimeout(timers);
                }
            }
            setTimeout(timers, this.props.speed/10);
        }
        const ShowScoreBoardsF=()=>{
            this.setState({scoreBoardShow:!this.state.scoreBoardShow});
        }
        const reloadGame=()=>{
            window.location.reload();
        }
        const startGame=()=>{
            this.setState({newGameState:1});
        }
        window.onkeydown=jump;
        window.onload=timers;
        return(
            <div
                id="GameArea"
                style={styles.GameArea}
                onLoad={()=>{this.setState({GameAreaHeight:document.querySelector('#GameArea').getBoundingClientRect().height})}}
                onClick={jump}
            >
                {
                    this.state.newGameState===0||this.state.newGameState===2||this.state.newGameState===3?
                        <ShowScoreBoardsButton
                            ShowScoreBoardsF={ShowScoreBoardsF}
                            newGameState={this.state.newGameState}
                            scoreBoardShow={this.state.scoreBoardShow}
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
                    GameAreaHeight={this.state.GameAreaHeight}
                    randomNumber={this.props.randomNumber}
                    minimumNumber={this.props.minimumNumber}
                    firstRender={this.props.firstRender}
                    spaceBetweenBlocks={this.props.spaceBetweenBlocks}
                    blocksJumpsMargins={this.props.blocksJumpsMargins}
                />
                <Blocks
                    tableWithObjectsState={this.state.tableWithObjectsState}
                    firstOrSecound={false}
                    newGameState={this.state.newGameState}
                    blocksTransformTranslateX={this.state.blocksTransformTranslateX}
                    GameAreaHeight={this.state.GameAreaHeight}
                    randomNumber={this.props.randomNumber}
                    minimumNumber={this.props.minimumNumber}
                    firstRender={this.props.firstRender}
                    spaceBetweenBlocks={this.props.spaceBetweenBlocks}
                    blocksJumpsMargins={this.props.blocksJumpsMargins}
                />
            </div>
        );
    }
}