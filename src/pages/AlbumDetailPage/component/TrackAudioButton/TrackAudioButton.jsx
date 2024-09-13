import React, { useRef, useState } from 'react'
import "./TrackAudioButton.style.css"

const TrackAudioButton = ({preview, index}) => {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
  
    const handlePlay = () => {
      if (audioRef.current) {
        if (isPlaying) {
          audioRef.current.pause(); // 오디오 일시 정지
        } else {
          audioRef.current.play(); // 오디오 재생
        }
        setIsPlaying(!isPlaying); // 상태 반전
      }
    };
  
    return (
      <>
        <button className="tracktable_play_button" onClick={handlePlay}>
            <span className="tracktable_play_icon">{isPlaying ? "||" : "▶"}</span>
            <span className="tracktable_index_icon">{index}</span>
        </button>
        <audio ref={audioRef} src={preview} />
      </>
    );
  };

export default TrackAudioButton
