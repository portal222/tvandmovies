import React, { useState, useEffect } from "react";
import axios from "axios";
import he from "he";

const FreeTrivia = (props) => {

    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [expanded, setExpanded] = useState(false);

console.log("prenesen broj", props.movid)

const idmov = props.movid
    useEffect(() => {
        getMovie(idmov);
    }, [idmov]);

    const getMovie = async (idmov) => {
        const url = `https://imdb.iamidiotareyoutoo.com/search?tt=${idmov}`

        try {
            const response = await axios.get(url);
            const data = response.data
        

            setMovies(data);
      
console.log("free trivia podaci", data);

        } catch (err) {
            setError(err);
        }
    };


    return (
        <>
     
                {movies.main?.trivia.edges[0].node.text.plaidHtml && (
                    <p className="goofs" dangerouslySetInnerHTML={{ __html: "Trivia: " + movies.main?.trivia.edges[0].node.text.plaidHtml}}>
                    
                    </p>
                )}

             
        </>
    )
}
export default FreeTrivia;