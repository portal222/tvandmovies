import React, { useEffect, useState } from "react";
import axios from "axios";

const Released = (props) => {

    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);

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

    const classFunctionR = (average) => {
        if (average == "N/A") {
            return 'average';
        }
    }

    return (
        <>
        {movies.Released && (
        <span className={`writer ${classFunctionR(movies.Released)}`}>
          Released: {movies.Released}
        </span>
        )}
        </>
    )
}
export default Released;