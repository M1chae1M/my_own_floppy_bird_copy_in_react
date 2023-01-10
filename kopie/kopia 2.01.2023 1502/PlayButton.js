import React from "react";
class PlayButton extends React.Component{
render(){
const {reloadGame}=this.props;
return(<div id="PlayButton"><input type="button" value="Play again?" onClick={reloadGame}/></div>);}}
export default PlayButton;