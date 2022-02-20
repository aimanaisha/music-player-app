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

                <div className="flex bg-[#f1f3f4] border border-gray-100 rounded-md bg-gray-200 w-1/3 mr-4 px-4 text-lg text-gray-700 focus:bg-gray-300  focus:backdrop-filter focus:backdrop-blur-sm focus:bg-opacity-40 focus:border focus:border-gray-100 transition focus:outline-none hover:bg-gray-300  hover:backdrop-filter hover:backdrop-blur-sm hover:bg-opacity-40 hover:border hover:border-gray-100">

                <input className="bg-transparent w-full h-14 focus:outline-none" type="text" placeholder="Search for a song or an artist" onChange={changeHandler} value={value}/>

                <button className="">
                    <img src="../img/search.svg"/>
                    {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-gray-500 fill-current" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg> */}
                </button>

                </div>


                {/* <input className="bg-[#f1f3f4] border border-gray-100 rounded-md bg-gray-200 w-1/3 h-14 mr-4 px-4 text-lg text-gray-700 focus:bg-gray-300  focus:backdrop-filter focus:backdrop-blur-sm focus:bg-opacity-40 focus:border focus:border-gray-100 transition focus:outline-none hover:bg-gray-300  hover:backdrop-filter hover:backdrop-blur-sm hover:bg-opacity-40 hover:border hover:border-gray-100" type="text" placeholder="Search for a song or an artist" onChange={changeHandler} value={value}/>

                <button className=" mr-4 rounded-md bg-gray-200 px-5 bg-[#f1f3f4] hover:bg-gray-300  hover:backdrop-filter hover:backdrop-blur-sm hover:bg-opacity-40 hover:border hover:border-gray-100 hover:text-gray-500 transition">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-gray-500 fill-current" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </button> */}

                <button onClick={props.addData} type="button" className="rounded-md bg-gray-200 px-3 bg-[#f1f3f4] hover:bg-gray-300  hover:backdrop-filter hover:backdrop-blur-sm hover:bg-opacity-40 hover:border hover:border-gray-100 hover:text-gray-500 transition">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-9 text-gray-500 fill-current" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                </button>

            </div> 

        </form>
    )
}
export default Form



