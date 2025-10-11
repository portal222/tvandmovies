import React, { useState, useEffect } from "react";
import axios from "axios";
import he from "he";
import FreeTrivia from "./FreeTrivia";

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
                {movies.main?.productionBudget?.budget.amount && (
                    <p className="review">Production budget: {movies.main?.productionBudget.budget.amount} {movies.main?.productionBudget.budget.currency}</p>
                )}
                {movies.main?.filmingLocations.edges?.[0]?.node.location && (
                    <p className="review">Filming location: {movies.main?.filmingLocations.edges?.[0]?.node.location}</p>
                )}
                <div style={{ padding: "5px", backgroundColor: "#2D3250" }}>
                    {movies.short?.review?.name && (
                        <p className="writer" >{he.decode(movies.short?.review?.name)} </p>
                    )}
                    {movies.short?.review?.reviewBody && (
                        <p className="review">
                            {expanded
                                ? he.decode(movies.short?.review?.reviewBody)
                                : he.decode(movies.short?.review?.reviewBody).substring(0, 100) + "... "}
                            <span className="moreLink" onClick={() => setExpanded(!expanded)}>
                                {expanded ? " show less" : " show more"}
                            </span>
                        </p>
                    )}
                    {movies.short?.review?.author?.name && (
                        <p className="writer2">Review by {movies.short?.review?.author?.name}</p>
                    )}
                </div>
                {movies.main?.featuredReviews.edges.map((rev, id) => (
                    <div key={id}
                        style={{ padding: "5px", backgroundColor: "#2D3250" }}>
                        {rev.node.summary.originalText && (
                            <p className="writer" >{he.decode(rev.node.summary.originalText)} </p>
                        )}
                        {rev.node.text.originalText.plaidHtml && (
                            <p className="review">
                                {expanded
                                    ? he.decode(rev.node.text.originalText.plaidHtml)
                                    : he.decode(rev.node.text.originalText.plaidHtml).substring(0, 100) + "... "}
                                <span className="moreLink" onClick={() => setExpanded(!expanded)}>
                                    {expanded ? " show less" : " show more"}
                                </span>
                            </p>
                        )}
                        {rev.node.author.username.text && (
                            <p className="writer2">Review by {rev.node.author.username.text}</p>
                        )}
                    </div>
                ))}

                {movies.main?.goofs.edges[0]?.node.text.plaidHtml && (
                    <p className="goofs" dangerouslySetInnerHTML={{ __html: "GOOFS: " + movies.main?.goofs.edges[0]?.node.text.plaidHtml }}>
                    </p>
                )}
                <FreeTrivia movid={movies.imdbId} />
            </div>
        </>
    )
}
export default FreeMoviesReview;