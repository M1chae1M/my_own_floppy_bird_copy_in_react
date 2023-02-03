import React from "react";
import BoardScores from "./objects/BoardScores";

export default class AddNewRecordToScoreBoards extends React.Component{
    render(){
        var scoreBoardTab=[];
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
            },
            yourNickInput:{
                color:'white',
                border:'solid rgb(182, 30, 0) 3px',
                backgroundColor:'rgb(182, 59, 3)',
                fontWeight:'bold',
                paddingRight:'20px',
                paddingLeft:'20px',
                paddingBottom:'5px',
                width:'100%',
                borderRadius:'20px',
                paddingTop:'5px',
                display:'grid !important',
            },
        }
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
                        b=parseInt(scoreBoardTab[i+1].score);
                        if(b>a){
                            let zm=scoreBoardTab[i+1];
                            scoreBoardTab[i+1]=scoreBoardTab[i];
                            scoreBoardTab[i]=zm;
                            n=scoreBoardTab.length;
                        }
                        else{
                            n--;
                        }
                    }
                }
            }
            if(scoreBoardTab.length>10){
                scoreBoardTab.pop();
            }
        }
        const addNewRecord=(e)=>{
            if(document.querySelector('#yourNickInput').value!==''){
                let newRecord=new BoardScores(document.querySelector('#yourNickInput').value, actualDate(), this.props.aScore);
                scoreBoardTab.push(newRecord);
                sortTable(scoreBoardTab);
                uploadData();
                e.target.parentElement.remove();
                this.props.reloadGame();
            }
            else{
                alert('Input your nick first!');
            }
        }
        const uploadData=()=>{
            if(scoreBoardTab.length!==0){
                localStorage.setItem('scoreBoard', JSON.stringify(scoreBoardTab));
            }
            else{
                console.log('');
            }
        }
        const downloadData=()=>{
            let data=JSON.parse(localStorage.getItem('scoreBoard'));
            if(data!==null && data !==undefined){
                scoreBoardTab=[];
                data.map((x,i)=>scoreBoardTab.push(x));
            }
        }
        window.onload=downloadData();
        return(
            <div id="AddNewRecordToScoreBoards" style={styles.AddNewRecordToScoreBoards}>
                <input type="text" placeholder="Your nick" id="yourNickInput" style={styles.yourNickInput}/>
                <input type="button" value="Sign to scoreboard" onClick={addNewRecord} style={styles.button}/>
            </div>
        );
    }
}