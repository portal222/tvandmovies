import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MovieActor from "./MovieActor";
import BackToTop from "../BackToTop";

const MovieDetails = () => {

    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [sugestions, setSugestions] = useState([]);

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

            setMovies(data)
            setSugestions(dataSub)

        } catch (err) {
            setError(err);
        }
    };

    const clickShow = (numId) => {
        const LinkTo = `/movieDetails2/${numId}`;
        navigate(LinkTo);
    }

    return (
        <>
            <div className="detailMain" style={{ paddingTop: "80px" }}>
                <div className="detailMov">
                    <div>
                        <div>
                            {movies.large_cover_image && (
                                <img src={movies.large_cover_image} alt="no picture" />
                            )}
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
                                    {movies.genres.map(genre => (
                                        <p>{genre}</p>
                                    ))}
                                </div>
                            )}
                            <div className="genres">
                                <p>{"⏲" + movies.runtime + " min " + "⭐" + movies.rating} </p>
                                <span>Uploaded {movies.date_uploaded}</span>
                            </div>
                        </div>
                        <div className="description">
                            {movies.description_full}
                        </div>
                        {movies.cast && (
                            <div>
                                {movies.cast.map(item => (
                                    <div className="casting">
                                        {item.url_small_image && (
                                            <img src={item.url_small_image} alt="no picture"
                                                style={{ width: "60px", height: "60px" }} />
                                        )}
                                        <MovieActor actor={item.name} />
                                        <p> as {item.character_name}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                        <div className="sugestion">
                            <div className="screen">
                                <div className="screenImg">
                                    <img src={movies.medium_screenshot_image1} />
                                    <span>
                                        <img src={movies.large_screenshot_image1} className="dropScreen" />
                                    </span>
                                </div>
                                <div className="screenImg">
                                    <img src={movies.medium_screenshot_image2} />
                                    <span >
                                        <img src={movies.large_screenshot_image2} className="dropScreen" />
                                    </span>
                                </div>
                                <div className="screenImg">
                                    <img src={movies.medium_screenshot_image3} />
                                    <span>
                                        <img src={movies.large_screenshot_image3} className="dropScreen" />
                                    </span>
                                </div>
                            </div>
                            {movies.torrents && (
                                <div>
                                    {movies.torrents.map((tor, id) => (
                                        <table className="torrent">
                                            <tbody key={id}>
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
                        <div onClick={() => clickShow(movie.id)}
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