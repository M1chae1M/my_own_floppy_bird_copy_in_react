import React from "react";
import flappyBird from '../img/b0f4ca051aa111f.png';

class Bird extends React.Component{
    render(){
        const styles={
            Bird:{
                position:'absolute',
                bottom:this.props.position+'px',
                transform:'rotate('+((this.props.rotate==='up')?('-45'):((this.props.rotate==='down')?'45':'0'))+'deg)',
            },
            img:{
                width:(627/16)+'px',
                height:(443/16)+'px',
            },
        }
        return(
            <div id="Bird"style={styles.Bird}>
                <img src={flappyBird} alt="" style={styles.img}/>
            </div>
        );
    }
}

export default Bird;