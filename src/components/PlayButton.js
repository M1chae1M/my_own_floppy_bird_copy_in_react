import React from "react";

export default class PlayButton extends React.Component{
    render(){
        const {startGame,reloadGame,newGameState}=this.props
        const styles={
            PlayButton:{
                zIndex:'600',
                position:'absolute',
                width:'min-content',
                height:'min-content',
                left:'0',
                right:'0',
                marginLeft:'auto',
                marginRight:'auto',
                top:'0',
                bottom:'0',
                marginTop:'auto',
                marginBottom:'auto',
            },
            button:{
                color:'white',
                border:'solid rgb(182, 30, 0) 3px',
                backgroundColor:'rgb(182, 59, 3)',
                fontWeight:'bold',
                paddingRight:'20px',
                paddingLeft:'20px',
                paddingBottom:'5px',
                borderRadius:'20px',
                paddingTop:'5px',
            }
        }
        const onClick=newGameState===0?startGame:reloadGame
        const value=newGameState===0?"Start":newGameState===2&&"Play again?"
        return(
            (newGameState===0||newGameState===2) && <div id="PlayButton" style={styles.PlayButton}>
                <input type="button" value={value} onClick={onClick} style={styles.button}/>
            </div>
        )
    }
}