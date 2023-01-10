import React from "react";
class Block extends React.Component{
render(){
const {blockHeight,blockLeft, isRotated}=this.props;
let isisRotatedStyle=isRotated===true?'transform:rotate(180deg);':'transform:rotate(0deg);';
let allstyles='height:'+blockHeight+'px;left:'+blockLeft+'px;'+
isisRotatedStyle;
return(<div id="Pipe" class="Block Pipe" Style={allstyles}><div class="topPipe"></div></div>);
}}
export default Block;