import React, { useState, useEffect } from "react";
import axios from "axios";
import he from "he";

const FreeMoreReview = (props) => {

    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
 
    const number = props.imdbId

    useEffect(() => {
        getMovie(number);
    }, [number]);

    const getMovie = async (number) => {
        const url = `https://imdb.iamidiotareyoutoo.com/search?tt=${number}`

        try {
            const response = await axios.get(url);
            const data = response.data

            setMovies(data);

        } catch (err) {
            setError(err);
        }
    };

    return (
        <>  
                {movies.main?.featuredReviews.edges.map((rev, id) => (
                    <div key={id}
                        style={{ padding: "5px", backgroundColor: "#2D3250" }}>
                        {rev.node.summary.originalText && (
                            <p className="writer" >{he.decode(rev.node.summary.originalText)} </p>
                        )}
                        {rev.node.text.originalText.plaidHtml && (
                            <p className="review"
                            dangerouslySetInnerHTML={{__html: rev.node.text.originalText.plaidHtml}}>    
                            </p>
                        )}
                        {rev.node.author.username.text && (
                            <p className="writer2">Review by {rev.node.author.username.text}</p>
                        )}
                    </div>
                ))}
        </>
    )
}
export default FreeMoreReview;