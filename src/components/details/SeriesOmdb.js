import React, { useEffect, useState } from "react";
import axios from "axios";

const SeriesOmdb = (props) => {

    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);

    const imdbId = props.number

    useEffect(() => {
        getDetails();

    }, [imdbId]);

    const getDetails = async () => {

        const url = `https://www.omdbapi.com/?i=${imdbId}&apikey=f91358c4&plot=full&type=series`;

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
    const classFunctionD = (average) => {
        if (average == "N/A") {
            return 'average';
        }
    }
    const classFunctionA = (average) => {
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
            {movies.Plot && (
                <tr>
                    <td colSpan={3} className={`summary ${classFunctionP(movies.Plot)}`}>
                        {movies.Plot}
                    </td>
                </tr>
            )}
            {movies.Writer && (
                <tr>
                    <td colSpan={3} className={`language ${classFunction(movies.Writer)}`}>
                      Writer:  {movies.Writer}
                    </td>
                </tr>
            )}
            {movies.Director && (
                <tr>
                    <td colSpan={3} className={`language ${classFunctionD(movies.Director)}`}>
                        Director: {movies.Director}</td>
                </tr>
            )}
            {movies.Awards && (
                <tr>
                    <td colSpan={3} className={`language ${classFunctionA(movies.Awards)}`}>
                        Awards: {movies.Awards}</td>
                </tr>
            )}
        </>
    )
}
export default SeriesOmdb;