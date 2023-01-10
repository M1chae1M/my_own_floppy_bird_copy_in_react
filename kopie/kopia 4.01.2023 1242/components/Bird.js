import React from "react";
import flappy from '../img/flappy-bird-pixel-art.png';
class Bird extends React.Component{
    render(){
        const styles={
            Bird:{
                bottom:this.props.position+'px',
                transform:'rotate('+((this.props.rotate==='up')?('-45'):((this.props.rotate==='down')?'45':'0'))+'deg)',
                position:'absolute',
            },
            img:{
                width:(627/16)+'px',
                height:(443/16)+'px',
            },
        }
        return(
            <div id="Bird"style={styles.Bird}>
                <img src={flappy} alt="" style={styles.img}/>
            </div>
        );
    }
}
export default Bird;