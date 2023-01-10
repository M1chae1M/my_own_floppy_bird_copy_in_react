import React from "react";
class ShowScoreBoardsButton extends React.Component{
render(){
const {displayState,ShowScoreBoardsF,scoreBoardShow}=this.props;
return(<div id="ShowScoreBoardsButton" className={displayState===false?'hidden':''}>
<input type="button"
value={scoreBoardShow===false?'Show Score Board':'Hide Score Board'}
onClick={ShowScoreBoardsF}/>
</div>)
}}
export default ShowScoreBoardsButton;