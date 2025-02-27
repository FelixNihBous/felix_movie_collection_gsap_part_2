import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import searchDetailFilm from '../services/searchDetailFilm';
import Popup from './Popup';
import '../css/MovieDetail.css';

function MovieDetail() {
  const { ttid } = useParams();
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    
    const fetchMovieDetails = async () => {
      try {
        const data = await searchDetailFilm(ttid);
        if (isMounted) {
          setMovie(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchMovieDetails();
    
    return () => {
      isMounted = false;
    };
  }, [ttid]);

  const handleClosePopup = useCallback(() => {
    setShowPopup(false);
    navigate(-1);
  }, [navigate]);

  return (
    <>
      <div className="movie-detail-card">
        {isLoading && (
          <div className="loading-overlay">
            <div className="loading-spinner"></div>
            <p>Loading movie details...</p>
          </div>
        )}
        
        {error && (
          <div className="error-overlay">
            <h2>Error loading movie details</h2>
            <p>{error.message}</p>
            <p>Please try again later.</p>
          </div>
        )}

        {movie && (
          <div className="movie-header">
            <div 
              className="detail-poster-container"
              onClick={() => setShowPopup(true)}
              style={{ cursor: 'pointer' }}
              role="button"
              tabIndex={0}
              aria-label="View movie details"
            >
              <img 
                src={movie?.Poster} 
                alt={movie?.Title} 
                className="detail-poster"
              />
            </div>

            <div className="movie-meta">
              <h2 className="detail-title">{movie?.Title}</h2>
              <div className="movie-stats">
                <span className="stat-item">Year: {movie["#YEAR"]}</span>
                <span className="stat-item">Rank: {movie["#RANK"]}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {showPopup && movie && (
        <Popup 
          movie={movie} 
          onClose={handleClosePopup}
        />
      )}
    </>
  );
}

export default MovieDetail;
