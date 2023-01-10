import React from "react";
import flappy from '../img/flappy-bird-pixel-art.png';
class Bird extends React.Component{
    render(){
        const styles={
            Bird:{
                bottom:this.props.position+'px',
                // bottom:'160px',
                transform:'rotate('+((this.props.rotate==='up')?('-45'):((this.props.rotate==='down')?'45':'0'))+'deg)',
                position:'absolute',
                // animation:this.props.newGameState===1?'peakingBird 5s linear forwards':'none',
                // transition:this.props.newGameState===1?'all 5s linear forwards':'none',
                // animation:this.props.newGameState===1?'peakingBird 3s linear infinite':'none',
                // transition:this.props.newGameState===1?'all 3s linear infinite':'none',
                // animationIterationCount:'infinite',
            },
            img:{
                width:(627/16)+'px',
                height:(443/16)+'px',
            },
        }
        return(
            <div id="Bird"style={styles.Bird} className={
                this.props.newGameState===1?"peaking":null}>
                <img src={flappy} alt="" style={styles.img}/>
            </div>
        );
    }
}
export default Bird;