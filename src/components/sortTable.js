export default function sortTable(scoreBoardTab){
    scoreBoardTab.sort((x,y)=>y.score-x.score);
    scoreBoardTab.splice(10);
}