const style={
    position:'relative',
    top:'0%',
    width:'40px',
    height:'20px',
    borderRadius:'5px',
    backgroundColor:'green',
    border:'var(--darkGreen) var(--border-style) var(--border-width)',
    display:'grid',
}

const TopPipe=({children})=><div style={style}>{children}</div>

export default TopPipe