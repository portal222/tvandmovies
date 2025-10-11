import React, { useState, useEffect } from "react";
import axios from "axios";
import he from "he";

const FreePlot = (props) => {

    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [expanded, setExpanded] = useState(false);

    const idmov = props.movid

    useEffect(() => {
        getMovie(idmov);
    }, [idmov]);

    const getMovie = async (idmov) => {
        const url = `https://imdb.iamidiotareyoutoo.com/search?tt=${idmov}`

        try {
            const response = await axios.get(url);
            const data = response.data

            setMovies(data.top.plot);

        } catch (err) {
            setError(err);
        }
    };

    return (
        <>
            {movies.plotText?.plainText && (
                <div style={{ padding: "5px", backgroundColor: "#2D3250" }}>
                    <p className="review">
                        {expanded
                            ? he.decode(movies.plotText?.plainText)
                            : he.decode(movies.plotText?.plainText).substring(0, 80) + "... "}
                        <span className="moreLink" onClick={() => setExpanded(!expanded)}>
                            {expanded ? " show less" : " show more"}
                        </span>
                    </p>
                </div>
            )}
        </>
    )
}
export default FreePlot;