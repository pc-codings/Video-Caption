import React, { useState, useEffect } from "react";

function CaptionForm({ onVideoUrlChange, onCaptionsChange }) {
  const [url, setUrl] = useState("");
  const [captionText, setCaptionText] = useState("");
  const [timestamp, setTimestamp] = useState("");
  const [captionList, setCaptionList] = useState([]);
  const [showList, setShowList] = useState(false);
  const [currentCaption, setCurrentCaption] = useState(null);
  const [currentCaptionIndex, setCurrentCaptionIndex] = useState(0);

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const handleCheckboxChange = () => {
    setShowList(!showList);
  };

  const handleCaptionTextChange = (e) => {
    setCaptionText(e.target.value);
  };

  const handleTimestampChange = (e) => {
    setTimestamp(e.target.value);
  };

  const addCaption = () => {
    if (captionText && timestamp) {
      const newCaption = { text: captionText, time: parseFloat(timestamp) };
      const newCaptionList = [...captionList, newCaption];
      setCaptionList(newCaptionList);
      onCaptionsChange(newCaptionList);
      setCaptionText("");
      setTimestamp("");
    }
  };

  const deleteCaption = (captionToDelete) => {
    const newCaptionList = captionList.filter(
      (caption) => caption !== captionToDelete
    );
    setCaptionList(newCaptionList);
    onCaptionsChange(newCaptionList);
  };

  const handleUrlSubmit = () => {
    if (url) {
      onVideoUrlChange(url);
    }
  };

  useEffect(() => {
    const handleTimeUpdate = (currentTime) => {
      const current = captionList.find(
        (caption) =>
          currentTime >= caption.time && currentTime < caption.time + 5 
      );
      setCurrentCaptionIndex(current);
    };

    const interval = setInterval(() => {

      const currentTime = Math.floor(Math.random() * 50); 
      handleTimeUpdate(currentTime);
    }, 1000); 

    return () => clearInterval(interval);
  }, [captionList]);

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Video URL"
          value={url}
          onChange={handleUrlChange}
        />
        <button onClick={handleUrlSubmit}>Load Video</button>
      </div>
      <div>
        <input
          type="text"
          placeholder="Caption Text"
          value={captionText}
          onChange={handleCaptionTextChange}
        />
        <input
          type="number"
          placeholder="Timestamp (seconds)"
          value={timestamp}
          onChange={handleTimestampChange}
        />
        <button onClick={addCaption}>Add Caption</button>
      </div>

      <div>
        <h3>Captions</h3>
        <div className="captions-container">
          <label className="checkbox-container">
            <input
              type="checkbox"
              checked={showList}
              onChange={handleCheckboxChange}
            />
            <span className="checkmark"></span>
            Show Captions
          </label>

          {showList && (
            <ul className="caption-list">
              {captionList.map((caption, index) => (
                <li
                  key={index}
                  className={
                    index === currentCaptionIndex
                      ? "caption-item"
                      : "caption-item hidden"
                  }
                >
                  <span className="caption-time">{caption.time}s: </span>
                  {caption.text}
                  <button onClick={() => deleteCaption(index)}>
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default CaptionForm;
