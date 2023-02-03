import React from "react";
import ReactDOM from 'react-dom/client';
import GameArea from "./components/GameArea";
import gameBackground from './img/background2.jpg';
import randomNumber from "./components/randomNumber";
import './index.css';

const tableWithObjects=[], firstRender=true,blocksJumpsMargins=70,minimumNumber=30,spaceBetweenBlocks=150,speed=100;

export default class Game extends React.Component{
    render(){
        const styles={
            Game:{
                backgroundImage:'url("'+gameBackground+'")',
                backgroundSize:'cover',
            },
        }
        return(
            <div id="Game" style={styles.Game}>
                <GameArea
                    tableWithObjects={tableWithObjects}
                    minimumNumber={minimumNumber}
                    randomNumber={randomNumber}
                    blocksJumpsMargins={blocksJumpsMargins}
                    speed={speed}
                    firstRender={firstRender}
                    spaceBetweenBlocks={spaceBetweenBlocks}
                />
            </div>
        );
    }
}

const root=ReactDOM.createRoot(document.getElementById('root'));
root.render(<Game/>);