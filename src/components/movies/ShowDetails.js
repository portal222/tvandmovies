import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BackToTop from "../BackToTop";
import MovieOmdb from "./MovieOmdb";
import Released from "./Released";
import Loader from "../Loader";


const ShowDetails = () => {

    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [movTitle, setMovTitle] = useState("");
    const [moviTaste, setMoviTaste] = useState([]);

    const navigate = useNavigate();

    const params = useParams();
    const numId = params.numId;

    useEffect(() => {
        getDetails();
    }, [numId]);

    const getDetails = async () => {

        const url = `https://www.omdbapi.com/?i=${numId}&apikey=f91358c4&plot=full`;

        try {
            const response = await axios.get(url);
            const data = response.data

            setMovies(data);
            setIsLoading(false);
            setMovTitle(data.Title);    

        } catch (err) {
            setError(err);
        }
    };

    useEffect(() => {
        getTaste();
    }, [movTitle])

    const getTaste = async () => {
        setIsLoading(true);

        const url = `https://ridlejoke-proxy.kvaka32.workers.dev/tastediveshow?q=${movTitle}`;

        try {
            const response = await axios.get(url);
     
            setMoviTaste(response.data.similar.results)
        } catch (err) {
            setError(err.message);
        }
    }

    const clickShow = (name) => {
        const LinkTo = `/showResTaste/${name}`;
        navigate(LinkTo);
    }

    if (isLoading) {
        return (
            <Loader />
        )
    } else if (movies.Title == null) {
        return (
            <div className="detailMain" style={{ paddingTop: "80px" }}>
                <div className="detailMov">
                    <div className="movieTitle">
                        NO DATA YET
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            <div className="detailMain" style={{ paddingTop: "80px" }}>
                <div className="detailMov">
                    <div>
                        <div className="cover">

                            {movies.Poster && (
                                <img src={movies.Poster} alt="no picture" />
                            )}

                        </div>
                    </div>
                    <div>
                        <div className="movieTitle">
                            {movies.Title}
                        </div>
                        <div className="divGenre">

                            <div className="genres">
                                {movies.Genre}
                            </div>

                            <div className="genres">
                                <p>{"⏲" + movies.Runtime + " min " + "⭐" + movies.imdbRating} </p>
                                <Released number={movies.imdbID} />
                            </div>
                        </div>
                        <div>
                            <MovieOmdb number={movies.imdbID} />
                        </div>
                        <br></br>
                  
                        <div>
                            <div className="sugestion">
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{ textAlign: "left", fontSize: "24px", paddingTop: "30px"}}>
                    Similar series
                </div>

            </div>
            <div className="movieMainTaste">
                {moviTaste.map((mov, id) => (
                    <div key={id}
                        className="holderTaste">
                        <p
                            onClick={() => {
                                clickShow(mov.name);
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                        >

                            {mov.name}</p>
                        <iframe
                            src={`https://www.youtube.com/embed/${mov.yID}`}
                            width="100%"
                            height="250px"
                            allow="autoplay; fullscreen; picture-in-picture"
                            allowFullScreen

                        ></iframe>

                        <div className="desTaste">

                            {mov.description}


                        </div>

                    </div>
                ))}
            </div>

            <BackToTop />
        </>
    )
}
export default ShowDetails;