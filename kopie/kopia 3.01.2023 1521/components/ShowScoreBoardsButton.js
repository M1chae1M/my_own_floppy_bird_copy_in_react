import React from "react";

class ShowScoreBoardsButton extends React.Component{
    render(){
        const styles={
            ShowScoreBoardsButton:{
                position:'absolute',
                top:'0%',
                right:'0%',
                zIndex:'333',
            },
            button:{
                borderTopRightRadius:'0px',
                borderTopLeftRadius:'0px',
                borderBottomRightRadius:'0px',
                color:'white',
                border:'solid rgb(182, 30, 0) 3px',
                backgroundColor:'rgb(182, 59, 3)',
                fontWeight:'bold',
                paddingRight:'20px',
                paddingLeft:'20px',
                paddingBottom:'5px',
                borderRadius:'20px',
                paddingTop:'5px',
            },
        }
        return(
            <div id="ShowScoreBoardsButton" style={styles.ShowScoreBoardsButton}>
                <input type="button"
                    value={this.props.scoreBoardShow===false?'Show Score Board':'Hide Score Board'}
                    onClick={this.props.ShowScoreBoardsF}
                    style={styles.button}
                />
            </div>
        )
    }
}

export default ShowScoreBoardsButton;