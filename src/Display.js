import { useState, useRef, useEffect } from "react";

const Display = (props) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const audioPlayer = useRef();
  const progressBar = useRef();
  const animationRef = useRef();

  useEffect(() => {
    const seconds = Math.floor(audioPlayer.current.duration);
    setDuration(seconds);
    progressBar.current.max = seconds;
  }, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState]);

  const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnedMinutes}:${returnedSeconds}`;
  };

  const togglePlayPause = () => {
    const prevValue = isPlaying;
    setIsPlaying(!prevValue);
    if (!prevValue) {
      audioPlayer.current.play();
      animationRef.current = requestAnimationFrame(whilePlaying);
    } else {
      audioPlayer.current.pause();
      cancelAnimationFrame(animationRef.current);
    }
  };

  const whilePlaying = () => {
    progressBar.current.value = audioPlayer.current.currentTime;
    changePlayerCurrentTime();
    animationRef.current = requestAnimationFrame(whilePlaying);
  };

  const changeRange = () => {
    audioPlayer.current.currentTime = progressBar.current.value;
    changePlayerCurrentTime();
  };

  const changePlayerCurrentTime = () => {
    progressBar.current.style.setProperty(
      "--seek-before-width",
      `${(progressBar.current.value / duration) * 100}%`
    );
    setCurrentTime(progressBar.current.value);
  };

  return (
    <div className="bg-gray-800  backdrop-filter backdrop-blur-sm bg-opacity-30 rounded rounded-xl border border-[#6cbfe1] items-center flex flex-col w-[570px] pt-12 mx-auto font-['Poppins']">
      <div className="flex flex-col bg-[#010f20] px-12 pb-5 pt-14 rounded-xl bg-opacity-60 border border-gray-600">
        <img
          src={props.cover}
          alt=""
          className="h-[320px] w-[310px] mb-3 rounded rounded-xl"
        />
        <audio ref={audioPlayer} src={props.audio} className="mt-7 mb-5" />

        <button className="" onClick={togglePlayPause}>
          {isPlaying ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mx-auto my-4 text-[#6cbfe1]"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mx-auto my-4 text-[#6cbfe1]"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>
        <input
          className="mb-3 form-range appearance-none w-full h-3 p-0 bg-sky-700 bg-opacity-30 focus:outline-none focus:ring-0 focus:shadow-none rounded-lg"
          type="range"
          defaultValue="0"
          ref={progressBar}
          onChange={changeRange}
        />
        <div className="flex justify-between">
          <div className="text-gray-400 font-semibold">
            {calculateTime(currentTime)}
          </div>
          <div className="text-gray-400 font-semibold">
            {duration && !isNaN(duration) && calculateTime(duration)}
          </div>
        </div>

        <h1 className="text-4xl my-2 text-[#c7f0e4] font-bold tracking-wider text-center w-[300px] leading-snug">
          {props.songtitle}
        </h1>
      </div>

      <div className="flex flex-col  items-center">
        <div className="flex justify-center px-10 py-6">
          <img src={props.image} alt="" className="h-16 rounded-full mr-5" />
          <h2 className="my-auto text-2xl text-[#6cbfe1] font-semibold tracking-wider">
            {props.artist}
          </h2>
        </div>
        <h2 className="text-3xl text-center mb-7 text-[#6cbfe1] font-bold tracking-wider">
          {props.album}
        </h2>
      </div>
    </div>
  );
};
export default Display;
