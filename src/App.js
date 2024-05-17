import React, { useState } from 'react';
import VideoPlayer from './VideoPlayer';
import CaptionForm from './CaptionForm';
import './App.css';

function App() {
  const [videoUrl, setVideoUrl] = useState('');
  const [captions, setCaptions] = useState([]);
  const [videoDuration, setVideoDuration] = useState(0);

  const handleVideoUrlChange = (url) => {
    setVideoUrl(url);
  };

  const handleCaptionsChange = (newCaptions) => {
    setCaptions(newCaptions);
  };

  const handleDurationChange = (duration) => {
    setVideoDuration(duration);
  };

  return (
    <div className="App">
      <h1>Video Caption App</h1>
      <CaptionForm
        videoDuration={videoDuration}
        onVideoUrlChange={handleVideoUrlChange}
        onCaptionsChange={handleCaptionsChange}
      />
      <VideoPlayer
        videoUrl={videoUrl}
        captions={captions}
        onDurationChange={handleDurationChange}
      />
    </div>
  );
}

export default App;
