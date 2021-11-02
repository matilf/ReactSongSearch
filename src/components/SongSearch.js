import React, { useState, useEffect } from 'react';
import SongForm from './SongForm';
import SongDetails from './SongDetails';
import Loader from "./Loader"
import { helpHttp } from '../helpers/helpHttp';
import { HashRouter, Link, Route, Switch } from "react-router-dom";
import Error404 from "../pages/Error404";
import SongTable from './SongTable';
import SongPage from '../pages/SongPage';

let mySongsInit = JSON.parse(localStorage.getItem("mySongs")) || [];

const SongSearch = () => {
    //variable de estado para guardar la busqueda, la info del artista, y la letra. ESTAS 3 VAN COMO PROP DE DETAILS
    // variable que controle el loader
    const [search, setSearch] = useState(null);
    const [lyric, setLyric] = useState(null);
    const [bio, setBio] = useState(null);
    const [loading, setLoading] = useState(false);
//para local storage
const[mySongs, setMySongs] = useState(mySongsInit);

    //use effect a ejecutar cuando el valor de search cambie. espera las 2 API, hace la peticion
    useEffect(() => {
        if (search === null) return;

        const fetchData = async () => {
            //desestructuracion search
            const { artist, song } = search;

            //endpoint de las api
            let artistUrl = `https://www.theaudiodb.com/api/v1/json/1/search.php?s=${artist}`;
            let songUrl = `https://api.lyrics.ovh/v1/${artist}/${song}`;


            setLoading(true);

            const [artistRes, songRes] = await Promise.all([
                helpHttp().get(artistUrl),
                helpHttp().get(songUrl),
            ]);

            //guardamos info en bio
            setBio(artistRes);
            //guardamos info en lyric
            setLyric(songRes);
            setLoading(false);
        };
        fetchData();
////////LOCAL STORAGE//////

        //cada vez que se haga una busqueda, en local storag:
        localStorage.setItem("mySongs", JSON.stringify(mySongs));

    }, [search, mySongs]);

    //metodo handlesearch recibe la data del formulario, pasamos handlesearch como prop del form
    const handleSearch = (data) => {
        //ACTUALIZO LA VARIABLE SEARCH PARA QUE SE REFLEJE LO QUE SUBMITEO EN EL HOOK
        setSearch(data);
    }

    //SALVAR LA CANCION, debe desencadenarlo el form
    const handleSaveSong = () => {
        alert("saving song");
        //obj de 3 propiedades que toma las variables de estado
        let currentSong = {
            search,
            lyric,
            bio
        }
       
        //funcion actualizadora
        //mezcla lo que ya trae my song con lo creado arriba
        let songs = [...mySongs, currentSong]
        setMySongs(songs);
        setSearch(null);
        localStorage.setItem("mySongs", JSON.stringify(songs));


    }
    const handleDeleteSong = (id) => {
        let isDelete = window.confirm(`deleting song with the id : ${id}`);

        //CUANDO INDEX SEA DIFERENE DEL ID RECIBIDO, AGREGO A MYSONGS.
        if(isDelete){
            let songs = mySongs.filter((el, index) => index !== id);
            setMySongs(songs);
            localStorage.setItem("mySongs", JSON.stringify(songs));
        }
        
    }
 
    return (
        <div>
            <h2>SongSearch</h2>

            <HashRouter basename="songs">
                <header>
                    <h2> Song Search </h2>
                    <Link to="/">Home</Link>
                </header>
                {/*operador ternario, si loader es verdadero cargar loader */}
                {loading && <Loader />}
                <article className="grid-1-2">
                    <Switch>
                        <Route exact path="/">
                            <SongForm handleSearch={handleSearch} handleSaveSong={handleSaveSong}/>
                            <SongTable mySongs={mySongs} handleDeleteSong={handleDeleteSong}/>
                            { /*mientras search tenga datos y loading este en falso, renderiza song details*/}
                            {search && !loading && (
                                <SongDetails search={search} lyric={lyric} bio={bio} />
                            )}
                        </Route>
                        <Route exact path="/:id" children={<SongPage mySongs={mySongs}/>}></Route>
                        <Route path="*" children={<Error404/> }/>
                    </Switch>
                </article>
            </HashRouter>

        </div>
    )
}


export default SongSearch

