import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../Loader";
import Time from "../Time";
import datas from "../../../public/category.json";
import BackToTop from "../BackToTop";
import Year from "../Year";
import TvMazeDet from "../details/TvMazeDet";

const MovieYts = () => {

    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);

    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    const limit = 30;

    const navigate = useNavigate();

    useEffect(() => {
        getMovie(page);
    }, [page]);

    const getMovie = async (page) => {
        setIsLoading(true);

        const url = `https://eztvx.to/api/get-torrents?limit=${limit}&page=${page}`

        try {

            const response = await axios.get(url);
            const data = response.data

            setMovies(data.torrents);
            setIsLoading(false);

        } catch (err) {
           
              if (err.response && err.response.status === 502) {
                setError('You have reached your request limit for today. Please try again tomorrow.');
            } else {
                setError('An error occurred while loading the EZTV. Please try to refresh site');
            }
        }
    };

    const totalPages = Math.ceil(3000 / limit);

    const clickShow = (showName) => {
        const LinkTo = `/seriesDetails/${showName}`;
        navigate(LinkTo);
    }


    if (isLoading) {
        return (
            <Loader />
        )
    }

    return (

        <>
            {error ? (
                <div className="gridTv" style={{ paddingTop: "60px", paddingLeft: "25px" }}>
                    <p className="time">{error}</p>
                </div>
            ) : (
                <>
                 <div className="gridTv" style={{ paddingTop: "60px", paddingLeft: "25px" }}>
                    <p className="time">Series from EZTV</p>
                </div>
                    <div className="movieMain">
                        {movies.map(movie => (
                            <div key={movie.id}
                                className="holder">

                                <TvMazeDet name={movie.title.split('S')[0]} />

                                <div onClick={() => {
                                    clickShow(movie.title.split('S')[0]);
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                                    className="titleLong">
                                    {movie.title}
                                </div>
                                <a href={movie.torrent_url} target="_blank">Download Torrent</a>
                            </div>
                        ))}
                    </div>

                    <div className="movieNum">
                        <button
                            className="numb"
                            onClick={() => {
                                if (page > 1) {
                                    setPage(page - 1);
                                    window.scrollTo({ top: 0, behavior: "smooth" });
                                }
                            }}
                            disabled={page === 1}
                        >
                            Prev
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1)
                            .filter((p) => {

                                return (
                                    p === 1 ||
                                    p === totalPages ||
                                    (p >= page - 1 && p <= page + 1)
                                );
                            })
                            .map((p, idx, arr) => {
                                const prev = arr[idx - 1];
                                return (
                                    <React.Fragment key={p}>

                                        {prev && p - prev > 1 && <span className="dots">. . .</span>}
                                        <button
                                            className={page === p ? "numbAct" : "numb"}
                                            onClick={() => {
                                                if (page !== p) {
                                                    setPage(p);
                                                    window.scrollTo({ top: 0, behavior: "smooth" });
                                                }
                                            }}
                                        >
                                            {p}
                                        </button>
                                    </React.Fragment>
                                );
                            })}
                        <button
                            className="numb"
                            onClick={() => {
                                if (page < totalPages) {
                                    setPage(page + 1);
                                    window.scrollTo({ top: 0, behavior: "smooth" });
                                }
                            }}
                            disabled={page === totalPages}
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
            <BackToTop />
        </>
    );
};
export default MovieYts;