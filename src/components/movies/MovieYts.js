import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader";
import Time from "../Time";
import datas from "../../../public/category.json";
import BackToTop from "../BackToTop";
import Year from "../Year";

const MovieYts = () => {

    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [totalMovies, setTotalMovies] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const limit = 10;

    const navigate = useNavigate();

    useEffect(() => {
        fetchMovies(page);
    }, [page]);

    const fetchMovies = async (page) => {
        const response = await fetch(`https://yts.mx/api/v2/list_movies.json?limit=${limit}&page=${page}`);
        const data = await response.json();
        setMovies(data.data.movies);
        setTotalMovies(data.data.movie_count);
        setIsLoading(false);

        console.log("detalji filmova",data.data.movies);
    }

    const totalPages = Math.ceil(totalMovies / limit);

    const clickShow = (numId) => {
        const LinkTo = `/movieDetails/${numId}`;
        navigate(LinkTo);
    }

    const clickMovie = (genre) => {
        const LinkTo = `/categ/${genre}`;
        navigate(LinkTo);
    }

    const clickRating = () => {
        const LinkTo = `/rating`;
        navigate(LinkTo);
    }

    const clickYear = () => {
        const LinkTo = `/year`;
        navigate(LinkTo);
    }

    if (isLoading) {
        return (
            <>
                <div className="movieGenre">
                    {datas.map((categ, id) => (
                        <div key={id} className="genreName"
                            onClick={() => clickMovie(categ.title)}>
                            {categ.title}
                        </div>
                    ))}
                </div>
                <Loader />
            </>
        )
    }
    return (
        <>
            <div className="movieGenre" style={{ paddingTop: "60px", paddingLeft: "25px" }}>
                <p className="timeGenre">Movies <Time /></p>
                <p className="genreName"
                onClick={() => clickRating()}>
                    Rating
                </p>
                <p className="genreName"
                onClick={() => clickYear()}>
                    <Year />
                </p>
            </div>
            <div className="movieGenre">
                {datas.map((categ, id) => (
                    <div key={id} className="genreName"
                        onClick={() => clickMovie(categ.title)}>
                        {categ.title}
                    </div>
                ))}
            </div>
            <div className="hrGenre"></div>

            <div className="movieMain">
                {movies.map(movie => (
                    <div key={movie.id}
                        className="holder">
                        <div className="dropdownM">
                            <div>
                                <img src={movie.medium_cover_image} alt="" className="dropImg"
                                />
                            </div>
                            <span className="dropdown-contentM"
                            >
                                {movie.genres && (
                                    <>
                                        {movie.genres.map((genre, id) => (
                                            <p key={id}>{genre}</p>
                                        ))}
                                    </>
                                )}
                                <p style={{ paddingTop: "15px" }}> ⏲{movie.runtime} min ⭐{movie.rating}</p>
                            </span>
                        </div>
                        <div onClick={() => {
                            clickShow(movie.id);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
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
                        onClick={() => {
                            setPage(i + 1);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        disabled={i + 1 === page}
                    >
                        {i + 1}
                    </div>
                ))}
            </div>
            <BackToTop />
        </>
    );
};
export default MovieYts;