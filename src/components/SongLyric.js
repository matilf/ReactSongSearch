
//desestructuracion de las props que le pasamos en song details
const SongLyric = ({title, lyrics}) =>{
    return(
        <section>
    <h2>Song Title: {title}</h2>
    {/*estilos en blockquote para que respete los saltos de linea*/}
<blockquote style={{whiteSpace: "pre-wrap"}}>   {lyrics}</blockquote>
        </section>
    )
}


export default SongLyric