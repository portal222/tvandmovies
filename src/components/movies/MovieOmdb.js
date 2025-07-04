import React, { useEffect, useState } from "react";
import axios from "axios";
import he from "he";


const MovieOmdb = (props) => {

    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [expanded, setExpanded] = useState(false);


    const imdbId = props.number

    useEffect(() => {
        getDetails();
    }, [imdbId]);

    const getDetails = async () => {

        const url = `https://www.omdbapi.com/?i=${imdbId}&apikey=f91358c4&plot=full`;

        try {
            const response = await axios.get(url);
            const data = response.data
            setMovies(data)

        } catch (err) {
            setError(err);
        }
    };

    const classFunction = (average) => {
        if (average == "N/A") {
            return 'average';
        }
    }
    const classFunction1 = (average) => {
        if (average == "N/A") {
            return 'average';
        }
    }
    const classFunction2 = (average) => {
        if (average == "N/A") {
            return 'average';
        }
    }
    const classFunctionW = (average) => {
        if (average == "N/A") {
            return 'average';
        }
    }
    const classFunctionA = (average) => {
        if (average == "N/A") {
            return 'average';
        }
    }
    const classFunctionD = (average) => {
        if (average == "N/A") {
            return 'average';
        }
    }
    const classFunctionC = (average) => {
        if (average == "N/A") {
            return 'average';
        }
    }
    const classFunctionL = (average) => {
        if (average == "N/A") {
            return 'average';
        }
    }
    const classFunctionP = (average) => {
        if (average == "N/A") {
            return 'average';
        }
    }

    return (
        <>
            <div>
                {movies.Country && (
                    <div className={`writer ${classFunctionC(movies.Country)}`}>
                        Country: {movies.Country}</div>
                )}
                {movies.Language && (
                    <div className={`writer ${classFunctionL(movies.Language)}`}>
                        Language: {movies.Language}</div>
                )}
                {movies.Plot && (
                    <p className="review">
                        {expanded
                            ? he.decode(movies.Plot)
                            : he.decode(movies.Plot).substring(0, 150) + "... "}
                        <span className="moreLink" onClick={() => setExpanded(!expanded)}>
                            {expanded ? " show less" : " show more"}
                        </span>
                    </p>

                )}

                {movies.Director && (
                    <div className={`writer ${classFunctionD(movies.Director)}`}> Director: {movies.Director}</div>
                )}
                {movies.Writer && (
                    <div className={`writer ${classFunctionW(movies.Writer)}`}>Writer: {movies.Writer}</div>
                )}
                {movies.Awards && (
                    <div className={`writer ${classFunction(movies.Awards)}`}>Awards: {movies.Awards}</div>
                )}
                {movies.imdbRating && (
                    <div className={`writer ${classFunction1(movies.imdbRating)}`}>IMDB rating: {movies.imdbRating + " "}
                        - Votes: {movies.imdbVotes}</div>
                )}
                {movies.BoxOffice && (
                    <div className={`office ${classFunction2(movies.BoxOffice)}`}>BoxOffice: {movies.BoxOffice}</div>
                )}
            </div>
        </>
    )
}
export default MovieOmdb;