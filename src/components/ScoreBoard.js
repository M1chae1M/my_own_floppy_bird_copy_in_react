import React from "react";
import TD from "./ScoreBoard/td";

export default class ScoreBoard extends React.Component{
    state={
        scoreBoardTab:[],
    }
    componentDidMount(){
        const data=JSON.parse(localStorage.getItem('scoreBoard'));
        data && this.setState({scoreBoardTab:data});
    }
    render(){
        const {scoreBoardTab}=this.state
        const {scoreBoardShow}=this.props
        const styles={
            ScoreBoard:{
                position:'absolute',
                padding:'20px !important',
                borderSpacing:'0',
                width:'max-content',
                height:'max-content',
                left:'0',
                right:'0',
                marginLeft:'auto',
                marginRight:'auto',
                top:'0',
                bottom:'0',
                marginTop:'auto',
                marginBottom:'auto',
                color:'white',
                border:'solid rgb(182, 30, 0) 3px',
                backgroundColor:'rgb(182, 59, 3)',
                fontWeight:'bold',
                paddingRight:'20px',
                paddingLeft:'20px',
                paddingBottom:'5px',
                overflow:'hidden',
                borderRadius:'20px',
                paddingTop:'5px',
                zIndex:'1300',
            },
            table:{
                cellspacing:"0",
                cellpadding:"0",
                textAlign:'center',
            },
        }
        return(
            <div id="ScoreBoard" className={scoreBoardShow?'':'hidden'} style={styles.ScoreBoard}>
                {
                    scoreBoardTab?.length?
                        <table style={styles.table}>
                            <thead>
                                <TD>ID</TD>
                                <TD>Nick</TD>
                                <TD>Date</TD>
                                <TD>Score</TD>
                            </thead>
                            {
                                scoreBoardTab?.map(({nick,date,score},i)=>
                                    <tr key={i}>
                                        <TD>{i+1}</TD>
                                        <TD>{nick}</TD>
                                        <TD>{date}</TD>
                                        <TD>{score}</TD>
                                    </tr>
                                )
                            }
                        </table>:
                    "Nie posiadamy aktualnej tabeli wyników. Bądź pierwszy :-)"
                }
            </div>
        );
    }
}