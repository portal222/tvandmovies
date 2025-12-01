import React, { useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import GlobalContext from "../GlobalContext";
import Loader from "../Loader";
import BackToTop from "../BackToTop";
import axios from "axios";
import SearchActors from "../search/SearchActors";
import SearchTvShow from "../search/SearchTvShow";
import fallback from "../../../public/img/fallbackimg.png"
import MovieDetailsDrop from "./MovieDetailsDrop";

const MovieRes = () => {

    const [movies, setMovies] = useState([]);
    const [series, setSeries] = useState([]);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [pageS, setPageS] = useState(1);
    const [totalMovies, setTotalMovies] = useState(0);
    const [totalSeries, setTotalSeries] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const selectRef = useRef(null);


    const navigate = useNavigate();

    const globalCtx = useContext(GlobalContext);
    const searchStringValue = globalCtx.searchStringValue;

    useEffect(() => {
        getDetails();
    }, [searchStringValue, page, pageS]);

    const getDetails = async () => {
        setIsLoading(true);

        const url = `https://www.omdbapi.com/?s=${searchStringValue}&apikey=f91358c4&page=${page}&type=movie`;
        const urlS = `https://www.omdbapi.com/?s=${searchStringValue}&apikey=f91358c4&page=${pageS}&type=series`;

        try {
            const response = await axios.get(url);
            const responseS = await axios.get(urlS);
            const data = response.data
            const dataS = responseS.data

            setIsLoading(false);
            setMovies(data.Search || []);
            setSeries(dataS.Search || []);
            setTotalMovies(data.totalResults || 0);
            setTotalSeries(dataS.totalResults || 0);

            console.log("movie i serije detalji", data);

        } catch (err) {

            setIsLoading(false);
            if (err.response && err.response.status === 401) {
                setError('You have reached your request limit for today. Please try again tomorrow.');
            } else {
                setError('An error occurred while loading the omdb.');
            }
        }
    };

    const totalPages = Math.ceil(totalMovies / 10);
    const totalPagesS = Math.ceil(totalSeries / 10);

    const scrollToSelect = () => {
        selectRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const clickShow = (numId) => {
        const LinkTo = `/movieDetails/${numId}`;
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
                        <p className="time">{totalMovies} results in Movie base for: {searchStringValue}</p>
                    </div>
                    <div className="hrGenre"></div>
                    <div className="movieMain" >
                        {movies.map((movie, id) => {
                            const imgUrl = movie.Poster;
                            return (
                                <div key={id}
                                    className="holder">
                                    <div className="dropdownM">
                                        <div>
                                            <img
                                                src={imgUrl || fallback}
                                                alt={"no picture" || "unknown"}
                                                className="poster"
                                                onError={(e) => {
                                                    if (!e.target.src.includes(fallback)) {
                                                        e.target.src = fallback;
                                                    }
                                                }}
                                            />
                                        </div>
                                        <span className="dropdown-contentM">
                                            <p style={{ paddingTop: "15px" }}> {movie.Type}</p>
                                            <MovieDetailsDrop number={movie.imdbID} />
                                        </span>
                                    </div>
                                    <div onClick={() => {
                                        clickShow(movie.imdbID);
                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                    }}
                                        className="titleLong">
                                        {movie.Title + " - " + movie.Year}
                                    </div>
                                </div>
                            )
                        })}
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

                    <div ref={selectRef}></div>

                    <div className="gridTv" style={{ paddingTop: "60px", paddingLeft: "25px" }}>

                        <p className="time">{totalSeries} results in Series base for: {searchStringValue}</p>
                    </div>
                    <div className="hrGenre"></div>
                    <div className="movieMain" >
                        {series.map((movie, id) => {
                            const imgUrl = movie.Poster;
                            return (
                                <div key={id}
                                    className="holder">
                                    <div className="dropdownM">
                                        <div>
                                            <img
                                                src={imgUrl || fallback}
                                                alt={"no picture" || "unknown"}
                                                className="poster"
                                                onError={(e) => {
                                                    if (!e.target.src.includes(fallback)) {
                                                        e.target.src = fallback;
                                                    }
                                                }}
                                            />
                                        </div>
                                        <span className="dropdown-contentM">
                                            <p style={{ paddingTop: "15px" }}> {movie.Type}</p>
                                            <MovieDetailsDrop number={movie.imdbID} />
                                        </span>
                                    </div>
                                    <div onClick={() => {
                                        clickShow(movie.imdbID);
                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                    }}
                                        className="titleLong">
                                        {movie.Title + " - " + movie.Year}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className="movieNum">
                        <button
                            className="numb"
                            onClick={() => {
                                if (pageS > 1) {
                                    setPageS(pageS - 1);
                                    scrollToSelect;
                                }
                            }}
                            disabled={pageS === 1}
                        >
                            Prev
                        </button>
                        {Array.from({ length: totalPagesS }, (_, i) => i + 1)
                            .filter((p) => {
                                return (
                                    p === 1 ||
                                    p === totalPagesS ||
                                    (p >= pageS - 1 && p <= pageS + 1)
                                );
                            })
                            .map((p, idx, arr) => {
                                const prev = arr[idx - 1];
                                return (
                                    <React.Fragment key={p}>

                                        {prev && p - prev > 1 && <span className="dots">. . .</span>}
                                        <button
                                            className={pageS === p ? "numbAct" : "numb"}
                                            onClick={() => {
                                                if (pageS !== p) {
                                                    setPageS(p);
                                                    scrollToSelect;
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
                                if (pageS < totalPagesS) {
                                    setPageS(pageS + 1);
                                    scrollToSelect;
                                }
                            }}
                            disabled={pageS === totalPagesS}
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
            <BackToTop />
        </>
    );
}
export default MovieRes;