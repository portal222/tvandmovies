import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BackToTop from "../BackToTop";
import MovieOmdb from "./MovieOmdb";
import Released from "./Released";
import Loader from "../Loader";
import FreeMovies from "./FreeMovies";
import FreeMoviesReview from "./FreeMoviesReview";
import EztvBaze from "./EztvBaze";

const MovieDetails = () => {

    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [imdbMov, setImdbMov] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();

    const params = useParams();
    const numId = params.numId;

    useEffect(() => {
        getDetails();
    }, [numId]);

    const getDetails = async () => {

        const url = `https://www.omdbapi.com/?i=${numId}&apikey=f91358c4&plot=full`;
        const urlI = `https://imdb.iamidiotareyoutoo.com/search?tt=${numId}`

        try {
            const response = await axios.get(url);
            const responseI = await axios.get(urlI);
            const data = response.data
            const dataI = responseI.data
            setMovies(data);
            setImdbMov(dataI);
            setIsLoading(false);

        } catch (err) {
            setError(err);
        }
    };

    const clickPicture = (images) => {
        const LinkTo = `/moviePicture/${images}`;
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
                            {/* {movies.Poster && (
                                <img src={movies.Poster} alt="no picture" />
                            )} */}
                              {imdbMov.main.primaryImage?.url && (
                                <img src={imdbMov.main.primaryImage?.url} alt="no picture" />
                            )}

                        </div>

                        <FreeMovies imdbId={movies.imdbID} />
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
                        <FreeMoviesReview imdbId={movies.imdbID} />
                        <div>
                            <div className="sugestion">
                              

                                    <button className="torrButt"
                                        onClick={() => {
                                            clickPicture(movies.imdbID);
                                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                        }}
                                    >
                                        Picture
                                    </button>
                             
                              <EztvBaze numId={movies.imdbID.slice(2)}/>

                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <BackToTop />
        </>
    )
}
export default MovieDetails;