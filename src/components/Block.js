import React from "react";
import {GameContext} from "..";
import TopPipe from "./TopPipe";

const Block=({data,isRotated})=>(
    <GameContext.Consumer>
    {value=>{
        const {GameAreaHeight,blocksJumpsMargins,spaceBetweenBlocks}=value??{}
        const blockHeight=isRotated?(GameAreaHeight-data.blockHeight-spaceBetweenBlocks):data.blockHeight
        const styles={
            Pipe:{
                justifyContent:'center',
                borderBottom:'none',
                width:'30px',
                backgroundColor:'green',
                border:'var(--darkGreen) var(--border-style) var(--border-width)',
                borderTop:'none',
                height:`${blockHeight}px`,
                transform:`rotate(${isRotated?180:0}deg)`,
                marginLeft:`${blocksJumpsMargins}px`,
                display:'grid',
            },
        }
        return(
            <div id="Pipe" className="Block Pipe" style={styles.Pipe}>
                <TopPipe/>
            </div>
        )
    }}
    </GameContext.Consumer>
)

export default Block