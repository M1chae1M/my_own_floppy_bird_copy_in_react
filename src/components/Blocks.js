import React from "react";
import Block from "./Block";
import BlockObject from "./objects/BlockObject";
import {GameContext} from "..";
import randomNumber from "./randomNumber";

export default class Blocks extends React.Component{
    render(){
        const {firstOrSecound,nextRender}=this.props
        return(
            <GameContext.Consumer>
            {value=>{
                const {tableWithObjectsState,newGameState,blocksTransformTranslateX,firstRender,minimumNumber}=value??{}
                const numberOfRenderedBlocks=30;
                const styles={
                    Blocks:{
                        display:'flex',
                        position:'absolute',
                        overflow:'hidden',
                        alignItems:firstOrSecound?'flex-start':'flex-end',
                        transform:`translateX(${blocksTransformTranslateX}px)`,
                        animation:newGameState===1 &&'moveblocks 599s linear forwards',
                        webkitAnimation:newGameState===1 &&'moveblocks 599s linear forwards',
                        mozAnimation:newGameState===1 &&'moveblocks 599s linear forwards',
                        oAnimation:newGameState===1 &&'moveblocks 599s linear forwards',
                        msAnimation:newGameState===1 &&'moveblocks 599s linear forwards',
                        transition:newGameState===1 &&'all 599s linear forwards',
                    }
                }
                const mapRender=()=>{
                    for(let i=0;i<numberOfRenderedBlocks;i++){
                        tableWithObjectsState[i]=new BlockObject(randomNumber(minimumNumber));
                    }
                    nextRender?.()
                }
                (tableWithObjectsState?.length<numberOfRenderedBlocks) && firstRender && mapRender();
                const className=firstOrSecound?'Blocks firstBlocks':'Blocks secoundBlocks'
                return(
                    <div className={className} style={styles.Blocks}>
                        {tableWithObjectsState?.map((x,i)=><Block key={i} isRotated={firstOrSecound} data={x}/>)}
                    </div>
                )
            }}
            </GameContext.Consumer>
        )
    }
}