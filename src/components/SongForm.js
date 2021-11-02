import React, { useState} from 'react';

const initialForm = {
    artist: "",
    song: "",
}

//desestructuro el handle search
 const SongForm = ({handleSearch, handleSaveSong}) =>{
     const[form, setForm] = useState(initialForm);
     //variable de boton add song
     const[isDisabled, setisDisabled] = useState(true);

//recibe el evento, actualiza el estado, toma una copia del objeto formulario (...form)
// y lo combina con el value de e.target
const handleChange = (e) => {
    setForm({
        ...form,
        [e.target.name] : e.target.value,
    });
};

//envio del formulario
const handleSubmit = (e) => {
    e.preventDefault();
    //si artist o song estan vacios
    if(!form.artist || !form.song ){
        alert("Incomplete data");
        return
    }
    //si los datos no estan vacios ejecutamos handle search y luego regresamos form a su estado inicial
    handleSearch(form);
    setForm(initialForm);
    //cuando envio el form, el boton de add se habilita
    setisDisabled(false);
}
    return(
        <div>
    <h2>SongForm</h2>
    <form onSubmit={handleSubmit}>
        <input type="text" name="artist" placeholder="artist name" onChange={handleChange} value={form.artist}/>
        <input type="text" name="song" placeholder="song name" onChange={handleChange} value={form.song}/>
        <input type="submit" value="send" />
        <input type ="button" onClick={handleSaveSong} value="add song" disabled={isDisabled && "disabled"} />
    </form>
        </div>
    )
}


export default SongForm