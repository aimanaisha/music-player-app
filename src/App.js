import { useState } from 'react';
import './App.css';
import axios from 'axios';
import Form from './Form' 
import Display from './Display';
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth';
import { collection,addDoc,getDocs} from "firebase/firestore"; 

function App() {

  const firebaseConfig = {
    apiKey: "AIzaSyBAZa6vZaAsVT4CCaqGwpHkKajIHSL9Igs",
    authDomain: "music-player-ee74b.firebaseapp.com",
    databaseURL: "https://music-player-ee74b-default-rtdb.firebaseio.com",
    projectId: "music-player-ee74b",
    storageBucket: "music-player-ee74b.appspot.com",
    messagingSenderId: "679306818706",
    appId: "1:679306818706:web:dabc50d3447ee1065fe24b",
    measurementId: "G-2K56Z10BQ4"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore();

 const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider);
  
  }
  const [user] = useAuthState(auth);

  const [cover, setCover]=useState("/music.jpg")
  const [audio, setAudio]=useState('')
  const [title, setTitle]=useState('Song Title')
  const [album, setAlbum]=useState('')
  const [artist, setArtist]=useState('')
  const [image, setImage]=useState('')
  const [data, setData]=useState([])
 
  const dataHandler=(query)=>{            
    
  const options = {
    method: 'GET',
    url: 'https://deezerdevs-deezer.p.rapidapi.com/search',
    params: {q: query},
    headers: {
      'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com',
      'x-rapidapi-key': 'e474fd8a9cmshd9d491e4a0688afp1e2253jsnb4f5557fe505'
  } }
  
  axios.request(options)
    .then((response)=> {      
      setCover(response.data.data[0].album.cover_big)
      setAudio(response.data.data[0].preview)
      setTitle(response.data.data[0].title)
      setArtist(response.data.data[0].artist.name)
      setImage(response.data.data[0].artist.picture_medium)
      setAlbum("Album: "+response.data.data[0].album.title) 
    })
    .catch((error)=> {
	    console.error(error);
      setCover("/music.jpg")
      setAudio('')
      setTitle('Song Title')
      setArtist('')
      setImage('')
      setAlbum('')
    });    
  }  
    
const addData=async()=>{

  
  try {
     await addDoc(collection(db, 'users'), {
      uid:user.uid,
      title: title,
      artist: artist,
      album: album,
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }

  const querySnapshot = await getDocs(collection(db, "users"));
  
  querySnapshot.forEach((doc) => {
    if(doc.data().uid===user.uid){
    setData(datas=>[...datas,doc.data()])}
  });
  //setData(arr)
  console.log(data)

}

  const SignOut=()=>{
    return auth.currentUser && (
      <button className="sign-out rounded-md px-6 m-2 text-xl py-2 bg-gray-800  backdrop-filter backdrop-blur-sm bg-opacity-30 border border-[#ff9a59] text-[#ff9a59]" onClick={() => auth.signOut()}>Sign Out</button>
    )
  }

  return (
    <div>
     {user ? 
    <div className="body1 h-full pb-14">
      <SignOut />
      <Form ondataHandler={dataHandler} addData={addData}/>
      <Display songtitle={title} artist={artist} album={album} cover={cover} image={image} audio={audio}/>
       
      <div>
        {data.map((i)=>{
        return(<div className="my-10 w-3/12 h-24 bg-gray-800  backdrop-filter backdrop-blur-sm bg-opacity-30 flex justify-center items-center rounded-sm border border-[#ff9a59] mx-auto font-['Poppins']">
          <h1 className="text-2xl text-[#ff9a59] font-bold mb-1 tracking-wider">{i.title}</h1>
          </div>)})}
      </div>
  
      </div> :

      <div className='flex justify-center items-center h-screen'> <button onClick={signInWithGoogle} className='text-4xl text-gray-800 border border-gray-800 px-6 py-3 rounded-md'>Sign In With Google</button> </div>
      }
    
    </div>
  );
}
export default App;
