import SongTableRow from "./SongTableRow";

//recibe como propiedades las canciones (mysongs), song table se mostrara en songsearch
const SongTable = ({ mySongs, handleDeleteSong }) => {
  return (
    <div>
      <h3>My Songs</h3>
      <table>
        <thead>
          <tr>
            <th colSpan="2">Artist</th>
            <th> Song</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/*ternario si ya hay canciones guardadas, table row song, sino, tr que diga sin canciones */}
          {mySongs.length > 0 ? (
            mySongs.map((el, index) => <SongTableRow key = {index} el={el} id={index} handleDeleteSong={handleDeleteSong}/>)
          ) : (
            <tr>
              {" "}
              <td colSpan="4">No Songs </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SongTable;
