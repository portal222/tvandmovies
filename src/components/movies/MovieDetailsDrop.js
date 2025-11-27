import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MovieDetailsDrop = (props) => {

    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const numId = props.number

    useEffect(() => {
        getDetails();
    }, [numId]);

    const getDetails = async () => {

        const url = `https://www.omdbapi.com/?i=${numId}&apikey=f91358c4&plot=full`;

        try {
            const response = await axios.get(url);
            const data = response.data
            setMovies(data)

        } catch (err) {
            setError(err);
        }
    };


    return (
        <>
            <p>{movies.Genre}</p>
            <p>{"⏲" + movies.Runtime + " " + "⭐" + movies.imdbRating} </p>
        </>
    )
}
export default MovieDetailsDrop;