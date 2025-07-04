import React, { useState, useEffect } from "react";
import axios from "axios";
import he from "he";

const FreeMoviesReview = (props) => {

    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [expanded, setExpanded] = useState(false);


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

        } catch (err) {
            setError(err);
        }
    };


    return (
        <>
            <div>
                {movies.main?.filmingLocations.edges?.[0]?.node.location && (
                    <p className="review">Filming location: {movies.main?.filmingLocations.edges?.[0]?.node.location}</p>
                )}
                {movies.short?.review?.author?.name && (
                    <p className="writer">Review by {movies.short?.review?.author?.name}</p>
                )}
                {movies.short?.review?.name && (
                    <p className="writer" >{he.decode(movies.short?.review?.name)} </p>
                )}
                {movies.short?.review?.reviewBody && (
                    <p className="review">
                        {expanded
                            ? he.decode(movies.short?.review?.reviewBody)
                            : he.decode(movies.short?.review?.reviewBody).substring(0, 200) + "... "}
                        <span className="moreLink" onClick={() => setExpanded(!expanded)}>
                            {expanded ? " show less" : " show more"}
                        </span>
                    </p>
                )}


                {movies.main?.goofs.edges[0]?.node.text.plaidHtml && (
                    <p className="goofs" dangerouslySetInnerHTML={{ __html: "Goofs: " + movies.main?.goofs.edges[0]?.node.text.plaidHtml }}>
                    </p>
                )}
            </div>
        </>
    )
}
export default FreeMoviesReview;