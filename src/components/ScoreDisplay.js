import React from "react";
class ScoreDisplay extends React.Component{
    render(){
        const styles={
            ScoreDisplay:{
                position:'absolute',
                borderBottomLeftRadius:'20px',
                borderBottomRightRadius:'20px',
                width:'max-content',
                height:'max-content',
                left:'0',
                right:'0',
                marginLeft:'auto',
                marginRight:'auto',
                color:'white',
                border:'solid rgb(182, 30, 0) 3px',
                backgroundColor:'rgb(182, 59, 3)',
                fontWeight:'bold',
                paddingRight:'20px',
                paddingLeft:'20px',
                paddingBottom:'5px',
                zIndex:'1300',
            }
        }
        return(
            <div id="ScoreDisplay" style={styles.ScoreDisplay}>
                Score: {this.props.actualScore}
            </div>
        )
    }
}
export default ScoreDisplay;