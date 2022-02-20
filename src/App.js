import './App.css';
import axios from 'axios';
import Form from './Form' 
import Display from './Display';
import { useState } from 'react';

function App() {

  const [cover, setCover]=useState("/music.jpg")
  const [audio, setAudio]=useState('')
  const [title, setTitle]=useState('Song Title')
  const [album, setAlbum]=useState('')
  const [artist, setArtist]=useState('')
  const [image, setImage]=useState('')

  const dataHandler=(query)=>{            
    
  const options = {
    method: 'GET',
    url: 'https://deezerdevs-deezer.p.rapidapi.com/search',
    params: {q: query},
    headers: {
      'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com',
      'x-rapidapi-key': 'e474fd8a9cmshd9d491e4a0688afp1e2253jsnb4f5557fe505'
  } }
  
  axios.request(options).then(function (response) {      
      setCover(response.data.data[0].album.cover_big)
      setAudio(response.data.data[0].preview)
      setTitle(response.data.data[0].title)
      setArtist(response.data.data[0].artist.name)
      setImage(response.data.data[0].artist.picture_medium)
      setAlbum("Album: "+response.data.data[0].album.title) 
    })
    .catch(function (error) {
	    console.error(error);
    });    
  }

  const addData= async ()=>{
    if(artist!==""){
    const res = await fetch('https://music-player-ee74b-default-rtdb.firebaseio.com/songData.json',
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body:JSON.stringify({ title, album, artist,})
      }  
    )     
      alert("Data Stored")     
  }else{
    alert("Field is Empty")
  }
}
  return (
    <div className="body1 h-full pb-14">
      <Form ondataHandler={dataHandler} addData={addData}/>
      <Display songtitle={title} artist={artist} album={album} cover={cover} image={image} audio={audio}/>
    </div>
  );
}

export default App;
