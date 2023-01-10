import React from "react";
class PlayButton extends React.Component{
render(){
const {displayState, displayImputStateAdd}=this.props;
const re=()=>{window.location.reload();}
return(<div id="PlayButton" className={(displayState===true && displayImputStateAdd===true)?'':'hidden'}>
<input type="button" value="Play again?" onClick={re}/>
</div>);}}
export default PlayButton;