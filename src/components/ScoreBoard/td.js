const style={
    borderRight:'var(--border-style) var(--border-color) var(--border-width)',
    borderTop:'var(--border-style) var(--border-color) var(--border-width)',
    padding:'4.5px',
    color:'white',
    border:'solid rgb(182, 30, 0) 3px',
    backgroundColor:'rgb(182, 59, 3)',
    fontWeight:'bold',
    paddingRight:'20px',
    paddingLeft:'20px',
    paddingBottom:'5px',
}

const TD=({children})=>(
    <td style={style}>{children}</td>
)

export default TD