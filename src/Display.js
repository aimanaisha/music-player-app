
const Display=(props)=>{

    return(
        <div className="bg-gray-300  backdrop-filter backdrop-blur-sm bg-opacity-40 rounded rounded-xl border border-gray-100 items-center flex flex-col w-[570px] pt-12 mx-auto font-['Delius']">

            <div className="flex flex-col bg-[#f1f3f4] px-12 pb-5 pt-14 rounded-xl">
                <img src={props.cover} alt="" className="h-[320px] w-[310px] mb-3 rounded rounded-xl"/>
                <audio controls src={props.audio}/>
                <h1 className="text-4xl my-2  text-center w-[300px] leading-snug">{props.songtitle}</h1>
            </div>

            <div className="flex flex-col  items-center">                
                <div className="flex justify-center px-10 py-6">                
                    <img src={props.image} alt="" className="h-16 rounded-full mr-5"/>
                    <h2 className="my-auto text-xl">{props.artist}</h2>
                </div>    
                <h2 className="text-2xl text-center mb-7">{props.album}</h2>                
            </div>

        </div>
    )
}
export default Display