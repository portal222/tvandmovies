import React, { useEffect, useState } from "react";
import axios from "axios";
import FreeMoviesReview from "./FreeMoviesReview";
import MovieActor from "./MovieActor";


const FreeMovies = (props) => {

    const [movies, setMovies] = useState([]);
    const [photo, setPhoto] = useState([]);
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
            // setPhoto(dataImg);

            console.log("podaci iz freemovies baze", data);
            // console.log("podaci novih slika", data.main.titleMainImages.edges);
        } catch (err) {
            setError(err);
        }
    };

    return (

        <>
            <div>
                <div>
                    {movies.main?.cast.edges && (
                        <>

                            {movies.main?.cast.edges.map((char, id) => (
                                <div key={id} className="freeMovie">
                                    {char.node?.name.primaryImage?.url && (
                                        <img src={char.node?.name.primaryImage?.url} alt="" className="freeImg" />
                                    )}
                                    <MovieActor actor={char.node?.name.nameText?.text} />
                                    <div>
                                        {char.node.characters?.[0]?.name && (
                                            <p> as {char.node.characters?.[0]?.name}</p>
                                        )}
                                        {char.node.characters?.[1]?.name && (
                                            <p> aka {char.node.characters?.[1]?.name}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </>
                    )}

                </div>
            </div>
            {/* {movies.top?.interests.edges && (
                        <>
                            {movies.top?.interests.edges.map((inter, id) => (
                                <div key={id}>
                                    <p>{inter.node.primaryText.text}</p>
                                </div>
                            ))}
                        </>
                    )} */}
            {/* {movies.top?.plot?.plotText?.plainText && (
                        <p>Plot: {movies.top?.plot?.plotText?.plainText}</p>
                    )}
                    {movies.main?.filmingLocations.edges?.[0]?.node.location && (
                        <p>Filming location: {movies.main?.filmingLocations.edges?.[0]?.node.location}</p>
                    )}
                    {movies.main?.goofs.edges[0]?.node.text.plaidHtml && (
                        <p dangerouslySetInnerHTML={{ __html: "Goofs: " + movies.main?.goofs.edges[0]?.node.text.plaidHtml }}></p>
                    )}
                    <hr></hr>
                    {movies.short?.review?.author?.name && (
                        <p>Review by {movies.short?.review?.author?.name}</p>
                    )}
                    {movies.short?.review?.name && (
                        <p style={{ fontWeight: "bold" }}>{movies.short?.review?.name} </p>
                    )} */}

            {/* </div> */}
            {/* <img src={movies.top?.primaryImage.url} alt="" /> */}
            {/* {movies.main?.primaryImage.url && (
                    <img src={movies.main?.primaryImage.url} alt="" style={{ width: "200px" }} />
                )} */}
            {/* </div> */}
            {/* <div className="movieMain2">

                {photo.map((image, id) => (
                    <div key={id}>
                        {image.node.url && (
                            <img src={image.node.url} alt="" />
                        )}
                        {image.node.caption.plainText && (
                            <p>
                                {image.node.caption.plainText}
                            </p>
                        )}
                    </div>
                ))}
            </div> */}

        </>
    )


}
export default FreeMovies;