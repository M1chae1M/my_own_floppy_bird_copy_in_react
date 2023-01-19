import React from "react";
import Block from "./Block";
import BlockObject from "./objects/BlockObject";

class Blocks extends React.Component{
    render(){
        const numberOfRenderedBlocks=30;
        const styles={
            Blocks:{
                display:'flex',
                position:'absolute',
                overflow:'hidden',
                alignItems:this.props.firstOrSecound===true?'flex-start':'flex-end',
                transform:'translateX('+this.props.blocksTransformTranslateX+'px)',
                animation:this.props.newGameState===1?'moveblocks 599s linear forwards':null,

                webkitAnimation:this.props.newGameState===1?'moveblocks 599s linear forwards':null,
                mozAnimation:this.props.newGameState===1?'moveblocks 599s linear forwards':null,
                oAnimation:this.props.newGameState===1?'moveblocks 599s linear forwards':null,
                msAnimation:this.props.newGameState===1?'moveblocks 599s linear forwards':null,

                transition:this.props.newGameState===1?'all 599s linear forwards':null,
            }
        }
        const mapRender=()=>{
            for(let i=0;i<numberOfRenderedBlocks;i++){
                this.props.tableWithObjectsState[i]=new BlockObject(this.props.randomNumber(this.props.minimumNumber));
            }
            this.props.firstRender=false;
        }
        return(
            <div className={this.props.firstOrSecound===true?'Blocks firstBlocks':'Blocks secoundBlocks'} style={styles.Blocks}>
                {
                    (this.props.tableWithObjectsState.length<numberOfRenderedBlocks)&&(this.props.firstRender===true)?
                        mapRender():
                            null
                }
                {
                    this.props.tableWithObjectsState.map((x,i)=>
                        <Block
                            key={i}
                            blockHeight={this.props.firstOrSecound===true?(this.props.GameAreaHeight-x.blockHeight-this.props.spaceBetweenBlocks):x.blockHeight}
                            isRotated={this.props.firstOrSecound===true?true:false}
                            blocksJumpsMargins={this.props.blocksJumpsMargins}
                        />
                    )
                }
            </div>
        );
    }
}

export default Blocks;