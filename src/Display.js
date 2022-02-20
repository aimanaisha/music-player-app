
const Display=(props)=>{

    return(
        <div className="bg-gray-800  backdrop-filter backdrop-blur-sm bg-opacity-30 rounded rounded-xl border border-[#6cbfe1] items-center flex flex-col w-[570px] pt-12 mx-auto font-['Poppins']">

            <div className="flex flex-col bg-[#010f20] px-12 pb-5 pt-14 rounded-xl bg-opacity-60 border border-gray-600">
                <img src={props.cover} alt="" className="h-[320px] w-[310px] mb-3 rounded rounded-xl"/>
                <audio controls src={props.audio} className="mt-7 mb-5"/>
                <h1 className="text-4xl my-2 text-[#c7f0e4] font-bold tracking-wider text-center w-[300px] leading-snug">{props.songtitle}</h1>
            </div>

            <div className="flex flex-col  items-center">                
                <div className="flex justify-center px-10 py-6">                
                    <img src={props.image} alt="" className="h-16 rounded-full mr-5"/>
                    <h2 className="my-auto text-2xl text-[#6cbfe1] font-semibold tracking-wider">{props.artist}</h2>
                </div>    
                <h2 className="text-3xl text-center mb-7 text-[#6cbfe1] font-bold tracking-wider">{props.album}</h2>                
            </div>

        </div>
    )
}
export default Display