import React, { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';

function VideoPlayer({ videoUrl, captions }) {
  const playerRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [visibleCaption, setVisibleCaption] = useState(null);

  const handleProgress = (state) => {
    setCurrentTime(state.playedSeconds);
  };

  useEffect(() => {
    let timeoutId;
    const currentCaption = captions.find((caption, index) => {
      const nextCaption = captions[index + 1];
      const isCurrentVisible = currentTime >= caption.time && (!nextCaption || currentTime < nextCaption.time);
      return isCurrentVisible;
    });

    if (currentCaption) {
      setVisibleCaption(currentCaption.text);
      timeoutId = setTimeout(() => {
        setVisibleCaption(null);
      }, 2000);
    } else {
      setVisibleCaption(null);
    }

    return () => clearTimeout(timeoutId);
  }, [currentTime, captions]);

  return (
    <div style={{ position: 'relative' }}>
      {videoUrl && (
        <ReactPlayer
          ref={playerRef}
          url={videoUrl}
          controls
          width="800px"
          height="500px"
          onProgress={handleProgress}
        />
      )}
      <div className="captions" style={{ position: 'absolute', bottom: '10%', width: '100%', textAlign: 'center', pointerEvents: 'none' }}>
        {visibleCaption && (
          <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', color: 'white', padding: '5px' }}>
            {visibleCaption}
          </div>
        )}
      </div>
    </div>
  );
}

export default VideoPlayer;
