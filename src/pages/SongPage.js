import { useParams } from "react-router";
import SongDetails from "../components/SongDetails";



//va a mandar a llamar song details
const SongPage = ({mySongs}) => {
    //desestructuracion
    let {id} = useParams();

    //variable donde almaceno la cancion actual
    let currentSong = mySongs[id];
    let {search, lyric, bio} = currentSong;
    return  <SongDetails search={search} lyric={lyric} bio={bio}/>;
    
     
}


export default SongPage;