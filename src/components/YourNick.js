import styled from "styled-components";

const YourNick=styled.input`
    text-align:center;
    border:solid rgb(182, 30, 0) 3px;
    width:100%;
    display:grid !important;
    background:rgb(182, 59, 3);
    font-weight:bold;
    padding-right:20px;
    padding-left:20px;
    padding-bottom:5px;
    border-radius:20px;
    padding-top:5px;
    &::placeholder{
        color:white;
    }
`

export default YourNick