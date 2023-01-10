import React from "react";

class PlayButton extends React.Component{
    render(){
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
        return(
            <div id="PlayButton" style={styles.PlayButton}>
                {
                    this.props.newGameState===0?
                        <input
                            type="button"
                            value={this.props.value}
                            onClick={this.props.startGame}
                            style={styles.button}
                        />:
                                <input
                                    type="button"
                                    value={this.props.value}
                                    onClick={this.props.reloadGame}
                                    style={styles.button}
                                />
                }
            </div>
        );
    }
}

export default PlayButton;