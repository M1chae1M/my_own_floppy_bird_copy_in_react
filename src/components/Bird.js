import React from "react";
import flappyBird from '../img/b0f4ca051aa111f.png';
import {GameContext} from "..";

const Bird=()=>(
    <GameContext.Consumer>
    {value=>{
        const {birdPosition,birdRotate}=value??{}
        const styles={
            Bird:{
                position:'absolute',
                bottom:`${birdPosition}px`,
                transform:`rotate(${birdRotate==='up'?-45:birdRotate==='down'?45:0}deg)`,
            },
            img:{
                width:(627/16)+'px',
                height:(443/16)+'px',
            },
        }
        return(
            <div id="Bird"style={styles.Bird}>
                <img src={flappyBird} alt="bird img" style={styles.img}/>
            </div>
        )
    }}
    </GameContext.Consumer>
)
export default Bird