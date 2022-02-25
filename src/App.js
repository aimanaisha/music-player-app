
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
  const [data, setData]=useState([])
  const [userFav, setUserFav] = useState([]);

  const[songData, setSongData]=useState({
    cover:'/music.jpg',
    audio:'',
    title:'Song Title',
    album:'',
    artist:'',
    image:'',
  })
 
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
      setSongData({
        cover: response.data.data[0].album.cover_big,
        audio: response.data.data[0].preview,
        title: response.data.data[0].title,
        album: "Album: "+response.data.data[0].album.title,
        artist: response.data.data[0].artist.name,
        image: response.data.data[0].artist.picture_medium,
      })
    })
    .catch((error)=> {
	    console.error(error);
      setSongData({
        cover:'/music.jpg',
        audio:'',
        title:'Song Title',
        album:'',
        artist:'',
        image:'',
      })
    });    
  }  
 
const addData=async()=>{ 
  if(songData.artist!=='' ){
    try {
       await addDoc(collection(db, 'users'), {
        uid:user.uid,
        title: songData.title,
        artist: songData.artist,
        album: songData.album,
        cover: songData.cover,
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    alert('Song Added')
  }else{
    alert('Empty Field')
  }
  setData([])
  const querySnapshot = await getDocs(collection(db, "users"));
  querySnapshot.forEach((doc) => {
    try{
      setData(prev => [...prev,doc.data()])
    }catch(e){
      console.log("Error", e);
    }
  })
  setUserFav(data.filter((e) => e.uid === user.uid))
}
const locreload=()=>{window.location.reload()}  
console.log(userFav)
 
 
  const SignOut=()=>{
    return auth.currentUser && (
      <button className="sign-out rounded-md px-6 m-2 text-xl py-2 bg-gray-800  backdrop-filter backdrop-blur-sm bg-opacity-30 border border-[#ff9a59] text-[#ff9a59]" onClick={() => {auth.signOut()
      locreload()}}>Sign Out</button>
    )
  }
 
  return (
    <div>
     {user ? 
    <div className="body1 h-full pb-14">
      <SignOut />
      <Form ondataHandler={dataHandler} addData={addData}/>
      <Display songtitle={songData.title} artist={songData.artist} album={songData.album} cover={songData.cover} image={songData.image} audio={songData.audio}/> 
      <div>          
         {userFav.map((i) => {return(
            <>
            {i.title === 'Song Title' ? (null) : ( <div className="my-10 w-3/12 h-24 bg-gray-800 backdrop-filter backdrop-blur-sm bg-opacity-30 rounded-sm border border-[#ff9a59] items-center flex mx-auto font-['Poppins']">
            <img src={i.cover} alt="" className="rounded-sm h-24 border w-24 border-[#ff9a59]"/>
            <div className="flex flex-col ml-6">
           	 <h1 className="text-2xl text-[#ff9a59] font-bold mb-1 tracking-wider">{i.title}</h1>
            	<h2 className="text-xl text-[#ff9a59] font-light tracking-wider">{i.artist}</h2>
            </div>
          </div>)} 
            </>
          )})} 
      </div> 
      </div> : 
      <div className='flex justify-center items-center h-screen'> <button onClick={signInWithGoogle} className='text-4xl text-gray-800 border border-gray-800 px-6 py-3 rounded-md'>Sign In With Google</button> </div>
      } 
    </div>
  );
}
export default App;
