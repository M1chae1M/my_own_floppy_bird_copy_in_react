import React from "react";
class Block extends React.Component{
    render(){
        const styles={
            Pipe:{
                height:this.props.blockHeight+'px',
                left:this.props.blockLeft+'px',
                transform:this.props.isRotated===true?'rotate(180deg)':'rotate(0deg)',
                justifyContent:'center',
                borderTop:'none',
                borderBottom:'none',
                width:'30px',
                backgroundSize:'cover',
                backgroundColor:'green',
                border:'var(--darkGreen) var(--border-style) var(--border-width)',
                display:'flex',
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
            <div id="Pipe" class="Block Pipe" style={styles.Pipe}>
                <div class="topPipe" style={styles.topPipe}></div>
            </div>
        );
    }
}
export default Block;