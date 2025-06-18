import React, { useState, useEffect } from "react";
import axios from "axios";


const FreeMoviesReview = (props) => {

    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);


    useEffect(() => {
        getMovie();
    }, []);

    const getMovie = async () => {
        const url = `https://imdb.iamidiotareyoutoo.com/search?tt=${props.imdbId}`

        try {
            const response = await axios.get(url);
            const data = response.data
            const dataImg = response.data.main.titleMainImages.edges

            setMovies(data);

            console.log("podaci iz freemovies REVIew", data);

        } catch (err) {
            setError(err);
        }
    };


    return (
        <>
            <div>
                {/* {movies.top?.plot?.plotText?.plainText && (
                    <p className="review">Plot: {movies.top?.plot?.plotText?.plainText}</p>
                )} */}
                {movies.main?.filmingLocations.edges?.[0]?.node.location && (
                    <p className="review">Filming location: {movies.main?.filmingLocations.edges?.[0]?.node.location}</p>
                )}
                {movies.short?.review?.author?.name && (
                    <p className="writer">Review by {movies.short?.review?.author?.name}</p>
                )}
                {movies.short?.review?.name && (
                    <p className="writer" >{movies.short?.review?.name} </p>
                )}
                {movies.short?.review?.reviewBody && (
                    <p dangerouslySetInnerHTML={{ __html: movies.short?.review?.reviewBody }}
                        className="review"></p>
                )}
                {movies.main?.goofs.edges[0]?.node.text.plaidHtml && (
                    <p className="goofs"> Goofs: {movies.main?.goofs.edges[0]?.node.text.plaidHtml}
                    </p>
                )}
            </div>
        </>
    )
}
export default FreeMoviesReview;