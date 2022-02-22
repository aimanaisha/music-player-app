const Card = (props) =>{

    return(<div className="my-10 w-3/12 h-24 bg-gray-800  backdrop-filter backdrop-blur-sm bg-opacity-30 rounded-sm border border-[#ff9a59] items-center flex mx-auto font-['Poppins']">
        <img src="/music.jpg" className="rounded-sm h-24 w-24"/>
        <div className="flex flex-col ml-6">
            <h1 className="text-2xl text-[#ff9a59] font-bold mb-1 tracking-wider">{props.songtitle}</h1>
            <h2 className="text-xl text-[#ff9a59] font-light tracking-wider">{props.artist}</h2>
        </div>
        
    </div>)

}
export default Card