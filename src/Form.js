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

                <div className="flex rounded-md w-1/3 mr-4 px-4 text-xl tracking-wider text-[#6cbfe1] transition focus:outline-none bg-gray-800  backdrop-filter backdrop-blur-sm bg-opacity-30 border border-[#6cbfe1]">

                    <input className="text-[#6cbfe1] bg-transparent w-full h-14 focus:outline-none" type="text" placeholder="Search for a song or an artist" onChange={changeHandler} value={value} spellCheck='false'/>

                    <button className="">                   
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-[#6cbfe1]" fill="none" viewBox="0 0 24 24"   stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0   0114 0z"/>
                        </svg>
                    </button>

                </div>
                <button onClick={props.addData} type="button" className="rounded-md px-3 bg-gray-800  backdrop-filter backdrop-blur-sm bg-opacity-30 border border-[#6cbfe1] transition">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-9 text-[#6cbfe1]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                </button>

            </div> 

        </form>
    )
}
export default Form



