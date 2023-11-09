import React from "react";
import BoardScores from "./objects/BoardScores";
import actualDate from "./actualDate";
import sortTable from "./sortTable";
import {GameContext} from "..";
import YourNick from "./YourNick";

export default class AddNewRecordToScoreBoards extends React.Component{
    state={
        scoreBoardTab:[],
        nickInput:'',
    }
    componentDidMount(){
        const data=JSON.parse(localStorage.getItem('scoreBoard'));
        data && this.setState({scoreBoardTab:data});
    }
    render(){
        return(
            <GameContext.Consumer>
            {value=>{
                const {newGameState,checkIsScoreBoardIsEmpty,checkIsScoreBoardIsShorterThen10,score,reloadGame}=value??{}
                const {nickInput}=this.state
                const styles={
                    AddNewRecordToScoreBoards:{
                        alignItems:'center',
                        justifyItems:'center',
                        position:'absolute',
                        left:'0',
                        right:'0',
                        marginLeft:'auto',
                        marginRight:'auto',
                        top:'0',
                        bottom:'0',
                        marginTop:'auto',
                        marginBottom:'auto',
                        display:'grid !important',
                        zIndex:'999',
                        width:'15%',
                        height:'20%',
                        display:'grid',
                    },
                    button:{
                        marginTop:'5px',
                        color:'white',
                        border:'solid rgb(182, 30, 0) 3px',
                        backgroundColor:'rgb(182, 59, 3)',
                        fontWeight:'bold',
                        paddingRight:'20px',
                        paddingLeft:'20px',
                        paddingBottom:'5px',
                        borderRadius:'20px',
                        paddingTop:'5px',
                        display:'grid !important',
                        width:'90%',
                        display:'grid',
                    },
                }
                const addNewRecord=(e)=>{
                    const {nickInput,scoreBoardTab}=this.state;
                    if(nickInput !== ''){
                        const newRecord=new BoardScores(nickInput, actualDate(), score);
                        const updatedScoreBoard=[...scoreBoardTab, newRecord];
                        sortTable(updatedScoreBoard);
                        this.setState({ scoreBoardTab: updatedScoreBoard },uploadData(updatedScoreBoard));
                        e.target.parentElement.remove();
                        reloadGame();
                    }else{
                        alert('Input your nick first!');
                    }
                }
                const uploadData=(data)=>localStorage.setItem('scoreBoard', JSON.stringify(data??[]));
                const onChange=({target})=>this.setState({nickInput:target.value})
                return(
                    newGameState===3 &&
                    checkIsScoreBoardIsEmpty &&
                    checkIsScoreBoardIsShorterThen10 &&
                    <div id="AddNewRecordToScoreBoards" style={styles.AddNewRecordToScoreBoards}>
                        <YourNick type="text" placeholder="Your nick" value={nickInput} onChange={onChange}/>
                        <input type="button" value="Sign to scoreboard" onClick={addNewRecord} style={styles.button}/>
                    </div>
                )
            }}
            </GameContext.Consumer>
        )
    }
}