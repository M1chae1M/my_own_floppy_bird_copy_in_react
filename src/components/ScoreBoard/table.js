const style={
    cellspacing:"0",
    cellpadding:"0",
    textAlign:'center',
}

const Table=({children})=>(
    <table style={style}>{children}</table>
)

export default Table