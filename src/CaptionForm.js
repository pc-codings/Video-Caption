import React, { useState } from "react";

function CaptionForm({ onVideoUrlChange, onCaptionsChange }) {
  const [url, setUrl] = useState("");
  const [captionText, setCaptionText] = useState("");
  const [timestamp, setTimestamp] = useState("");
  const [captionList, setCaptionList] = useState([]);
  const [showList, setShowList] = useState(false);

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

  const handleUrlSubmit = () => {
    if (url) {
      onVideoUrlChange(url);
    }
  };

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
              <li key={index} className="caption-item">
                <span className="caption-time">{caption.time}s: </span>{caption.text}
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
