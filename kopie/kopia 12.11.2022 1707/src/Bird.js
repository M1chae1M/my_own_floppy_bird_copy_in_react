import React from "react";
import flappy from './img/flappy-bird-pixel-art.png';
class Bird extends React.Component{
render(){
const {position,rotate}=this.props;
let allstyles='bottom:'+position+'px;transform:rotate('+((rotate==='up')?('-45'):((rotate==='down')?'45':'0'))+'deg)',
widthIMG=627/16,
heightIMG=443/16;
return(<div id="Bird" Style={allstyles}>
<img src={flappy} alt="" width={widthIMG} height={heightIMG}/>
</div>);}}
export default Bird;