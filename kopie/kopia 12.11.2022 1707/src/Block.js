import React from "react";
// import blockIMG from './img/green-pipe.png';
class Block extends React.Component{
render(){
const {blockHeight,blockLeft, isRotated}=this.props;
let isisRotatedStyle=isRotated===true?'transform:rotate(180deg);':'transform:rotate(0deg);';
let allstyles='height:'+blockHeight+'px;left:'+blockLeft+'px;'+
// 'background-image:url("'+blockIMG+'");'+
isisRotatedStyle;
// allstyles+='background-color:green;';
/* <div className="Block" Style={allstyles}></div>  */
return(<div id="Pipe" class="Block Pipe" Style={allstyles}><div class="topPipe"></div></div>);
}}
export default Block;