import React from "react";
import Block from "./Block";
import BlockObject from "./objects/BlockObject";
import {GameContext} from "..";
import randomNumber from "./randomNumber";

export default class Blocks extends React.Component{
    render(){
        const {firstOrSecound}=this.props
        const numberOfRenderedBlocks=30;
        return(
            <GameContext.Consumer>
            {value=>{
                const {changeState,tableWithObjectsState,newGameState,blocksTransformTranslateX,firstRender,minimumNumber}=value??{};
                const mapRender=()=>{
                    const arr=[...tableWithObjectsState];
                    for(let i=0;i<numberOfRenderedBlocks;i++){
                        arr.push(new BlockObject(randomNumber(minimumNumber)))
                    }
                    changeState?.({tableWithObjectsState:arr})
                }
                (tableWithObjectsState?.length<numberOfRenderedBlocks) && firstRender && mapRender();
                const styles={
                    Blocks:{
                        display:'flex',
                        position:'absolute',
                        overflow:'hidden',
                        alignItems:firstOrSecound?'flex-start':'flex-end',
                        transform:`translateX(${blocksTransformTranslateX}px)`,
                        animation:newGameState===1 &&'moveblocks 599s linear forwards',
                        transition:newGameState===1 &&'all 599s linear forwards',
                    }
                }
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