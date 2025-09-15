import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BackToTop from "../BackToTop";
import MovieOmdb from "./MovieOmdb";
import OmdbImg from "./OmdbImg";
import Released from "./Released";
import Loader from "../Loader";
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FreeMovies from "./FreeMovies";
import FreeMoviesReview from "./FreeMoviesReview";
import MovieActor from "./MovieActor";
import fallback from "../../../public/assets/img/fallback.png"


const MovieDetails = () => {

    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [sugestions, setSugestions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();

    const params = useParams();
    const numId = params.numId;

    useEffect(() => {
        getDetails();
    }, []);

    const getDetails = async () => {

        const url = `https://yts.mx/api/v2/movie_details.json?movie_id=${numId}&with_images=true&with_cast=true&with_rt_ratings`;
        const urlSub = `https://yts.mx/api/v2/movie_suggestions.json?movie_id=${numId}`;

        try {
            const response = await axios.get(url);
            const responseSub = await axios.get(urlSub);

            const data = response.data.data.movie
            const dataSub = responseSub.data.data.movies

            setMovies(data);
            setSugestions(dataSub);
            setIsLoading(false);

        } catch (err) {
            setError(err);
        }
    };

    const clickShow = (numId) => {
        const LinkTo = `/movieDetails2/${numId}`;
        navigate(LinkTo);
    }

    const clickPicture = (images) => {
        const LinkTo = `/moviePicture/${images}`;
        navigate(LinkTo);
    }

    if (isLoading) {
        return (
            <Loader />
        )
    } else if (movies.title == null) {
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
                            {movies.large_cover_image && (
                                <img src={movies.large_cover_image} alt="no picture" />
                            )}
                            <span >
                                <OmdbImg number={movies.imdb_code} />
                            </span>
                        </div>
                        <div >
                            <iframe src={`https://www.youtube.com/embed/${movies.yt_trailer_code}`} allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                className="iframe"></iframe>
                        </div>
                    </div>
                    <div>
                        <div className="movieTitle">
                            {movies.title_long}
                        </div>
                        <div className="divGenre">
                            {movies.genres && (
                                <div className="genres">
                                    {movies.genres.map((genre, id) => (
                                        <p key={id}>{genre}</p>
                                    ))}
                                </div>
                            )}
                            <div className="genres">
                                <p>{"⏲" + movies.runtime + " min " + "⭐" + movies.rating} </p>
                                <Released number={movies.imdb_code} />
                            </div>
                        </div>
                        <div>
                            <MovieOmdb number={movies.imdb_code} />
                        </div>
                        <br></br>
                        <FreeMoviesReview imdbId={movies.imdb_code} />

                    </div>
                </div>
            </div>
            <div className="detailMain">
                <div className="detailMov">
                    <FreeMovies imdbId={movies.imdb_code} />
                    <div>
                        <div className="sugestion">
                            <div className="screen">
                                {movies.medium_screenshot_image1 && (
                                    <>
                                        <img src={movies.medium_screenshot_image1} className="imgMedium" />
                                        <div className="screenImg">
                                            <span className="fullScreen"><FullscreenIcon /></span>
                                            <span>
                                                <img src={movies.large_screenshot_image1} className="dropScreen" />
                                            </span>
                                        </div>
                                    </>
                                )}
                                {movies.medium_screenshot_image2 && (
                                    <>
                                        <img src={movies.medium_screenshot_image2} className="imgMedium" />
                                        <div className="screenImg">
                                            <span className="fullScreen"><FullscreenIcon /></span>
                                            <span >
                                                <img src={movies.large_screenshot_image2} className="dropScreen" />
                                            </span>
                                        </div>
                                    </>
                                )}
                                {movies.medium_screenshot_image3 && (
                                    <>
                                        <img src={movies.medium_screenshot_image3} className="imgMedium" />
                                        <div className="screenImg">
                                            <span className="fullScreen"><FullscreenIcon /></span>
                                            <span>
                                                <img src={movies.large_screenshot_image3} className="dropScreen" />
                                            </span>
                                        </div>
                                    </>
                                )}
                                <p className="morePic"
                                    onClick={() => {
                                        clickPicture(movies.imdb_code);
                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                    }}
                                >
                                    more picture
                                </p>
                            </div>
                            {movies.torrents && (
                                <div>
                                    {movies.torrents.map((tor, id) => (
                                        <table className="torrent"
                                            key={id}>
                                            <tbody >
                                                <tr>
                                                    <td colSpan={2}>
                                                        {tor.date_uploaded}
                                                    </td>
                                                    <td rowSpan={3}>
                                                        <a href={tor.url}>DOWNLOAD</a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>{tor.quality}</td>
                                                    <td>{tor.size}</td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        {tor.type}
                                                    </td>
                                                    <td>
                                                        {tor.video_codec}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    ))}
                                    <div className="torrent" style={{ padding: "20px" }}>
                                        <span >Uploaded {movies.date_uploaded}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="similar">
                    Similar Movies
                </div>
            </div>
            <div className="movieMain">
                {sugestions.map(movie => (
                    <div key={movie.id}
                        className="holder">
                        <div className="dropdownM">
                            <div>
                                <img src={movie.medium_cover_image} alt=""
                                />
                            </div>
                            <span className="dropdown-contentM"
                            >
                                {movie.genres.map((genre, id) => (
                                    <p key={id}>{genre}</p>
                                ))}
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
            <BackToTop />
        </>
    )
}
export default MovieDetails;