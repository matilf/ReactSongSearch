import SongArtist from "./SongArtist";
import SongLyric from "./SongLyric";
import Message from "./Message"; //recibe prop msg y bgcolor

//DESESTRUCTURO SEARCH LYRIC BIO
const SongDetails = ({ search, lyric, bio }) => {
  //mientras lyric y bio no tengan valor...
  if (!lyric || !bio) return null;

  return (
    <>
   
      {/*si lyric error o lyric err o lyric name es igual a abort mandamos msj de error, caso contrario mando la letra*/}
      {lyric.error || lyric.err|| lyric.name === "AbortError" ? (
        <Message
          msg={`Error: song ${search.song} not found`}
          bgColor="#dc3545"
        />
      ) : (
        <SongLyric title={search.song} lyrics={lyric.lyrics}/>
      )}
      {/*cuando bio.artist exista, muestro son artist, sino, el mensaje de error*/}
      {bio.artists ? (
        <SongArtist artist={bio.artists[0]} />
      ) : (
        <Message
          msg={`Error: Artist ${search.artist} not found`}
          bgColor="#dc3545"
        />
      )}
    </>
  );
};

export default SongDetails;
