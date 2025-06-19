import React, { useEffect, useState } from "react";
import axios from "axios";
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

        } catch (err) {
            setError(err);
        }
    };

    return (
        <>
            <div>
                <div className="freeMovie">
                    <p>Roles:</p>
                </div>
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
        </>
    )
}
export default FreeMovies;