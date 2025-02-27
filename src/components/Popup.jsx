import React from 'react';
import '../css/Home.css';

const Popup = ({ movie, onClose }) => {
  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <button 
          className="close-btn"
          onClick={onClose}
          aria-label="Close popup"
        >
          &times;
        </button>
        <div className="popup-body">
          <div className="popup-poster-container">
            <img 
              src={movie["#IMG_POSTER"] || '/placeholder.jpg'} 
              alt={movie["#TITLE"] || 'Movie Poster'} 
              className="popup-poster"
              onError={(e) => {
                e.target.onerror = null; 
                e.target.src = '/placeholder.jpg'
              }}
            />
          </div>
          <div className="popup-details">
            <h2 className="popup-title">{movie["#TITLE"] || 'Movie Title'}</h2>
            <div className="popup-meta">
              <div className="meta-section">
                <h3>Year</h3>
                <p>{movie["#YEAR"] || 'Unknown Year'}</p>
              </div>
              <div className="meta-section">
                <h3>Rank</h3>
                <p>{movie["#RANK"] || 'Unranked'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
