import { useState } from "react";

    const Form =(props)=>{

    const [value, setValue]=useState('')

    

    const changeHandler=(e)=>{
        setValue(e.target.value)
    }  

    const submitHandler=(e)=>{
        e.preventDefault();
        console.log(value)
        props.ondataHandler(value)
    }

      return(
        <form onSubmit={submitHandler}>
            <div className="flex justify-center py-14 font-['Delius']">
                <input className="bg-[#f1f3f4] border border-gray-100 rounded-md bg-gray-200 w-1/3 h-14 mr-4 px-4 text-lg text-gray-700 focus:bg-gray-300  focus:backdrop-filter focus:backdrop-blur-sm focus:bg-opacity-40 focus:border focus:border-gray-100 transition focus:outline-none hover:bg-gray-300  hover:backdrop-filter hover:backdrop-blur-sm hover:bg-opacity-40 hover:border hover:border-gray-100" type="text" placeholder="Search for a song or an artist" onChange={changeHandler} value={value}/>
                <button className="rounded-md bg-gray-200 px-6 text-xl bg-[#f1f3f4] hover:bg-gray-300  hover:backdrop-filter hover:backdrop-blur-sm hover:bg-opacity-40 hover:border hover:border-gray-100 hover:text-gray-500 transition">Search!</button>
            </div>
            
        </form>
    )
}
export default Form



