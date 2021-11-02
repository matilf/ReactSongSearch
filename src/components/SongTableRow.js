//el trae lo que esta guardado en local storage

import { useHistory } from "react-router"

const SongTableRow = ( {id, el, handleDeleteSong}) => {
//desestructuro search y bio de element
let {bio, search} = el;
let avatar = bio.artists[0].strArtistThumb;
let avatarStyles = {
    width : "auto",
    height: "40px"
}
    //historial de react router
    let history = useHistory()
    return(
<tr>
<td>
    <img style={avatarStyles} src={avatar} alt={search.artist} />
</td>
<td>{search.artist}</td>
<td>{search.song}</td>
<td>
    {/*este on click redirige a la ruya de /songs/id*/ }
    <button onClick={() => history.push(`/${id}`)}>See</button>
    <button onClick={ () => handleDeleteSong(id)}>Delete</button>
</td>
</tr>    
    )
        
    
}


export default  SongTableRow