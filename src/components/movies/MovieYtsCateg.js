import React, { useEffect, useState } from "react";
import BackToTop from "../BackToTop";

import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Loader from "../Loader";






const MovieYtsCateg = () => {

    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [totalMovies, setTotalMovies] = useState(0);
    const [category, setCategory] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const limit = 10;

    const navigate = useNavigate();

    const params = useParams();
    const genre = params.genre;




    useEffect(() => {
        fetchMovies(page);
    }, [page]);

    const fetchMovies = async (page) => {
        const response = await fetch(`https://yts.mx/api/v2/list_movies.json?genre=${genre}&limit=${limit}&page=${page}`);
        const data = await response.json();
        setMovies(data.data.movies);
        setTotalMovies(data.data.movie_count);
        setIsLoading(false);

        console.log("filmovi yts", data.data)
    }

    const totalPages = Math.ceil(totalMovies / limit);

    const clickShow = (numId) => {
        const LinkTo = `/movieDetails/${numId}`;
        navigate(LinkTo);
        console.log("klik na film id genre", numId);
    }

    if (isLoading) {
        <Loader />
    }
    return (
        <>
            <div className="gridTv" style={{ paddingTop: "60px", paddingLeft: "25px" }}>
                <p className="time"> {genre}</p>
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
                            <span className="dropdown-contentM" >
                                {movie.genres.map(genre => (
                                    <p>{genre}</p>
                                ))}
                                <p style={{ paddingTop: "15px" }}> ⏲{movie.runtime} min ⭐{movie.rating}</p>
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
            <div className="place"></div>
            <div className="place"></div>
            <BackToTop />
        </>
    );
};
export default MovieYtsCateg;