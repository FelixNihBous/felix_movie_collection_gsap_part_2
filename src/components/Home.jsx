import React, { use, useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import getData from '../services/getData';
import Popup from './Popup';
import gsap from 'gsap';



import '../css/Home.css';
import Sidebar from './Sidebar.jsx';

function Home() {
    const { title } = useParams();
    const [filmData, setFilmData] = useState([]);
    const [searchedFilm, setSearchedFilm] = useState('');
    const [SelectedImdbId, setSelectedImdbId] = useState()

    const [selectedMovie, setSelectedMovie] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const movieCardsRef = useRef([]);

    useEffect(() => {
        async function fetchedData() {
            try {
                const data = await getData(title);
                setFilmData(data);
                
                gsap.fromTo(movieCardsRef.current, {
                    opacity: 0,
                    y: -50
                }, {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "power2.out"
                });
            } catch (error) {
                console.error(`Error fetching data: ${error.message}`);
            }
        }
        fetchedData();
    }, [title]);



    const handleSearch = (event) => {
        setSearchedFilm(event.target.value);
    };

    const searchButtonRef = useRef(null);

    useEffect(() => {
        const button = searchButtonRef.current;
        if (!button) return;

        const ctx = gsap.context(() => {
            button.addEventListener('mouseenter', () => {

            if (gsap.isTweening(button)) {
                gsap.killTweensOf(button);
            }
            gsap.to(button, { scale: 1.2, duration: 0.2 });

        });

            button.addEventListener('mouseleave', () => {

            if (gsap.isTweening(button)) {
                gsap.killTweensOf(button);
            }
            gsap.to(button, { scale: 1, duration: 0.2 });

        });

        }, searchButtonRef);
        
        // Click animation

        button.addEventListener('click', (e) => {
            const tl = gsap.timeline();
            tl.to(button, { scale: 0.7, duration: 0.1 })
              .to(button, { scale: 1, duration: 0.2 });
        });
    }, [searchButtonRef]);


    gsap.defaults({ duration: 0.2, ease: "power2.out" });

    const handleSubmit = async (event) => {

        event.preventDefault();
        try {
            const data = await getData(searchedFilm);
            setFilmData(data);
        } catch (error) {
            console.error(`Error fetching data: ${error.message}`);
        }
    };


    return (
        <div className='container'>
            <Sidebar />
            <div className='home-page'>
                <form onSubmit={handleSubmit} className='formSearch'>
                    <input
                        className='searchBar'
                        type="text"
                        value={searchedFilm}
                        onChange={handleSearch}
                        placeholder="Search for a movie..."
                    />
                    <button 
                        type="submit"
                        ref={searchButtonRef}
                    >
                        Search
                    </button>

                </form>
                <div className="movie-grid-container">
                    {filmData.map((film) => (
                        <div 
                            key={film["#IMDB_ID"]} 
                            className='movie-display'
                            ref={el => movieCardsRef.current.push(el)}
                        >

                            <img 
                                src={film["#IMG_POSTER"]} 
                                alt={film["#TITLE"]} 
                                onClick={() => {
                                    setSelectedMovie(film);
                                    setIsPopupOpen(true);
                                }}
                            />
                            <h2>{film["#TITLE"]}</h2>
                            <div className='film-details'>
                                <h2>{film["#YEAR"]}</h2>
                                <h2>#Rank {film["#RANK"]}</h2>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {isPopupOpen && (
                <Popup 
                    movie={selectedMovie}
                    onClose={() => setIsPopupOpen(false)}
                />
            )}
        </div>
    );
}

export default Home;
