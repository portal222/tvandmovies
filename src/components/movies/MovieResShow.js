import React, { useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import GlobalContext from "../GlobalContext";
import Loader from "../Loader";
import BackToTop from "../BackToTop";
import axios from "axios";
import fallback from "../../../public/img/fallbackimg.png"
import MovieDetailsDrop from "./MovieDetailsDrop";
import TasteDiveMovies from "./TasteDiveMovies";
import { useParams } from "react-router-dom";


const MovieResShow = () => {

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

    const params = useParams()
    const name = params.name;

    useEffect(() => {
        getDetails();
    }, [name, pageS]);

    const getDetails = async () => {
        setIsLoading(true);


        const urlS = `https://www.omdbapi.com/?s=${name}&apikey=f91358c4&page=${pageS}&type=series`;

        try {

            const responseS = await axios.get(urlS);

            const dataS = responseS.data



            setIsLoading(false);

            setSeries(dataS.Search || []);

            setTotalSeries(dataS.totalResults || 0);

        } catch (err) {

            setError(err)
            setIsLoading(false);
            if (err.response && err.response.status === 401) {
                setError('You have reached your request limit for today. Please try again tomorrow.');
            } else {
                setError('An error occurred while loading the omdb.');
            }
        }
    };


    const totalPagesS = Math.ceil(totalSeries / 10);

    const scrollToSelect = () => {
        selectRef.current?.scrollIntoView({ behavior: "smooth" });
    };



    const clickShow = (numId) => {
        const LinkTo = `/showOmdbDetails/${numId}`;
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
                <>
                    <div className="gridTv" style={{ paddingTop: "60px", paddingLeft: "25px" }}>
                        <p className="time">{error}</p>
                    </div>
                </>
            ) : (
                <>



                    <div ref={selectRef}></div>

                    <div className="gridTv" style={{ paddingTop: "60px", paddingLeft: "25px" }}>

                        <p className="time">{totalSeries} results in Series base for: {name}</p>
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
export default MovieResShow;