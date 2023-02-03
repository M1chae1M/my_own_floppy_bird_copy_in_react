import React from "react";
var scoreBoardTab=[];

export default class ScoreBoard extends React.Component{
    render(){
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
                cellpadding:"0"
            },
            td:{
                borderRight:'var(--border-style) var(--border-color) var(--border-width)',
                borderTop:'var(--border-style) var(--border-color) var(--border-width)',
                padding:'4.5px',
                color:'white',
                border:'solid rgb(182, 30, 0) 3px',
                backgroundColor:'rgb(182, 59, 3)',
                fontWeight:'bold',
                paddingRight:'20px',
                paddingLeft:'20px',
                paddingBottom:'5px',
            },
        }
        const downloadData=()=>{
            let data = JSON.parse(localStorage.getItem('scoreBoard'));
            if(data !== null){
                scoreBoardTab=[];
                data.map((x,i)=>scoreBoardTab.push(x));
            }
        }
        return(
            <div id="ScoreBoard" className={this.props.scoreBoardShow===true?'':'hidden'} style={styles.ScoreBoard}>
                {downloadData()}
                {
                    Array.from(scoreBoardTab).length<=0||scoreBoardTab===undefined||scoreBoardTab===null?
                    "Nie posiadamy aktualnej tabeli wyników. Bądź pierwszy :-)":
                    <table style={styles.table}>
                        <tr>
                            <td style={styles.td}>ID</td>
                            <td style={styles.td}>Nick</td>
                            <td style={styles.td}>Date</td>
                            <td style={styles.td}>Score</td>
                        </tr>
                        {
                            scoreBoardTab.map((x, i)=>
                                <tr key={i}>
                                    <td style={styles.td}>{i+1}</td>
                                    <td style={styles.td}>{x.nick}</td>
                                    <td style={styles.td}>{x.date}</td>
                                    <td style={styles.td}>{x.score}</td>
                                </tr>
                            )
                        }
                    </table>
                }
            </div>
        );
    }
}