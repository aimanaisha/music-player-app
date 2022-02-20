import './App.css';
import axios from 'axios';
import Form from './Form' 
import Display from './Display';
import { useState } from 'react';
function App() {

 // const mycover = ''

  const [rescover, setrescover]=useState('../img/music.jpg')
  const [resaudio, setresaudio]=useState('')
  const [restitle, setrestitle]=useState('Song Title')
  const [resalbum, setresalbum]=useState('')
  const [resartist, setresartist]=useState('')
  const [resimage, setresimage]=useState('')

  const dataHandler=(query)=>{            
    
  const options = {
  method: 'GET',
  url: 'https://deezerdevs-deezer.p.rapidapi.com/search',
  params: {q: query},
  headers: {
    'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com',
    'x-rapidapi-key': 'e474fd8a9cmshd9d491e4a0688afp1e2253jsnb4f5557fe505'
  }
    };
    axios.request(options).then(function (response) {
      
      setrescover(response.data.data[0].album.cover_big)
      setresaudio(response.data.data[0].preview)
      setrestitle(response.data.data[0].title)
      setresartist(response.data.data[0].artist.name)
      setresimage(response.data.data[0].artist.picture_medium)
      setresalbum("Album: "+response.data.data[0].album.title)

     // console.log(response.data.data[0]);    
      })
      .catch(function (error) {
	    console.error(error);
    });
    
  }
  return (
    <div className="body1 h-full pb-14">
      <Form ondataHandler={dataHandler}/>
      <Display restitle={restitle} resartist={resartist} resalbum={resalbum} rescover={rescover} resimage={resimage} resaudio={resaudio}/>
    </div>
  );
}

export default App;
