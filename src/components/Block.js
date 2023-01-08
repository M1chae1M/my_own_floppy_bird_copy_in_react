import React from "react";
class Block extends React.Component{
    render(){
        const styles={
            Pipe:{
                display:'flex',
                justifyContent:'center',
                borderBottom:'none',
                width:'30px',
                backgroundColor:'green',
                border:'var(--darkGreen) var(--border-style) var(--border-width)',
                borderTop:'none',
                height:this.props.blockHeight+'px',
                left:this.props.blockLeft+'px',
                transform:this.props.isRotated===true?'rotate(180deg)':'rotate(0deg)',
                marginLeft:this.props.blocksJumpsMargins+'px',
            },
            topPipe:{
                position:'relative',
                top:'0%',
                width:'40px',
                height:'20px',
                borderRadius:'5px',
                backgroundColor:'green',
                border:'var(--darkGreen) var(--border-style) var(--border-width)',
            },
        }
        return(
            <div id="Pipe" className="Block Pipe" style={styles.Pipe}>
                <div className="topPipe" style={styles.topPipe}></div>
            </div>
        );
    }
}
export default Block;