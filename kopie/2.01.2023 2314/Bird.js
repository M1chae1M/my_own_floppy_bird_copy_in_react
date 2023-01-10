import React from "react";
import flappy from './img/flappy-bird-pixel-art.png';
class Bird extends React.Component{
    render(){
        // let widthIMG=627/16,
        // heightIMG=443/16;
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
        // const {position,rotate}=this.props;
        // let allstyles='bottom:'+position+'px;transform:rotate('+((rotate==='up')?('-45'):((rotate==='down')?'45':'0'))+'deg)',
        
        return(
            <div id="Bird"
            // Style={allstyles}
            style={styles.Bird}
            >
                <img src={flappy} alt=""
                style={styles.img}
                // width={widthIMG} height={heightIMG}
                />
            </div>
        );
    }
}
export default Bird;