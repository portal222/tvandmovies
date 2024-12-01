import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import GlobalContext from "../GlobalContext";
import Loader from "../Loader";
import BackToTop from "../BackToTop";

const MovieRes = () => {

    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [totalMovies, setTotalMovies] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const limit = 10;

    const navigate = useNavigate();

    const globalCtx = useContext(GlobalContext);
    const searchStringValue = globalCtx.searchStringValue;

    useEffect(() => {
        fetchMovies(searchStringValue, page);
    }, [searchStringValue, page]);

    const fetchMovies = async (searchStringValue, page) => {
        const response = await fetch(`https://yts.mx/api/v2/list_movies.json?query_term=${searchStringValue}&limit=${limit}&page=${page}`);
        const data = await response.json();
        setMovies(data.data.movies);
        setTotalMovies(data.data.movie_count);
        setIsLoading(false);
    }

    const totalPages = Math.ceil(totalMovies / limit);

    const clickShow = (numId) => {
        const LinkTo = `/movieDetails/${numId}`;
        navigate(LinkTo);
    }

    if (isLoading) {
        return (
            <Loader />
        )
    } else if (totalMovies == 0) {
        return (
            <>
                <div className="gridTv" style={{ paddingTop: "60px", paddingLeft: "25px" }}>
                <p className="time">{searchStringValue} not found</p>
                </div>
                <div className="place"></div>
            </>
        )
    }
    return (
        <>
            <div className="gridTv" style={{ paddingTop: "60px", paddingLeft: "25px" }}>
            <p className="time">{totalMovies} results for: {searchStringValue}</p>
            </div>
            <div className="hrGenre"></div>

            <div className="movieMain" >
                {movies.map(movie => (
                    <div key={movie.id}
                        className="holder">
                        <div className="dropdownM">
                            <div>
                                <img src={movie.medium_cover_image} alt="no picture"
                                   />
                            </div>
                            <span className="dropdown-contentM"
                               >
                                {movie.genres && (
                                    <>
                                        {movie.genres.map(genre => (

                                            <p>{genre}</p>
                                        ))}
                                    </>
                                )}
                                <p style={{paddingTop: "15px"}}> ⏲{movie.runtime} min ⭐{movie.rating}</p>

                            </span>
                        </div>
                        <div onClick={() => clickShow(movie.id)}
                            className="titleLong">
                            {movie.title_long}
                        </div>
                    </div>
                ))}
            </div>
            <div className="movieNum">
                {Array.from({ length: totalPages }, (_, i) => (
                    <div className={page === i + 1 ? 'numbAct' : 'numb'}
                        key={i + 1}
                        onClick={() => setPage(i + 1)}
                        disabled={i + 1 === page}
                    >
                        {i + 1}
                    </div>
                ))}
            </div>
            <BackToTop />
        </>
    );
}

export default MovieRes;